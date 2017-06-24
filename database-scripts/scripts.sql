CREATE TABLE users (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `full_name` TEXT NOT NULL,
    `email` TEXT NOT NULL,
    `address` TEXT NOT NULL,
    `password` TEXT NOT NULL,
    `admin` INT NOT NULL DEFAULT 0,
    `like` INT UNSIGNED DEFAULT 0
)  ENGINE=INNODB;

CREATE TABLE products (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` TEXT NOT NULL,
    `start_price` INT UNSIGNED NOT NULL,
    `step_price` INT UNSIGNED NOT NULL,
    `price` INT UNSIGNED NOT NULL,
    `start_time` DATETIME NOT NULL,
    `end_time` DATETIME NOT NULL,
    `seller_id` INT UNSIGNED NOT NULL
)  ENGINE=INNODB;

CREATE TABLE product_description (
    `product_id` INT UNSIGNED,
    `time` DATETIME DEFAULT NOW(),
    `detail` TEXT NOT NULL,
    PRIMARY KEY (`product_id` , `time`)
)  ENGINE=INNODB;

CREATE TABLE product_images (
    `product_id` INT UNSIGNED,
    `index` INT NOT NULL,
    `url` TEXT NOT NULL,
    `thumb_url` TEXT NOT NULL,
    PRIMARY KEY (`product_id` , `index`)
)  ENGINE=INNODB;

CREATE TABLE bids (
    `bidder_id` INT UNSIGNED,
    `product_id` INT UNSIGNED,
    `time` DATETIME DEFAULT NOW(),
    `bidded_price` INT UNSIGNED NOT NULL,
    `winner` BIT DEFAULT 0,
    PRIMARY KEY (`bidder_id` , `product_id`)
);

CREATE TABLE auto_bid (
    `bidder_id` INT UNSIGNED,
    `product_id` INT UNSIGNED,
    `max` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`bidder_id` , `product_id`)
);

CREATE TABLE rating (
    `rated_id` INT UNSIGNED,
    `rating_id` INT UNSIGNED,
    `product_id` INT UNSIGNED,
    `comment` TEXT,
    `point` INT,
    `flag` BIT,
    PRIMARY KEY (`rated_id` , `rating_id` , `product_id`)
)  ENGINE=INNODB;

CREATE TABLE following (
    `follower` INT UNSIGNED,
    `product_id` INT UNSIGNED,
    PRIMARY KEY (`follower` , `product_id`)
)  ENGINE=INNODB;

CREATE TABLE ban (
	`user_id` INT UNSIGNED,
    `product_id` INT UNSIGNED,
    PRIMARY KEY (`product_id` , `user_id`)
)  ENGINE=INNODB;



-- -----------------------
-- Foreign key
-- -----------------------
ALTER TABLE products
add constraint fk_products_users
foreign key (`seller_id`)
references users (`id`);

ALTER TABLE product_description
add constraint fk_description_products
foreign key (`product_id`)
references products (`id`);

alter table product_images
add constraint fk_images_products
foreign key (`product_id`)
references products (`id`);

alter table bids
add constraint fk_bids_users
foreign key (`bidder_id`)
references users (`id`);

alter table bids
add constraint fk_bids_products
foreign key (`product_id`)
references products (`id`);

-- rating table
alter table rating
add constraint fk_rating_users_rated
foreign key (`rated_id`)
references users (`id`);

alter table rating
add constraint fk_rating_users_rating
foreign key (`rating_id`)
references users (`id`);

alter table rating
add constraint fk_rating_products
foreign key (`product_id`)
references products (`id`);

-- following table foreign key
alter table following
add constraint fk_following_users
foreign key (`follower`)
references users (`id`);

alter table following
add constraint fk_following_products
foreign key (`product_id`)
references products (`id`);

-- ban table foreign key
alter table ban
add constraint fk_ban_users
foreign key (`user_id`)
references users (`id`);

alter table ban
add constraint fk_ban_products
foreign key (`product_id`)
references products (`id`);