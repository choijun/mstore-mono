package vn.kms.mstore.domain.review;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by trungnguyen on 6/22/15.
 */
@Entity
@Data
public class Review implements Serializable {
    @Id
    private String id;

    private String author;

    private String productId;

    @Min(1) @Max(5)
    private int rating;

    private boolean recommended;

    private String headline;

    @Column(length = 4096)
    private String content;

    private Date reviewAt;

}
