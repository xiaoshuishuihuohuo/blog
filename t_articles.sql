/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50552
Source Host           : 192.168.1.5:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50552
File Encoding         : 65001

Date: 2016-12-05 15:35:02
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_articles
-- ----------------------------
DROP TABLE IF EXISTS `t_articles`;
CREATE TABLE `t_articles` (
  `id` varchar(35) NOT NULL COMMENT 'uuid',
  `author` varchar(50) NOT NULL DEFAULT '' COMMENT '作者',
  `title` varchar(100) DEFAULT '' COMMENT '标题',
  `ms_title` varchar(100) DEFAULT '' COMMENT '草稿标题',
  `classification` varchar(20) DEFAULT '' COMMENT '类别',
  `manuscript` text COMMENT '草稿',
  `content` text COMMENT '内容',
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `last_modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `like_count` int(11) unsigned zerofill NOT NULL DEFAULT '00000000000' COMMENT '点赞数',
  `pageviews` int(11) unsigned zerofill NOT NULL DEFAULT '00000000000' COMMENT '浏览数',
  `key_word` varchar(50) DEFAULT '' COMMENT '关键字',
  `visibility` tinyint(255) NOT NULL DEFAULT '0' COMMENT '可见',
  PRIMARY KEY (`id`),
  KEY `author` (`author`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
