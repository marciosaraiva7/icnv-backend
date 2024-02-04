-- CreateTable
CREATE TABLE `AccessLevels` (
    `idAccessLevel` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NULL,
    `type` INTEGER NULL,
    `status` INTEGER NULL,

    PRIMARY KEY (`idAccessLevel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Addresses` (
    `idAddress` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` INTEGER NOT NULL,
    `postalCode` VARCHAR(10) NULL,
    `street` VARCHAR(255) NULL,
    `neighborhood` VARCHAR(255) NULL,
    `city` VARCHAR(255) NULL,
    `state` VARCHAR(255) NULL,
    `number` INTEGER NULL,

    PRIMARY KEY (`idAddress`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Announcements` (
    `idAnnouncements` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `URL` VARCHAR(255) NULL,
    `video` LONGBLOB NULL,
    `date` DATETIME(0) NULL,
    `inLive` BOOLEAN NULL,

    PRIMARY KEY (`idAnnouncements`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contacts` (
    `idContact` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` INTEGER NOT NULL,
    `contact` VARCHAR(255) NULL,
    `type` INTEGER NULL,

    PRIMARY KEY (`idContact`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Events` (
    `idEvent` INTEGER NOT NULL AUTO_INCREMENT,
    `idAddress` INTEGER NULL,
    `name` VARCHAR(100) NULL,
    `description` VARCHAR(255) NULL,
    `profileImage` LONGBLOB NULL,
    `date` DATETIME(0) NULL,
    `week` INTEGER NULL,
    `isFree` BOOLEAN NULL,
    `pixKey` VARCHAR(255) NULL,
    `featuredGuest` VARCHAR(255) NULL,
    `featuredGuestDescription` LONGTEXT NULL,
    `featuredGuestImage` LONGBLOB NULL,
    `type` INTEGER NULL,
    `status` BOOLEAN NULL,

    PRIMARY KEY (`idEvent`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventsImage` (
    `idImageEvent` INTEGER NOT NULL AUTO_INCREMENT,
    `idEvent` INTEGER NOT NULL,
    `image` LONGBLOB NULL,

    PRIMARY KEY (`idImageEvent`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventsUsers` (
    `idEventUser` INTEGER NOT NULL AUTO_INCREMENT,
    `idEvent` INTEGER NULL,
    `idUser` INTEGER NULL,
    `typeMember` INTEGER NULL,
    `value` DECIMAL(10, 1) NULL,
    `payment` BOOLEAN NULL,
    `paymentVoucher` LONGBLOB NULL,
    `pixKey` VARCHAR(255) NULL,
    `status` INTEGER NULL,

    PRIMARY KEY (`idEventUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ministries` (
    `idMinistry` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `description` LONGTEXT NULL,
    `icon` LONGBLOB NULL,

    PRIMARY KEY (`idMinistry`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MinistryUser` (
    `idMinistryUser` INTEGER NOT NULL AUTO_INCREMENT,
    `idMinistry` INTEGER NOT NULL,
    `idUser` INTEGER NOT NULL,
    `typeMember` INTEGER NULL,
    `status` INTEGER NULL,

    PRIMARY KEY (`idMinistryUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Situation` (
    `table` VARCHAR(255) NULL,
    `field` VARCHAR(255) NULL,
    `name` VARCHAR(255) NULL,
    `value` INTEGER NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transmissions` (
    `idTransmission` INTEGER NOT NULL AUTO_INCREMENT,
    `idEvent` INTEGER NULL,
    `name` VARBINARY(100) NULL,
    `description` VARCHAR(255) NULL,
    `date` DATETIME(0) NULL,
    `url` VARCHAR(255) NULL,

    PRIMARY KEY (`idTransmission`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `idUser` INTEGER NOT NULL AUTO_INCREMENT,
    `idAccessLevel` INTEGER NULL,
    `completeName` VARCHAR(150) NULL,
    `username` VARCHAR(100) NULL,
    `email` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `profileImage` LONGBLOB NULL,
    `genre` INTEGER NULL,
    `birthDate` DATE NULL,
    `baptismDate` DATE NULL,
    `isMember` BOOLEAN NULL,
    `isBaptized` BOOLEAN NULL,
    `status` INTEGER NULL,

    PRIMARY KEY (`idUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reference` (
    `table` VARCHAR(50) NULL,
    `field` VARCHAR(50) NULL,
    `type` INTEGER NULL,
    `description` VARCHAR(50) NULL,
    `idStatus` INTEGER NULL,
    `idStatusBoolean` BOOLEAN NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sundayCoffee` (
    `idSundayCoffee` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` INTEGER NULL,
    `date` DATETIME(0) NULL,
    `week` INTEGER NULL,
    `status` BOOLEAN NULL,

    PRIMARY KEY (`idSundayCoffee`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

