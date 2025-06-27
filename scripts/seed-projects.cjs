const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// The user ID for 'nseshasai5@gmail.com'
const USER_ID = 'f3e00eab-6bc6-4f43-bbb2-dd431ecabc3b';

const projectsToCreate = [
  {
    user_id: USER_ID,
    tool_id: '720c5a64-62f4-4210-ad8c-0235de607255',
    status: 'completed',
    title: 'My First AI Logo',
  },
  {
    user_id: USER_ID,
    tool_id: 'bb188a40-b363-4d0f-a99c-9c1ff40126f2',
    status: 'completed',
    title: 'Family Photo High-Res',
  },
  {
    user_id: USER_ID,
    tool_id: '393ce188-dbd3-4505-b855-73a15d9b8ae6',
    status: 'in-progress',
    title: 'Blog Post SEO Analysis',
  },
];

const seedProjects = async () => {
  console.log(`Preparing to insert ${projectsToCreate.length} projects with titles for user ${USER_ID}...`);

  const { data, error } = await supabase
    .from('projects')
    .insert(projectsToCreate)
    .select();

  if (error) {
    console.error('Error inserting projects:', error.message);
    return;
  }

  console.log('Successfully inserted projects:');
  console.log(data);
};

seedProjects(); 