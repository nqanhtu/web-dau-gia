SET FOREIGN_KEY_CHECKS=1;

-- ----------------------------------------
-- Table structure for `clients`
-- DROP TABLE IF EXISTS clients;
-- ----------------------------------------
CREATE TABLE clients
(
	ID			INT UNSIGNED NOT NULL AUTO_INCREMENT,
				CONSTRAINT PK_CLIENTS PRIMARY KEY (ID),
	FullName	VARCHAR(100) COLLATE UTF8_UNICODE_CI NOT NULL,
	Address		VARCHAR(200) COLLATE UTF8_UNICODE_CI NOT NULL,
	Email		VARCHAR(70) UNIQUE NOT NULL,
	`Password`	CHAR(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COLLATE=UTF8_UNICODE_CI;

TRUNCATE TABLE `clients`;

-- ----------------------------------------
-- Table structure for `categories`
-- + ID
-- + CategoryName
-- DROP TABLE IF EXISTS categories;
-- ----------------------------------------
CREATE TABLE categories
(
	ID				INT UNSIGNED NOT NULL AUTO_INCREMENT,
					CONSTRAINT PK_CATEGORIES PRIMARY KEY (ID),
	CategoryName	VARCHAR(100) COLLATE UTF8_UNICODE_CI NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COLLATE=UTF8_UNICODE_CI;

-- ----------------------------------------
-- Records of categories
-- TRUNCATE TABLE categories;
-- ----------------------------------------
INSERT INTO categories(CategoryName) VALUES
	('Công nghệ'),
	('Thời trang'),
	('Gia dụng'),
	('Khác');
    
-- ----------------------------------------
-- Table structure for products
-- + Name
-- + StartPrice
-- + StepPrice
-- + StartTime: 'YYYY-MM-DD'
-- + FinishTime = StartTime + 3
-- + Description
-- + Type
-- DROP TABLE IF EXISTS products;
-- ----------------------------------------
CREATE TABLE products
(
	ID			INT UNSIGNED NOT NULL AUTO_INCREMENT,
							CONSTRAINT PK_PRODUCTS PRIMARY KEY (ID),
	`Name`		VARCHAR(100) NOT NULL COLLATE UTF8_UNICODE_CI,
	StartPrice	INT UNSIGNED NOT NULL DEFAULT 0,
	StepPrice	INT UNSIGNED NOT NULL DEFAULT 1,
	StartTime	DATETIME NOT NULL,
	FinishTime	DATETIME NOT NULL,
	Description	TEXT COLLATE UTF8_UNICODE_CI,
	`Type`		INT UNSIGNED,
				CONSTRAINT FK_PRODUCTS_CATEGORIES FOREIGN KEY (Type) REFERENCES categories(ID),
	Seller		INT UNSIGNED NOT NULL,
				CONSTRAINT FK_PRODUCTS_CLIENTS FOREIGN KEY (Seller) REFERENCES clients(ID)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COLLATE=UTF8_UNICODE_CI;

-- ----------------------------------------
-- Records of products
-- TRUNCATE TABLE products;
-- ----------------------------------------
INSERT INTO products(`Name`, StartPrice, StepPrice, StartTime, FinishTime, `Type`, Seller) VALUES
('Case iPad Air 1', 100000, 10000, '2017-06-21 12:00:00', '2017-06-23 12:00:00', 1, 1);

-- ----------------------------------------
-- Table structure for images
-- Product_ID
-- Index
-- Url
-- DROP TABLE IF EXISTS images;
-- ----------------------------------------

CREATE TABLE images
(
	ProductID		INT UNSIGNED NOT NULL,
					CONSTRAINT FK_IMAGES_PRODUCTS FOREIGN KEY (ProductID) REFERENCES products(ID),
	`Index`			INT UNSIGNED NOT NULL,
					CONSTRAINT PK_IMAGES PRIMARY KEY (ProductID, `Index`),
	ThumbnailUrl	VARCHAR(2083) NOT NULL,
	ImageUrl		VARCHAR(2083) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COLLATE=UTF8_UNICODE_CI;

-- ----------------------------------------
-- Records of images
-- TRUNCATE TABLE images;
-- ----------------------------------------
INSERT INTO images VALUES
	(1, 1, 'http://sv1.upsieutoc.com/2017/06/21/14-085538y0HAHmag504D.th.jpg', 'http://sv1.upsieutoc.com/2017/06/21/14-085538y0HAHmag504D.jpg'),
	(1, 2, 'http://sv1.upsieutoc.com/2017/06/21/14-085540pEnQMOWLqxHn.th.jpg', 'http://sv1.upsieutoc.com/2017/06/21/14-085540pEnQMOWLqxHn.jpg'),
	(1, 3, 'http://sv1.upsieutoc.com/2017/06/21/22-120156igNOdpWtQOU7.th.jpg', 'http://sv1.upsieutoc.com/2017/06/21/22-120156igNOdpWtQOU7.jpg');
    
-- ----------------------------------------
-- Table structure for bids
-- ProductID
-- Bidder
-- Price
-- DROP TABLE IF EXISTS bids;
-- ----------------------------------------
CREATE TABLE bids
(
	ProductID	INT UNSIGNED NOT NULL,
				CONSTRAINT FK_BIDS_PRODUCTS FOREIGN KEY (ProductID) REFERENCES products(ID),
	Bidder		INT UNSIGNED NOT NULL,
				CONSTRAINT FK_BIDS_CLIENTS FOREIGN KEY (Bidder) REFERENCES clients(ID),
	BidPrice	INT UNSIGNED NOT NULL,
				CONSTRAINT PK_BIDS PRIMARY KEY (ProductID, Bidder, BidPrice),
	BidTime		DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COLLATE=UTF8_UNICODE_CI;

-- ----------------------------------------
-- Records of bids
-- TRUNCATE TABLE bids;
-- ----------------------------------------
INSERT INTO bids VALUES
	(1, 8, 110000, NOW()),
	(1, 15, 120000, NOW());