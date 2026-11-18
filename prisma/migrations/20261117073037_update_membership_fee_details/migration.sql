-- AlterTable
ALTER TABLE `membershipfee` ADD COLUMN `eligibility` TEXT NULL,
    ADD COLUMN `letters` VARCHAR(150) NULL,
    ADD COLUMN `sortOrder` INTEGER NOT NULL DEFAULT 0,
    MODIFY `applicationFee` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    MODIFY `annualSubscription` DECIMAL(10, 2) NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX `MembershipFee_isActive_idx` ON `MembershipFee`(`isActive`);

-- CreateIndex
CREATE INDEX `MembershipFee_sortOrder_idx` ON `MembershipFee`(`sortOrder`);
