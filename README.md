# Digital Marketing Toolkit

A comprehensive platform for digital marketing content creation, featuring AI-powered tools for image generation, upscaling, and more.

## Features

- **AI Image Studio**: Create stunning AI-generated images for your marketing campaigns
- **Image Upscaler**: Enhance and upscale your existing images
- **Project Management**: Save and organize all your marketing assets in one place
- **User Authentication**: Secure access to your content and projects

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Supabase Auth

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables (see `.env.example`)
4. Run database migrations:
   ```
   npx prisma migrate dev
   ```
5. Seed the database:
   ```
   npm run seed
   ```
6. Start the development server:
   ```
   npm run dev
   ```

## Project Structure

- `/src` - Frontend React application
  - `/components` - Reusable UI components
  - `/contexts` - React context providers
  - `/lib` - Utility functions and services
  - `/pages` - Application pages
  - `/pages/tools` - Individual tool implementations
- `/prisma` - Database schema and migrations
- `/server` - Backend API implementation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
