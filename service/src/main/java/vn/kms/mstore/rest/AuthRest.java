package vn.kms.mstore.rest;

import lombok.extern.slf4j.Slf4j;
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
 * Created by trungnguyen on 6/23/15.
 */
@RestController
@RequestMapping(value = "/auth")
@Transactional(readOnly = true)
@Slf4j
public class AuthRest extends BaseRest {
    @Autowired
    private CustomerRepository userRepo;

    @RequestMapping(value = "/user", method = GET)
    public Customer getUser() {
        val userId = SecurityUtil.getLoginId();
        Customer user = userRepo.findOne(userId);
        if (user == null) {
            throw new DataNotFoundException("Customer " + userId + " is not found");
        }

        return user;
    }

}
