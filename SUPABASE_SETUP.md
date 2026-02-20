# Supabase Setup Instructions

## ✅ What's Been Done

1. **Installed Supabase Client** - @supabase/supabase-js package added
2. **Environment Variables** - Created `.env` file with your credentials
3. **Supabase Client** - Created `/src/lib/supabase.ts` with TypeScript types
4. **Database Schema** - Created `supabase-schema.sql` file
5. **Authentication** - Updated Login and Register pages to use Supabase Auth
6. **Database Types** - Defined types for users, products, orders, and cart tables

## 📋 Next Steps - Complete These in Supabase Dashboard

### Step 1: Run the Database Schema

1. Go to your Supabase project: https://scobhqadsdtbhhrkwrwi.supabase.co
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase-schema.sql` file
5. Paste it into the SQL editor
6. Click **Run** to execute the schema

This will create:
- ✅ Users table
- ✅ Products table
- ✅ Orders table
- ✅ Cart table
- ✅ All necessary indexes
- ✅ Row Level Security (RLS) policies

### Step 2: Configure Authentication

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Enable **Email** provider (should be enabled by default)
3. Go to **Authentication** → **URL Configuration**
4. Add your site URL: `http://localhost:8080`
5. Add redirect URLs:
   - `http://localhost:8080/buyer-dashboard`
   - `http://localhost:8080/seller`

### Step 3: Verify Environment Variables

Make sure your `.env` file contains:
```
VITE_SUPABASE_URL=https://scobhqadsdtbhhrkwrwi.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_gVacyLWWPu3-TBrW2OFS7A_RIYz7AAx
```

### Step 4: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

## 🔒 Security Features Implemented

1. **Row Level Security (RLS)** - Users can only access their own data
2. **Secure Authentication** - Passwords are hashed by Supabase
3. **Protected Routes** - Products, orders, and cart are user-specific
4. **Email Verification** - Optional email verification for new users

## 📊 Database Structure

### Users Table
- id (UUID)
- email (TEXT)
- name (TEXT)
- phone (TEXT)
- role (buyer/seller)
- district (TEXT, nullable)
- created_at (TIMESTAMP)

### Products Table
- id (UUID)
- name, price, category, district, state
- seller_id (references users)
- description, stock, status
- seller_name, seller_rating
- image, created_at

### Orders Table
- id (UUID)
- user_id (references users)
- items (JSONB)
- total (DECIMAL)
- status, payment_method
- shipping_address (JSONB)
- created_at

### Cart Table
- id (UUID)
- user_id (references users)
- product_id (references products)
- quantity (INTEGER)
- created_at

## 🧪 Testing the Setup

### Test Registration:
1. Go to `/register?role=buyer`
2. Fill in all fields
3. Submit the form
4. Check Supabase Dashboard → **Authentication** → **Users** to see new user

### Test Login:
1. Go to `/login`
2. Use the credentials you just registered
3. You should be redirected to the buyer dashboard

### Test Database:
1. Go to Supabase Dashboard → **Table Editor**
2. Check the `users` table - you should see your registered user
3. Check other tables as you use the app

## 🚨 Common Issues & Solutions

### Issue: "Missing Supabase environment variables"
**Solution:** Make sure `.env` file exists and restart dev server

### Issue: "User already registered"
**Solution:** Use a different email or delete the user from Supabase Dashboard

### Issue: "Failed to create user in database"
**Solution:** Make sure you ran the `supabase-schema.sql` script

### Issue: Authentication not working
**Solution:** 
1. Check Supabase Dashboard → Authentication → Settings
2. Verify email provider is enabled
3. Check site URL configuration

## 📱 Updated Features

### Authentication
- ✅ Real user registration with Supabase Auth
- ✅ Secure login with password hashing
- ✅ User data stored in database
- ✅ Role-based redirects (buyer/seller)

### Data Storage
- ✅ User profiles in database
- ✅ Products with seller relationships
- ✅ Orders with user relationships
- ✅ Cart items per user

## 🔄 Migration from localStorage

The following features previously used localStorage and now use Supabase:
- User authentication
- User profiles
- (Cart and Orders still use localStorage temporarily - can be migrated later)

## 📝 Next Development Steps

1. Update BuyerDashboard to fetch products from Supabase
2. Update Cart to use Supabase cart table
3. Update OrderHistory to fetch from Supabase orders table
4. Add product management for sellers
5. Implement image upload with Supabase Storage
6. Add email notifications

## 🛠️ Useful Commands

```bash
# Check Supabase connection
npm run dev

# View environment variables
cat .env

# Restart server after .env changes
# Ctrl+C then npm run dev
```

## 📚 Resources

- [Supabase Dashboard](https://scobhqadsdtbhhrkwrwi.supabase.co)
- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

**Your Supabase setup is complete! 🎉**
Run the SQL schema and restart your dev server to start using it.
