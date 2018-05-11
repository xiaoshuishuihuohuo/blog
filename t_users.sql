/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50552
Source Host           : 192.168.1.5:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50552
File Encoding         : 65001

Date: 2016-11-15 13:02:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_users
-- ----------------------------
DROP TABLE IF EXISTS `t_users`;
CREATE TABLE `t_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL COMMENT '昵称',
  `nickname` varchar(50) NOT NULL COMMENT '登录名',
  `description` varchar(100) DEFAULT '' COMMENT '描述',
  `email_addr` varchar(50) NOT NULL COMMENT '邮箱地址',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `avatar` varchar(35) DEFAULT '' COMMENT '头像',
  `last_login_time` timestamp NULL DEFAULT NULL,
  `last_login_ip` varchar(20) DEFAULT '' COMMENT '上次登录ip',
  `reg_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `loginName` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
