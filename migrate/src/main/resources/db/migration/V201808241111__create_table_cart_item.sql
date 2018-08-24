create table cart_item (
  cart_id varchar(64) not null,
  item_id varchar(64) not null,
  quantity int,
  primary key (cart_id, item_id)
);