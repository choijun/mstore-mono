package vn.kms.mstore.rest;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import vn.kms.mstore.domain.cart.Cart;
import vn.kms.mstore.domain.cart.CartItem;
import vn.kms.mstore.domain.cart.CartItemRepository;
import vn.kms.mstore.domain.cart.CartRepository;
import vn.kms.mstore.domain.cart.DetailCartItem;
import vn.kms.mstore.domain.catalog.Item;
import vn.kms.mstore.util.DataNotFoundException;
import vn.kms.mstore.util.SecurityUtil;

import javax.validation.Valid;
import java.util.Date;
import java.util.UUID;

import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

/**
 * Created by trungnguyen on 6/24/15.
 */
@RestController
@RequestMapping(value = "/api/carts")
@Transactional(readOnly = true)
@Slf4j
public class CartRest extends BaseRest {
    @Autowired
    private CartItemRepository cartItemRepo;

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private ItemRest itemRest;

    @RequestMapping(method = GET)
    @Transactional
    public String getCartId() {
        String userId = SecurityUtil.getLoginId();
        Cart cart = cartRepo.findByOwner(userId);
        if (cart == null) {
            cart = new Cart();
            cart.setId(UUID.randomUUID().toString());
            cart.setOwner(userId);
            cart.setCreatedAt(new Date());

            cartRepo.save(cart);
        }

        return cart.getId();
    }

    @RequestMapping(value = "/{cartId}", method = GET)
    public Cart getDetailCart(@PathVariable String cartId) {
        String userId = SecurityUtil.getLoginId();

        val cartFromId = cartRepo.findOne(cartId);
        val cartFromLogin = cartRepo.findByOwner(userId);
        if (cartFromId == null && cartFromLogin == null) {
            throw new DataNotFoundException("Cart " + cartId + " is not existed");
        }

        return buildDetailCart(cartFromLogin, cartFromId);
    }

    @RequestMapping(value = "/{cartId}", method = POST)
    @Transactional
    public CartItem putCartItem(@PathVariable String cartId, @RequestBody @Valid CartItem cartItem) {
        cartItem.setCartId(cartId);

        val existingItem = cartItemRepo.findOne(new CartItem.PK(cartId, cartItem.getItemId()));
        if (existingItem != null) {
            cartItem.addQuantity(existingItem.getQuantity());
        }

        cartItem = cartItemRepo.save(cartItem);

        return cartItem;
    }

    @RequestMapping(value = "/{cartId}/{itemId}", method = DELETE)
    @ResponseStatus(value = NO_CONTENT)
    @Transactional
    public void removeCartItem(@PathVariable String cartId, @PathVariable String itemId) {
        val cartItem = cartItemRepo.findOne(new CartItem.PK(cartId, itemId));
        if (cartItem == null) {
            throw new DataNotFoundException("Item " + itemId + " is not found in cart " + cartId);
        }

        cartItemRepo.delete(cartItem);
    }

    @RequestMapping(value = "/{cartId}", method = DELETE)
    @ResponseStatus(value = NO_CONTENT)
    @Transactional
    public void removeCartById(@PathVariable String cartId) {
        val cartFromId = cartRepo.findOne(cartId);
        if (cartFromId != null) {
            cartItemRepo.deleteByCartId(cartFromId.getId());
            cartRepo.delete(cartFromId);
        }

        String userId = SecurityUtil.getLoginId();
        val cartFromLogin = cartRepo.findByOwner(userId);
        if (cartFromLogin != null) {
            cartItemRepo.deleteByCartId(cartFromLogin.getId());
            cartRepo.delete(cartFromLogin);
        }
    }

    private Cart buildDetailCart(Cart cartFromLogin, Cart cartFromId) {
        Cart cart;
        if (cartFromLogin == null) {
            if (SecurityUtil.getLoginId() != null) {
                cartFromId.setOwner(SecurityUtil.getLoginId());
                cartRepo.save(cartFromId);
            }

            cart = cartFromId;
        } else if (cartFromId == null) {
            cart = cartFromLogin;
        } else { // existing both carts, merge them
            cart = mergeCarts(cartFromLogin, cartFromId);
        }

        if (cart.getDetails() != null) { // already build cart details
            return cart;
        }

        buildCartDetails(cart, cart.getId());

        return cart;
    }

    private void buildCartDetails(Cart finalCart, String cartId) {
        val cartItems = cartItemRepo.findByCartId(cartId);
        cartItems.forEach(cartItem -> {
            DetailCartItem detailItem = new DetailCartItem(cartItem);
            Item item = itemRest.getItemById(cartItem.getItemId());
            if (item != null) {
                detailItem.setPrice(item.getPrice());
                detailItem.setQuantityInStock(item.getQuantity());
            }

            finalCart.addDetailCartItem(detailItem);
        });
    }

    private Cart mergeCarts(Cart cartFromLogin, Cart cartFromId) {
        val cart = cartFromLogin;

        buildCartDetails(cart, cartFromLogin.getId());
        buildCartDetails(cart, cartFromId.getId());

        cartRepo.delete(cartFromId);

        return cart;
    }
}
