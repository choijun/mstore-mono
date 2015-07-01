package vn.kms.mstore.domain.cart;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by trungnguyen on 6/20/15.
 */
public interface CartRepository extends JpaRepository<Cart, String> {
    Cart findByOwner(String owner);
}
