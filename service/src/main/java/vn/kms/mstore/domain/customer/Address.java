package vn.kms.mstore.domain.customer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.io.Serializable;

/**
 * Created by trungnguyen on 6/17/15.
 */
@Entity
@IdClass(Address.PK.class)
@Data
public class Address implements Serializable {
    @Id
    private String owner;

    @Id
    private String id;

    private String fullName;

    private String address1;

    private String address2;

    private String city;

    private String state;

    private String zip;

    private String country;

    private String phoneNumber;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PK implements Serializable {
        private String owner;

        private String id;
    }
}
