import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config';

describe('Supabase Connection Test', () => {
    test('should successfully connect to Supabase', async () => {
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        // Test the connection by making a simple query
        const { data, error } = await supabase
            .from('songs')
            .select('count')
            .limit(1);
            
        // We don't care about the data, just that we didn't get an error
        expect(error).toBeNull();
    });
}); 