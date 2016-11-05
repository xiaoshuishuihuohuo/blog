/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50552
Source Host           : 192.168.1.5:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50552
File Encoding         : 65001

Date: 2016-11-05 20:15:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_article_comments
-- ----------------------------
DROP TABLE IF EXISTS `t_article_comments`;
CREATE TABLE `t_article_comments` (
  `id` varchar(35) NOT NULL COMMENT 'uuid',
  `author` varchar(50) NOT NULL COMMENT '评论人',
  `content` varchar(1000) NOT NULL COMMENT '评论内容',
  `article_id` varchar(35) NOT NULL COMMENT '评论所在文章id',
  `is_reply` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否是回复别人的评论，0否，1是',
  `reply_to` varchar(35) DEFAULT '' COMMENT '如果是回复，回复的评论id',
  `like_count` int(11) NOT NULL DEFAULT '0' COMMENT '赞',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间',
  `is_del` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
