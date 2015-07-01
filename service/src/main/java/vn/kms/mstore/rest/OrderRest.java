package vn.kms.mstore.rest;

import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import vn.kms.mstore.domain.cart.Cart;
import vn.kms.mstore.domain.order.Order;
import vn.kms.mstore.domain.order.OrderItem;
import vn.kms.mstore.domain.order.OrderItemRepository;
import vn.kms.mstore.domain.order.OrderRepository;
import vn.kms.mstore.domain.customer.Address;
import vn.kms.mstore.domain.customer.Customer;
import vn.kms.mstore.util.DataNotFoundException;
import vn.kms.mstore.util.SecurityUtil;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

/**
 * Created by trungnguyen on 6/17/15.
 */
@RestController
@RequestMapping(value = "/orders")
@Transactional(readOnly = true)
public class OrderRest extends BaseRest {
    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private OrderItemRepository orderItemRepo;

    @Autowired
    private AddressRest addressRest;

    @Autowired
    private CartRest cartRest;

    @Autowired
    private ItemRest itemRest;

    @Autowired
    private CustomerRest customerRest;

    @RequestMapping(value = "/preview-order", method = GET)
    public Order previewOrder(@RequestParam(required = false) String shippingAddressId,
                              @RequestParam(required = false) String billingAddressId) {

        Customer customer = customerRest.getCustomer();

        if (shippingAddressId == null) {
            shippingAddressId = customer.getAddressId();
        }

        if (billingAddressId == null) {
            billingAddressId = customer.getAddressId();
        }

        return buildNewOrder(shippingAddressId, billingAddressId);
    }

    @RequestMapping(method = PUT)
    @Transactional
    public String placeOrder(@RequestParam String shippingAddressId, @RequestParam String billingAddressId) {

        val customerId = SecurityUtil.getLoginId();
        val orderId = UUID.randomUUID().toString();

        val order = buildNewOrder(shippingAddressId, billingAddressId);
        order.getDetails().forEach(orderItem -> {
            orderItem.setOrderId(orderId);

            orderItemRepo.save(orderItem);
            itemRest.addQuantity(orderItem.getItemId(), -orderItem.getQuantity());
        });

        order.setId(orderId);
        order.setCustomerId(customerId);
        order.setOrderDate(new Date());
        orderRepo.save(order);

        cartRest.removeCart(null);

        return order.getId();
    }

    @RequestMapping(method = GET)
    public List<Order> getOrders() {
        val customerId = SecurityUtil.getLoginId();
        return orderRepo.findByCustomerId(customerId);
    }

    @RequestMapping(value = "/{orderId}", method = GET)
    public Order getOrder(@PathVariable String orderId) {
        String customerId = SecurityUtil.getLoginId();
        val order = orderRepo.findOne(orderId);
        if (order == null || !order.getCustomerId().equals(customerId)) {
            throw new DataNotFoundException("Order #" + orderId + " is not found");
        }

        val shippingAddress = addressRest.getAddressById(order.getShippingAddressId());
        val billingAddress = addressRest.getAddressById(order.getBillingAddressId());

        order.setShippingAddress(shippingAddress);
        order.setBillingAddress(billingAddress);
        order.setDetails(orderItemRepo.findByOrderIdOrderByLineNumberAsc(orderId));

        return order;
    }

    @RequestMapping(value = "/{orderId}", method = DELETE)
    @Transactional
    @ResponseStatus(value = NO_CONTENT)
    public void cancelOrder(@PathVariable String orderId) {
        String customerId = SecurityUtil.getLoginId();
        Order order = orderRepo.findOne(orderId);
        if (order == null || !order.getCustomerId().equals(customerId)) {
            throw new DataNotFoundException("Order #" + orderId + " is not found");
        }

        val items = orderItemRepo.findByOrderIdOrderByLineNumberAsc(orderId);
        items.forEach(item -> {
            itemRest.addQuantity(item.getItemId(), item.getQuantity());
            orderItemRepo.delete(item);
        });

        orderRepo.delete(order);
    }

    private Order buildNewOrder(String shippingAddressId, String billingAddressId) {
        Cart cart = cartRest.getDetailCart(null);
        Address shippingAddress = addressRest.getAddressById(shippingAddressId);
        Address billingAddress = addressRest.getAddressById(billingAddressId);
        Order order = new Order();

        order.setShippingAddressId(shippingAddress.getId());
        order.setBillingAddressId(billingAddress.getId());
        order.setShippingAddress(shippingAddress);
        order.setBillingAddress(billingAddress);

        cart.getDetails().forEach(cartItem -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setLineNumber(order.getDetails().size() + 1);
            orderItem.setItemId(cartItem.getItemId());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setUnitPrice(cartItem.getPrice());

            long lineTotal = orderItem.getUnitPrice() * orderItem.getQuantity();

            order.getDetails().add(orderItem);
            order.setSubTotal(order.getSubTotal() + lineTotal);
        });

        order.setTaxRate(calculateTaxRate(order.getBillingAddress()));
        order.setShippingFee(calculateShippingFee(order.getSubTotal(), order.getShippingAddress()));
        return order;
    }

    private double calculateTaxRate(Address billingAddress) {
        // random 3% .. 10%
        double taxRate = (3 + Math.random() * 8) / 100.0;
        return (double) Math.round(taxRate * 100) / 100;
    }

    private long calculateShippingFee(long subTotal, Address shippingAddress) {
        // random 0.1% .. 1% of subTotal
        double rate = (1 + Math.random() * 10) / 1000.0;
        return (long) (subTotal * (double) Math.round(rate * 100) / 100);
    }

}
