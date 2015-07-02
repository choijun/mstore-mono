package vn.kms.mstore.rest;

import lombok.Data;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.kms.mstore.domain.customer.Customer;
import vn.kms.mstore.domain.customer.CustomerRepository;
import vn.kms.mstore.util.DataNotFoundException;
import vn.kms.mstore.util.SecurityUtil;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Created by trungnguyen on 6/23/15.
 */
@RestController
@Transactional(readOnly = true)
@Slf4j
public class AuthRest extends BaseRest {
    @Autowired
    private CustomerRepository userRepo;

    @RequestMapping(value = "/auth/user", method = GET)
    public User getUser() {
        val userId = SecurityUtil.getLoginId();
        Customer customer = userRepo.findOne(userId);
        if (customer == null) {
            return null;
        }

        return new User(customer);
    }

    // Mock login
    @RequestMapping(value = "/login", method = GET)
    public void login(@RequestParam(required = false) String username) {
        if (username == null) {
            username = "trungnguyen";
        }

        if (!userRepo.exists(username)) {
            throw new DataNotFoundException("Customer " + username + " is not found");
        }

        SecurityUtil.setLoginId(username);
    }

    // Mock logout
    @RequestMapping(value = "/logout", method = POST)
    public void logout() {
        SecurityUtil.setLoginId(null);
    }

    @Data
    public static class User {
        private String username;
        private String email;
        private String firstName;
        private String lastName;
        private List<String> roles;

        User (Customer customer) {
            BeanUtils.copyProperties(customer, this);
            username = customer.getId();
            roles = Arrays.asList((username.equals("trungnguyen"))? "ROLE_ADMIN" : "ROLE_USER");
        }
    }
}
