package io.github.mstore.catalog;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Item {
  @Id private String id;
  private String name;
  private String productId;
  private int price;
  private int quantity;
}