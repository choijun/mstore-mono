package vn.kms.mstore.rest;

import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.kms.mstore.domain.catalog.ItemRepository;
import vn.kms.mstore.domain.catalog.Product;
import vn.kms.mstore.domain.catalog.ProductRepository;
import vn.kms.mstore.domain.review.ReviewRepository;
import vn.kms.mstore.util.DataNotFoundException;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Created by trungnguyen on 6/17/15.
 */
@RestController
@RequestMapping(value = "/api/products")
@Transactional(readOnly = true)
public class ProductRest extends BaseRest {
    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private ItemRepository itemRepo;

    @Autowired
    private ReviewRepository reviewRepo;

    @RequestMapping(value = "/{id}", method = GET)
    public Product getProductById(@PathVariable String id) {
        val product = productRepo.findOne(id);
        if (product == null) {
            throw new DataNotFoundException("Product " + id + " is not found");
        }

        product.setItems(itemRepo.findByProductId(id));
        product.setReviews(reviewRepo.findByProductId(id));

        return product;
    }

    @RequestMapping(method = GET)
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    @RequestMapping(value = "/search", method = GET)
    public List<Product> searchProducts(@RequestParam String keyword) {
        return productRepo.searchProducts('%' + keyword + '%');
    }
}
