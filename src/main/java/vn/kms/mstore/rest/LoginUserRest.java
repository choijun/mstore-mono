package vn.kms.mstore.rest;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.kms.mstore.domain.review.Review;
import vn.kms.mstore.domain.user.Address;
import vn.kms.mstore.domain.user.AddressRepository;
import vn.kms.mstore.domain.user.User;
import vn.kms.mstore.domain.user.UserRepository;
import vn.kms.mstore.util.DataNotFoundException;
import vn.kms.mstore.util.SecurityUtil;

import java.util.List;
import java.util.UUID;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

/**
 * Created by trungnguyen on 6/23/15.
 */
@RestController
@RequestMapping(value = "/api/login-user")
@Transactional(readOnly = true)
@Slf4j
public class LoginUserRest extends BaseRest {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private AddressRepository addressRepo;

    @Autowired
    private ReviewRest reviewRest;

    @RequestMapping(method = GET)
    public User getUser() {
        val userId = SecurityUtil.getLoginId();
        val user = userRepo.findOne(userId);
        if (user == null) {
            throw new DataNotFoundException("User " + userId + " is not found");
        }

        return user;
    }

    @RequestMapping(value = "/addresses", method = PUT)
    @Transactional
    public Address addAddress(@RequestBody Address address) {
        String owner = SecurityUtil.getLoginId();

        address.setId(UUID.randomUUID().toString());
        address.setOwner(owner);

        addressRepo.save(address);

        return address;
    }

    @RequestMapping(value = "/addresses/{id}", method = GET)
    public Address getAddressById(@PathVariable String id) {
        String owner = SecurityUtil.getLoginId();

        val address = addressRepo.findOne(new Address.PK(owner, id));
        if (address == null) {
            throw new DataNotFoundException("Address " + id + " of " + owner + " is not found");
        }

        return address;
    }

    @RequestMapping(value = "/reviews", method = GET)
    public List<Review> getReviews() {
        val userId = SecurityUtil.getLoginId();

        return reviewRest.getReviewsByAuthor(userId);
    }
}
