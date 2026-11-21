/*
  Warnings:

  - A unique constraint covering the columns `[normalizedIdentificationNumber]` on the table `IndividualApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `individualapplication` ADD COLUMN `normalizedIdentificationNumber` VARCHAR(100) NULL;

-- CreateTable
CREATE TABLE `ContactMessage` (
    `id` VARCHAR(36) NOT NULL,
    `fullName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(30) NULL,
    `enquiryType` VARCHAR(100) NOT NULL,
    `message` TEXT NOT NULL,
    `status` ENUM('NOT_CONTACTED', 'CONTACTED') NOT NULL DEFAULT 'NOT_CONTACTED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ContactMessage_status_idx`(`status`),
    INDEX `ContactMessage_createdAt_idx`(`createdAt`),
    INDEX `ContactMessage_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `IndividualApplication_normalizedIdentificationNumber_key` ON `IndividualApplication`(`normalizedIdentificationNumber`);
