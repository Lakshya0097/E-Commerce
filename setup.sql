-- MySQL Database Initialization Script for Shoplane E-commerce

-- 1. Create Database
CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

-- 2. Create User Table
CREATE TABLE IF NOT EXISTS user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- 3. Create Product Table
CREATE TABLE IF NOT EXISTS product (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DOUBLE NOT NULL,
    image_url VARCHAR(2083),
    category VARCHAR(255)
);

-- 4. Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    total_amount DOUBLE NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    order_date DATETIME NOT NULL,
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE SET NULL
);

-- 5. Create OrderItem Table
CREATE TABLE IF NOT EXISTS order_item (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT,
    quantity INT NOT NULL,
    CONSTRAINT fk_order_item_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_item_product FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE SET NULL
);

-- 6. Seed Initial Products (15 products per category / row, 45 total)
TRUNCATE TABLE order_item;
DELETE FROM product;

INSERT INTO product (id, name, description, price, category, image_url) VALUES
-- Trending Products
(1, 'Puma Retro Sneakers', 'Premium cushioning and retro sporty vibes for urban lifestyle.', 2999.00, 'Trending', 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80'),
(2, 'Exclusive Footwear Runners', 'Superlight performance runners with ultra-responsive grip.', 3499.00, 'Trending', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'),
(3, 'Premium Leather Backpack', 'Classic brown leather backpack with multiple utility pockets.', 4299.00, 'Trending', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80'),
(10, 'Classic Wayfarer Sunglasses', 'Timeless design with polarized lenses and UV400 protection.', 1299.00, 'Trending', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80'),
(11, 'Vocal Dynamic Microphone', 'Professional grade microphone for studio recording and live vocals.', 4999.00, 'Trending', 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80'),
(12, 'Smart Water Bottle', 'Insulated stainless steel bottle with digital temperature display.', 1499.00, 'Trending', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80'),
(13, 'Minimalist Slim Wallet', 'RFID blocking leather wallet with quick-access card slots.', 999.00, 'Trending', 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=600&q=80'),
(14, 'Wireless Bluetooth Speaker', 'Compact waterproof speaker with rich bass and 12-hour playtime.', 2499.00, 'Trending', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80'),
(15, 'Retro Mechanical Keyboard', 'Tactile clicky keys with retro aesthetics and warm yellow backlight.', 3999.00, 'Trending', 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80'),
(16, 'Ergonomic Office Chair', 'High-back mesh chair with adjustable lumbar support and armrests.', 8999.00, 'Trending', 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=600&q=80'),
(17, 'Scented Candle Set', 'Set of 3 soy wax candles with lavender, vanilla, and eucalyptus scents.', 799.00, 'Trending', 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80'),
(18, 'Premium Coffee Grinder', 'Conical burr grinder with 15 precise grind size settings.', 3299.00, 'Trending', 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=600&q=80'),
(19, 'Urban Travel Duffel Bag', 'Water-resistant duffel with a dedicated shoe compartment.', 1899.00, 'Trending', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80'),
(20, 'Polaroid Instant Camera', 'Point-and-shoot camera for vintage-style physical prints.', 6499.00, 'Trending', 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80'),
(21, 'Stainless Steel Travel Mug', 'Double-wall vacuum insulated mug that keeps coffee hot for 6 hours.', 1199.00, 'Trending', 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=600&q=80'),

-- Clothing Collection
(4, 'Classic Cotton Denim Jacket', 'Durable and breathable pure denim cotton jacket.', 1799.00, 'Clothing', 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80'),
(5, 'Puma Flat 30% Activewear Tee', 'Sweat-wicking training t-shirt for daily activities.', 799.00, 'Clothing', 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80'),
(6, 'Slim Fit Chino Trousers', 'Modern stretch-fit beige chino pants for smart-casual wear.', 2199.00, 'Clothing', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80'),
(22, 'Casual Plaid Button-Down Shirt', '100% flannel cotton checkered shirt, pre-shrunk and soft.', 1499.00, 'Clothing', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80'),
(23, 'Cozy Knit Pullover Sweater', 'Classic crewneck cable knit sweater for chilly winter days.', 1999.00, 'Clothing', 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80'),
(24, 'Premium Leather Jacket', 'High-quality black biker leather jacket with asymmetric zip.', 4999.00, 'Clothing', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80'),
(25, 'Sporty Hooded Windbreaker', 'Lightweight water-repellent jacket for outdoor jogs.', 1599.00, 'Clothing', 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80'),
(26, 'Relaxed Fit Cargo Pants', 'Multi-pocket military-style green cotton cargo pants.', 1899.00, 'Clothing', 'https://images.unsplash.com/photo-1517423738875-5ce310acd3da?auto=format&fit=crop&w=600&q=80'),
(27, 'Classic Polo Shirt', 'Breathable pique knit polo shirt with signature collar.', 899.00, 'Clothing', 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=600&q=80'),
(28, 'Summer Floral Dress', 'Lightweight and flowy floral printed dress with tie waist.', 2499.00, 'Clothing', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80'),
(29, 'Unisex Oversized Hoodie', 'Ultra-soft fleece hoodie with kangaroo pocket and ribbed cuffs.', 1699.00, 'Clothing', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80'),
(30, 'Athletic Joggers', 'Tapered running sweatpants with elastic waist and drawcord.', 1199.00, 'Clothing', 'https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=600&q=80'),
(31, 'Formal Tailored Blazer', 'Modern slim-fit navy blue suit blazer for business meetings.', 3499.00, 'Clothing', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80'),
(32, 'Striped Summer Shorts', 'Comfortable linen-blend shorts for casual beach days.', 999.00, 'Clothing', 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80'),
(33, 'Organic Cotton Socks Pack', 'Pack of 5 pairs of breathable, cushioned crew socks.', 499.00, 'Clothing', 'https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=600&q=80'),

-- Electronics & Gadgets
(7, 'Smart Fitness Band Series 6', 'Track steps, sleep, heart rate, and smartphone notifications.', 1999.00, 'Electronics', 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=80'),
(8, 'Luxury Quartz Watch', 'Premium analog gold and metal design suitable for formal events.', 5999.00, 'Electronics', 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80'),
(9, 'Wireless Active Headphones', 'Noise-cancelling over-ear headphones with deep bass response.', 7499.00, 'Electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'),
(34, 'Ultra-Thin Premium Laptop', '14-inch IPS display, 16GB RAM, 512GB SSD, lightning fast.', 45999.00, 'Electronics', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80'),
(35, 'Flagship 5G Smartphone', '120Hz AMOLED display, pro-grade triple camera, 5000mAh battery.', 29999.00, 'Electronics', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'),
(36, 'Noise-Cancelling Earbuds', 'True wireless earbuds with smart touch controls and charging case.', 3499.00, 'Electronics', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80'),
(37, '4K Ultra HD Action Camera', 'Waterproof sports camera with 6-axis stabilization and wide lens.', 8499.00, 'Electronics', 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=600&q=80'),
(38, 'Ergonomic Wireless Mouse', 'Precision tracking, silent click buttons, and comfortable grip.', 1299.00, 'Electronics', 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80'),
(39, 'Portable Power Bank 20K', '20000mAh capacity with dual USB ports and 18W fast charging.', 1799.00, 'Electronics', 'https://images.unsplash.com/photo-1548092372-0d1bd40894a3?auto=format&fit=crop&w=600&q=80'),
(40, 'Smart Home Assistant Speaker', 'Voice controlled smart speaker with immersive 360-degree sound.', 2999.00, 'Electronics', 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=600&q=80'),
(41, 'HD Drawing Tablet', 'Graphic tablet with battery-free stylus and 8192 pressure levels.', 4999.00, 'Electronics', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80'),
(42, 'VR Gaming Headset', 'Standalone virtual reality headset with 3D cinematic sound.', 19999.00, 'Electronics', 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&q=80'),
(43, 'Electric Smart Toothbrush', 'Rechargeable toothbrush with 5 cleaning modes and smart timer.', 2199.00, 'Electronics', 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80'),
(44, 'Mechanical Gaming Keyboard RGB', 'Customizable RGB backlit keyboard with blue tactile mechanical switches.', 2799.00, 'Electronics', 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80'),
(45, 'Dual Wireless Charger Stand', 'Fast Qi charger stand for phone and smartwatch simultaneously.', 1499.00, 'Electronics', 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=600&q=80');