package io.github.mstore.profile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Address {
  private String address1;
  private String address2;
  private String city;
  private String state;
  private String country;
  private String zipCode;
  private String phone;
  private String email;
}