package vn.kms.mstore.domain.customer;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by trungnguyen on 6/17/15.
 */
public interface CustomerRepository extends JpaRepository<Customer, String> {

    Customer findByIdOrEmail(String id, String email);
}
