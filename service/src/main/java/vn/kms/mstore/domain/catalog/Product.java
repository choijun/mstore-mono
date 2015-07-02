package vn.kms.mstore.domain.catalog;

import lombok.Data;
import vn.kms.mstore.domain.review.Review;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by trungnguyen on 6/17/15.
 */
@Entity
@Data
public class Product implements Serializable {
    @Id
    private String id;

    private String name;

    @Column(length = 4096)
    private String description;

    @Transient
    private double avgRating;

    @Transient
    private long totalReviews;

    @Transient
    private List<Item> items = new ArrayList<>();

    @Transient
    private List<Review> reviews = new ArrayList<>();
}
