package vn.kms.mstore.domain.catalog;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by trungnguyen on 6/17/15.
 */
public interface ItemRepository extends JpaRepository<Item, String> {
    List<Item> findByProductId(String productId);
}
