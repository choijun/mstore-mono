package vn.kms.mstore.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.kms.mstore.domain.review.Review;
import vn.kms.mstore.domain.review.ReviewRepository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

/**
 * Created by trungnguyen on 6/22/15.
 */
@RestController
@RequestMapping(value = "/reviews")
@Transactional(readOnly = true)
public class ReviewRest extends BaseRest {
    @Autowired
    private ReviewRepository reviewRepo;

    @RequestMapping(value = "/{productId}", method = PUT)
    @Transactional
    public Review createReview(@PathVariable String productId, @RequestBody Review review) {
        review.setId(UUID.randomUUID().toString());
        review.setProductId(productId);
        review.setAuthor(""); //TODO: get author for Authentication
        review.setReviewAt(new Date());

        review = reviewRepo.save(review);

        return review;
    }

    @RequestMapping(value = "/{productId}", method = GET)
    public List<Review> getReviewsByProductId(@PathVariable String productId) {
        return reviewRepo.findByProductId(productId);
    }

    @RequestMapping(value = "/filter", method = GET)
    public List<Review> getReviewsByAuthor(@RequestParam String author) {
        return reviewRepo.findByAuthor(author);
    }
}
