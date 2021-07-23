/* Made this file so I can remember how I made tables and used sql code.*/

create table cups.items (
	itemId bigserial primary key,
	itemName text unique not null,
	price integer not null
);

create table cups.orders (
	orderId bigserial primary key,
	orderNumber integer not null,
	itemId integer references cups.items(itemId) 
);

create table cups.transactions (
	userId bigserial primary key,
	transactionAmount integer not null,
	orderNumber integer references cups.orders(orderId)
);