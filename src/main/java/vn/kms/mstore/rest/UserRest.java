package vn.kms.mstore.rest;

import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import vn.kms.mstore.domain.user.User;
import vn.kms.mstore.domain.user.UserRepository;
import vn.kms.mstore.util.DataInvalidException;

import javax.validation.Valid;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

/**
 * Created by trungnguyen on 6/17/15.
 */
@RestController
@RequestMapping(value = "/api/users")
@Transactional(readOnly = true)
public class UserRest extends BaseRest {
    @Autowired
    private UserRepository userRepo;

    @RequestMapping(method = PUT)
    @ResponseStatus(value = CREATED)
    @Transactional
    public User createUser(@RequestBody @Valid User user) {
        val existingUser = userRepo.findByIdOrEmail(user.getId(), user.getEmail());
        if (existingUser != null) {
            String id = user.getId();
            String key = existingUser.getId().equals(id)? id : user.getEmail();
            throw new DataInvalidException(key + " is already existing");
        }

        user = userRepo.save(user);

        return user;
    }
}
