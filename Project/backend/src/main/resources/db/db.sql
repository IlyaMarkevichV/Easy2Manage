DROP SCHEMA IF EXISTS easy2manage;

CREATE SCHEMA `easy2manage` ;

CREATE TABLE `easy2manage`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `easy2manage`.`project` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(4096) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `easy2manage`.`sprint` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `easy2manage`.`filter` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `query` VARCHAR(4096) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `easy2manage`.`ticket_info` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ticket_id` INT NOT NULL,
  `description` VARCHAR(4096) NULL,
  `start_date` DATE NOT NULL,
  `due_date` DATE NOT NULL,
  `estimated` FLOAT NOT NULL,
  `remaining` FLOAT NOT NULL,
  `logged` FLOAT NULL,
  `type` ENUM('STORY', 'DEV_TASK', 'DEFECT') NOT NULL,
  `priority` ENUM('LOW', 'NORMAL', 'MAJOR', 'CRITICAL', 'BLOCKER') NOT NULL,
  `status` ENUM('OPEN', 'IN_BUILD', 'IN_DESIGN', 'IN_ANALYSIS', 'READY_FOR_DESIGN', 'ON_HOLD', 'READY_FOR_TESTING', 'REOPENED', 'CLOSED', 'IN_QA', 'READY_FOR BUILD', 'QA_DONE', 'IMPLEMENT') NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `easy2manage`.`user_info` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `phone_number` VARCHAR(45) NULL,
  `image` BLOB NULL,
  `b_date` DATE NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `easy2manage`.`dashboard` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `filter_id` INT NULL,
  `user_id` INT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `easy2manage`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `easy2manage`.`ticket` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `assignee_id` INT NULL,
  `reporter_id` INT NULL,
  `project_id` INT NULL,
  `sprint_id` INT NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `easy2manage`.`user`
ADD INDEX `user2role_idx` (`role_id` ASC) VISIBLE;
ALTER TABLE `easy2manage`.`user`
ADD CONSTRAINT `user2role`
  FOREIGN KEY (`role_id`)
  REFERENCES `easy2manage`.`role` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `easy2manage`.`user_info`
ADD INDEX `user_info2user_idx` (`user_id` ASC) VISIBLE;
ALTER TABLE `easy2manage`.`user_info`
ADD CONSTRAINT `user_info2user`
  FOREIGN KEY (`user_id`)
  REFERENCES `easy2manage`.`user` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `easy2manage`.`dashboard`
ADD INDEX `dashboard2user_idx` (`user_id` ASC) VISIBLE,
ADD INDEX `dashboard2filter_idx` (`filter_id` ASC) VISIBLE;
ALTER TABLE `easy2manage`.`dashboard`
ADD CONSTRAINT `dashboard2user`
  FOREIGN KEY (`user_id`)
  REFERENCES `easy2manage`.`user` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `dashboard2filter`
  FOREIGN KEY (`filter_id`)
  REFERENCES `easy2manage`.`filter` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `easy2manage`.`ticket_info`
ADD INDEX `ticket_info2ticket_idx` (`ticket_id` ASC) VISIBLE;
ALTER TABLE `easy2manage`.`ticket_info`
ADD CONSTRAINT `ticket_info2ticket`
  FOREIGN KEY (`ticket_id`)
  REFERENCES `easy2manage`.`ticket` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `easy2manage`.`ticket`
ADD INDEX `ticket2assignee_idx` (`assignee_id` ASC) VISIBLE,
ADD INDEX `ticket2reporter_idx` (`reporter_id` ASC) VISIBLE,
ADD INDEX `ticket2project_idx` (`project_id` ASC) VISIBLE,
ADD INDEX `ticket2sprint_idx` (`sprint_id` ASC) VISIBLE;
ALTER TABLE `easy2manage`.`ticket`
ADD CONSTRAINT `ticket2assignee`
  FOREIGN KEY (`assignee_id`)
  REFERENCES `easy2manage`.`user` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `ticket2reporter`
  FOREIGN KEY (`reporter_id`)
  REFERENCES `easy2manage`.`user` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `ticket2project`
  FOREIGN KEY (`project_id`)
  REFERENCES `easy2manage`.`project` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `ticket2sprint`
  FOREIGN KEY (`sprint_id`)
  REFERENCES `easy2manage`.`sprint` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `easy2manage`.`ticket`
ADD COLUMN `parent_ticket_id` INT(11) NULL AFTER `sprint_id`,
ADD INDEX `ticket2parent_idx` (`parent_ticket_id` ASC) VISIBLE;
ALTER TABLE `easy2manage`.`ticket`
ADD CONSTRAINT `ticket2parent`
  FOREIGN KEY (`parent_ticket_id`)
  REFERENCES `easy2manage`.`ticket` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


ALTER TABLE `easy2manage`.`project`
ADD COLUMN `reporter_id` INT NULL DEFAULT NULL AFTER `description`,
ADD INDEX `project2reporter_idx` (`reporter_id` ASC) VISIBLE;
;
ALTER TABLE `easy2manage`.`project`
ADD CONSTRAINT `project2reporter`
  FOREIGN KEY (`reporter_id`)
  REFERENCES `easy2manage`.`user` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

