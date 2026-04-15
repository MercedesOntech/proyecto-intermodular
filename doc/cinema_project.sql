-- MySQL Script corrected
-- Cinema Project FINAL VERSION

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `cinema_project` DEFAULT CHARACTER SET utf8 ;
USE `cinema_project` ;

-- -----------------------------------------------------
-- USER TYPE
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user_type` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- TARJET
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tarjet` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `number` INT NULL,
  `money` DECIMAL(10,2) NULL,
  `expiry` DATE NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- USER
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `age` INT NULL,
  `email` VARCHAR(45) NULL,
  `dni` VARCHAR(45) NULL,
  `userName` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `phone` INT NULL,
  `user_type_id` INT NOT NULL,
  `tarjet_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_user_type_idx` (`user_type_id`),
  INDEX `fk_user_tarjet_idx` (`tarjet_id`),
  CONSTRAINT `fk_user_user_type`
    FOREIGN KEY (`user_type_id`)
    REFERENCES `user_type` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_tarjet`
    FOREIGN KEY (`tarjet_id`)
    REFERENCES `tarjet` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- BAR TICKET
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bar_ticket` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `dateTicket` DATE NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_bar_ticket_user_idx` (`user_id`),
  CONSTRAINT `fk_bar_ticket_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- PRODUCT
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `price` DECIMAL(10,2) NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- BAR TICKET - PRODUCT (M:N)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `product_has_bar_ticket` (
  `product_id` INT NOT NULL,
  `bar_ticket_id` INT NOT NULL,
  PRIMARY KEY (`product_id`, `bar_ticket_id`),
  CONSTRAINT `fk_pt_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `product` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_pt_bar_ticket`
    FOREIGN KEY (`bar_ticket_id`)
    REFERENCES `bar_ticket` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- ROOM
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `room` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- FILM TYPE
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `film_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- FILM
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `film` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `releaseDate` DATE NULL,
  `room_id` INT NOT NULL,
  `film_type_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_film_room`
    FOREIGN KEY (`room_id`)
    REFERENCES `room` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_film_type`
    FOREIGN KEY (`film_type_id`)
    REFERENCES `film_type` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- FILM TICKET
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `film_ticket` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `dateTicket` DATE NULL,
  `user_id` INT NOT NULL,
  `film_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_ft_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ft_film`
    FOREIGN KEY (`film_id`)
    REFERENCES `film` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- SCHEDULE
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedule` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `timeSchedule` VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- FILM TICKET - SCHEDULE
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `film_ticket_has_schedule` (
  `film_ticket_id` INT NOT NULL,
  `schedule_id` INT NOT NULL,
  PRIMARY KEY (`film_ticket_id`, `schedule_id`),
  CONSTRAINT `fk_fth_ft`
    FOREIGN KEY (`film_ticket_id`)
    REFERENCES `film_ticket` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_fth_schedule`
    FOREIGN KEY (`schedule_id`)
    REFERENCES `schedule` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- CHAIR TYPE
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chair_type` (
  `id` INT NOT NULL,
  `type` VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- CHAIR
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chair` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `film_ticket_id` INT NOT NULL,
  `chair_type_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_chair_ft`
    FOREIGN KEY (`film_ticket_id`)
    REFERENCES `film_ticket` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_chair_type`
    FOREIGN KEY (`chair_type_id`)
    REFERENCES `chair_type` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- GENRE
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `genre` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- DIRECTOR
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `director` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- ACTOR
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `actor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- FILM_HAS_GENRE
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `film_has_genre` (
  `film_id` INT NOT NULL,
  `genre_id` INT NOT NULL,
  PRIMARY KEY (`film_id`, `genre_id`),
  CONSTRAINT `fk_fhg_film`
    FOREIGN KEY (`film_id`)
    REFERENCES `film` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_fhg_genre`
    FOREIGN KEY (`genre_id`)
    REFERENCES `genre` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- FILM_HAS_DIRECTOR
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `film_has_director` (
  `film_id` INT NOT NULL,
  `director_id` INT NOT NULL,
  PRIMARY KEY (`film_id`, `director_id`),
  CONSTRAINT `fk_fhd_film`
    FOREIGN KEY (`film_id`)
    REFERENCES `film` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_fhd_director`
    FOREIGN KEY (`director_id`)
    REFERENCES `director` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- FILM_HAS_ACTOR
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `film_has_actor` (
  `film_id` INT NOT NULL,
  `actor_id` INT NOT NULL,
  PRIMARY KEY (`film_id`, `actor_id`),
  CONSTRAINT `fk_fha_film`
    FOREIGN KEY (`film_id`)
    REFERENCES `film` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_fha_actor`
    FOREIGN KEY (`actor_id`)
    REFERENCES `actor` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;