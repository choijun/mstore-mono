package vn.kms.mstore.rest;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import vn.kms.mstore.domain.cart.Cart;
import vn.kms.mstore.domain.cart.CartItem;
import vn.kms.mstore.domain.cart.CartItemRepository;
import vn.kms.mstore.domain.cart.CartRepository;
import vn.kms.mstore.domain.cart.DetailCartItem;
import vn.kms.mstore.domain.catalog.Item;
import vn.kms.mstore.domain.catalog.ItemRepository;
import vn.kms.mstore.util.DataNotFoundException;
import vn.kms.mstore.util.SecurityUtil;

import javax.validation.Valid;
import java.util.Date;
import java.util.UUID;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Created by trungnguyen on 6/24/15.
 */
@RestController
@RequestMapping(value = "/carts")
@Transactional(readOnly = true)
@Slf4j
public class CartRest extends BaseRest {
    @Autowired
    private CartItemRepository cartItemRepo;

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private ItemRepository itemRepo;

    @RequestMapping(value = "/cart-id", method = GET)
    @Transactional
    public String getCartId() {
        String owner = SecurityUtil.getLoginId();
        Cart cart = (owner != null) ? cartRepo.findByOwner(owner) : null;
        if (cart == null) {
            cart = new Cart();
            cart.setId(UUID.randomUUID().toString());
            cart.setOwner(owner);
            cart.setCreatedAt(new Date());

            cartRepo.save(cart);
        }

        return cart.getId();
    }

    @RequestMapping(value = "/total-items", method = GET)
    public int getTotalCartItems(@RequestParam(required = false) String cartId) {
        cartId = getCartId(cartId);
        return cartItemRepo.countDistinctItemIdByCartId(cartId);
    }

    @RequestMapping(value = "/detail", method = GET)
    @Transactional
    public Cart getDetailCart(@RequestParam(required = false) String cartId) {
        String owner = SecurityUtil.getLoginId();
        Cart cartFromId = (cartId != null) ? cartRepo.findOne(cartId) : null;
        Cart cartFromOwner = (owner != null) ? cartRepo.findByOwner(owner) : null;

        if (cartFromId == null && cartFromOwner == null) {
            throw new DataNotFoundException("Cart is not existed");
        }

        return buildDetailCart(cartFromOwner, cartFromId);
    }

    @Transactional
    @RequestMapping(value = "/items", method = POST)
    @ResponseStatus(value = CREATED)
    public CartItem addCartItem(@RequestParam(required = false) String cartId, @RequestBody @Valid CartItem cartItem) {
        cartId = getCartId(cartId);

        cartItem.setCartId(cartId);

        val existingItem = cartItemRepo.findOne(new CartItem.PK(cartId, cartItem.getItemId()));
        if (existingItem != null) {
            cartItem.addQuantity(existingItem.getQuantity());
        }

        cartItem = cartItemRepo.save(cartItem);

        return cartItem;
    }

    @Transactional
    @RequestMapping(value = "/items/{itemId}", method = POST)
    public CartItem addCartItemQuantity(@RequestParam(required = false) String cartId,
                                @PathVariable String itemId,
                                @RequestBody int quantity) {
        cartId = getCartId(cartId);

        CartItem cartItem = cartItemRepo.findOne(new CartItem.PK(cartId, itemId));
        if (cartItem == null) {
            throw new DataNotFoundException("Item " + itemId + " is not found in cart " + cartId);
        }

        cartItem.addQuantity(quantity);
        cartItem = cartItemRepo.save(cartItem);

        return cartItem;
    }

    @RequestMapping(value = "/items/{itemId}", method = DELETE)
    @ResponseStatus(value = NO_CONTENT)
    @Transactional
    public void removeCartItem(@RequestParam(required = false) String cartId, @PathVariable String itemId) {
        cartId = getCartId(cartId);
        CartItem cartItem = cartItemRepo.findOne(new CartItem.PK(cartId, itemId));
        if (cartItem == null) {
            throw new DataNotFoundException("Item " + itemId + " is not found in cart " + cartId);
        }

        cartItemRepo.delete(cartItem);
    }

    @RequestMapping(value = "/remove", method = DELETE)
    @ResponseStatus(value = NO_CONTENT)
    @Transactional
    public void removeCart(@RequestParam(required = false) String cartId) {
        Cart cartFromId = (cartId != null)? cartRepo.findOne(cartId) : null;
        if (cartFromId != null) {
            cartItemRepo.deleteByCartId(cartFromId.getId());
            cartRepo.delete(cartFromId);
        }

        String owner = SecurityUtil.getLoginId();
        val cartFromOwner = cartRepo.findByOwner(owner);
        if (cartFromOwner != null) {
            cartItemRepo.deleteByCartId(cartFromOwner.getId());
            cartRepo.delete(cartFromOwner);
        }
    }

    private Cart buildDetailCart(Cart cartFromOwner, Cart cartFromId) {
        Cart cart;
        if (cartFromOwner == null) {
            cart = cartFromId;
        } else if (cartFromId == null) {
            cart = cartFromOwner;
        } else if (!cartFromOwner.getId().equals(cartFromId.getId())) { // existing both carts, merge them
            cart = mergeCarts(cartFromOwner, cartFromId);
        } else { // cartFromOwner and cartFromId are the same
            cart = cartFromOwner;
        }

        if (!cart.getDetails().isEmpty()) { // already build cart details
            return cart;
        }

        addCartItemsFromCartId(cart, cart.getId());

        return cart;
    }

    private void addCartItemsFromCartId(Cart finalCart, String cartId) {
        val cartItems = cartItemRepo.findByCartId(cartId);
        cartItems.forEach(cartItem -> finalCart.addDetailCartItem(buildDetailCartItem(cartItem)));
    }

    private DetailCartItem buildDetailCartItem(CartItem cartItem) {
        DetailCartItem detailItem = new DetailCartItem(cartItem);
        Item item = itemRepo.findOne(cartItem.getItemId());
        if (item != null) {
            detailItem.setPrice(item.getPrice());
            detailItem.setQuantityInStock(item.getQuantity());
        }

        return detailItem;
    }

    private Cart mergeCarts(Cart cartFromLogin, Cart cartFromId) {
        val cart = cartFromLogin;

        addCartItemsFromCartId(cart, cartFromLogin.getId());
        addCartItemsFromCartId(cart, cartFromId.getId());

        cartRepo.delete(cartFromId);

        return cart;
    }

    private String getCartId(String cartId) {
        String owner = SecurityUtil.getLoginId();
        Cart cartFromId = (cartId != null) ? cartRepo.findOne(cartId) : null;
        Cart cartFromOwner = (owner != null) ? cartRepo.findByOwner(owner) : null;

        if (cartFromId == null && cartFromOwner == null) {
            throw new DataNotFoundException("Cart is not existed");
        }

        if (cartFromOwner != null) {
            cartId = cartFromOwner.getId();
        }
        return cartId;
    }
}
