import { Product } from "../product/product";
import { Item } from "../product/item";

export class CartItem {
  cartId: string;
  itemId: string;
  quantity: number;
  item: Item;
  product: Product;
}