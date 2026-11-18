-- CreateTable
CREATE TABLE `IndividualApplication` (
    `id` VARCHAR(36) NOT NULL,
    `registrationNumber` VARCHAR(50) NULL,
    `membershipCategory` VARCHAR(100) NULL,
    `residency` ENUM('SRI_LANKA', 'INTERNATIONAL') NULL,
    `countryOfResidence` VARCHAR(100) NULL,
    `admissionRoute` ENUM('ACCTA_EXAMINATION', 'RECOGNISED_QUALIFICATION', 'MATURE_ENTRY') NULL,
    `title` VARCHAR(30) NULL,
    `fullName` VARCHAR(255) NULL,
    `initialsName` VARCHAR(255) NULL,
    `preferredName` VARCHAR(150) NULL,
    `dateOfBirth` DATE NULL,
    `gender` VARCHAR(50) NULL,
    `nationality` VARCHAR(100) NULL,
    `identificationNumber` VARCHAR(100) NULL,
    `preferredLanguage` VARCHAR(50) NULL,
    `residentialAddress` TEXT NULL,
    `officialAddress` TEXT NULL,
    `mailingAddress` TEXT NULL,
    `mobileNumber` VARCHAR(30) NULL,
    `whatsappNumber` VARCHAR(30) NULL,
    `officePhone` VARCHAR(30) NULL,
    `personalEmail` VARCHAR(255) NULL,
    `officialEmail` VARCHAR(255) NULL,
    `linkedInProfile` VARCHAR(500) NULL,
    `academicQualifications` TEXT NULL,
    `professionalQualifications` TEXT NULL,
    `currentEmployment` TEXT NULL,
    `relevantExperience` TEXT NULL,
    `areasOfExpertise` TEXT NULL,
    `professionalStatement` TEXT NULL,
    `disciplinaryAction` BOOLEAN NULL,
    `criminalOffence` BOOLEAN NULL,
    `currentInvestigation` BOOLEAN NULL,
    `bankruptOrInsolvent` BOOLEAN NULL,
    `membershipSuspended` BOOLEAN NULL,
    `falseInformation` BOOLEAN NULL,
    `otherRelevantMatter` BOOLEAN NULL,
    `fitAndProperDetails` TEXT NULL,
    `informationAccepted` BOOLEAN NOT NULL DEFAULT false,
    `ageAccepted` BOOLEAN NOT NULL DEFAULT false,
    `rulesAccepted` BOOLEAN NOT NULL DEFAULT false,
    `designationAccepted` BOOLEAN NOT NULL DEFAULT false,
    `renewalAccepted` BOOLEAN NOT NULL DEFAULT false,
    `changesAccepted` BOOLEAN NOT NULL DEFAULT false,
    `contributionAccepted` BOOLEAN NOT NULL DEFAULT false,
    `consentAccepted` BOOLEAN NOT NULL DEFAULT false,
    `declarationName` VARCHAR(255) NULL,
    `declarationDate` DATE NULL,
    `declarationPlace` VARCHAR(150) NULL,
    `applicationFee` DECIMAL(10, 2) NULL,
    `annualSubscription` DECIMAL(10, 2) NULL,
    `feeCurrency` VARCHAR(10) NULL,
    `status` ENUM('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'DRAFT',
    `submittedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `IndividualApplication_registrationNumber_key`(`registrationNumber`),
    INDEX `IndividualApplication_status_idx`(`status`),
    INDEX `IndividualApplication_membershipCategory_idx`(`membershipCategory`),
    INDEX `IndividualApplication_createdAt_idx`(`createdAt`),
    INDEX `IndividualApplication_personalEmail_idx`(`personalEmail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IndividualReferee` (
    `id` VARCHAR(36) NOT NULL,
    `applicationId` VARCHAR(36) NOT NULL,
    `refereeNumber` INTEGER NOT NULL,
    `fullName` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `phoneNumber` VARCHAR(30) NULL,

    INDEX `IndividualReferee_applicationId_idx`(`applicationId`),
    UNIQUE INDEX `IndividualReferee_applicationId_refereeNumber_key`(`applicationId`, `refereeNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IndividualDocument` (
    `id` VARCHAR(36) NOT NULL,
    `applicationId` VARCHAR(36) NOT NULL,
    `documentType` VARCHAR(100) NOT NULL,
    `originalName` VARCHAR(255) NOT NULL,
    `storedFileName` VARCHAR(255) NOT NULL,
    `filePath` VARCHAR(1000) NOT NULL,
    `mimeType` VARCHAR(100) NULL,
    `fileSize` BIGINT NULL,
    `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `IndividualDocument_applicationId_idx`(`applicationId`),
    INDEX `IndividualDocument_applicationId_documentType_idx`(`applicationId`, `documentType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `IndividualReferee` ADD CONSTRAINT `IndividualReferee_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `IndividualApplication`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IndividualDocument` ADD CONSTRAINT `IndividualDocument_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `IndividualApplication`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
