import { createClient } from '@supabase/supabase-js';

// SERVICE_ROLE key allows bypassing Row Level Security (RLS)
// WARNING: NEVER expose this in the frontend (App.tsx, etc.)
const SUPABASE_URL = 'https://crqxptyndqftcczeioue.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNycXhwdHluZHFmdGNjemVpb3VlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDAyMDUwOCwiZXhwIjoyMDc5NTk2NTA4fQ.QarLbvdRPXRBxHgw0pZgS1U8cpBo7uilzbzgF9QAOLI';

const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// Example: Function to delete a user by phone number
export const deleteUserByPhone = async (phone: string) => {
    const { data, error } = await supabaseAdmin
        .from('users')
        .delete()
        .eq('phone_number', phone);

    if (error) console.error('Delete Error:', error);
    else console.log('Deleted users:', data);
};

// Example: Function to get all users (bypassing RLS)
export const getAllUsers = async () => {
    const { data, error } = await supabaseAdmin
        .from('users')
        .select('*');

    if (error) console.error('Fetch Error:', error);
    else console.log('All Users:', data);
    return data;
};

// Example usage check (uncomment to run)
// getAllUsers();
