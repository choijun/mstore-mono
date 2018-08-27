package io.github.mstore.cart;

import java.util.Collections;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
  private String id;
  private List<CartItem> items = Collections.emptyList();

  public long getTotal() {
    return items.stream().mapToLong(cartItem -> {
      return cartItem.getItem() == null ? 0 : cartItem.getQuantity() * cartItem.getItem().getPrice();
    }).sum();
  }
}