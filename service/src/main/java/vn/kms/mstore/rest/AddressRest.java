package vn.kms.mstore.rest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.kms.mstore.domain.customer.Address;
import vn.kms.mstore.domain.customer.AddressRepository;
import vn.kms.mstore.util.DataNotFoundException;
import vn.kms.mstore.util.SecurityUtil;

import java.util.UUID;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

/**
 * Created by trungnguyen on 7/2/15.
 */
@RestController
@RequestMapping(value = "/addresses")
@Transactional(readOnly = true)
@Slf4j
public class AddressRest extends BaseRest {
    @Autowired
    private AddressRepository addressRepo;

    @RequestMapping(method = PUT)
    @Transactional
    public Address addAddress(@RequestBody Address address) {
        String owner = SecurityUtil.getLoginId();

        address.setId(UUID.randomUUID().toString());
        address.setOwner(owner);

        addressRepo.save(address);

        return address;
    }

    @RequestMapping(value = "/{id}", method = GET)
    public Address getAddressById(@PathVariable String id) {
        String owner = SecurityUtil.getLoginId();

        Address address = addressRepo.findOne(new Address.PK(owner, id));
        if (address == null) {
            throw new DataNotFoundException("Address " + id + " of " + owner + " is not found");
        }

        return address;
    }
}
