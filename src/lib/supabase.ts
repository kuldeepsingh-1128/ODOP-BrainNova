import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          phone: string;
          role: 'buyer' | 'seller';
          district: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          phone: string;
          role: 'buyer' | 'seller';
          district?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          phone?: string;
          role?: 'buyer' | 'seller';
          district?: string | null;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          price: number;
          category: string;
          district: string;
          state: string;
          image: string;
          seller_id: string;
          seller_name: string;
          seller_rating: number;
          description: string;
          stock: number;
          status: 'approved' | 'pending' | 'rejected';
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          price: number;
          category: string;
          district: string;
          state: string;
          image: string;
          seller_id: string;
          seller_name: string;
          seller_rating?: number;
          description: string;
          stock: number;
          status?: 'approved' | 'pending' | 'rejected';
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          category?: string;
          district?: string;
          state?: string;
          image?: string;
          seller_id?: string;
          seller_name?: string;
          seller_rating?: number;
          description?: string;
          stock?: number;
          status?: 'approved' | 'pending' | 'rejected';
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          items: any;
          total: number;
          status: string;
          payment_method: string;
          shipping_address: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          items: any;
          total: number;
          status: string;
          payment_method: string;
          shipping_address: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          items?: any;
          total?: number;
          status?: string;
          payment_method?: string;
          shipping_address?: any;
          created_at?: string;
        };
      };
      cart: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          quantity: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          quantity: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          quantity?: number;
          created_at?: string;
        };
      };
    };
  };
}
