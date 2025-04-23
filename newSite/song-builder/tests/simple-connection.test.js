import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config';

describe('Supabase Simple Connection Test', () => {
    test('should connect to Supabase with anon key', async () => {
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        // Just check if the URL and key format are valid
        expect(supabase).toBeDefined();
        expect(typeof supabase.auth).toBe('object');
        
        // Make a simple API call that doesn't require authentication or specific permissions
        const { data, error } = await supabase.auth.getSession();
        
        // We expect no error, even though there's likely no session
        expect(error).toBeNull();
        expect(data).toBeDefined();
    });
}); 