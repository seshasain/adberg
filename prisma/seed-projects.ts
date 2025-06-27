import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  // First, check if we have a test user
  const testAuthId = '00000000-0000-0000-0000-000000000000'; // Placeholder auth ID
  
  let testUser = await prisma.user.findUnique({
    where: { authId: testAuthId }
  });

  if (!testUser) {
    console.log('Creating test user...');
    testUser = await prisma.user.create({
      data: {
        authId: testAuthId,
        email: 'test@example.com',
        name: 'Test User',
        creditsUsed: 25,
        creditsLimit: 100
      }
    });
  }

  // Check if we have tools
  const tools = await prisma.tool.findMany();
  if (tools.length === 0) {
    console.error('No tools found. Please run the tools seed script first.');
    return;
  }

  // Create sample projects
  const projectsToCreate = [
    {
      title: 'Marketing Banner',
      description: 'A banner for our summer campaign',
      status: 'completed',
      toolId: tools.find(t => t.name === 'AI Image Studio')?.id || tools[0].id,
      thumbnailUrl: 'https://via.placeholder.com/300x200',
      projectData: { prompt: 'A summer beach scene with vibrant colors' }
    },
    {
      title: 'Product Photo Enhancement',
      description: 'Upscaled product image for the website',
      status: 'completed',
      toolId: tools.find(t => t.name === 'Image Upscaler')?.id || tools[0].id,
      thumbnailUrl: 'https://via.placeholder.com/300x200',
      projectData: { scale: 2, enhanceDetails: true }
    },
    {
      title: 'New Logo Design',
      description: 'Draft of the new company logo',
      status: 'draft',
      toolId: tools.find(t => t.name === 'AI Image Studio')?.id || tools[0].id,
      thumbnailUrl: 'https://via.placeholder.com/300x200',
      projectData: { prompt: 'A modern, minimalist logo for a tech company' }
    },
    {
      title: 'Social Media Post',
      description: 'Instagram post for product launch',
      status: 'in_progress',
      toolId: tools.find(t => t.name === 'AI Image Studio')?.id || tools[0].id,
      thumbnailUrl: 'https://via.placeholder.com/300x200',
      projectData: { prompt: 'A product showcase with dynamic lighting' }
    }
  ];

  // Check if we already have projects for this user
  const existingProjects = await prisma.project.count({
    where: { userId: testUser.id }
  });

  if (existingProjects > 0) {
    console.log(`User already has ${existingProjects} projects. Skipping project creation.`);
  } else {
    console.log('Creating sample projects...');
    for (const project of projectsToCreate) {
      await prisma.project.create({
        data: {
          ...project,
          userId: testUser.id
        }
      });
    }
    console.log(`Created ${projectsToCreate.length} sample projects.`);
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 