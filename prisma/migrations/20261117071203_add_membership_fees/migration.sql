-- CreateTable
CREATE TABLE `MembershipFee` (
    `id` VARCHAR(36) NOT NULL,
    `categoryId` VARCHAR(100) NOT NULL,
    `categoryName` VARCHAR(150) NOT NULL,
    `currency` VARCHAR(10) NOT NULL,
    `applicationFee` DECIMAL(10, 2) NOT NULL,
    `annualSubscription` DECIMAL(10, 2) NOT NULL,
    `isAddOn` BOOLEAN NOT NULL DEFAULT false,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `MembershipFee_categoryId_idx`(`categoryId`),
    UNIQUE INDEX `MembershipFee_categoryId_currency_key`(`categoryId`, `currency`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
