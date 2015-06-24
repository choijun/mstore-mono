package vn.kms.mstore.domain.cart;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by trungnguyen on 6/18/15.
 */
public interface CartItemRepository extends JpaRepository<CartItem, CartItem.PK> {
    List<CartItem> findByCartId(String cartId);

    int deleteByCartId(String cartId);
}
