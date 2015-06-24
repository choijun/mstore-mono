package vn.kms.mstore.rest;

import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.kms.mstore.domain.catalog.Item;
import vn.kms.mstore.domain.catalog.ItemRepository;
import vn.kms.mstore.util.DataNotFoundException;
import vn.kms.mstore.util.MstoreException;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Created by trungnguyen on 6/17/15.
 */
@RestController
@RequestMapping(value = "/api/items")
@Transactional(readOnly = true)
public class ItemRest extends BaseRest {
    @Autowired
    private ItemRepository itemRepo;

    @RequestMapping(value = "/{itemId}", method = GET)
    public Item getItemById(@PathVariable String itemId) {
        val item = itemRepo.findOne(itemId);
        if (item == null) {
            throw new DataNotFoundException("Item " + itemId + " is not found");
        }

        return item;
    }

    @RequestMapping(value = "/{itemId}/add-quantity", method = POST)
    @Transactional
    public int addQuantity(@PathVariable String itemId, @RequestBody int quantity) {
        val item = itemRepo.findOne(itemId);
        if (item == null) {
            throw new DataNotFoundException("Item " + itemId + " is not found");
        }

        if (item.getQuantity() + quantity < 0) {
            throw new MstoreException("Out of the stock");
        }

        item.addQuantity(quantity);
        itemRepo.save(item);

        return item.getQuantity();
    }
}
