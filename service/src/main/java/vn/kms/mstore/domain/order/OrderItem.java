package vn.kms.mstore.domain.order;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.io.Serializable;

/**
 * Created by trungnguyen on 6/17/15.
 */
@Entity
@IdClass(OrderItem.PK.class)
@Data
public class OrderItem implements Serializable {
    @Id
    private int lineNumber;

    @Id
    private String orderId;

    private String itemId;

    private int quantity;

    private long unitPrice;

    @Data
    public static class PK implements Serializable {
        private int lineNumber;

        private String orderId;
    }
}
