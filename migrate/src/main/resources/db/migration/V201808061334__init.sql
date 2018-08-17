create table product (
  id varchar(64) not null,
  name varchar(128) not null,
  description varchar(65535),
  primary key (id)
);

create table item (
  id varchar(64) not null,
  name varchar(128) not null,
  product_id varchar(64) ,
  primary key (id),
  constraint item_product_id_fkey foreign key (product_id)
      references product(id) match simple
      on update no action
      on delete no action
);