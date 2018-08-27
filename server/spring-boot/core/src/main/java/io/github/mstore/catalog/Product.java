package io.github.mstore.catalog;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;

import java.util.Collections;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Product {
  @Id private String id;
  private String name;
  private String description;
  @Transient List<Item> items = Collections.emptyList();
}