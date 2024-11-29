CREATE DATABASE portfolio;

USE portfolio;

CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userName` VARCHAR(255) NOT NULL,
    `hashedPass` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL
);
CREATE TABLE `comments`(
    `commentId` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` INT NOT NULL,
    `projectId` INT NOT NULL
);
CREATE TABLE `project`(
    `projectId` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `info` VARCHAR(255) NOT NULL
);
CREATE TABLE `messages` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `sendId` varchar(255)  NOT NULL,
  `message` varchar(255) NOT NULL,
  `recieverId` varchar(255)  NOT NULL,
  PRIMARY KEY (`id`)
);
# Create the app user
CREATE USER IF NOT EXISTS 'portfolio_app'@'localhost' IDENTIFIED BY 'qwertyuiop'; 
GRANT ALL PRIVILEGES ON portfolio.* TO 'portfolio_app'@'localhost';