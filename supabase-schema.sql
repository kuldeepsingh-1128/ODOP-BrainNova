-- ODOP Marketplace Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('buyer', 'seller')),
  district TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  district TEXT NOT NULL,
  state TEXT NOT NULL,
  image TEXT NOT NULL,
  seller_id UUID REFERENCES users(id) ON DELETE CASCADE,
  seller_name TEXT NOT NULL,
  seller_rating DECIMAL(2, 1) DEFAULT 0.0,
  description TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('approved', 'pending', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  items JSONB NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  shipping_address JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart table
CREATE TABLE IF NOT EXISTS cart (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_district ON products(district);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_user_id ON cart(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can insert users" ON users
  FOR INSERT WITH CHECK (true);

-- RLS Policies for products table
CREATE POLICY "Anyone can view approved products" ON products
  FOR SELECT USING (status = 'approved' OR seller_id = auth.uid());

CREATE POLICY "Sellers can insert their products" ON products
  FOR INSERT WITH CHECK (seller_id = auth.uid());

CREATE POLICY "Sellers can update their products" ON products
  FOR UPDATE USING (seller_id = auth.uid());

CREATE POLICY "Sellers can delete their products" ON products
  FOR DELETE USING (seller_id = auth.uid());

-- RLS Policies for orders table
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their orders" ON orders
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- RLS Policies for cart table
CREATE POLICY "Users can view their own cart" ON cart
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage their cart" ON cart
  FOR ALL USING (user_id = auth.uid());

-- Insert sample products (optional - you can modify or remove this)
INSERT INTO products (name, price, category, district, state, image, seller_id, seller_name, seller_rating, description, stock, status)
SELECT 
  'Banarasi Silk Saree',
  4500,
  'Textiles & Handloom',
  'Varanasi',
  'Uttar Pradesh',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop',
  id,
  'Ramesh Weavers',
  4.8,
  'Authentic handwoven Banarasi silk saree with intricate zari work, crafted by master weavers of Varanasi.',
  12,
  'approved'
FROM users WHERE role = 'seller' LIMIT 1
ON CONFLICT DO NOTHING;
