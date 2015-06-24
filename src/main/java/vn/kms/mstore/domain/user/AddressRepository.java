package vn.kms.mstore.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by trungnguyen on 6/17/15.
 */
public interface AddressRepository extends JpaRepository<Address, Address.PK> {
}
