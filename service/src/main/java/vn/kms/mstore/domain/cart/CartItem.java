package vn.kms.mstore.domain.cart;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.validation.constraints.Min;
import java.io.Serializable;

/**
 * Created by trungnguyen on 6/18/15.
 */
@Entity
@IdClass(CartItem.PK.class)
@Data
public class CartItem implements Serializable {
    @Id
    private String cartId;

    @Id
    private String itemId;

    @Min(0)
    private int quantity;

    public void addQuantity(int quantity) {
        this.quantity += quantity;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PK implements Serializable {
        private String cartId;

        private String itemId;
    }
}
