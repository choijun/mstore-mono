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

import io.github.mstore.cart.Cart;
import io.github.mstore.cart.CartItem;
import io.github.mstore.cart.CartItemRepository;
import io.github.mstore.catalog.Item;
import io.github.mstore.catalog.ItemRepository;
import io.github.mstore.catalog.ProductRepository;

@RestController
@RequestMapping("api/carts")
public class CartController {
  private CartItemRepository cartItemRepo;
  private ItemRepository itemRepo;
  private ProductRepository productRepo;

  @Autowired
  public CartController(CartItemRepository cartItemRepo, ItemRepository itemRepo, ProductRepository productRepo) {
    this.cartItemRepo = cartItemRepo;
    this.itemRepo = itemRepo;
    this.productRepo = productRepo;
  }

  @GetMapping("cart-id")
  public String getCartId() {
    return UUID.randomUUID().toString();
  }

  @GetMapping("{id}")
  public Cart getCart(@PathVariable("id") String cartId) {
    List<CartItem> items = this.cartItemRepo.findByCartId(cartId);
    items.forEach(cartItem -> {
      if (cartItem.getItemId() != null) {
        Item item = itemRepo.findById(cartItem.getItemId()).get();
        if (item.getProductId() != null) {
          item.setProduct(productRepo.findById(item.getProductId()).get());
        }
        cartItem.setItem(item);
      }
    });
    return new Cart(cartId, items);
  }

  @Transactional
  @PostMapping("{id}")
  public Cart addToCart(@PathVariable("id") String cartId, @RequestBody @Valid CartItem cartItem) {
    Cart cart = getCart(cartId);
    boolean existed = false;

    for (CartItem item : cart.getItems()) {
      if (item.getItemId().equals(cartItem.getItemId())) {
        existed = true;
        item.addMore(cartItem.getQuantity());
        this.cartItemRepo.saveAndFlush(item);
        break;
      }
    }

    if (!existed) {
      cart.getItems().add(this.cartItemRepo.saveAndFlush(cartItem));
    }

    return cart;
  }
}