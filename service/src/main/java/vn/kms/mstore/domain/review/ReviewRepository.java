package vn.kms.mstore.domain.review;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by trungnguyen on 6/22/15.
 */
public interface ReviewRepository extends JpaRepository<Review, String> {
    List<Review> findByProductId(String productId);

    @Query("select productId, avg(rating), count(id) from Review group by productId")
    Object[] getAvgRatingAndTotalReviewsByProductId();

    List<Review> findByAuthor(String author);
}
