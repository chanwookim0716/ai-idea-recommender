// src/services/supabase.ts
import { createClient } from '@supabase/supabase-js';

// These should ideally be loaded from environment variables in a secure way.
// For a React app built with Vite, you'd use import.meta.env.VITE_SUPABASE_URL etc.
//
// Instructions for the user:
// 1. Go to your Supabase project dashboard.
// 2. Go to "Settings" -> "API".
// 3. Copy your Project URL and anon public key.
// 4. Create a .env file in your project root with these variables:
//    VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
//    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
// 5. Ensure .env is in your .gitignore (which it already should be).

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey ? '*****' : 'Missing'); // Mask key for security in logs

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing from environment variables.');
  // In a production app, you might want to throw an error or handle this more gracefully.
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
