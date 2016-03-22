SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `civicrm_campaingtappersonal`;

SET FOREIGN_KEY_CHECKS = 1;

-- /*******************************************************
-- *
-- * civicrm_campaingtappersonal
-- *
-- * campaingtap personal
-- *
-- *******************************************************/
CREATE TABLE `civicrm_campaingtappersonal` (

  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Unique ID of a Session',
  `title`       VARCHAR(64) COMMENT 'Title of the campaingtap personal',
  `description` TEXT COMMENT 'Description of the campaingtap personal',
  `role`        VARCHAR(64) COMMENT 'Role the campaingtap personal if appropriate for',
  `room`        VARCHAR(64) COMMENT 'Room where the campaing personal will take place'
  ,
  PRIMARY KEY (`id`)

)
  ENGINE =InnoDB
  DEFAULT CHARACTER SET utf8
  COLLATE utf8_unicode_ci;