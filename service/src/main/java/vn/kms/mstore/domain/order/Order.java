package vn.kms.mstore.domain.order;

import lombok.Data;
import vn.kms.mstore.domain.user.Address;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by trungnguyen on 6/17/15.
 */
@Entity(name = "orders")
@Data
public class Order implements Serializable {
    @Id
    private String id;

    private String accountId;

    private Date orderDate;

    private long subTotal;

    private double taxRate;

    private long shippingFee;

    private String shippingAddressId;

    private String billingAddressId;

    @Transient
    private Address shippingAddress;

    @Transient
    private Address billingAddress;

    @Transient
    private List<OrderItem> details = new ArrayList<>();

    public long getTaxFee() {
        return (long) (taxRate * subTotal);
    }

    public long getTotal() {
        return subTotal + getTaxFee() + shippingFee;
    }
}
