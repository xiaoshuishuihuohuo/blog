/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50552
Source Host           : 192.168.1.5:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50552
File Encoding         : 65001

Date: 2016-10-30 14:51:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_article_classifications
-- ----------------------------
DROP TABLE IF EXISTS `t_article_classifications`;
CREATE TABLE `t_article_classifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL DEFAULT '',
  `name` varchar(50) NOT NULL DEFAULT '',
  `parent_code` varchar(200) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of t_article_classifications
-- ----------------------------
INSERT INTO `t_article_classifications` VALUES ('1', 'notes', '笔记', '');
INSERT INTO `t_article_classifications` VALUES ('2', 'tech', '技术', '');
INSERT INTO `t_article_classifications` VALUES ('3', 'understanding', '心得', '');
