package io.github.mstore.cart;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Transient;

import io.github.mstore.catalog.Item;
import io.github.mstore.catalog.Product;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@IdClass(CartItem.PK.class)
@Entity
@Getter
@Setter
public class CartItem {
  @Id private String cartId;
  @Id private String itemId;
  private int quantity;
  @Transient Item item;

  public void addMore(int quantity) {
    this.quantity += quantity;
  }

  @Getter
  @Setter
  @EqualsAndHashCode
  public static class PK implements Serializable {
    private static final long serialVersionUID = 8338040665178195804L;
    private String cartId;
    private String itemId;
  }
}