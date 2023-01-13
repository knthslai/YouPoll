import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xecuwpcwqdsidlqweaxe.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlY3V3cGN3cWRzaWRscXdlYXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM1Njc4MDgsImV4cCI6MTk4OTE0MzgwOH0.5QxYOoeDUFwhTdHQZa3rsIZsc6b-9IkRbzQnzAXVkAI';
export const supabase = createClient(supabaseUrl, supabaseKey!, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});
