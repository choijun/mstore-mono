package vn.kms.mstore.domain.cart;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.beans.BeanUtils;

/**
 * Created by trungnguyen on 6/22/15.
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class DetailCartItem extends CartItem {
    private long price;
    private int quantityInStock;

    public DetailCartItem(CartItem item) {
        BeanUtils.copyProperties(item, this);
    }
}
