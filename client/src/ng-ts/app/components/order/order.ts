import { Address } from './address';

export class Order {
  cartId: string;
  billingAddress: Address;
  shippingAddress: Address;
}