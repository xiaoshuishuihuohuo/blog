/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50552
Source Host           : 192.168.1.5:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50552
File Encoding         : 65001

Date: 2016-11-20 15:40:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_likes
-- ----------------------------
DROP TABLE IF EXISTS `t_likes`;
CREATE TABLE `t_likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(35) NOT NULL,
  `like_id` varchar(35) NOT NULL,
  `like_type` tinyint(4) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`) USING BTREE,
  KEY `like_id` (`like_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
