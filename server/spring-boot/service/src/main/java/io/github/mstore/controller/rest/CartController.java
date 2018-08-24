package io.github.mstore.controller.rest;

import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.mstore.cart.CartItem;
import io.github.mstore.cart.CartItemRepository;

@RestController
@RequestMapping("api/carts")
public class CartController {
  private CartItemRepository cartItemRepo;

  @Autowired
  public CartController(CartItemRepository cartItemRepo) {
    this.cartItemRepo = cartItemRepo;
  }

  @GetMapping("cart-id")
  public String getCartId() {
    return UUID.randomUUID().toString();
  }

  @GetMapping("{id}")
  public List<CartItem> details(@PathVariable("id") String cartId) {
    return this.cartItemRepo.findByCartId(cartId);
  }

  @Transactional
  @PostMapping("{id}")
  public List<CartItem> addToCart(@PathVariable("id") String cartId, @RequestBody @Valid CartItem cartItem) {
    List<CartItem> cartItems = details(cartId);
    boolean existed = false;

    for (CartItem item : cartItems) {
      if (item.getItemId().equals(cartItem.getItemId())) {
        existed = true;
        item.addMore(cartItem.getQuantity());
        this.cartItemRepo.saveAndFlush(item);
        break;
      }
    }

    if (!existed) {
      cartItems.add(this.cartItemRepo.saveAndFlush(cartItem));
    }

    return cartItems;
  }
}