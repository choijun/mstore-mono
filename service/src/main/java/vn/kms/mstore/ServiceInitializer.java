package vn.kms.mstore;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import vn.kms.mstore.domain.cart.Cart;
import vn.kms.mstore.domain.cart.CartItem;
import vn.kms.mstore.domain.cart.CartItemRepository;
import vn.kms.mstore.domain.cart.CartRepository;
import vn.kms.mstore.domain.catalog.Item;
import vn.kms.mstore.domain.catalog.ItemRepository;
import vn.kms.mstore.domain.catalog.Product;
import vn.kms.mstore.domain.catalog.ProductRepository;
import vn.kms.mstore.domain.customer.Customer;
import vn.kms.mstore.domain.review.Review;
import vn.kms.mstore.domain.review.ReviewRepository;
import vn.kms.mstore.domain.customer.Address;
import vn.kms.mstore.domain.customer.AddressRepository;
import vn.kms.mstore.domain.customer.CustomerRepository;

import javax.annotation.PostConstruct;
import java.util.List;

/**
 * Created by trungnguyen on 6/24/15.
 */
@Component
public class ServiceInitializer {
    @Autowired
    private AddressRepository addressRepo;

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private CartItemRepository cartItemRepo;

    @Autowired
    private ItemRepository itemRepo;

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private ReviewRepository reviewRepo;

    @Autowired
    private CustomerRepository customerRepo;

    @PostConstruct
    @Transactional
    public void loadDefaultData() throws Exception {
        if (productRepo.count() > 0) {
            return;
        }

        initData("/db/init-address-data.json", Address.class, addressRepo);
        initData("/db/init-cart-data.json", Cart.class, cartRepo);
        initData("/db/init-cart-item-data.json", CartItem.class, cartItemRepo);
        initData("/db/init-customer-data.json", Customer.class, customerRepo);
        initData("/db/init-item-data.json", Item.class, itemRepo);
        initData("/db/init-product-data.json", Product.class, productRepo);
        initData("/db/init-review-data.json", Review.class, reviewRepo);
    }

    private <T> void initData(String dataFilePath, Class<T> entityType, CrudRepository<T, ?> repository) throws Exception {
        val mapper = new ObjectMapper();
        val type = mapper.getTypeFactory().constructCollectionType(List.class, entityType);
        List<T> data = mapper.readValue(getClass().getResource(dataFilePath), type);
        repository.save(data);
    }
}
