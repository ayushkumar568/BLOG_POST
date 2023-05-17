CREATE DATABASE  IF NOT EXISTS `blog_post` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `blog_post`;
-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: blog_post
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blogpost`
--

DROP TABLE IF EXISTS `blogpost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogpost` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` longtext,
  `imageAndThumbnail` longtext,
  `createdBy` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedBy` int DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `isDeleted` tinyint DEFAULT '0',
  `isActive` tinyint DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogpost`
--

LOCK TABLES `blogpost` WRITE;
/*!40000 ALTER TABLE `blogpost` DISABLE KEYS */;
INSERT INTO `blogpost` VALUES (2,4,'tes2','this is description','uploads/02c1905ee28a3a8401660dc9c4837f06',4,'2023-05-16 12:07:43',NULL,NULL,0,1),(3,4,'tes3','this is description','',4,'2023-05-16 12:08:37',NULL,NULL,0,1),(4,4,' nature','desc','uploads/49da019099b4274d1c6514f7becc5c9e',4,'2023-05-16 13:00:41',4,'2023-05-16 15:52:38',1,1),(5,4,'tes3','this is description','uploads/1634f60b1c507c17775c312ef578f53a',4,'2023-05-16 13:02:07',NULL,NULL,0,1),(6,4,'tes3','this is description','uploads/6b341f574285194785a13a2be8b9ab29',4,'2023-05-16 13:02:34',4,'2023-05-16 18:33:07',0,0),(7,4,'tes3','this is description','uploads/2e5e88d17ce65b8f78427cad0db003ae',4,'2023-05-16 13:03:34',NULL,NULL,0,0),(8,5,'tes3','this is description','uploads/357094f1011da59f1c0e710c321f5120',5,'2023-05-16 13:11:49',NULL,NULL,0,1),(9,6,'game','game is for fun','uploads/1e29b83163dd2acb96c89db278897c7d',6,'2023-05-16 19:23:30',6,'2023-05-16 19:29:00',0,1);
/*!40000 ALTER TABLE `blogpost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isDeleted` tinyint DEFAULT '0',
  PRIMARY KEY (`id`,`lastname`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ayush','Kumar','ak@gmail.com','7f8ad47ea343cf07ce3532a4cf373a2f',0),(4,'Ayush','Kumar','ayushkumar568@gmail.com','dd17f975e323b156f803aa513df7a8d6',0),(5,'test','lastname','ak123@gmail.com','7daca546874ba1a9d52f474a8121349b',0),(6,'Akash','singh','as123@gmail.com','a3134c654656c86bc4dbf1538ae1b9a6',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-17 10:35:20
