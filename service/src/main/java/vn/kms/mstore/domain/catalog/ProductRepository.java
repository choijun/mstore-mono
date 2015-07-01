package vn.kms.mstore.domain.catalog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by trungnguyen on 6/17/15.
 */
public interface ProductRepository extends JpaRepository<Product, String> {
    @Query("from Product where id like :keyword or name like :keyword or description like :keyword")
    List<Product> searchProducts(@Param("keyword") String keyword);
}
