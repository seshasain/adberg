-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "thumbnail_url" TEXT,
ALTER COLUMN "id" SET DEFAULT uuid_generate_v4(),
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "tools" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4(),
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
