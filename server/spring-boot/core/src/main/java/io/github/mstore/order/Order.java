package io.github.mstore.order;

import io.github.mstore.profile.Address;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Order {
  private String cartId;
  private Address billingAddress;
  private Address shippingAddress;
}