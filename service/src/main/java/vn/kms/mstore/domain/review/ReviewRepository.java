package vn.kms.mstore.domain.review;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by trungnguyen on 6/22/15.
 */
public interface ReviewRepository extends JpaRepository<Review, String> {
    List<Review> findByProductId(String productId);

    List<Review> findByAuthor(String author);
}
