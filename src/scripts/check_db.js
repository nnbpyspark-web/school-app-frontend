const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTable() {
    console.log("Checking 'schools' table...");
    const { data, error } = await supabase.from('schools').select('*').limit(1);

    if (error) {
        console.error("Error accessing 'schools' table:", error.message);
        console.log("This likely means the Phase 2 SQL was NOT run.");
    } else {
        console.log("Success! 'schools' table exists.");
    }
}

checkTable();
