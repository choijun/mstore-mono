package vn.kms.mstore.domain.cart;

import lombok.Data;
import lombok.val;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by trungnguyen on 6/20/15.
 */
@Entity
@Data
public class Cart implements Serializable {
    @Id
    private String id;

    private String owner;

    private Date createdAt;

    @Transient
    private List<DetailCartItem> details = new ArrayList<>();

    public void addDetailCartItem(DetailCartItem cartItem) {
        val itemId = cartItem.getItemId();
        val existingItem = details.stream().filter(i -> i.getItemId().equals(itemId)).findFirst();

        if (!existingItem.isPresent()) {
            details.add(cartItem);
        } else {
            cartItem = existingItem.get();
            cartItem.addQuantity(cartItem.getQuantity());
        }

        if (cartItem.getQuantity() > cartItem.getQuantityInStock()) {
            cartItem.setQuantity(cartItem.getQuantityInStock());
        }
    }

    public long getTotalPrice() {
        return details.stream().mapToLong(DetailCartItem::getPrice).sum();
    }
}
