/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50552
Source Host           : 192.168.1.5:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50552
File Encoding         : 65001

Date: 2016-10-23 23:47:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_articles
-- ----------------------------
DROP TABLE IF EXISTS `t_articles`;
CREATE TABLE `t_articles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `article_id` varchar(35) NOT NULL COMMENT 'uuid',
  `author` varchar(50) NOT NULL COMMENT '作者',
  `title` varchar(100) NOT NULL COMMENT '标题',
  `classification` varchar(20) DEFAULT NULL COMMENT '类别',
  `manuscript` text COMMENT '草稿',
  `content` text NOT NULL COMMENT '内容',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `last_modified_time` timestamp NULL DEFAULT NULL COMMENT '最后修改时间',
  `like_count` int(11) DEFAULT NULL COMMENT '点赞数',
  `pageviews` int(11) DEFAULT NULL COMMENT '浏览数',
  `key_word` varchar(50) DEFAULT NULL COMMENT '关键字',
  `visibility` varchar(255) NOT NULL COMMENT '可见',
  PRIMARY KEY (`id`,`article_id`),
  KEY `author` (`author`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
