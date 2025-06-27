import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clean up existing data if needed
  try {
    await prisma.$executeRawUnsafe('DELETE FROM "tools";')
    console.log('Cleared existing tools')
  } catch (error) {
    console.log('No existing tools to clear')
  }

  // Create initial tools
  const tools = [
    {
      name: 'AI Image Studio',
      description: 'Create photorealistic images with incredible detail and natural skin tones. Perfect for product shots, lifestyle imagery, and marketing materials.',
      category: 'Image',
      path: '/tools/image-studio',
      icon: 'image',
    },
    {
      name: 'Image Upscaler',
      description: 'Enhance the resolution of your visuals without losing quality. Perfect for low-resolution product images or old marketing materials.',
      category: 'Image',
      path: '/tools/image-upscaler',
      icon: 'maximize',
    },
    {
      name: 'Social Media Post Generator',
      description: 'Create eye-catching graphics optimized for Instagram, Facebook, and other platforms with AI-powered templates.',
      category: 'Marketing',
      path: '/tools/social-media-generator',
      icon: 'instagram',
    },
    {
      name: 'Banner Designer',
      description: 'Design high-resolution banners for your homepage or promotional campaigns with customizable templates.',
      category: 'Marketing',
      path: '/tools/banner-designer',
      icon: 'layout',
    },
  ]

  for (const tool of tools) {
    await prisma.tool.create({
      data: tool,
    })
  }

  console.log(`Database has been seeded with ${tools.length} tools.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 