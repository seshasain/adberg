import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // First, check if we have a test user
    const testAuthId = '00000000-0000-0000-0000-000000000000'; // Placeholder auth ID
    
    // Check if test user exists
    const userResult = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM users WHERE auth_id = ${testAuthId}::uuid
    `;
    
    console.log('User count result:', userResult);
    const userCount = parseInt(userResult[0]?.count || '0');
    
    let testUserId;
    
    if (userCount === 0) {
      console.log('Creating test user...');
      // Create test user
      await prisma.$executeRaw`
        INSERT INTO users (id, email, name, auth_id, credits_used, credits_limit, created_at, updated_at)
        VALUES (uuid_generate_v4(), 'test@example.com', 'Test User', ${testAuthId}::uuid, 25, 100, now(), now())
      `;
      
      // Get the created user's ID
      const userData = await prisma.$queryRaw`
        SELECT id FROM users WHERE auth_id = ${testAuthId}::uuid
      `;
      console.log('User data after creation:', userData);
      testUserId = userData[0]?.id;
    } else {
      // Get existing user's ID
      const userData = await prisma.$queryRaw`
        SELECT id FROM users WHERE auth_id = ${testAuthId}::uuid
      `;
      console.log('Existing user data:', userData);
      testUserId = userData[0]?.id;
    }
    
    if (!testUserId) {
      throw new Error('Could not get or create test user ID');
    }
    
    console.log('Test user ID:', testUserId);

    // Check if we have tools
    const tools = await prisma.$queryRaw`SELECT * FROM tools`;
    console.log('Tools found:', tools.length);
    
    if (tools.length === 0) {
      console.error('No tools found. Please run the tools seed script first.');
      return;
    }

    // Check if user already has projects
    const projectResult = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM projects WHERE user_id = ${testUserId}::uuid
    `;
    
    console.log('Project count result:', projectResult);
    const projectCount = parseInt(projectResult[0]?.count || '0');
    
    if (projectCount > 0) {
      console.log(`User already has ${projectCount} projects. Skipping project creation.`);
    } else {
      console.log('Creating sample projects...');
      
      // Find tool IDs
      const aiImageStudioTool = tools.find(t => t.name === 'AI Image Studio') || tools[0];
      const imageUpscalerTool = tools.find(t => t.name === 'Image Upscaler') || tools[0];
      
      console.log('AI Image Studio tool:', aiImageStudioTool);
      console.log('Image Upscaler tool:', imageUpscalerTool);
      
      // Create sample projects one by one to avoid errors
      await prisma.$executeRaw`
        INSERT INTO projects (id, title, description, status, project_data, thumbnail_url, user_id, tool_id, created_at, updated_at)
        VALUES (uuid_generate_v4(), 'Marketing Banner', 'A banner for our summer campaign', 'completed', 
                '{"prompt": "A summer beach scene with vibrant colors"}'::jsonb, 
                'https://via.placeholder.com/300x200', ${testUserId}::uuid, ${aiImageStudioTool.id}, now(), now())
      `;
      
      await prisma.$executeRaw`
        INSERT INTO projects (id, title, description, status, project_data, thumbnail_url, user_id, tool_id, created_at, updated_at)
        VALUES (uuid_generate_v4(), 'Product Photo Enhancement', 'Upscaled product image for the website', 'completed', 
                '{"scale": 2, "enhanceDetails": true}'::jsonb, 
                'https://via.placeholder.com/300x200', ${testUserId}::uuid, ${imageUpscalerTool.id}, now(), now())
      `;
      
      await prisma.$executeRaw`
        INSERT INTO projects (id, title, description, status, project_data, thumbnail_url, user_id, tool_id, created_at, updated_at)
        VALUES (uuid_generate_v4(), 'New Logo Design', 'Draft of the new company logo', 'draft', 
                '{"prompt": "A modern, minimalist logo for a tech company"}'::jsonb, 
                'https://via.placeholder.com/300x200', ${testUserId}::uuid, ${aiImageStudioTool.id}, now(), now())
      `;
      
      await prisma.$executeRaw`
        INSERT INTO projects (id, title, description, status, project_data, thumbnail_url, user_id, tool_id, created_at, updated_at)
        VALUES (uuid_generate_v4(), 'Social Media Post', 'Instagram post for product launch', 'in_progress', 
                '{"prompt": "A product showcase with dynamic lighting"}'::jsonb, 
                'https://via.placeholder.com/300x200', ${testUserId}::uuid, ${aiImageStudioTool.id}, now(), now())
      `;
      
      console.log('Created 4 sample projects.');
    }

    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Error in seed script:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 