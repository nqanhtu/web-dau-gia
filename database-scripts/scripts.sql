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
-- FOREIGN KEY
-- -----------------------
ALTER TABLE products
ADD CONSTRAINT fk_products_users
FOREIGN KEY (`seller_id`)
REFERENCES users (`id`);

ALTER TABLE product_description
ADD CONSTRAINT fk_description_products
FOREIGN KEY (`product_id`)
REFERENCES products (`id`);

ALTER TABLE product_images
ADD CONSTRAINT fk_images_products
FOREIGN KEY (`product_id`)
REFERENCES products (`id`);

ALTER TABLE bids
ADD CONSTRAINT fk_bids_users
FOREIGN KEY (`bidder_id`)
REFERENCES users (`id`);

ALTER TABLE bids
ADD CONSTRAINT fk_bids_products
FOREIGN KEY (`product_id`)
REFERENCES products (`id`);

-- rating table
ALTER TABLE rating
ADD CONSTRAINT fk_rating_users_rated
FOREIGN KEY (`rated_id`)
REFERENCES users (`id`);

ALTER TABLE rating
ADD CONSTRAINT fk_rating_users_rating
FOREIGN KEY (`rating_id`)
REFERENCES users (`id`);

ALTER TABLE rating
ADD CONSTRAINT fk_rating_products
FOREIGN KEY (`product_id`)
REFERENCES products (`id`);

-- following table FOREIGN KEY
ALTER TABLE following
ADD CONSTRAINT fk_following_users
FOREIGN KEY (`follower`)
REFERENCES users (`id`);

ALTER TABLE following
ADD CONSTRAINT fk_following_products
FOREIGN KEY (`product_id`)
REFERENCES products (`id`);

-- ban table FOREIGN KEY
ALTER TABLE ban
ADD CONSTRAINT fk_ban_users
FOREIGN KEY (`user_id`)
REFERENCES users (`id`);

ALTER TABLE ban
ADD CONSTRAINT fk_ban_products
FOREIGN KEY (`product_id`)
REFERENCES products (`id`);