package vn.kms.mstore.rest;

import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.kms.mstore.domain.customer.Customer;
import vn.kms.mstore.domain.customer.CustomerRepository;
import vn.kms.mstore.util.DataNotFoundException;
import vn.kms.mstore.util.SecurityUtil;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Created by trungnguyen on 6/17/15.
 */
@RestController
@RequestMapping(value = "/customers")
@Transactional(readOnly = true)
public class CustomerRest extends BaseRest {
    @Autowired
    private CustomerRepository customerRepo;

    @RequestMapping(method = GET)
    public Customer getCustomer() {
        val customerId = SecurityUtil.getLoginId();
        Customer customer = customerRepo.findOne(customerId);
        if (customer == null) {
            throw new DataNotFoundException("Customer " + customerId + " is not found");
        }

        return customer;
    }
}
