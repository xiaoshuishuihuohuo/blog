-- ----------------------------
-- Function structure for getTalks
-- ----------------------------
DROP FUNCTION IF EXISTS `getTalks`;
DELIMITER ;;
CREATE DEFINER=`mysql`@`%` FUNCTION `getTalks`(current_id varchar(35)) RETURNS varchar(4000) CHARSET utf8
BEGIN  
	DECLARE result VARCHAR(4000);  
	DECLARE temp VARCHAR(4000);  
	SET result = '';  
	SET temp = current_id;
	WHILE temp is not NULL && LENGTH(trim(temp))>0 DO
		IF result is NULL || LENGTH(trim(result))<1 THEN
			SET result = CONCAT(result,'',temp); 
		ELSE
			SET result = CONCAT(result,',',temp); 
		END IF;
		
		SELECT reply_to INTO temp FROM t_article_comments where t_article_comments.id = temp;	
	END WHILE;  
	return result;  
END
;;
DELIMITER ;