import { Item } from './item';

export class Product {
  id: number;
  name: string;
  description: string;
  items: Item[];
  activeItem: Item | any;
  quantity: number;
}