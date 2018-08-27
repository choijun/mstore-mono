package io.github.mstore.controller.rest;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.mstore.order.Order;

@RestController
@RequestMapping("api/orders")
public class OrderController {
  @PostMapping
  public Order placeOrder(@RequestBody @Valid Order order) {
    return order;
  }
}