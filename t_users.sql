/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50552
Source Host           : 192.168.1.5:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50552
File Encoding         : 65001

Date: 2016-10-20 23:18:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_users
-- ----------------------------
DROP TABLE IF EXISTS `t_users`;
CREATE TABLE `t_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login_name` varchar(50) NOT NULL COMMENT '登录名',
  `email_addr` varchar(50) NOT NULL COMMENT '邮箱地址',
  `username` varchar(50) NOT NULL COMMENT '昵称',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `last_login_time` timestamp NULL DEFAULT NULL,
  `last_login_ip` varchar(20) DEFAULT '' COMMENT '上次登录ip',
  `reg_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `loginName` (`login_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
