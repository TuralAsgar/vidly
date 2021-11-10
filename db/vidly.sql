/*
 Navicat Premium Data Transfer

 Source Server         : mysql-mariadb-3306
 Source Server Type    : MySQL
 Source Server Version : 100413
 Source Host           : localhost:3306
 Source Schema         : vidly

 Target Server Type    : MySQL
 Target Server Version : 100413
 File Encoding         : 65001

 Date: 10/11/2021 06:03:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `is_gold` tinyint(3) UNSIGNED NULL DEFAULT NULL,
  `phone` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES (1, 'Johny', 0, '111111');
INSERT INTO `customer` VALUES (2, 'Elvin', 1, '994515460480');
INSERT INTO `customer` VALUES (4, 'Elvin', 1, '994515460480');
INSERT INTO `customer` VALUES (5, 'Elvin', 1, '994515460480');
INSERT INTO `customer` VALUES (6, 'Elvin', 1, '994515460480');
INSERT INTO `customer` VALUES (9, 'Elvin', 1, '994515460480');
INSERT INTO `customer` VALUES (10, 'Elvin', 1, '994515460480');
INSERT INTO `customer` VALUES (11, 'Elvin', 1, '994515460480');
INSERT INTO `customer` VALUES (12, 'Elvin', 1, '994515460480');
INSERT INTO `customer` VALUES (13, 'Elvin', 1, '994515460480');

-- ----------------------------
-- Table structure for genre
-- ----------------------------
DROP TABLE IF EXISTS `genre`;
CREATE TABLE `genre`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of genre
-- ----------------------------
INSERT INTO `genre` VALUES (1, 'Action');
INSERT INTO `genre` VALUES (2, 'Tural');
INSERT INTO `genre` VALUES (3, 'bur');

-- ----------------------------
-- Table structure for movie
-- ----------------------------
DROP TABLE IF EXISTS `movie`;
CREATE TABLE `movie`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `genre_id` int(11) NULL DEFAULT NULL,
  `number_in_stock` int(10) UNSIGNED NULL DEFAULT NULL,
  `daily_rental_rate` int(10) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of movie
-- ----------------------------
INSERT INTO `movie` VALUES (4, 'Arşın mal alan', 1, 3, 20);
INSERT INTO `movie` VALUES (3, 'O olmasın, bu olsun', 2, 2, 10);
INSERT INTO `movie` VALUES (7, 'O olmasın, bu olsun', 2, 2, 10);
INSERT INTO `movie` VALUES (8, 'Arşın mal alan', 1, 5, 20);
INSERT INTO `movie` VALUES (9, 'Arşın mal alan', 1, 5, 20);

-- ----------------------------
-- Table structure for rental
-- ----------------------------
DROP TABLE IF EXISTS `rental`;
CREATE TABLE `rental`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` int(10) UNSIGNED NOT NULL,
  `move_id` int(10) UNSIGNED NOT NULL,
  `date_out` date NOT NULL,
  `date_returned` date NULL DEFAULT NULL,
  `rental_fee` decimal(19, 2) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of rental
-- ----------------------------
INSERT INTO `rental` VALUES (1, 1, 4, '2021-11-08', NULL, 20.00);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `is_admin` tinyint(1) UNSIGNED NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `unique email`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'Tural', 'tural.esger@gmail.com', '$2b$10$fNySDuMmw4azUFXchn8IE.3gjsO4lHFYq6FTQuCQ3W29vL84qH3S.', 1);
INSERT INTO `user` VALUES (2, 'Tural', 'tural.esger2@gmail.com', '$2b$10$zIHncDuHougCvJDe4UZ6i.FIhD1AZxkp13tCsiN2xpe0rhDbuqPyK', 0);
INSERT INTO `user` VALUES (3, 'Tural', 'tural.esger33@gmail.com', '$2b$10$sJ5wGQd4H9MR5PbduaHVE.TpjFYINZUgHvgfUpUfsF9xhKL8zNfv2', 0);
INSERT INTO `user` VALUES (4, 'Tural', 'tural.esger3@gmail.com', '$2b$10$W9lVJNZWkxIwFMZYnPcIW.mKqgrrXP/tJAlqVuxRvZIsd5gckElxq', 0);
INSERT INTO `user` VALUES (5, 'Tural', 'tural.esger4@gmail.com', '$2b$10$lgaPEjR0vojbrtnHkMD.kOd30URJDDLeoI9OMsHDk8FITTuLHJ656', 0);

SET FOREIGN_KEY_CHECKS = 1;
