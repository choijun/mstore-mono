package vn.kms.mstore.domain.catalog;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * Created by trungnguyen on 6/17/15.
 */
@Entity
@Data
public class Item implements Serializable {
    @Id
    private String id;

    private String name;

    private String productId;

    private long price;

    private int quantity;

    public void addQuantity(int quantity) {
        this.quantity += quantity;
    }
}
