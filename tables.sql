-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'ADMIN',
    `permissions` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `emailChanged` BOOLEAN NOT NULL DEFAULT false,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `verificationCode` VARCHAR(191) NULL,
    `verificationExpiry` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Property` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `internalCode` VARCHAR(191) NULL,
    `shortDesc` TEXT NULL,
    `fullDesc` LONGTEXT NULL,
    `modality` VARCHAR(191) NOT NULL,
    `propertyType` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DISPONIBLE',
    `price` DOUBLE NOT NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'COP',
    `city` VARCHAR(191) NOT NULL,
    `sector` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `lat` DOUBLE NULL,
    `lng` DOUBLE NULL,
    `builtArea` DOUBLE NULL,
    `lotArea` DOUBLE NULL,
    `bedrooms` INTEGER NULL,
    `bathrooms` INTEGER NULL,
    `parking` INTEGER NULL,
    `stratum` INTEGER NULL,
    `antiquity` INTEGER NULL,
    `adminFee` DOUBLE NULL,
    `amenities` TEXT NULL,
    `features` TEXT NULL,
    `mainImage` VARCHAR(191) NULL,
    `images` LONGTEXT NULL,
    `videos` LONGTEXT NULL,
    `virtualTour` TEXT NULL,
    `documents` LONGTEXT NULL,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `isInvestment` BOOLEAN NOT NULL DEFAULT false,
    `seoTitle` VARCHAR(191) NULL,
    `seoDesc` TEXT NULL,
    `publishedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Property_slug_key`(`slug`),
    UNIQUE INDEX `Property_internalCode_key`(`internalCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlogPost` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `summary` TEXT NULL,
    `content` LONGTEXT NOT NULL,
    `mainImage` VARCHAR(191) NULL,
    `author` VARCHAR(191) NULL,
    `category` VARCHAR(191) NULL,
    `tags` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DRAFT',
    `seoTitle` VARCHAR(191) NULL,
    `seoDesc` TEXT NULL,
    `publishedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BlogPost_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lead` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `message` VARCHAR(191) NULL,
    `propertyId` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'NEW',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Testimonial` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL DEFAULT 5,
    `avatar` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Setting` (
    `id` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Setting_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

