package vn.kms.mstore.domain.user;

import lombok.Data;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * Created by trungnguyen on 6/17/15.
 */
@Entity(name = "users")
@Data
public class User implements Serializable {
    @Id
    @NotBlank
    private String id;

    @NotBlank
    @Email
    private String email;

    private String firstName;

    private String lastName;

    private String addressId;
}
