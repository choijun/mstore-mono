package vn.kms.mstore.domain.order;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by trungnguyen on 6/18/15.
 */
public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findByCustomerId(String customerId);
}
