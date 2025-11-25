import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key. Make sure they are set in your .env file.');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');

export const saveUserData = async (phone: string, personaResult: any, stats: any) => {
    const { data, error } = await supabase
        .from('users')
        .insert([
            {
                phone_number: phone,
                persona_type: personaResult.type,
                persona_title: personaResult.persianTitle,
                stats: stats,
                created_at: new Date()
            }
        ]);

    if (error) {
        console.error('Error saving user data:', error);
        // We don't throw here to prevent blocking the user flow if DB fails
        return null;
    }
    return data;
};
