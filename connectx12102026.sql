-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: connecto
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `admin_audit_logs`
--

DROP TABLE IF EXISTS `admin_audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_audit_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` bigint unsigned NOT NULL,
  `action` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_type` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_id` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `before_state` json DEFAULT NULL,
  `after_state` json DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `idx_audit_target` (`entity_type`,`entity_id`),
  KEY `idx_audit_admin` (`admin_id`,`created_at`),
  CONSTRAINT `fk_audit_admin` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`),
  CONSTRAINT `chk_audit_action_format` CHECK (regexp_like(`action`,_utf8mb4'^[a-z_]+[.][a-z_]+$'))
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_audit_logs`
--

LOCK TABLES `admin_audit_logs` WRITE;
/*!40000 ALTER TABLE `admin_audit_logs` DISABLE KEYS */;
INSERT INTO `admin_audit_logs` VALUES (1,1,'verification.approve','verification_submission','2','{\"status\": \"pending\"}','{\"status\": \"approved\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64)','2026-10-05 22:03:41.319'),(2,1,'user.suspend','user','5','{\"account_state\": \"active\"}','{\"reason\": \"Inappropriate bio\", \"account_state\": \"suspended\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64)','2026-10-09 22:03:41.319'),(3,1,'withdrawal.settle','withdrawal','2','{\"status\": \"pending\"}','{\"utr\": \"IMPS9921884411\", \"status\": \"paid\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64)','2026-10-08 22:03:41.319'),(4,1,'verification.approved','verification_submission','1','{\"status\": \"pending\"}','{\"action\": \"approved\"}',NULL,NULL,'2026-10-10 22:12:07.801'),(5,1,'withdrawal.paid','withdrawal','1','{\"status\": \"pending\"}','{\"note\": \"jhjhkj\", \"status\": \"paid\"}',NULL,NULL,'2026-10-10 22:13:47.390'),(6,1,'verification.approved','verification_submission','3','{\"status\": \"pending\"}','{\"action\": \"approved\"}',NULL,NULL,'2026-10-11 12:55:15.110'),(7,1,'verification.approved','verification_submission','4','{\"status\": \"pending\"}','{\"action\": \"approved\"}',NULL,NULL,'2026-10-11 12:57:26.351'),(8,1,'withdrawal.paid','withdrawal','3','{\"status\": \"pending\"}','{\"note\": \"asdcc@oksbi\", \"status\": \"paid\"}',NULL,NULL,'2026-10-11 15:34:44.374'),(9,1,'verification.approved','verification_submission','5','{\"status\": \"pending\"}','{\"action\": \"approved\"}',NULL,NULL,'2026-10-11 19:54:48.952'),(10,1,'verification.approved','verification_submission','6','{\"status\": \"pending\"}','{\"action\": \"approved\"}',NULL,NULL,'2026-10-11 22:54:14.198'),(11,1,'withdrawal.paid','withdrawal','5','{\"status\": \"pending\"}','{\"note\": \"jgjkhuylh\", \"status\": \"paid\"}',NULL,NULL,'2026-10-11 22:55:31.434');
/*!40000 ALTER TABLE `admin_audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_password_resets`
--

DROP TABLE IF EXISTS `admin_password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_password_resets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` bigint unsigned NOT NULL,
  `token_hash` char(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` datetime(3) NOT NULL,
  `consumed_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `idx_apr_lookup` (`admin_id`,`token_hash`,`consumed_at`,`expires_at`),
  CONSTRAINT `fk_apr_admin` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_password_resets`
--

LOCK TABLES `admin_password_resets` WRITE;
/*!40000 ALTER TABLE `admin_password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_refresh_tokens`
--

DROP TABLE IF EXISTS `admin_refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_refresh_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` bigint unsigned NOT NULL,
  `token_hash` char(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `family_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` datetime(3) NOT NULL,
  `revoked_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_hash` (`token_hash`),
  KEY `idx_art_admin_family` (`admin_id`,`family_id`),
  KEY `idx_art_expires` (`expires_at`),
  CONSTRAINT `fk_art_admin` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_refresh_tokens`
--

LOCK TABLES `admin_refresh_tokens` WRITE;
/*!40000 ALTER TABLE `admin_refresh_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'admin',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `last_login_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d','admin@connect24x.com','$2a$12$r0u4sdSgwV5nqtMo9G2oA.3Hp9v4glDjoownDKwxo52PKqQmlKshW','superadmin',1,'2026-10-11 22:44:18.258','2026-10-10 12:20:55.930','2026-10-11 22:44:18.258'),(2,'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e','moderator@connect24x.com','$2a$12$4L1yN2K2s8mJ19v1jR1qqubXoJ4w6j1q9q0E2eYk8F7d6g5h4i3j2','admin',1,NULL,'2026-10-10 16:49:50.462','2026-10-10 16:49:50.462');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_config`
--

DROP TABLE IF EXISTS `app_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_config` (
  `config_key` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `config_value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`config_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_config`
--

LOCK TABLES `app_config` WRITE;
/*!40000 ALTER TABLE `app_config` DISABLE KEYS */;
INSERT INTO `app_config` VALUES ('instagram_url','https://instagram.com/REPLACE_ME','2026-10-12 22:33:06.559'),('terms_female','By using Connect24x as a companion, you agree to provide authentic voice verification, treat all callers with respect, and abide by our community guidelines. Violations may result in account suspension.','2026-10-12 22:33:06.559'),('whatsapp_url','https://whatsapp.com/channel/REPLACE_ME','2026-10-12 22:33:06.559'),('youtube_url','https://youtube.com/@REPLACE_ME','2026-10-12 22:33:06.559');
/*!40000 ALTER TABLE `app_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_refresh_tokens`
--

DROP TABLE IF EXISTS `auth_refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_refresh_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `token_hash` char(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `family_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `device_id` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` datetime(3) NOT NULL,
  `revoked_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_hash` (`token_hash`),
  KEY `idx_urt_user_family` (`user_id`,`family_id`),
  KEY `idx_urt_expires` (`expires_at`),
  CONSTRAINT `fk_urt_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_refresh_tokens`
--

LOCK TABLES `auth_refresh_tokens` WRITE;
/*!40000 ALTER TABLE `auth_refresh_tokens` DISABLE KEYS */;
INSERT INTO `auth_refresh_tokens` VALUES (1,1,'f2fb16e1ad815b23bdd8b74941b159da4295f3626aeeb7e4078a163dbed98d6b','3ffa8e51-71f1-45d7-aa95-04ca2717e481','web-mv38qfd6-m79ov2wtjw','2026-11-10 03:15:56.283',NULL,'2026-10-11 08:45:56.287'),(2,1,'d524d932b360b44e5e2da3da9170f8669a3c62659e09a0ef4c9cf44860d5a24c','66604c21-578f-4766-95f1-85c1a78d7824','web-mv395ru4-7ubqmpqezk','2026-11-10 03:17:29.953',NULL,'2026-10-11 08:47:29.954'),(3,1,'876d61d1ac3e56a2298fa9bbb83265da765aaf2642df716f0d59f606004025c8','c4e93466-7f32-4b06-89b0-9a5158536a28','web-mv397mpu-q0hmes6m3l','2026-11-10 03:18:56.047',NULL,'2026-10-11 08:48:56.048'),(4,6,'644b6d6f8c25b2cbe8a133ad052d842069dcd184ba9b110de75c00ae4effa1a8','c085ade6-e8bc-4370-bc27-405b61ceda72','android-mv39yqv0-0ohhz38pep','2026-11-10 03:59:16.675',NULL,'2026-10-11 09:29:16.682'),(5,7,'6ab44ae3ea777ebde297963394b4e1c0180bb749f616d1eb0606c25e5a701995','2137282a-3a95-4e23-b5e7-5bee9d1da38a','android-mv39yqv0-0ohhz38pep','2026-11-10 04:01:02.676',NULL,'2026-10-11 09:31:02.678'),(6,8,'07ca82e18be70392bde177d15af5e44282da00b9b9deb6fcb73b8bae977f46fe','4953081e-0609-4a5c-bdeb-88fe3745274c','android-mv39yqv0-0ohhz38pep','2026-11-10 04:14:05.180',NULL,'2026-10-11 09:44:05.181'),(7,9,'e9e2e4783bc1bbd73d72e5ab8bd366ad79b69ef5bf64da3c620880aacf3ccaf2','e5166e89-0e71-4529-9181-e2603587cf56','android-mv39yqv0-0ohhz38pep','2026-11-10 04:24:32.759','2026-10-11 10:33:23.858','2026-10-11 09:54:32.763'),(8,9,'705671fb3e5c168315156d4a7c19b21969d5dff347731828381aa753172a2b7a','e5166e89-0e71-4529-9181-e2603587cf56','android-mv39yqv0-0ohhz38pep','2026-11-10 05:03:23.863',NULL,'2026-10-11 10:33:23.867'),(9,10,'aa10fe3e2193d7955521cc574dd475d04c1e9ba63ee702803e13dee2cf8150c6','3d686df1-3634-4e0d-a274-3be4df3cabfb','android-mv39yqv0-0ohhz38pep','2026-11-10 05:06:07.548','2026-10-11 10:51:28.020','2026-10-11 10:36:07.549'),(10,10,'5219b9998f088990a828ea20804205659eb5fb552b2ca01ccb5e497fb7d50b7f','3d686df1-3634-4e0d-a274-3be4df3cabfb','android-mv39yqv0-0ohhz38pep','2026-11-10 05:21:28.025',NULL,'2026-10-11 10:51:28.028'),(11,11,'98b29d9e7c9cf05071cfe95a2e64e71bf5e6ae3001e10cfe234a1646c2cdab4e','7ce5d6f7-7db8-4562-b5fb-356d07fea517','android-mv3edrp8-kut9x97w46','2026-11-10 05:43:37.296','2026-10-11 11:29:05.316','2026-10-11 11:13:37.299'),(12,11,'6ef0eb3082016b1ec20539947ee7686a265b1c4ed9314911bfdd0b70dbc976a3','7ce5d6f7-7db8-4562-b5fb-356d07fea517','android-mv3edrp8-kut9x97w46','2026-11-10 05:59:05.318','2026-10-11 11:44:11.009','2026-10-11 11:29:05.321'),(13,11,'61740b6c6f05011939327fea373fc38d4f29674fada3620d28cf2db1874dfe77','7ce5d6f7-7db8-4562-b5fb-356d07fea517','android-mv3edrp8-kut9x97w46','2026-11-10 06:14:11.017',NULL,'2026-10-11 11:44:11.019'),(14,6,'687f53a63fd619571c8bb6b806141ef63065064e086ef2e1779cd46eee06d4d3','d10f8d1f-312c-4ff4-9855-cef955b103c5','android-mv3edrp8-kut9x97w46','2026-11-10 06:31:30.696','2026-10-11 12:38:21.712','2026-10-11 12:01:30.700'),(15,6,'2c0ae3f49f72063712879846be4808f9aa30e6d49317b4dc340d9890c2be7065','d10f8d1f-312c-4ff4-9855-cef955b103c5','android-mv3edrp8-kut9x97w46','2026-11-10 07:08:21.718',NULL,'2026-10-11 12:38:21.719'),(16,6,'bbc2f84b182da1cc982f9b80d5c3a7536363430d832d8085bb656ad747e234ae','2775a5ed-0ee7-423f-822b-c549b4113751','android-mv3edrp8-kut9x97w46','2026-11-10 07:08:49.814',NULL,'2026-10-11 12:38:49.815'),(17,6,'d4a3b0395d682daae2e93f590c993bd8c0d1090e10a4f23dbea8bc09a60d2074','f8210003-8386-4be7-b92d-bc0c8a4ca296','android-mv3edrp8-kut9x97w46','2026-11-10 07:16:54.683',NULL,'2026-10-11 12:46:54.684'),(18,6,'925d1c4e30248a009a60e491d7f6a11b0a55dd782e584614171ae5f966cc9297','f87c45c2-f635-4de2-8419-58d2c4fb066e','android-mv3edrp8-kut9x97w46','2026-11-10 07:25:41.878','2026-10-11 13:10:42.638','2026-10-11 12:55:41.880'),(19,6,'ddb76c7f2a65e87b47a9ddc64de1cb965455b428419bc57d03ed70fc522690fc','f87c45c2-f635-4de2-8419-58d2c4fb066e','android-mv3edrp8-kut9x97w46','2026-11-10 07:40:42.640',NULL,'2026-10-11 13:10:42.642'),(20,7,'1414b4de89760817ef2761e700302d41f8d9351a6b5aed0bad05ff58d447e138','87c41038-e893-4bd9-868d-a86a81d6346d','android-mv3edrp8-kut9x97w46','2026-11-10 07:53:09.642','2026-10-11 13:38:12.676','2026-10-11 13:23:09.643'),(21,7,'423915c5af8e85e44a44ea113f794e49be938e0261aceef3a54d5b1db13c13d3','87c41038-e893-4bd9-868d-a86a81d6346d','android-mv3edrp8-kut9x97w46','2026-11-10 08:08:12.681',NULL,'2026-10-11 13:38:12.685'),(22,6,'0c4fa1275ef114ec453b7774c416963253cef1ef7dc1832e874b6bfa7c78d6f0','cbebabbb-a42f-4ace-a549-4cf17d0395a5','android-mv3edrp8-kut9x97w46','2026-11-10 08:09:25.165',NULL,'2026-10-11 13:39:25.166'),(23,7,'b0991926a333421c23720c48cf6f36dbe4e0b26e99482ef660902424529c1926','2e7b9c89-b76c-40a7-84a1-84613ef25667','android-mv3edrp8-kut9x97w46','2026-11-10 08:10:24.784','2026-10-11 14:17:13.097','2026-10-11 13:40:24.785'),(24,7,'7f237903803d46fabb0da188a9a70569a9a088d8c2b13831a52f6fcb13f167f2','2e7b9c89-b76c-40a7-84a1-84613ef25667','android-mv3edrp8-kut9x97w46','2026-11-10 08:47:13.099','2026-10-11 14:32:31.515','2026-10-11 14:17:13.102'),(25,7,'444949d70a866f098377cc0e7a630fee5b21c3e29e0f6fa04ce34a4eb8bdfd4f','2e7b9c89-b76c-40a7-84a1-84613ef25667','android-mv3edrp8-kut9x97w46','2026-11-10 09:02:31.519','2026-10-11 14:47:33.263','2026-10-11 14:32:31.522'),(26,7,'7e3d1b89b6b8b137912f1011e89ddb2bcba7927e7596f664e94ff98aee2194f5','2e7b9c89-b76c-40a7-84a1-84613ef25667','android-mv3edrp8-kut9x97w46','2026-11-10 09:17:33.266','2026-10-11 14:59:33.881','2026-10-11 14:47:33.267'),(27,7,'a80dcdb6f083fd346a4dec44b1b6945b190407cf80ce93ab5630b0dd23ffbb41','a060279d-9547-411b-85a6-d12c3ff7fa53','web-mv3m4k7s-yufzuzac14','2026-11-10 09:20:27.323',NULL,'2026-10-11 14:50:27.325'),(28,7,'c6152c040df949cfbbf63c11e4040e22b90fcfbab1952c1b7a34ffe2883182e6','6979e82c-d0b1-41a1-bf82-5878f2348e61','web-mv3m5ye8-6agld3o2mt','2026-11-10 09:21:32.546',NULL,'2026-10-11 14:51:32.547'),(29,7,'124d602728217b26c6b6c03bcfc1db055f278280a3701e1e63dbe2addc67e90c','5fc18d61-495c-497f-8d38-f7e9b472ba22','web-mv3m7z1x-7qkysxvos9','2026-11-10 09:23:10.201',NULL,'2026-10-11 14:53:10.202'),(30,6,'d19f76e456b81c9c4e5a645440b6239615992d5bf1cff8cb893cb6378e2a54f7','02a4c13b-ad61-4ee0-81b2-2d675d1009b6','web-mv3madlf-1wld4lhdu3','2026-11-10 09:24:58.961',NULL,'2026-10-11 14:54:58.962'),(31,6,'6152a5e545fda4f424c9c3e5083e562fa7ed147cfceeceadb42808a6f867764a','f1b14ae3-23b8-4586-9bf3-f55f2939e579','web-mv3mbjyh-4b11wsb7d5','2026-11-10 09:25:53.760',NULL,'2026-10-11 14:55:53.761'),(32,6,'902fc8d56f97f42ed892e08904e0c86b533b7c4eb00fd093ea53317321f1a165','a0f0ae83-9639-428f-8c56-4143677f744e','android-mv3edrp8-kut9x97w46','2026-11-10 09:34:08.622','2026-10-11 15:19:09.067','2026-10-11 15:04:08.626'),(33,6,'6875e5ff07f2b4f9055dcd5c27a11ba555ebe4e8ec0f0b6fc4f46a5477f4478a','a0f0ae83-9639-428f-8c56-4143677f744e','android-mv3edrp8-kut9x97w46','2026-11-10 09:49:09.068','2026-10-11 15:32:53.252','2026-10-11 15:19:09.071'),(34,6,'1fbc475bdd21d3e8046b8c85e44482f9f54211662707b85f0b1a43bdfd17db8a','e46942aa-4675-49a2-a5fd-1a22376beb88','android-mv3edrp8-kut9x97w46','2026-11-10 10:03:20.632','2026-10-11 15:48:20.774','2026-10-11 15:33:20.634'),(35,6,'f8f1459b6d26147f587cd2f7314a3222af899067f4ba3ceea4def6091b1a067e','e46942aa-4675-49a2-a5fd-1a22376beb88','android-mv3edrp8-kut9x97w46','2026-11-10 10:18:20.784','2026-10-11 16:03:22.373','2026-10-11 15:48:20.788'),(36,6,'ff28871aacaca68c1d0d54b947934634a9ce8cefc8388cff7f587723c05e6736','e46942aa-4675-49a2-a5fd-1a22376beb88','android-mv3edrp8-kut9x97w46','2026-11-10 10:33:22.377','2026-10-11 16:25:01.674','2026-10-11 16:03:22.381'),(37,6,'fb34b14c91c8608e645401a10001dab9c1026db5cd05a51f8580a49961a16a2f','e46942aa-4675-49a2-a5fd-1a22376beb88','android-mv3edrp8-kut9x97w46','2026-11-10 10:55:01.684','2026-10-11 20:23:44.803','2026-10-11 16:25:01.687'),(38,6,'7c61574e5e9bd6c6a98072d47eb970b6ecb55b60abf3c8f58580d518c3eaccf6','98e8c608-b638-412d-9c6e-07d3276f47cc','android-mv3wmq20-zqkiawvfvr','2026-11-10 14:14:28.460','2026-10-11 19:46:22.981','2026-10-11 19:44:28.465'),(39,7,'4bcb61fffdcd7fa2b13d64dbedaf501b48328977a96546143a30c244d5c3acb1','9a8a38a4-a180-4475-a034-1016dcd4cd0d','android-mv3wmq20-zqkiawvfvr','2026-11-10 14:16:33.232','2026-10-11 19:52:41.334','2026-10-11 19:46:33.233'),(40,12,'0ed4e84c029787120b841dd5b778aed2fd3914d8e8966f6799c282bbb91be0a4','077c585b-85c4-4ec1-9ac9-d47840c087e2','android-mv3wmq20-zqkiawvfvr','2026-11-10 14:22:56.701','2026-10-11 20:42:01.991','2026-10-11 19:52:56.702'),(41,6,'c2e2610b2c3c86c9ea574736800f56094458478b648186671c790af7550c9728','e46942aa-4675-49a2-a5fd-1a22376beb88','android-mv3edrp8-kut9x97w46','2026-11-10 14:53:44.828','2026-10-11 20:34:05.468','2026-10-11 20:23:44.831'),(42,6,'3b8ef3cbdda7724f7d28635f95a1b2cac70ede0aca9a781872e548dc187a605f','e0d36d20-bab6-446d-b41d-79eeda296857','android-mv3ydxev-t7cp3mjhcn','2026-11-10 15:03:35.849','2026-10-11 20:43:54.898','2026-10-11 20:33:35.851'),(43,7,'76bf43120e996553330f6812dfdedb81dae552c7e3b3fb546aeb767f3ad5f4f0','7983b155-c753-409a-b3f4-42c7428ee1d7','android-mv3edrp8-kut9x97w46','2026-11-10 15:04:15.036',NULL,'2026-10-11 20:34:15.037'),(44,12,'cb0bdc97abb3663c873dee60144708c86ee32a48b2670a82f6b723571af45e15','077c585b-85c4-4ec1-9ac9-d47840c087e2','android-mv3wmq20-zqkiawvfvr','2026-11-10 15:12:01.999','2026-10-11 20:42:46.112','2026-10-11 20:42:02.002'),(45,7,'3a7be8c95484ea36b8f65718df3a7ce3370f57359d9288c69b580254667303fa','055d440d-548f-4bf4-a782-4d31f56e60ea','android-mv3wmq20-zqkiawvfvr','2026-11-10 15:12:57.551','2026-10-11 20:58:27.262','2026-10-11 20:42:57.551'),(46,7,'2ee4fd38ac9900c905d35ecae6647136bd71b8edaf885da6c4e992b332543a34','055d440d-548f-4bf4-a782-4d31f56e60ea','android-mv3wmq20-zqkiawvfvr','2026-11-10 15:28:27.267',NULL,'2026-10-11 20:58:27.269'),(47,6,'361004fc604de3ed1ab753c86c8e2b4a3e6303ea072bff6fe8f29a6e0bd8290d','a4df0036-7536-4da8-89ec-60c0c7bca189','android-mv40h7g1-tc0i7ok0me','2026-11-10 16:02:09.979',NULL,'2026-10-11 21:32:09.983'),(48,6,'7693494c1c8b34eb3fd2900233c26d76e33d4e73b153825a01e18434440d60b1','6110a4cc-5c73-477a-91a3-395f20229a71','android-mv417w3f-wv8tlgfd02','2026-11-10 16:22:54.593','2026-10-11 22:02:30.552','2026-10-11 21:52:54.595'),(49,7,'af8bfd8f537952f6b26da451ee20e76f2a50fc33abe5aeb899e6ad5c00897777','ff7f3d70-6d34-4a38-a509-fa0f9ab8164f','android-mv417w3f-wv8tlgfd02','2026-11-10 16:32:39.362','2026-10-11 22:25:38.230','2026-10-11 22:02:39.363'),(50,7,'af5c5a9528958394ba59d3bbc40517d735b22ef74a0adc4aeb54157cac96a90b','ff7f3d70-6d34-4a38-a509-fa0f9ab8164f','android-mv417w3f-wv8tlgfd02','2026-11-10 16:55:38.254','2026-10-11 22:46:12.848','2026-10-11 22:25:38.256'),(51,7,'790ed29c00b3603e04d517e5dba65e4cd2f7c7a5907915cc45a6cea71c428df1','ff7f3d70-6d34-4a38-a509-fa0f9ab8164f','android-mv417w3f-wv8tlgfd02','2026-11-10 17:16:12.849',NULL,'2026-10-11 22:46:12.854'),(52,6,'3c44bc6b37138ff60f5fe5886a4d7b966cdf709e75a026c0d1a7753baf7532eb','c1669973-6e4c-4fa0-badf-4e9cbccb43a2','android-mv417w3f-wv8tlgfd02','2026-11-10 17:18:38.141','2026-10-11 22:51:30.412','2026-10-11 22:48:38.142'),(53,13,'b7cf3613b2ff9041db4e9d157fff8dc7a523207af0c8fd2a20154a356cfa3cc6','ec16b5f4-fcbe-4ccd-8ae7-38bcba49c230','android-mv417w3f-wv8tlgfd02','2026-11-10 17:21:42.597','2026-10-11 23:00:57.638','2026-10-11 22:51:42.599'),(54,7,'897cd99cbf04e980090a5e2fb576a753ba57296174efe4f598399f104b2dee27','e003c219-7b5b-463c-99f5-976038c7db96','android-mv417w3f-wv8tlgfd02','2026-11-10 17:31:07.447','2026-10-11 23:16:32.262','2026-10-11 23:01:07.448'),(55,7,'7f7875197ca2c49ae72e71855b4f49c069f1494942e5cc8d13a4d33c55e4338b','e003c219-7b5b-463c-99f5-976038c7db96','android-mv417w3f-wv8tlgfd02','2026-11-10 17:46:32.290',NULL,'2026-10-11 23:16:32.293'),(56,6,'380bac314e545f08fda1f7d23df07d55b73b0c34f3de099ea0bc4e6c622d470b','31719b24-925e-41ca-a805-31125b3f80fe','android-mv417w3f-wv8tlgfd02','2026-11-11 15:03:18.302','2026-10-12 20:34:26.494','2026-10-12 20:33:18.325'),(57,7,'95f274e9add4aefcaeef99fa21cdb4033997b0810f4a66a51afe72e2ee3f7e1b','48485dff-afcb-4a06-abdb-0b1c61afb700','android-mv417w3f-wv8tlgfd02','2026-11-11 15:04:38.678','2026-10-12 20:58:44.578','2026-10-12 20:34:38.680'),(58,7,'971520ae9e6d3ea96ebad4642cb82a427c16442efd83a845fcb5af65fd22e1f8','48485dff-afcb-4a06-abdb-0b1c61afb700','android-mv417w3f-wv8tlgfd02','2026-11-11 15:28:44.587','2026-10-12 21:26:31.632','2026-10-12 20:58:44.591'),(59,7,'e95179a2d0da760f045b7d90e1d38aa0358fb04e220ac9e1200c45ecd6283e41','48485dff-afcb-4a06-abdb-0b1c61afb700','android-mv417w3f-wv8tlgfd02','2026-11-11 15:56:31.641','2026-10-12 21:32:00.708','2026-10-12 21:26:31.643'),(60,6,'6be0159f0b99212157f37e9c2a34d49e8cbdf458f49c311aa66bbbfcdbd3fabb','fe296d6f-fdee-4dcf-a30e-20a8c7657ab2','android-mv417w3f-wv8tlgfd02','2026-11-11 16:02:09.148','2026-10-12 21:36:28.181','2026-10-12 21:32:09.151'),(61,7,'016000a8b083ac2efc37a9e664cb628738934e667b39a523589d090e9f8a6625','b941e005-b6a9-4320-b174-0a7b53d07233','android-mv417w3f-wv8tlgfd02','2026-11-11 16:06:38.907','2026-10-12 21:37:25.750','2026-10-12 21:36:38.909'),(62,6,'5eabad6fd9ad155571e81073ff1282f9634622c040768109af26ed9619a62d6c','bd73804f-cea4-44f3-9b4b-8b4250bc4555','android-mv417w3f-wv8tlgfd02','2026-11-11 16:07:34.089','2026-10-12 21:51:42.560','2026-10-12 21:37:34.090'),(63,6,'50cf94bf5d74795811788bff6aa8cbfd3ad42fc212a7c4bb2331ec846c3adfda','ef1fe740-d50e-48b7-95fd-40aa8d7d961f','android-mv417w3f-wv8tlgfd02','2026-11-11 16:21:50.283','2026-10-12 21:52:06.766','2026-10-12 21:51:50.286'),(64,7,'ee3181256973324d3a15f53905441903b699d400f1629a231c60b19e720a93be','a685ecdc-c4b7-4f63-a46c-82cb6079da37','android-mv417w3f-wv8tlgfd02','2026-11-11 16:22:14.320','2026-10-12 22:10:15.506','2026-10-12 21:52:14.322'),(65,7,'40910dc90d9f60a0d8b3a6bf01aeeb36012ca4aaac4f2b57e2554f85ede16c9d','a685ecdc-c4b7-4f63-a46c-82cb6079da37','android-mv417w3f-wv8tlgfd02','2026-11-11 16:40:15.513',NULL,'2026-10-12 22:10:15.518');
/*!40000 ALTER TABLE `auth_refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `call_broadcast_targets`
--

DROP TABLE IF EXISTS `call_broadcast_targets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `call_broadcast_targets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `session_id` bigint unsigned NOT NULL,
  `receiver_id` bigint unsigned NOT NULL,
  `responded_at` datetime(3) DEFAULT NULL,
  `accepted` tinyint(1) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_session_receiver` (`session_id`,`receiver_id`),
  KEY `receiver_id` (`receiver_id`),
  KEY `idx_session_pending` (`session_id`,`responded_at`),
  CONSTRAINT `call_broadcast_targets_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `call_sessions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `call_broadcast_targets_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `call_broadcast_targets`
--

LOCK TABLES `call_broadcast_targets` WRITE;
/*!40000 ALTER TABLE `call_broadcast_targets` DISABLE KEYS */;
INSERT INTO `call_broadcast_targets` VALUES (1,19,12,NULL,NULL,'2026-10-12 22:10:44.570'),(2,19,13,NULL,NULL,'2026-10-12 22:10:44.571'),(3,19,3,NULL,NULL,'2026-10-12 22:10:44.572');
/*!40000 ALTER TABLE `call_broadcast_targets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `call_sessions`
--

DROP TABLE IF EXISTS `call_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `call_sessions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `room_id` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caller_id` bigint unsigned NOT NULL,
  `receiver_id` bigint unsigned DEFAULT NULL,
  `status` enum('initiated','ringing','accepted','rejected','missed','cancelled','completed','failed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'initiated',
  `is_random` tinyint(1) NOT NULL DEFAULT '0',
  `active_receiver_lock` bigint unsigned GENERATED ALWAYS AS ((case when (`status` in (_utf8mb4'initiated',_utf8mb4'ringing',_utf8mb4'accepted')) then `receiver_id` else NULL end)) STORED,
  `initiated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `expires_at` datetime(3) NOT NULL,
  `accepted_at` datetime(3) DEFAULT NULL,
  `ended_at` datetime(3) DEFAULT NULL,
  `end_reason` enum('user_ended','balance_exhausted','network_drop','provider_failure','admin_terminated') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `room_id` (`room_id`),
  UNIQUE KEY `uq_active_receiver_lock` (`active_receiver_lock`),
  KEY `idx_call_status_receiver` (`receiver_id`,`status`),
  KEY `idx_call_status_caller` (`caller_id`,`status`),
  KEY `idx_call_sweep` (`status`,`expires_at`),
  KEY `idx_call_accepted_initiated` (`status`,`initiated_at`),
  CONSTRAINT `fk_cs_caller` FOREIGN KEY (`caller_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_cs_receiver` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `call_sessions`
--

LOCK TABLES `call_sessions` WRITE;
/*!40000 ALTER TABLE `call_sessions` DISABLE KEYS */;
INSERT INTO `call_sessions` (`id`, `uuid`, `room_id`, `caller_id`, `receiver_id`, `status`, `is_random`, `initiated_at`, `expires_at`, `accepted_at`, `ended_at`, `end_reason`) VALUES (1,'call-sess-uuid-00000000000000000001','room_c24x_sess_001',1,3,'completed',0,'2026-10-09 21:57:46.256','2026-10-09 21:57:46.256','2026-10-09 21:57:46.256','2026-10-09 22:02:06.256','user_ended'),(2,'call-sess-uuid-00000000000000000002','room_c24x_sess_002',1,3,'completed',0,'2026-10-10 21:57:46.256','2026-10-10 21:58:46.256','2026-10-10 21:57:46.256','2026-10-10 23:50:12.665','user_ended'),(3,'166d0782-3cc7-471b-b5b6-436fcc91c4cc','room_166d07823cc7471bb5b6436fcc91c4cc',7,6,'missed',0,'2026-10-11 13:38:36.284','2026-10-11 08:09:36.282',NULL,'2026-10-11 08:08:38.727','network_drop'),(4,'56ab1571-f86f-4c62-bb95-a2bacc292eeb','room_56ab1571f86f4c62bb95a2bacc292eeb',7,6,'missed',0,'2026-10-11 13:38:46.420','2026-10-11 08:09:46.420',NULL,'2026-10-11 08:08:48.739','network_drop'),(5,'f57e439d-7c9d-4efb-b600-9a59d22d7159','room_f57e439d7c9d4efbb6009a59d22d7159',7,6,'missed',0,'2026-10-11 14:47:28.529','2026-10-11 09:18:28.525',NULL,'2026-10-11 09:17:31.088','network_drop'),(6,'c20d0379-937e-4cfd-9985-7a22fa4bec70','room_c20d0379937e4cfd99857a22fa4bec70',7,6,'missed',0,'2026-10-11 19:46:43.329','2026-10-11 14:17:43.326',NULL,'2026-10-11 14:16:47.782','network_drop'),(7,'fc857d35-d62b-4560-9262-0e7430ba9af5','room_fc857d35d62b456092620e7430ba9af5',7,6,'missed',0,'2026-10-11 20:34:25.858','2026-10-11 15:05:25.852',NULL,'2026-10-11 15:04:27.222','network_drop'),(8,'986f33bc-9796-4412-87ce-cfe137155f04','room_986f33bc9796441287cecfe137155f04',7,6,'missed',0,'2026-10-11 20:34:45.148','2026-10-11 15:05:45.146',NULL,'2026-10-11 15:04:47.256','network_drop'),(9,'68de7ff0-2c78-4522-977d-a0bcd32ec2c6','room_68de7ff02c784522977da0bcd32ec2c6',7,6,'missed',0,'2026-10-11 20:35:18.964','2026-10-11 15:06:18.963',NULL,'2026-10-11 15:05:22.328','network_drop'),(10,'37e2ca74-740e-4334-9780-18b65f4e742d','room_37e2ca74740e4334978018b65f4e742d',7,6,'missed',0,'2026-10-11 20:43:07.231','2026-10-11 15:14:07.228',NULL,'2026-10-11 15:13:08.051','network_drop'),(11,'eeb11137-280c-4725-8329-f6bb3f271ef2','room_eeb11137280c47258329f6bb3f271ef2',7,6,'missed',0,'2026-10-11 20:43:12.947','2026-10-11 15:14:12.946',NULL,'2026-10-11 15:13:13.058','network_drop'),(12,'de0aecbe-cc11-476d-a9a1-a57453a5d0ac','room_de0aecbecc11476da9a1a57453a5d0ac',7,6,'missed',0,'2026-10-11 20:43:32.403','2026-10-11 15:14:32.403',NULL,'2026-10-11 15:13:33.094','network_drop'),(13,'d12b8b8d-d103-471b-95a2-b58be540f700','room_d12b8b8dd103471b95a2b58be540f700',7,6,'missed',0,'2026-10-11 20:59:25.923','2026-10-11 15:30:25.920',NULL,'2026-10-11 15:29:28.771','network_drop'),(14,'3591a20d-5e82-49a6-a7f9-abfb9b0caa53','room_3591a20d5e8249a6a7f9abfb9b0caa53',7,13,'missed',0,'2026-10-11 23:02:05.565','2026-10-11 17:33:05.563',NULL,'2026-10-11 17:32:09.169','network_drop'),(15,'30e1ac1f-c656-11f1-84b2-00ff83988b02','room_seed_30e1bfa1-c656-11f1-84b2-00ff83988b02',7,6,'completed',0,'2026-10-10 21:31:31.472','2026-10-10 21:32:31.472','2026-10-10 21:31:31.472','2026-10-10 21:36:31.472','user_ended'),(16,'30e28117-c656-11f1-84b2-00ff83988b02','room_seed_30e2816e-c656-11f1-84b2-00ff83988b02',7,6,'completed',0,'2026-10-11 21:31:31.472','2026-10-11 21:32:31.472','2026-10-11 21:31:31.472','2026-10-11 21:34:31.472','user_ended'),(17,'30e28f3d-c656-11f1-84b2-00ff83988b02','room_seed_30e28f5e-c656-11f1-84b2-00ff83988b02',7,6,'completed',0,'2026-10-12 17:31:31.472','2026-10-12 17:32:31.472','2026-10-12 17:31:31.472','2026-10-12 17:38:31.472','user_ended'),(18,'d3607a1d-a6f4-4609-9893-fad72476d35e','room_d3607a1da6f446099893fad72476d35e',7,6,'missed',0,'2026-10-12 21:52:36.889','2026-10-12 16:23:36.885',NULL,'2026-10-12 16:22:39.954','network_drop'),(19,'1b79fb9e-282f-4cf9-bc50-aad8bd92e1e7','room_1b79fb9e282f4cf9bc50aad8bd92e1e7',7,NULL,'missed',1,'2026-10-12 22:10:44.557','2026-10-12 16:41:44.555',NULL,'2026-10-12 16:40:45.953','network_drop');
/*!40000 ALTER TABLE `call_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calls_history`
--

DROP TABLE IF EXISTS `calls_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calls_history` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_id` bigint unsigned NOT NULL,
  `caller_id` bigint unsigned NOT NULL,
  `receiver_id` bigint unsigned NOT NULL,
  `start_time` datetime(3) NOT NULL,
  `end_time` datetime(3) NOT NULL,
  `duration_seconds` int unsigned NOT NULL,
  `billed_minutes` int unsigned NOT NULL,
  `rate_caller` decimal(12,2) NOT NULL DEFAULT '3.00',
  `rate_receiver` decimal(12,2) NOT NULL DEFAULT '1.50',
  `amount_deducted` decimal(12,2) NOT NULL,
  `amount_earned` decimal(12,2) NOT NULL,
  `platform_margin` decimal(12,2) NOT NULL,
  `status` enum('finalized','refunded','disputed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'finalized',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `session_id` (`session_id`),
  KEY `idx_ch_caller` (`caller_id`,`created_at` DESC),
  KEY `idx_ch_receiver` (`receiver_id`,`created_at` DESC),
  CONSTRAINT `fk_ch_caller` FOREIGN KEY (`caller_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_ch_receiver` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_ch_session` FOREIGN KEY (`session_id`) REFERENCES `call_sessions` (`id`),
  CONSTRAINT `chk_billed_minutes` CHECK ((`billed_minutes` >= 1)),
  CONSTRAINT `chk_call_amounts` CHECK (((`amount_deducted` = (`billed_minutes` * `rate_caller`)) and (`amount_earned` = (`billed_minutes` * `rate_receiver`)) and (`platform_margin` = (`amount_deducted` - `amount_earned`))))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calls_history`
--

LOCK TABLES `calls_history` WRITE;
/*!40000 ALTER TABLE `calls_history` DISABLE KEYS */;
INSERT INTO `calls_history` VALUES (1,'call-hist-uuid-00000000000000000001',1,1,3,'2026-10-09 21:57:46.303','2026-10-09 22:02:06.303',260,5,3.00,1.50,15.00,7.50,7.50,'finalized','2026-10-09 22:02:06.303'),(2,'30e62abb-c656-11f1-84b2-00ff83988b02',15,7,6,'2026-10-10 21:31:31.472','2026-10-10 21:36:31.472',300,5,3.00,1.50,15.00,7.50,7.50,'finalized','2026-10-12 21:31:31.495'),(3,'30e65610-c656-11f1-84b2-00ff83988b02',16,7,6,'2026-10-11 21:31:31.472','2026-10-11 21:34:31.472',180,3,3.00,1.50,9.00,4.50,4.50,'finalized','2026-10-12 21:31:31.495'),(4,'30e6575e-c656-11f1-84b2-00ff83988b02',17,7,6,'2026-10-12 17:31:31.472','2026-10-12 17:38:31.472',420,7,3.00,1.50,21.00,10.50,10.50,'finalized','2026-10-12 21:31:31.495');
/*!40000 ALTER TABLE `calls_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `idempotency_keys`
--

DROP TABLE IF EXISTS `idempotency_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `idempotency_keys` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `scope` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idem_key` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_code` smallint unsigned NOT NULL,
  `response_json` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` datetime(3) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_scope_key` (`scope`,`idem_key`),
  KEY `idx_idem_cleanup` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `idempotency_keys`
--

LOCK TABLES `idempotency_keys` WRITE;
/*!40000 ALTER TABLE `idempotency_keys` DISABLE KEYS */;
INSERT INTO `idempotency_keys` VALUES (1,'recharge','886223b4-6b1a-4c3e-a010-0c8b5a3fa398',201,'{\"success\":true,\"data\":{\"rechargeUuid\":\"fc6c8834-17eb-42f5-b664-82359ed8fbea\",\"payuCheckoutUrl\":\"https://test.payu.in/_payment\",\"params\":{\"key\":\"WJ1qog\",\"txnid\":\"fc6c8834-17eb-42f5-b664-82359ed8fbea\",\"amount\":\"104.00\",\"productinfo\":\"Wallet Recharge\",\"firstname\":\"Raj\",\"email\":\"919174497168@connect24x.internal\",\"phone\":\"+919174497168\",\"surl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"furl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"hash\":\"a8a12aa1f377d35d890e64903cad2590980c2012f8a7bcc7bed77dfeddbab8fa75ee7a9dd7b6089a3b0c63a0b6634559df38479eb2936fe79b81e676ebab3379\"}},\"error\":null}','2026-10-12 08:08:13.544','2026-10-11 13:38:13.550'),(2,'recharge','b1e84098-7d30-48fb-9090-98a725093ea6',201,'{\"success\":true,\"data\":{\"rechargeUuid\":\"5fdc52bb-fd17-47ef-8703-5bb892485d66\",\"payuCheckoutUrl\":\"https://test.payu.in/_payment\",\"params\":{\"key\":\"WJ1qog\",\"txnid\":\"5fdc52bb-fd17-47ef-8703-5bb892485d66\",\"amount\":\"208.00\",\"productinfo\":\"Wallet Recharge\",\"firstname\":\"Raj\",\"email\":\"919174497168@connect24x.internal\",\"phone\":\"+919174497168\",\"surl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"furl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"hash\":\"8225d2c7b48b09d1bcca1a8a888a3d0d1b348e7b9dd1f239037f7fe4dadfbc80dd4d12b068fa4e930c431854c0bea1d238a2fee9e82bbf90bab3dc55bf80226b\"}},\"error\":null}','2026-10-12 08:12:52.839','2026-10-11 13:42:52.849'),(3,'recharge','2c3f43e9-da7a-4e08-9943-4f7a10cb434b',201,'{\"success\":true,\"data\":{\"rechargeUuid\":\"370c032b-9d03-4003-bf9e-88b65aa5afdf\",\"payuCheckoutUrl\":\"https://test.payu.in/_payment\",\"params\":{\"key\":\"WJ1qog\",\"txnid\":\"370c032b-9d03-4003-bf9e-88b65aa5afdf\",\"amount\":\"104.00\",\"productinfo\":\"Wallet Recharge\",\"firstname\":\"Raj\",\"email\":\"919174497168@connect24x.internal\",\"phone\":\"+919174497168\",\"surl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"furl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"hash\":\"1c15b9fff08b5b06d5517bc08a90a42b6dc7df5789d2b5344be3723a7783053a151e144294e68e50b861c34198b8496606d54f5281f952adcc3c3f3df650105f\"}},\"error\":null}','2026-10-12 08:15:29.346','2026-10-11 13:45:29.347'),(4,'recharge','57c81d42-16e7-4615-95e3-59eedf5a14af',201,'{\"success\":true,\"data\":{\"rechargeUuid\":\"28de33b3-cffb-4d40-85f2-a07180e971c7\",\"payuCheckoutUrl\":\"https://test.payu.in/_payment\",\"params\":{\"key\":\"MqsP4b\",\"txnid\":\"28de33b3-cffb-4d40-85f2-a07180e971c7\",\"amount\":\"104.00\",\"productinfo\":\"Wallet Recharge\",\"firstname\":\"Raj\",\"email\":\"919174497168@connect24x.internal\",\"phone\":\"+919174497168\",\"surl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"furl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"hash\":\"8d7c5af53c448243ee02b82a3f0793915616b1d4f1e8c3b08728fb7c4771dbaea69294fd2763fb57a3b37ad0b6e818d0aa1ae564afc52c91037ef17082950d18\"}},\"error\":null}','2026-10-12 08:16:01.230','2026-10-11 13:46:01.235'),(5,'recharge','71f341ab-5a60-4cb1-9b6c-955fcf2cf451',201,'{\"success\":true,\"data\":{\"rechargeUuid\":\"cf5b1528-fb92-4164-8202-6de0d3ae262c\",\"payuCheckoutUrl\":\"https://test.payu.in/_payment\",\"params\":{\"key\":\"MqsP4b\",\"txnid\":\"cf5b1528-fb92-4164-8202-6de0d3ae262c\",\"amount\":\"104.00\",\"productinfo\":\"Wallet Recharge\",\"firstname\":\"Raj\",\"email\":\"919174497168@connect24x.internal\",\"phone\":\"+919174497168\",\"surl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"furl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"hash\":\"361abf124dd3b0ac805000c5ffecd8d42750636623a1eb17b9585ccc4e5eead2ee2b99ca6d96303eea4834745dad21ddcc825390bcb7bfaa7d8ed24d0bd6fbbc\"}},\"error\":null}','2026-10-12 08:16:25.412','2026-10-11 13:46:25.415'),(6,'recharge','58f319f9-a8df-41e2-bffb-152f97d5fbd7',201,'{\"success\":true,\"data\":{\"rechargeUuid\":\"a4bf5b06-a4d3-4ab1-9040-1fec9920b0f5\",\"payuCheckoutUrl\":\"https://test.payu.in/_payment\",\"params\":{\"key\":\"MqsP4b\",\"txnid\":\"a4bf5b06-a4d3-4ab1-9040-1fec9920b0f5\",\"amount\":\"104.00\",\"productinfo\":\"Wallet Recharge\",\"firstname\":\"Raj\",\"email\":\"919174497168@connect24x.internal\",\"phone\":\"+919174497168\",\"surl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"furl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"hash\":\"79c02603b836c13649dc3452357cfcc876850102097a151dcc367461e2fe8677cc49013f0f1aff5d1b04d9e631d68885390085f58d668a13b4fb5ca8f1c4a0a2\"}},\"error\":null}','2026-10-12 08:17:14.364','2026-10-11 13:47:14.366'),(7,'recharge','382bfc80-836c-4d7f-a5c5-ff6dfb87f1ed',201,'{\"success\":true,\"data\":{\"rechargeUuid\":\"b10742fd-5783-4944-8b53-ebd83b124585\",\"payuCheckoutUrl\":\"https://test.payu.in/_payment\",\"params\":{\"key\":\"MqsP4b\",\"txnid\":\"b10742fd-5783-4944-8b53-ebd83b124585\",\"amount\":\"104.00\",\"productinfo\":\"Wallet Recharge\",\"firstname\":\"Raj\",\"email\":\"919174497168@connect24x.internal\",\"phone\":\"+919174497168\",\"surl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"furl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"hash\":\"54c5f7dd9d0ca8dc340e33096ca2f6a6f1be36803dcef325fb441904d1c530c856021a9482b4cb92653f856ef6c890cdc5083d80ac8b9ac1a8e04bd7e71263d2\"}},\"error\":null}','2026-10-12 08:17:34.835','2026-10-11 13:47:34.837'),(8,'recharge','a5c15131-8154-42d0-abe4-55cf468e047a',201,'{\"success\":true,\"data\":{\"rechargeUuid\":\"4f86fdce-51a7-4162-b73f-0d8275843f17\",\"payuCheckoutUrl\":\"https://test.payu.in/_payment\",\"params\":{\"key\":\"MqsP4b\",\"txnid\":\"4f86fdce-51a7-4162-b73f-0d8275843f17\",\"amount\":\"104.00\",\"productinfo\":\"Wallet Recharge\",\"firstname\":\"Raj\",\"email\":\"919174497168@connect24x.internal\",\"phone\":\"+919174497168\",\"surl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"furl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"hash\":\"73a3b503c514494915a57854e39a18fa0098a818b3e1f22aba199d8eaec177503e45f6682026aca3a56f2b090a7b4d74a9f4fe5e7cc3a83b848a603ca26ea899\"}},\"error\":null}','2026-10-12 08:18:15.669','2026-10-11 13:48:15.671'),(9,'recharge','d40f23a6-3ffa-444d-8d4a-75d6d6566b01',201,'{\"success\":true,\"data\":{\"rechargeUuid\":\"8b87e1f5-6a79-48ab-859d-17df0a64ec95\",\"payuCheckoutUrl\":\"https://test.payu.in/_payment\",\"params\":{\"key\":\"MqsP4b\",\"txnid\":\"8b87e1f5-6a79-48ab-859d-17df0a64ec95\",\"amount\":\"104.00\",\"productinfo\":\"Wallet Recharge\",\"firstname\":\"Raj\",\"email\":\"919174497168@connect24x.internal\",\"phone\":\"+919174497168\",\"surl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"furl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"hash\":\"3cbf43d233a838bb7b6f3342569a1b7e8cfdee6c6f62f824df8a7759181eabf45c25b70165ea9c4121ee7595f2fb34424807b24cff21e07db46ce0f01c0e1d1c\"}},\"error\":null}','2026-10-12 08:19:11.252','2026-10-11 13:49:11.255'),(10,'recharge','44e45c7e-f7fe-438c-bb9e-5e0fa4642853',201,'{\"success\":true,\"data\":{\"rechargeUuid\":\"101f16f4-848a-4aff-b634-381748d9b0f3\",\"payuCheckoutUrl\":\"https://test.payu.in/_payment\",\"params\":{\"key\":\"MqsP4b\",\"txnid\":\"101f16f4-848a-4aff-b634-381748d9b0f3\",\"amount\":\"104.00\",\"productinfo\":\"Wallet Recharge\",\"firstname\":\"Raj\",\"email\":\"919174497168@connect24x.internal\",\"phone\":\"+919174497168\",\"surl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"furl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"hash\":\"9a105d47572d8fca0dfaa8cf1af3e5ce9c1a1e41da6ec5a8cc5da1f7c7d2e58533b355e7e46d8aff52e5d2a4174f947e3c5ee6cd86efbfd47f24fcf2e0e261aa\"}},\"error\":null}','2026-10-12 08:47:16.241','2026-10-11 14:17:16.244'),(11,'recharge','c094aafa-faa5-475f-bfbe-98df13f87331',201,'{\"success\":true,\"data\":{\"rechargeUuid\":\"9c33b3fc-128f-48a0-a9c5-92c28316e389\",\"payuCheckoutUrl\":\"https://test.payu.in/_payment\",\"params\":{\"key\":\"MqsP4b\",\"txnid\":\"9c33b3fc-128f-48a0-a9c5-92c28316e389\",\"amount\":\"104.00\",\"productinfo\":\"Wallet Recharge\",\"firstname\":\"Raj\",\"email\":\"919174497168@connect24x.internal\",\"phone\":\"+919174497168\",\"surl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"furl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"hash\":\"dbb6dc97d7e777bee607d538e1568f626a98f50cb7388851387b0bd38f82dfb751f31d794e666f2631afa3d2fe555e3dc95a1e098a718fa137d3956088089911\"}},\"error\":null}','2026-10-12 08:51:09.684','2026-10-11 14:21:09.689'),(12,'recharge','f274e3c4-1f9f-4f59-ac54-ecb6f9c571d8',201,'{\"success\":true,\"data\":{\"rechargeUuid\":\"3ec4c660-a172-45f9-b8f3-f793f6c26557\",\"payuCheckoutUrl\":\"https://test.payu.in/_payment\",\"params\":{\"key\":\"MqsP4b\",\"txnid\":\"3ec4c660-a172-45f9-b8f3-f793f6c26557\",\"amount\":\"104.00\",\"productinfo\":\"Wallet Recharge\",\"firstname\":\"Raj\",\"email\":\"919174497168@connect24x.internal\",\"phone\":\"+919174497168\",\"surl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"furl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"hash\":\"ace3f44b9baa105d35d68575c39e402f76f69dcb42309d27cc129c9ceb900b63ad6b37e8f91a609252aa3c54f5d3d9eb122915f2d080981c750c20301dcec2cb\"}},\"error\":null}','2026-10-12 08:51:26.870','2026-10-11 14:21:26.873'),(13,'recharge','77f71360-e1a9-4284-9990-bc05b61d3655',201,'{\"success\":true,\"data\":{\"rechargeUuid\":\"df3a5165-0d17-4326-8a4d-be3b410923e7\",\"payuCheckoutUrl\":\"https://test.payu.in/_payment\",\"params\":{\"key\":\"MqsP4b\",\"txnid\":\"df3a5165-0d17-4326-8a4d-be3b410923e7\",\"amount\":\"104.00\",\"productinfo\":\"Wallet Recharge\",\"firstname\":\"Raj\",\"email\":\"919174497168@connect24x.internal\",\"phone\":\"+919174497168\",\"surl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"furl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"hash\":\"624820464176ededda40f7d4c2c8711cd2281c18e5ece9e07a81ecafbc9119b2164561cf7509d82d3f93a40a899f3a5f4855d9597caae6dc26b979fad7a840ae\"}},\"error\":null}','2026-10-12 08:51:59.523','2026-10-11 14:21:59.525'),(14,'withdrawal','6682a7c7-7a88-479f-b087-58559565f48d',201,'{\"success\":true,\"data\":{\"withdrawalUuid\":\"c364741c-5cf2-45ee-9a67-da14f3e74571\",\"requestedAmount\":1000,\"taxAmount\":25,\"netAmount\":975,\"status\":\"pending\"},\"error\":null}','2026-10-12 10:03:55.718','2026-10-11 15:33:55.723'),(15,'withdrawal','01be4c03-8e08-4c01-a821-6c84a1eee189',201,'{\"success\":true,\"data\":{\"withdrawalUuid\":\"3dff0694-e3dd-44fa-b756-2cced65fa1ce\",\"requestedAmount\":2000,\"taxAmount\":50,\"netAmount\":1950,\"status\":\"pending\"},\"error\":null}','2026-10-12 10:05:59.730','2026-10-11 15:35:59.734'),(16,'recharge','064a32e7-dbd1-4593-8a03-bb7c9ca69d06',201,'{\"success\":true,\"data\":{\"rechargeUuid\":\"9621d43a-d798-421f-9cf6-956f4b9f1f1e\",\"payuCheckoutUrl\":\"https://test.payu.in/_payment\",\"params\":{\"key\":\"MqsP4b\",\"txnid\":\"9621d43a-d798-421f-9cf6-956f4b9f1f1e\",\"amount\":\"10.40\",\"productinfo\":\"Wallet Recharge\",\"firstname\":\"Raj\",\"email\":\"919174497168@connect24x.internal\",\"phone\":\"+919174497168\",\"surl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"furl\":\"https://77bc-2409-40e0-1012-df6d-edd6-cd8c-41a9-6538.ngrok-free.app/api/v1/recharges/payu/callback\",\"hash\":\"d1180e2f164e2dc8f01f00c2b48ee7ceeccec12036649b2dc597e9aed181f31a34db362e8567d2ec77bf99316f20d3d95dc60ca0ad2a4523ff21268149052b81\"}},\"error\":null}','2026-10-12 16:57:04.104','2026-10-11 22:27:04.110'),(17,'withdrawal','41c1554c-91b6-4bef-bbaf-9f0e987e9c6e',201,'{\"success\":true,\"data\":{\"withdrawalUuid\":\"8adeea7b-3f05-43ee-854c-14516f53920d\",\"requestedAmount\":1000,\"taxAmount\":25,\"netAmount\":975,\"status\":\"pending\"},\"error\":null}','2026-10-12 17:20:37.101','2026-10-11 22:50:37.105'),(18,'recharge','a1d43630-35be-4711-bed0-f1eb27093872',201,'{\"success\":true,\"data\":{\"rechargeUuid\":\"90f6a930-10eb-4047-8992-11fcfb11ac40\",\"payuCheckoutUrl\":\"https://test.payu.in/_payment\",\"params\":{\"key\":\"MqsP4b\",\"txnid\":\"90f6a930-10eb-4047-8992-11fcfb11ac40\",\"amount\":\"104.00\",\"productinfo\":\"Wallet Recharge\",\"firstname\":\"Raj\",\"email\":\"919174497168@connect24x.internal\",\"phone\":\"+919174497168\",\"surl\":\"https://plants-survey-subsequent-ment.trycloudflare.com/api/v1/recharges/payu/callback\",\"furl\":\"https://plants-survey-subsequent-ment.trycloudflare.com/api/v1/recharges/payu/callback\",\"hash\":\"3ea060458031116354986d40f4f4a5cc1ba9e5c4010a80fd33dd097ae89115082a65144cb9d56b76946bac96433a7e2831b8a38918a3958da01698842eef28c7\"}},\"error\":null}','2026-10-12 17:33:58.477','2026-10-11 23:03:58.481'),(19,'recharge','46d7d254-9250-478a-b101-6fab1534780d',201,'{\"success\":true,\"data\":{\"rechargeUuid\":\"4b38fa3b-7c15-4099-8a35-3554b8ca3ec7\",\"payuCheckoutUrl\":\"https://test.payu.in/_payment\",\"params\":{\"key\":\"MqsP4b\",\"txnid\":\"4b38fa3b-7c15-4099-8a35-3554b8ca3ec7\",\"amount\":\"104.00\",\"productinfo\":\"Wallet Recharge\",\"firstname\":\"Raj\",\"email\":\"919174497168@connect24x.internal\",\"phone\":\"+919174497168\",\"surl\":\"https://plants-survey-subsequent-ment.trycloudflare.com/api/v1/recharges/payu/callback\",\"furl\":\"https://plants-survey-subsequent-ment.trycloudflare.com/api/v1/recharges/payu/callback\",\"hash\":\"8a8d758889c0b4995e240523948d171bc3e677d848922a7a812e303be223e796878f423a3d0d3a9cbb1e561353c43d327cfa512781d4f5a21ceb3f5d8676f339\"}},\"error\":null}','2026-10-12 17:34:12.269','2026-10-11 23:04:12.270'),(20,'recharge','5dbf0fc2-83bf-493f-bb13-dc4099bd5863',201,'{\"success\":true,\"data\":{\"rechargeUuid\":\"39b8e5fa-b0fb-4956-9ad5-a2a2fd62f67d\",\"payuCheckoutUrl\":\"https://test.payu.in/_payment\",\"params\":{\"key\":\"MqsP4b\",\"txnid\":\"39b8e5fa-b0fb-4956-9ad5-a2a2fd62f67d\",\"amount\":\"1040.00\",\"productinfo\":\"Wallet Recharge\",\"firstname\":\"Raj\",\"email\":\"919174497168@connect24x.internal\",\"phone\":\"+919174497168\",\"surl\":\"https://subcommittee-gem-skin-decor.trycloudflare.com/api/v1/recharges/payu/callback\",\"furl\":\"https://subcommittee-gem-skin-decor.trycloudflare.com/api/v1/recharges/payu/callback\",\"hash\":\"5be80b1dfa8d7d7ccd14e34f68f07b1b9a4f2c7f06f9154f04ddef88a8d762b774ad0e388f5e2164d794f32d93bf9e83716c6f6494cb2a722a075f17c80dc10b\"}},\"error\":null}','2026-10-13 15:05:56.355','2026-10-12 20:35:56.359');
/*!40000 ALTER TABLE `idempotency_keys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `languages` (
  `code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_order` int unsigned NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES ('bn','Bengali',3,1,'2026-10-10 21:55:16.648'),('en','English',2,1,'2026-10-10 21:55:16.648'),('gu','Gujarati',7,1,'2026-10-10 21:55:16.648'),('hi','Hindi',1,1,'2026-10-10 21:55:16.648'),('kn','Kannada',8,1,'2026-10-10 21:55:16.648'),('mr','Marathi',5,1,'2026-10-10 21:55:16.648'),('pa','Punjabi',9,1,'2026-10-10 21:55:16.648'),('ta','Tamil',6,1,'2026-10-10 21:55:16.648'),('te','Telugu',4,1,'2026-10-10 21:55:16.648');
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otp_codes`
--

DROP TABLE IF EXISTS `otp_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otp_codes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code_hash` char(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL DEFAULT '0',
  `consumed_at` datetime(3) DEFAULT NULL,
  `expires_at` datetime(3) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `idx_otp_lookup` (`phone`,`consumed_at`,`expires_at`),
  KEY `idx_otp_recent` (`phone`,`created_at` DESC),
  CONSTRAINT `chk_otp_attempts` CHECK ((`attempts` <= 10))
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otp_codes`
--

LOCK TABLES `otp_codes` WRITE;
/*!40000 ALTER TABLE `otp_codes` DISABLE KEYS */;
INSERT INTO `otp_codes` VALUES (1,'+919876543210','00dca3f406d06370bca4b9715a95b287a60bb76c1d5700e835718d130b924de6',0,NULL,'2026-10-09 17:21:24.838','2026-10-09 22:46:24.857'),(2,'+919876543210','5abeac72e89322dd5d30da0f59d2fe6ec94d8a4f26ceb27284ea802a22bdecd3',0,NULL,'2026-10-11 03:10:30.816','2026-10-11 08:35:30.863'),(3,'+919876543210','efa07a4bc3c4191d03c303abe5b60543488be179610ba1aa51000ca478799f0a',0,'2026-10-11 08:45:56.204','2026-10-11 08:50:40.169','2026-10-11 08:45:40.169'),(4,'+919876543210','f8c48e9736aab70bfd70d5ec3094b206cd6c5b801460a4f6930223cb98e5b170',0,'2026-10-11 08:47:29.943','2026-10-11 08:52:26.901','2026-10-11 08:47:26.901'),(5,'+919876543210','6f33bfaa9350543354c1b74ecc16c89e9471f0177d4e2f870d41ac2b3f1fc6a2',0,'2026-10-11 08:48:56.035','2026-10-11 08:53:53.582','2026-10-11 08:48:53.582'),(6,'+917449716826','dcb4e2a8eeba767e83a20ee54fade49839d84842219da8534298864e0654e97e',0,NULL,'2026-10-11 08:54:38.981','2026-10-11 08:49:38.981'),(7,'+919865321470','20becc4832f6988bfc9f14c5ffb450216a6aced45133314aede821654dc1c87e',0,'2026-10-11 08:53:48.364','2026-10-11 08:58:00.132','2026-10-11 08:53:00.132'),(8,'+917458963210','bc7bd1e20a12b691315250cd3e1bb1f2444195ffe3878b5872ab711013246cf0',0,'2026-10-11 08:55:06.637','2026-10-11 09:00:04.110','2026-10-11 08:55:04.110'),(9,'+919174497168','943a8ffcac535c04b360639473e5ca5b0d7b62f04fee4cd98ca4fa82e081ac7a',0,'2026-10-11 09:10:02.283','2026-10-11 09:14:56.036','2026-10-11 09:09:56.036'),(10,'+919184789242','29e2383e8f9eecc85bc132ec55af2d02d60f1dbe834eb4c14122891930da33b3',0,'2026-10-11 09:14:57.169','2026-10-11 09:19:55.152','2026-10-11 09:14:55.152'),(11,'+919184789242','b10cd4272caab9ae4dce69975e2cc42806fc1842043d42c88162cc12558c4a61',0,'2026-10-11 09:20:44.424','2026-10-11 09:25:40.160','2026-10-11 09:20:40.160'),(12,'+919184789242','6a4bd75ec82e3359266eeb72e07f52b865aabc447a623fa4277a8abab75b3dbb',0,'2026-10-11 09:29:16.483','2026-10-11 09:34:12.090','2026-10-11 09:29:12.090'),(13,'+919174497168','500129dd9a773340cba38031a7e59b8b4f951a087d5515c1f8001977667fbec5',0,'2026-10-11 09:31:02.658','2026-10-11 09:36:00.786','2026-10-11 09:31:00.786'),(14,'+919184781241','09531bef7b1e82804b23ae1e13a7f987bd220fba7edc9576960d6efd4e841766',0,'2026-10-11 09:44:05.159','2026-10-11 09:49:03.444','2026-10-11 09:44:03.444'),(15,'+919184781454','dd2ad5ee52addb8a2518b25f4c526f2f37029b434b0fba6ab808884c263c19f3',0,'2026-10-11 09:54:32.726','2026-10-11 09:59:31.365','2026-10-11 09:54:31.365'),(16,'+917894561230','728bd995318ee7f2b259cab61d3243b2fe8bc952332dabc1c40feab0b9a1e790',0,'2026-10-11 10:27:20.292','2026-10-11 10:32:17.464','2026-10-11 10:27:17.464'),(17,'+919632581470','c0b148f172b5bdcee59b688ed51a68a9700e67790157dd7fbb08821291c7f165',0,'2026-10-11 10:36:07.527','2026-10-11 10:41:05.479','2026-10-11 10:36:05.479'),(18,'+918478924262','3e70840645987996fcf55f90ecefab9e244177ec7a248d8a1a65af362bf851ab',0,'2026-10-11 11:13:37.268','2026-10-11 11:18:35.512','2026-10-11 11:13:35.512'),(19,'+919184789242','9c148f98b7f899434f5fe1b35f29a3156641398258ccee5e0fd936432d4f1811',0,'2026-10-11 12:01:30.681','2026-10-11 12:06:29.116','2026-10-11 12:01:29.116'),(20,'+919184789242','b65ee5459f9bd6769eb147254d187a951b97b187117bc4ff06b97d995694a1fd',0,'2026-10-11 12:38:49.808','2026-10-11 12:43:47.732','2026-10-11 12:38:47.732'),(21,'+919184789242','e42d745c30ed1f83cc7ee79c86cead90114463cfb90bdb7c03deba551a49d4a5',0,'2026-10-11 12:46:54.670','2026-10-11 12:51:53.110','2026-10-11 12:46:53.110'),(22,'+919184789242','8c59f52c85cddefb0694052eb9f78123065523db4889d790cef2ec079038cf62',0,'2026-10-11 12:55:41.873','2026-10-11 13:00:40.506','2026-10-11 12:55:40.506'),(23,'+919174497168','32fd64310d273662421aae3bcb08028094b28b8b93c2e03ecf75ff46fcacdb36',0,'2026-10-11 13:23:09.635','2026-10-11 13:28:08.608','2026-10-11 13:23:08.608'),(24,'+919184789242','9b1d117db69fb4db4bccb16a942ade59788a91f94f3342c74c0313c9a39edc8d',0,'2026-10-11 13:39:25.154','2026-10-11 13:44:24.167','2026-10-11 13:39:24.167'),(25,'+919174497168','fb7012143eaccc4a9db6e8ffa27fe8ffa8f5e1d1d5d4234c6561ec004e5730c6',0,'2026-10-11 13:40:24.777','2026-10-11 13:45:23.391','2026-10-11 13:40:23.391'),(26,'+919174497168','84ae20aec4fca06100a0a4c691f100fc0ebad96a0fae41f5d0885fffc8fc2b77',0,'2026-10-11 14:50:27.301','2026-10-11 14:55:25.260','2026-10-11 14:50:25.260'),(27,'+919174497168','01de588ce265fee990d76fa1c02724c91c601f6f1f6c2121d13f6da164310e26',0,'2026-10-11 14:51:32.512','2026-10-11 14:56:30.351','2026-10-11 14:51:30.351'),(28,'+919174497168','3b66f4ef8d92ee7fd749155acdb2bd98350c707a09c7f024a3ec51c0e1666e23',0,'2026-10-11 14:53:10.193','2026-10-11 14:58:04.513','2026-10-11 14:53:04.513'),(29,'+919184789242','b7d5af11545e0b4bbae46d6c50f579c7a5268290c357bd43b832fb3a51017931',0,'2026-10-11 14:54:58.954','2026-10-11 14:59:56.672','2026-10-11 14:54:56.672'),(30,'+919184789242','aa441e6a417242680b5df3e594a5080ad546eb52a47a435aa5b7f3f7e74b77ac',0,'2026-10-11 14:55:53.754','2026-10-11 15:00:51.554','2026-10-11 14:55:51.554'),(31,'+919184789242','e781ddf505a3cc02b27afaad0226a59ef7d456500e51081e22cc6add10cca4d6',0,NULL,'2026-10-11 15:04:44.064','2026-10-11 14:59:44.064'),(32,'+919184789242','0c51b7526e23b336e18145847a190b24dbda334c4b58b2b5d3b2e9387f033557',0,NULL,'2026-10-11 15:04:54.601','2026-10-11 14:59:54.601'),(33,'+919184789242','997441cfa86ef377b237db736f78779b2b55474c36470ca930d5adb9dac0ca20',0,NULL,'2026-10-11 15:05:25.750','2026-10-11 15:00:25.750'),(34,'+919184789242','bf7001cd147995ff6bc3700e1852fddd46a1bcb9d6e1c104ec1ac8fde033142f',0,'2026-10-11 15:04:08.608','2026-10-11 15:07:33.051','2026-10-11 15:02:33.051'),(35,'+919184789242','038a54f31dd5a77248cdc1f6bebeae3bd802075d47af9d447eac1ece96ca0f73',0,'2026-10-11 15:33:20.624','2026-10-11 15:38:18.559','2026-10-11 15:33:18.559'),(36,'+919184789242','cdba183fb9ffb6030743a822cd9266b41d94d83fabeca09a528957463f2d6e6d',0,'2026-10-11 19:44:28.422','2026-10-11 19:49:26.627','2026-10-11 19:44:26.627'),(37,'+919174497168','734649f0cbe24a043f3a33df2d674463d22c7ac2bcc2290867a43e27940458b0',0,'2026-10-11 19:46:33.224','2026-10-11 19:51:30.988','2026-10-11 19:46:30.988'),(38,'+911236547890','4b341e041a1f770ece1a6a9e43dd27a2204769aa793eed43e023dd98b8631c23',0,'2026-10-11 19:52:56.686','2026-10-11 19:57:55.107','2026-10-11 19:52:55.107'),(39,'+919184789242','bae7c6c07d382db4c9197ca0501927377b22ddbbc2314e64bb66042a62a924bf',0,'2026-10-11 20:33:35.840','2026-10-11 20:38:34.135','2026-10-11 20:33:34.135'),(40,'+919174497168','415022d09f510a6a17cb8ee39b40f9ec2b41170a128bbdcb23c567c632b4e28b',0,'2026-10-11 20:34:15.032','2026-10-11 20:39:13.472','2026-10-11 20:34:13.472'),(41,'+919174497168','f2412cf6ff4085556327bcd9a6fc2ee1d681f292d3c9f37dff8e450373850f2d',0,'2026-10-11 20:42:57.541','2026-10-11 20:47:55.833','2026-10-11 20:42:55.833'),(42,'+919184789242','a9d752f91bbfafd635bcb5e6a148086bc888146ca04383c08b5e9185ef5c1fa7',0,'2026-10-11 21:32:09.962','2026-10-11 21:37:07.788','2026-10-11 21:32:07.788'),(43,'+919184789242','4d9f9023d81cbfa84a024cfd01538bbc81cbcb5b74bc0a5f71e52faad7f9b876',0,'2026-10-11 21:52:54.579','2026-10-11 21:57:52.894','2026-10-11 21:52:52.894'),(44,'+919174497168','d00b33411100f00a44987d9ea76b5898586f853bdf71186e02cf95fefdebe9ba',0,'2026-10-11 22:02:39.349','2026-10-11 22:07:37.624','2026-10-11 22:02:37.624'),(45,'+919184789242','8b376c1e740ee2be4f98adc841238551eb3fe69a2e2d809151e51914114a0cfa',0,'2026-10-11 22:48:38.129','2026-10-11 22:53:31.794','2026-10-11 22:48:31.794'),(46,'+915616546419','1671641d6a023a0ba448a8c319d8bdc7c49ea65d70d6bb23441463d3e0b9e673',0,'2026-10-11 22:51:42.586','2026-10-11 22:56:41.397','2026-10-11 22:51:41.397'),(47,'+919174497168','34461e383a3fc98e0e27311d7105218be009b40180830ae3b6766e5fb187ad41',0,'2026-10-11 23:01:07.442','2026-10-11 23:06:06.153','2026-10-11 23:01:06.153'),(48,'+919184789242','ccdb2244e47147ed5860b7cc661225ea5e6db3bd02f97848529a7ec042290db6',0,'2026-10-12 20:33:18.254','2026-10-12 20:38:16.525','2026-10-12 20:33:16.525'),(49,'+919174497168','8e980c922c68a6ea779e7f0c920aae1d14dd2ddbb0136fec42b8f892ba104414',0,'2026-10-12 20:34:38.666','2026-10-12 20:39:36.851','2026-10-12 20:34:36.851'),(50,'+919184789242','70dffe921a2cd5269dcdc3c34de88e6fc939bdeb9722f112426ea4309866479f',0,'2026-10-12 21:32:09.133','2026-10-12 21:37:07.977','2026-10-12 21:32:07.977'),(51,'+919174497168','c5295f0abb7194af2b88a9c810c85ec697f6ac128719cb2d9c5ea872ff425508',0,'2026-10-12 21:36:38.902','2026-10-12 21:41:37.661','2026-10-12 21:36:37.661'),(52,'+919184789242','f62bd2d04e3399d0ca73ca04744b40d2078f09e2d55df10796f65a846862a173',0,'2026-10-12 21:37:34.077','2026-10-12 21:42:32.668','2026-10-12 21:37:32.668'),(53,'+919184789242','25e25f9a736d1b6362bde9c11f3a01bd24dddd57e18314c6d9574672671dbec9',0,'2026-10-12 21:51:50.271','2026-10-12 21:56:49.121','2026-10-12 21:51:49.121'),(54,'+919174497168','fdfafd17174635c76e85f71500d2ae71670f23eef631f3a5767629d355ffb66a',0,'2026-10-12 21:52:14.307','2026-10-12 21:57:12.928','2026-10-12 21:52:12.928');
/*!40000 ALTER TABLE `otp_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_transactions`
--

DROP TABLE IF EXISTS `payment_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_transactions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `provider` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_type` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider_txn_id` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `raw_payload` json NOT NULL,
  `recharge_id` bigint unsigned DEFAULT NULL,
  `processed` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_provider_txn` (`provider`,`provider_txn_id`),
  KEY `idx_pt_processed` (`processed`,`created_at`),
  KEY `fk_pt_recharge` (`recharge_id`),
  CONSTRAINT `fk_pt_recharge` FOREIGN KEY (`recharge_id`) REFERENCES `recharges` (`id`),
  CONSTRAINT `chk_pt_payload_size` CHECK ((json_storage_size(`raw_payload`) <= 65535))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_transactions`
--

LOCK TABLES `payment_transactions` WRITE;
/*!40000 ALTER TABLE `payment_transactions` DISABLE KEYS */;
INSERT INTO `payment_transactions` VALUES (1,'payu','success','613345778913420998','{\"key\": \"MqsP4b\", \"city\": \"\", \"hash\": \"006c983e2679b790a3b242347f6b3e21082b10b6994f0037523ba6c0f18645e6fad69201fd049f9d7899e26ced7464d23e8f1283f8956f80a627b5a431948d23\", \"mode\": \"UPI\", \"udf1\": \"\", \"udf2\": \"\", \"udf3\": \"\", \"udf4\": \"\", \"udf5\": \"\", \"udf6\": \"\", \"udf7\": \"\", \"udf8\": \"\", \"udf9\": \"\", \"email\": \"919174497168@connect24x.internal\", \"error\": \"E000\", \"phone\": \"919174497168\", \"state\": \"\", \"txnid\": \"4b38fa3b-7c15-4099-8a35-3554b8ca3ec7\", \"udf10\": \"\", \"amount\": \"104.00\", \"field1\": \"anything@payu\", \"field2\": \"4b38fa3b-7c15-4099-8a35-3554b8ca3ec7\", \"field3\": \"\", \"field4\": \"Raj\", \"field5\": \"AXIbp6CCma8OdoAYHWa3bkaahaRr6i4X4yI\", \"field6\": \"\", \"field7\": \"Transaction completed successfully\", \"field8\": \"generic\", \"field9\": \"Transaction completed successfully\", \"status\": \"success\", \"PG_TYPE\": \"UPI-PG\", \"addedon\": \"2026-10-11 23:04:15\", \"country\": \"\", \"zipcode\": \"\", \"address1\": \"\", \"address2\": \"\", \"bankcode\": \"UPI\", \"discount\": \"0.00\", \"lastname\": \"\", \"mihpayid\": \"613345778913420998\", \"firstname\": \"Raj\", \"productinfo\": \"Wallet Recharge\", \"bank_ref_num\": \"4b38fa3b-7c15-4099-8a35-3554b8ca3ec7\", \"error_Message\": \"No Error\", \"payment_source\": \"payu\", \"unmappedstatus\": \"captured\", \"net_amount_debit\": \"104\"}',19,1,'2026-10-11 23:04:45.136'),(2,'payu','success','20000002902','{\"key\": \"MqsP4b\", \"city\": \"\", \"hash\": \"d0d807446480bd786d1816d5e1fd1cdf1fc50863d61d84ebcaeb623ba8738c157779bcdb99ff7c3d82684a4c18b798fd23a1627ed31d36c5bbeecc0af2c46fa1\", \"mode\": \"UPI\", \"udf1\": \"\", \"udf2\": \"\", \"udf3\": \"\", \"udf4\": \"\", \"udf5\": \"\", \"udf6\": \"\", \"udf7\": \"\", \"udf8\": \"\", \"udf9\": \"\", \"email\": \"919174497168@connect24x.internal\", \"error\": \"E000\", \"phone\": \"919174497168\", \"state\": \"\", \"txnid\": \"39b8e5fa-b0fb-4956-9ad5-a2a2fd62f67d\", \"udf10\": \"\", \"amount\": \"1040.00\", \"field1\": \"anything@payu\", \"field2\": \"39b8e5fa-b0fb-4956-9ad5-a2a2fd62f67d\", \"field3\": \"\", \"field4\": \"Raj\", \"field5\": \"AXIMUYePs2MgFLLBhGpz8LOBIj1RswIihKf\", \"field6\": \"\", \"field7\": \"Transaction completed successfully\", \"field8\": \"generic\", \"field9\": \"Transaction completed successfully\", \"status\": \"success\", \"PG_TYPE\": \"UPI-PG\", \"addedon\": \"2026-10-12 20:36:02\", \"country\": \"\", \"zipcode\": \"\", \"address1\": \"\", \"address2\": \"\", \"bankcode\": \"UPI\", \"discount\": \"0.00\", \"lastname\": \"\", \"mihpayid\": \"20000002902\", \"firstname\": \"Raj\", \"productinfo\": \"Wallet Recharge\", \"bank_ref_num\": \"39b8e5fa-b0fb-4956-9ad5-a2a2fd62f67d\", \"error_Message\": \"No Error\", \"payment_source\": \"payu\", \"unmappedstatus\": \"captured\", \"net_amount_debit\": \"1040\"}',20,1,'2026-10-12 20:36:19.643');
/*!40000 ALTER TABLE `payment_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings_reviews`
--

DROP TABLE IF EXISTS `ratings_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings_reviews` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `call_id` bigint unsigned NOT NULL,
  `rater_id` bigint unsigned NOT NULL,
  `ratee_id` bigint unsigned NOT NULL,
  `rating` tinyint unsigned NOT NULL,
  `review` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_flagged` tinyint(1) NOT NULL DEFAULT '0',
  `flagged_reason` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_call_rater` (`call_id`,`rater_id`),
  KEY `idx_rr_ratee` (`ratee_id`,`rating`),
  KEY `idx_rr_flagged` (`is_flagged`,`created_at`),
  KEY `fk_rr_rater` (`rater_id`),
  CONSTRAINT `fk_rr_call` FOREIGN KEY (`call_id`) REFERENCES `calls_history` (`id`),
  CONSTRAINT `fk_rr_ratee` FOREIGN KEY (`ratee_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_rr_rater` FOREIGN KEY (`rater_id`) REFERENCES `users` (`id`),
  CONSTRAINT `chk_rater_not_ratee` CHECK ((`rater_id` <> `ratee_id`)),
  CONSTRAINT `chk_rating_range` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings_reviews`
--

LOCK TABLES `ratings_reviews` WRITE;
/*!40000 ALTER TABLE `ratings_reviews` DISABLE KEYS */;
INSERT INTO `ratings_reviews` VALUES (1,1,1,3,1,'Audio connection dropped after 3 minutes and background noise was persistent.',1,'low_quality_complaint','2026-10-10 21:57:46.351');
/*!40000 ALTER TABLE `ratings_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recharges`
--

DROP TABLE IF EXISTS `recharges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recharges` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `base_amount` decimal(12,2) NOT NULL,
  `tax_amount` decimal(12,2) NOT NULL,
  `total_amount` decimal(12,2) NOT NULL,
  `currency` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'INR',
  `status` enum('pending','success','failed','refunded') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `pg_provider` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'payu',
  `pg_order_id` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pg_txn_id` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pg_hash` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pg_status` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `idempotency_key` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `idempotency_key` (`idempotency_key`),
  UNIQUE KEY `pg_txn_id` (`pg_txn_id`),
  KEY `idx_recharge_user_status` (`user_id`,`status`),
  KEY `idx_recharge_user_time` (`user_id`,`created_at` DESC),
  KEY `idx_recharge_created` (`created_at`),
  CONSTRAINT `fk_rc_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `chk_recharge_amounts` CHECK (((`base_amount` > 0) and (`tax_amount` >= 0) and (`total_amount` = (`base_amount` + `tax_amount`))))
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recharges`
--

LOCK TABLES `recharges` WRITE;
/*!40000 ALTER TABLE `recharges` DISABLE KEYS */;
INSERT INTO `recharges` VALUES (1,'c1000000-0000-4000-a000-000000000001',1,200.00,8.00,208.00,'INR','success','payu','order_payu_001','mih_payu_9921445120','e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855','success','idemp-key-rec-001','2026-10-08 21:57:46.216','2026-10-08 21:57:46.216'),(2,'c1000000-0000-4000-a000-000000000002',1,100.00,4.00,104.00,'INR','pending','payu','order_payu_002',NULL,'a12bc44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b899','in_transit','idemp-key-rec-002','2026-10-10 19:57:46.216','2026-10-10 19:57:46.216'),(3,'c1000000-0000-4000-a000-000000000003',2,50.00,2.00,52.00,'INR','failed','payu','order_payu_003','mih_payu_8877665544','f550c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b111','user_cancelled','idemp-key-rec-003','2026-10-10 16:57:46.216','2026-10-10 16:57:46.216'),(4,'fc6c8834-17eb-42f5-b664-82359ed8fbea',7,100.00,4.00,104.00,'INR','pending','payu',NULL,NULL,'a8a12aa1f377d35d890e64903cad2590980c2012f8a7bcc7bed77dfeddbab8fa75ee7a9dd7b6089a3b0c63a0b6634559df38479eb2936fe79b81e676ebab3379',NULL,'886223b4-6b1a-4c3e-a010-0c8b5a3fa398','2026-10-11 13:38:13.534','2026-10-11 13:38:13.534'),(5,'5fdc52bb-fd17-47ef-8703-5bb892485d66',7,200.00,8.00,208.00,'INR','pending','payu',NULL,NULL,'8225d2c7b48b09d1bcca1a8a888a3d0d1b348e7b9dd1f239037f7fe4dadfbc80dd4d12b068fa4e930c431854c0bea1d238a2fee9e82bbf90bab3dc55bf80226b',NULL,'b1e84098-7d30-48fb-9090-98a725093ea6','2026-10-11 13:42:52.830','2026-10-11 13:42:52.830'),(6,'370c032b-9d03-4003-bf9e-88b65aa5afdf',7,100.00,4.00,104.00,'INR','pending','payu',NULL,NULL,'1c15b9fff08b5b06d5517bc08a90a42b6dc7df5789d2b5344be3723a7783053a151e144294e68e50b861c34198b8496606d54f5281f952adcc3c3f3df650105f',NULL,'2c3f43e9-da7a-4e08-9943-4f7a10cb434b','2026-10-11 13:45:29.341','2026-10-11 13:45:29.341'),(7,'28de33b3-cffb-4d40-85f2-a07180e971c7',7,100.00,4.00,104.00,'INR','pending','payu',NULL,NULL,'8d7c5af53c448243ee02b82a3f0793915616b1d4f1e8c3b08728fb7c4771dbaea69294fd2763fb57a3b37ad0b6e818d0aa1ae564afc52c91037ef17082950d18',NULL,'57c81d42-16e7-4615-95e3-59eedf5a14af','2026-10-11 13:46:01.223','2026-10-11 13:46:01.223'),(8,'cf5b1528-fb92-4164-8202-6de0d3ae262c',7,100.00,4.00,104.00,'INR','pending','payu',NULL,NULL,'361abf124dd3b0ac805000c5ffecd8d42750636623a1eb17b9585ccc4e5eead2ee2b99ca6d96303eea4834745dad21ddcc825390bcb7bfaa7d8ed24d0bd6fbbc',NULL,'71f341ab-5a60-4cb1-9b6c-955fcf2cf451','2026-10-11 13:46:25.402','2026-10-11 13:46:25.402'),(9,'a4bf5b06-a4d3-4ab1-9040-1fec9920b0f5',7,100.00,4.00,104.00,'INR','pending','payu',NULL,NULL,'79c02603b836c13649dc3452357cfcc876850102097a151dcc367461e2fe8677cc49013f0f1aff5d1b04d9e631d68885390085f58d668a13b4fb5ca8f1c4a0a2',NULL,'58f319f9-a8df-41e2-bffb-152f97d5fbd7','2026-10-11 13:47:14.355','2026-10-11 13:47:14.355'),(10,'b10742fd-5783-4944-8b53-ebd83b124585',7,100.00,4.00,104.00,'INR','pending','payu',NULL,NULL,'54c5f7dd9d0ca8dc340e33096ca2f6a6f1be36803dcef325fb441904d1c530c856021a9482b4cb92653f856ef6c890cdc5083d80ac8b9ac1a8e04bd7e71263d2',NULL,'382bfc80-836c-4d7f-a5c5-ff6dfb87f1ed','2026-10-11 13:47:34.830','2026-10-11 13:47:34.830'),(11,'4f86fdce-51a7-4162-b73f-0d8275843f17',7,100.00,4.00,104.00,'INR','pending','payu',NULL,NULL,'73a3b503c514494915a57854e39a18fa0098a818b3e1f22aba199d8eaec177503e45f6682026aca3a56f2b090a7b4d74a9f4fe5e7cc3a83b848a603ca26ea899',NULL,'a5c15131-8154-42d0-abe4-55cf468e047a','2026-10-11 13:48:15.665','2026-10-11 13:48:15.665'),(12,'8b87e1f5-6a79-48ab-859d-17df0a64ec95',7,100.00,4.00,104.00,'INR','pending','payu',NULL,NULL,'3cbf43d233a838bb7b6f3342569a1b7e8cfdee6c6f62f824df8a7759181eabf45c25b70165ea9c4121ee7595f2fb34424807b24cff21e07db46ce0f01c0e1d1c',NULL,'d40f23a6-3ffa-444d-8d4a-75d6d6566b01','2026-10-11 13:49:11.248','2026-10-11 13:49:11.248'),(13,'101f16f4-848a-4aff-b634-381748d9b0f3',7,100.00,4.00,104.00,'INR','pending','payu',NULL,NULL,'9a105d47572d8fca0dfaa8cf1af3e5ce9c1a1e41da6ec5a8cc5da1f7c7d2e58533b355e7e46d8aff52e5d2a4174f947e3c5ee6cd86efbfd47f24fcf2e0e261aa',NULL,'44e45c7e-f7fe-438c-bb9e-5e0fa4642853','2026-10-11 14:17:16.234','2026-10-11 14:17:16.234'),(14,'9c33b3fc-128f-48a0-a9c5-92c28316e389',7,100.00,4.00,104.00,'INR','pending','payu',NULL,NULL,'dbb6dc97d7e777bee607d538e1568f626a98f50cb7388851387b0bd38f82dfb751f31d794e666f2631afa3d2fe555e3dc95a1e098a718fa137d3956088089911',NULL,'c094aafa-faa5-475f-bfbe-98df13f87331','2026-10-11 14:21:09.669','2026-10-11 14:21:09.669'),(15,'3ec4c660-a172-45f9-b8f3-f793f6c26557',7,100.00,4.00,104.00,'INR','pending','payu',NULL,NULL,'ace3f44b9baa105d35d68575c39e402f76f69dcb42309d27cc129c9ceb900b63ad6b37e8f91a609252aa3c54f5d3d9eb122915f2d080981c750c20301dcec2cb',NULL,'f274e3c4-1f9f-4f59-ac54-ecb6f9c571d8','2026-10-11 14:21:26.858','2026-10-11 14:21:26.858'),(16,'df3a5165-0d17-4326-8a4d-be3b410923e7',7,100.00,4.00,104.00,'INR','pending','payu',NULL,NULL,'624820464176ededda40f7d4c2c8711cd2281c18e5ece9e07a81ecafbc9119b2164561cf7509d82d3f93a40a899f3a5f4855d9597caae6dc26b979fad7a840ae',NULL,'77f71360-e1a9-4284-9990-bc05b61d3655','2026-10-11 14:21:59.520','2026-10-11 14:21:59.520'),(17,'9621d43a-d798-421f-9cf6-956f4b9f1f1e',7,10.00,0.40,10.40,'INR','pending','payu',NULL,NULL,'d1180e2f164e2dc8f01f00c2b48ee7ceeccec12036649b2dc597e9aed181f31a34db362e8567d2ec77bf99316f20d3d95dc60ca0ad2a4523ff21268149052b81',NULL,'064a32e7-dbd1-4593-8a03-bb7c9ca69d06','2026-10-11 22:27:04.098','2026-10-11 22:27:04.098'),(18,'90f6a930-10eb-4047-8992-11fcfb11ac40',7,100.00,4.00,104.00,'INR','pending','payu',NULL,NULL,'3ea060458031116354986d40f4f4a5cc1ba9e5c4010a80fd33dd097ae89115082a65144cb9d56b76946bac96433a7e2831b8a38918a3958da01698842eef28c7',NULL,'a1d43630-35be-4711-bed0-f1eb27093872','2026-10-11 23:03:58.472','2026-10-11 23:03:58.472'),(19,'4b38fa3b-7c15-4099-8a35-3554b8ca3ec7',7,100.00,4.00,104.00,'INR','success','payu',NULL,'613345778913420998','8a8d758889c0b4995e240523948d171bc3e677d848922a7a812e303be223e796878f423a3d0d3a9cbb1e561353c43d327cfa512781d4f5a21ceb3f5d8676f339','success','46d7d254-9250-478a-b101-6fab1534780d','2026-10-11 23:04:12.259','2026-10-11 23:04:45.143'),(20,'39b8e5fa-b0fb-4956-9ad5-a2a2fd62f67d',7,1000.00,40.00,1040.00,'INR','success','payu',NULL,'20000002902','5be80b1dfa8d7d7ccd14e34f68f07b1b9a4f2c7f06f9154f04ddef88a8d762b774ad0e388f5e2164d794f32d93bf9e83716c6f6494cb2a722a075f17c80dc10b','success','5dbf0fc2-83bf-493f-bb13-dc4099bd5863','2026-10-12 20:35:56.348','2026-10-12 20:36:19.652');
/*!40000 ALTER TABLE `recharges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schema_migrations`
--

DROP TABLE IF EXISTS `schema_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schema_migrations` (
  `filename` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` char(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applied_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`filename`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schema_migrations`
--

LOCK TABLES `schema_migrations` WRITE;
/*!40000 ALTER TABLE `schema_migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `schema_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_devices`
--

DROP TABLE IF EXISTS `user_devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_devices` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `device_id` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `platform` enum('ios','android') COLLATE utf8mb4_unicode_ci NOT NULL,
  `push_token` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_active_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_user_device` (`user_id`,`device_id`),
  KEY `idx_ud_push_token` (`push_token`),
  CONSTRAINT `fk_ud_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_devices`
--

LOCK TABLES `user_devices` WRITE;
/*!40000 ALTER TABLE `user_devices` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_id_sequence`
--

DROP TABLE IF EXISTS `user_id_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_id_sequence` (
  `id` tinyint unsigned NOT NULL DEFAULT '1',
  `next_number` bigint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_id_sequence`
--

LOCK TABLES `user_id_sequence` WRITE;
/*!40000 ALTER TABLE `user_id_sequence` DISABLE KEYS */;
INSERT INTO `user_id_sequence` VALUES (1,14);
/*!40000 ALTER TABLE `user_id_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_languages`
--

DROP TABLE IF EXISTS `user_languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_languages` (
  `user_id` bigint unsigned NOT NULL,
  `language_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_primary` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`,`language_code`),
  KEY `idx_ul_lang_user` (`language_code`,`user_id`),
  CONSTRAINT `fk_ul_lang` FOREIGN KEY (`language_code`) REFERENCES `languages` (`code`),
  CONSTRAINT `fk_ul_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_languages`
--

LOCK TABLES `user_languages` WRITE;
/*!40000 ALTER TABLE `user_languages` DISABLE KEYS */;
INSERT INTO `user_languages` VALUES (1,'en',0),(1,'hi',1),(2,'gu',1),(2,'hi',0),(3,'en',0),(3,'hi',1),(4,'bn',1),(5,'hi',0),(5,'pa',1);
/*!40000 ALTER TABLE `user_languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_notifications`
--

DROP TABLE IF EXISTS `user_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_notifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `recipient_id` bigint unsigned NOT NULL,
  `sender_id` bigint unsigned NOT NULL,
  `type` enum('female_online') COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `idx_recipient_unread` (`recipient_id`,`read_at`,`created_at` DESC),
  KEY `idx_sender_time` (`sender_id`,`created_at` DESC),
  CONSTRAINT `user_notifications_ibfk_1` FOREIGN KEY (`recipient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_notifications_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_notifications`
--

LOCK TABLES `user_notifications` WRITE;
/*!40000 ALTER TABLE `user_notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `public_id` varchar(16) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` enum('male','female') COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `real_name` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birth_year` smallint unsigned DEFAULT NULL,
  `id_number` varbinary(256) DEFAULT NULL,
  `id_number_key_id` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_name` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar_url` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `primary_language` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_tag` enum('star','relationship','marriage','confidence','friendly') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `verification_status` enum('unverified','pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unverified',
  `account_state` enum('active','suspended','banned','deactivated') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `suspension_reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `suspended_at` datetime(3) DEFAULT NULL,
  `suspended_by` bigint unsigned DEFAULT NULL,
  `is_online` tinyint(1) NOT NULL DEFAULT '0',
  `wallet_balance` decimal(12,2) NOT NULL DEFAULT '0.00',
  `onboarding_completed_at` datetime(3) DEFAULT NULL,
  `terms_accepted_at` datetime(3) DEFAULT NULL,
  `channels_acknowledged_at` datetime(3) DEFAULT NULL,
  `last_seen_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `deleted_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `public_id` (`public_id`),
  KEY `idx_user_discovery` (`gender`,`verification_status`,`account_state`,`is_online`,`last_seen_at`),
  KEY `idx_user_created` (`created_at`),
  KEY `fk_user_primary_lang` (`primary_language`),
  KEY `fk_user_suspended_by` (`suspended_by`),
  KEY `idx_users_public_id` (`public_id`),
  KEY `idx_users_category_tag` (`category_tag`),
  KEY `idx_users_category` (`category_tag`),
  CONSTRAINT `fk_user_primary_lang` FOREIGN KEY (`primary_language`) REFERENCES `languages` (`code`),
  CONSTRAINT `fk_user_suspended_by` FOREIGN KEY (`suspended_by`) REFERENCES `admins` (`id`),
  CONSTRAINT `chk_user_birth_year` CHECK (((`birth_year` is null) or (`birth_year` between 1900 and 2100))),
  CONSTRAINT `chk_user_phone_e164` CHECK (regexp_like(`phone`,_utf8mb4'^[+][1-9][0-9]{7,14}$')),
  CONSTRAINT `chk_user_wallet_nonneg` CHECK ((`wallet_balance` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'u-caller-001-uuid-0000000000000001','CX000001','+919876543210','male','Rahul Sharma','Rahul Sharma',1996,NULL,NULL,NULL,NULL,'hi',NULL,'approved','active',NULL,NULL,NULL,1,245.00,'2026-10-10 21:55:16.904',NULL,NULL,NULL,'2026-09-30 21:55:16.904','2026-10-12 20:08:06.831',NULL),(2,'u-caller-002-uuid-0000000000000002','CX000002','+919811223344','male','Amit Patel','Amit Patel',1994,NULL,NULL,NULL,NULL,'gu',NULL,'approved','active',NULL,NULL,NULL,0,12.00,'2026-10-10 21:55:16.904',NULL,NULL,NULL,'2026-10-03 21:55:16.904','2026-10-12 20:08:06.831',NULL),(3,'u-comp-003-uuid-0000000000000003','CX000003','+919822334455','female','Priya Roy','Priya Roy',1999,NULL,NULL,NULL,NULL,'hi',NULL,'approved','active',NULL,NULL,NULL,1,850.50,'2026-10-10 21:55:16.904',NULL,NULL,NULL,'2026-10-05 21:55:16.904','2026-10-12 20:08:06.831',NULL),(4,'u-comp-004-uuid-0000000000000004','CX000004','+919833445566','female','Ananya Sen','Ananya Sen',2001,NULL,NULL,NULL,NULL,'bn',NULL,'approved','active',NULL,NULL,NULL,0,0.00,NULL,NULL,NULL,NULL,'2026-10-08 21:55:16.904','2026-10-12 20:08:06.831',NULL),(5,'u-comp-005-uuid-0000000000000005','CX000005','+919844556677','female','Sneha Kapoor','Sneha Kapoor',1998,NULL,NULL,NULL,NULL,'pa',NULL,'approved','suspended','Inappropriate profile bio reported by community','2026-10-09 21:55:16.904',1,0,340.00,'2026-10-10 21:55:16.904',NULL,NULL,NULL,'2026-10-06 21:55:16.904','2026-10-12 20:08:06.831',NULL),(6,'bd322702-4972-4628-b5c4-2b8abae3e99a','CX000006','+919184789242','female','July July','July July',1998,_binary '�>5\�9\�z�!f\�\�lƽ\�^ل3\�~',NULL,'','preset:indigo','hi','star','approved','active',NULL,NULL,NULL,1,1000.00,'2026-10-12 21:52:00.141',NULL,NULL,'2026-10-11 22:49:17.606','2026-10-11 09:29:16.513','2026-10-12 21:52:00.141',NULL),(7,'ed04d2f5-50e2-4c60-884d-f492c0748c64','CX000007','+919174497168','male','Raj','Raj',2001,_binary '��\�\�\�œtP\�3����\0V�PZ?:ӽ',NULL,'','preset:amber','hi',NULL,'unverified','active',NULL,NULL,NULL,0,1160.00,'2026-10-12 21:52:18.233',NULL,NULL,NULL,'2026-10-11 09:31:02.668','2026-10-12 21:52:18.233',NULL),(8,'983199c0-99ca-4fbc-aa01-f315fd03d642','CX000008','+919184781241','female','Gaccdz','Gaccdz',1999,_binary 'Ǿ����{����\�\�㴏5���\�O��?\�',NULL,'',NULL,'hi',NULL,'unverified','active',NULL,NULL,NULL,0,0.00,'2026-10-11 09:44:33.527',NULL,NULL,NULL,'2026-10-11 09:44:05.174','2026-10-12 20:08:06.831',NULL),(9,'8e2545af-cd61-46b0-aa22-36ce50a3673f','CX000009','+919184781454','female','Rgdgdv','Rgdgdv',1999,_binary '��\�I�����Iu�0\�qج\�EӀ�V',NULL,'','file:///data/user/0/host.exp.exponent/cache/ExperienceData/%40anonymous%2FConnectX-f4945780-a2df-451b-a14a-e2d0e8d1c0df/ImagePicker/70881922-58b7-495b-867c-349abb597010.jpeg','hi',NULL,'unverified','active',NULL,NULL,NULL,0,0.00,'2026-10-11 09:54:59.934',NULL,NULL,NULL,'2026-10-11 09:54:32.746','2026-10-12 20:08:06.831',NULL),(10,'d04e5e8f-ed4b-4dbc-b804-91140fd18bc8','CX000010','+919632581470','male','Mehebub','Mehebub',2001,_binary '�\\,�\�b�v\��x<2$�W\�\�RȉRp',NULL,'','preset:rose','hi',NULL,'unverified','active',NULL,NULL,NULL,0,60.00,'2026-10-11 10:36:19.586',NULL,NULL,NULL,'2026-10-11 10:36:07.535','2026-10-12 20:08:06.831',NULL),(11,'d9be6984-3e1c-4cbf-ac63-d26581c884fe','CX000011','+918478924262','female','Mehebub','Mehebub',1999,_binary '9?�OX\�\�^�9z 6\r+$*\r\�}|\�L�\n',NULL,'','preset:indigo','hi',NULL,'unverified','active',NULL,NULL,NULL,0,0.00,'2026-10-11 11:24:48.827',NULL,NULL,NULL,'2026-10-11 11:13:37.284','2026-10-12 20:08:06.831',NULL),(12,'e61eabae-fd95-49d9-acd4-97ffcdb59359','CX000012','+911236547890','female','Hehe','Hehe',1999,_binary ' Z�\�2}�\�Ֆ\r�\��\�\0�H*k\r\�\�',NULL,'','preset:indigo','bn','relationship','approved','active',NULL,NULL,NULL,1,0.00,'2026-10-11 19:53:07.169',NULL,NULL,'2026-10-11 19:54:57.171','2026-10-11 19:52:56.693','2026-10-12 21:10:18.235',NULL),(13,'2e2d5000-f892-4030-b1b6-6039d460b567','CX000013','+915616546419','female','Dhdhsn','Dhdhsn',1998,_binary '~�\�Ӭ��\�@x\�C�л\�\�\�\���΀',NULL,'','preset:emerald','hi',NULL,'approved','active',NULL,NULL,NULL,1,0.00,'2026-10-11 22:51:50.648',NULL,NULL,'2026-10-11 22:59:42.676','2026-10-11 22:51:42.593','2026-10-12 20:08:06.831',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verification_rejection_reasons`
--

DROP TABLE IF EXISTS `verification_rejection_reasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verification_rejection_reasons` (
  `code` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_terminal` tinyint(1) NOT NULL DEFAULT '0',
  `display_order` int unsigned NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verification_rejection_reasons`
--

LOCK TABLES `verification_rejection_reasons` WRITE;
/*!40000 ALTER TABLE `verification_rejection_reasons` DISABLE KEYS */;
INSERT INTO `verification_rejection_reasons` VALUES ('inappropriate_speech','Vulgar or non-compliant sample content',1,3,1,'2026-10-10 21:55:16.855'),('poor_audio','Low audio quality or heavy background noise',0,1,1,'2026-10-10 21:55:16.855'),('silent_recording','Audio clip is silent or too short',0,4,1,'2026-10-10 21:55:16.855'),('voice_mismatch','Voice gender/age does not match profile',0,2,1,'2026-10-10 21:55:16.855');
/*!40000 ALTER TABLE `verification_rejection_reasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verification_submissions`
--

DROP TABLE IF EXISTS `verification_submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verification_submissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `voice_url` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL,
  `voice_duration_sec` int unsigned NOT NULL,
  `voice_mime` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `voice_size_bytes` bigint unsigned NOT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `reviewed_by` bigint unsigned DEFAULT NULL,
  `reviewed_at` datetime(3) DEFAULT NULL,
  `rejection_reason_code` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rejection_reason_note` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  KEY `idx_verif_status` (`status`,`created_at`),
  KEY `idx_verif_user` (`user_id`,`status`),
  KEY `fk_vs_reviewer` (`reviewed_by`),
  KEY `fk_vs_reason` (`rejection_reason_code`),
  CONSTRAINT `fk_vs_reason` FOREIGN KEY (`rejection_reason_code`) REFERENCES `verification_rejection_reasons` (`code`),
  CONSTRAINT `fk_vs_reviewer` FOREIGN KEY (`reviewed_by`) REFERENCES `admins` (`id`),
  CONSTRAINT `fk_vs_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verification_submissions`
--

LOCK TABLES `verification_submissions` WRITE;
/*!40000 ALTER TABLE `verification_submissions` DISABLE KEYS */;
INSERT INTO `verification_submissions` VALUES (1,'verif-sub-uuid-0000000000000000001',4,'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',18,'audio/mpeg',294912,'approved',1,'2026-10-10 22:12:07.554',NULL,NULL,'2026-10-10 21:55:17.103'),(2,'verif-sub-uuid-0000000000000000002',3,'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',22,'audio/mpeg',360448,'approved',1,'2026-10-05 21:55:17.103',NULL,'Clear greeting and verified companion voice tone','2026-10-05 21:55:17.103'),(3,'8a178cf0-6ff6-434a-8fed-0be01a5bcf34',6,'http://localhost:5000/uploads/recordings/voice_59d76d87-259d-4662-b095-46d7653ce1d0.m4a',23,'audio/m4a',390308,'approved',1,'2026-10-11 12:55:15.083',NULL,NULL,'2026-10-11 12:49:40.649'),(4,'61d0d273-2d3a-496b-ba49-cdfcf1b95592',6,'http://localhost:5000/uploads/recordings/voice_46c7ada6-030b-4272-9167-b410eff555fa.m4a',8,'audio/m4a',136213,'approved',1,'2026-10-11 12:57:26.349',NULL,NULL,'2026-10-11 12:57:04.913'),(5,'6648880e-d4ca-418a-8e0c-d7d9c7c04c24',12,'http://localhost:5000/uploads/recordings/voice_e8fb617a-1c69-45a9-9c7c-fc395d5c1cb8.m4a',21,'audio/m4a',350476,'approved',1,'2026-10-11 19:54:48.940',NULL,NULL,'2026-10-11 19:53:36.024'),(6,'4f410dab-e793-4ec1-b58a-918ad8d0385f',13,'http://localhost:5000/uploads/recordings/voice_b7156bf4-eb65-4ea3-b67e-e13e8db2e98a.m4a',7,'audio/m4a',130291,'approved',1,'2026-10-11 22:54:14.184',NULL,NULL,'2026-10-11 22:52:36.685');
/*!40000 ALTER TABLE `verification_submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet_promotion_grants`
--

DROP TABLE IF EXISTS `wallet_promotion_grants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet_promotion_grants` (
  `promotion_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `txn_id` bigint unsigned NOT NULL,
  `granted_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`promotion_id`,`user_id`),
  KEY `fk_wpg_user` (`user_id`),
  KEY `fk_wpg_txn` (`txn_id`),
  CONSTRAINT `fk_wpg_prom` FOREIGN KEY (`promotion_id`) REFERENCES `wallet_promotions` (`id`),
  CONSTRAINT `fk_wpg_txn` FOREIGN KEY (`txn_id`) REFERENCES `wallet_transactions` (`id`),
  CONSTRAINT `fk_wpg_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet_promotion_grants`
--

LOCK TABLES `wallet_promotion_grants` WRITE;
/*!40000 ALTER TABLE `wallet_promotion_grants` DISABLE KEYS */;
INSERT INTO `wallet_promotion_grants` VALUES (1,1,4,'2026-10-10 22:03:41.276'),(1,7,6,'2026-10-11 13:23:15.127'),(1,10,5,'2026-10-11 10:36:19.655');
/*!40000 ALTER TABLE `wallet_promotion_grants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet_promotions`
--

DROP TABLE IF EXISTS `wallet_promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet_promotions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `target_gender` enum('male','female','all') COLLATE utf8mb4_unicode_ci NOT NULL,
  `starts_at` datetime(3) NOT NULL,
  `ends_at` datetime(3) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_by` bigint unsigned NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  KEY `idx_wp_active_window` (`is_active`,`starts_at`,`ends_at`),
  KEY `fk_wp_admin` (`created_by`),
  CONSTRAINT `fk_wp_admin` FOREIGN KEY (`created_by`) REFERENCES `admins` (`id`),
  CONSTRAINT `chk_promo_amount` CHECK ((`amount` > 0)),
  CONSTRAINT `chk_promo_window` CHECK ((`ends_at` > `starts_at`))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet_promotions`
--

LOCK TABLES `wallet_promotions` WRITE;
/*!40000 ALTER TABLE `wallet_promotions` DISABLE KEYS */;
INSERT INTO `wallet_promotions` VALUES (1,'w-promo-uuid-00000000000000000000001','Welcome Bonus 2026',60.00,'male','2026-09-10 22:00:15.284','2027-10-10 22:00:15.284',1,1,'2026-10-10 22:00:15.284');
/*!40000 ALTER TABLE `wallet_promotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet_transactions`
--

DROP TABLE IF EXISTS `wallet_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet_transactions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `type` enum('recharge','call_debit','call_credit','withdrawal','withdrawal_refund','promotion','admin_adjustment') COLLATE utf8mb4_unicode_ci NOT NULL,
  `direction` enum('credit','debit') COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `balance_before` decimal(12,2) NOT NULL,
  `balance_after` decimal(12,2) NOT NULL,
  `reference_type` enum('recharge','call','withdrawal','promotion','admin_adjustment') COLLATE utf8mb4_unicode_ci NOT NULL,
  `reference_id` bigint unsigned NOT NULL,
  `reference_uuid` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `idempotency_key` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `metadata` json DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `idempotency_key` (`idempotency_key`),
  KEY `idx_wt_user_ledger` (`user_id`,`id` DESC),
  KEY `idx_wt_user_time` (`user_id`,`created_at` DESC),
  KEY `idx_wt_ref_entity` (`reference_type`,`reference_id`),
  KEY `idx_wt_ref_uuid` (`reference_uuid`),
  CONSTRAINT `fk_wt_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `chk_wt_amount_positive` CHECK ((`amount` > 0)),
  CONSTRAINT `chk_wt_balance_math` CHECK ((((`direction` = _utf8mb4'credit') and (`balance_after` = (`balance_before` + `amount`))) or ((`direction` = _utf8mb4'debit') and (`balance_after` = (`balance_before` - `amount`))))),
  CONSTRAINT `chk_wt_reference_shape` CHECK ((((`reference_type` = _utf8mb4'call') and (`reference_uuid` is not null)) or ((`reference_type` in (_utf8mb4'recharge',_utf8mb4'withdrawal',_utf8mb4'promotion',_utf8mb4'admin_adjustment')) and (`reference_uuid` is null)))),
  CONSTRAINT `chk_wt_type_direction` CHECK ((((`type` = _utf8mb4'recharge') and (`direction` = _utf8mb4'credit')) or ((`type` = _utf8mb4'call_debit') and (`direction` = _utf8mb4'debit')) or ((`type` = _utf8mb4'call_credit') and (`direction` = _utf8mb4'credit')) or ((`type` = _utf8mb4'withdrawal') and (`direction` = _utf8mb4'debit')) or ((`type` = _utf8mb4'withdrawal_refund') and (`direction` = _utf8mb4'credit')) or ((`type` = _utf8mb4'promotion') and (`direction` = _utf8mb4'credit')) or ((`type` = _utf8mb4'admin_adjustment') and (`direction` in (_utf8mb4'credit',_utf8mb4'debit')))))
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet_transactions`
--

LOCK TABLES `wallet_transactions` WRITE;
/*!40000 ALTER TABLE `wallet_transactions` DISABLE KEYS */;
INSERT INTO `wallet_transactions` VALUES (1,'t1000000-0000-4000-a000-000000000001',1,'recharge','credit',200.00,0.00,200.00,'recharge',1,NULL,'tx-idemp-001','{\"provider\": \"payu\", \"pg_txn_id\": \"mih_payu_9921445120\"}','2026-10-08 22:03:41.215'),(2,'t1000000-0000-4000-a000-000000000002',1,'call_debit','debit',15.00,200.00,185.00,'call',1,'c3000000-0000-4000-a000-000000000001','tx-idemp-002','{\"rate\": 3.0, \"session_id\": 1, \"billed_minutes\": 5}','2026-10-09 22:03:41.215'),(3,'t1000000-0000-4000-a000-000000000003',3,'call_credit','credit',7.50,843.00,850.50,'call',1,'c3000000-0000-4000-a000-000000000001','tx-idemp-003','{\"rate\": 1.5, \"session_id\": 1, \"billed_minutes\": 5}','2026-10-09 22:03:41.215'),(4,'t1000000-0000-4000-a000-000000000004',1,'promotion','credit',60.00,185.00,245.00,'promotion',1,NULL,'tx-idemp-004','{\"promo_name\": \"Welcome Bonus 2026\"}','2026-10-10 22:03:41.215'),(5,'d7cf3cf4-bb24-43a6-af39-e09ba1978051',10,'promotion','credit',60.00,0.00,60.00,'promotion',1,NULL,'promo:1:user:10',NULL,'2026-10-11 10:36:19.638'),(6,'4b775eb4-5b97-41a0-b4fa-1d6ad9838c56',7,'promotion','credit',60.00,0.00,60.00,'promotion',1,NULL,'promo:1:user:7',NULL,'2026-10-11 13:23:15.122'),(7,'caaa1aae-c55a-11f1-84b2-00ff83988b02',6,'admin_adjustment','credit',5000.00,0.00,5000.00,'admin_adjustment',1,NULL,'seed:user6:caaa1cba-c55a-11f1-84b2-00ff83988b02','{\"reason\": \"dummy balance for testing\"}','2026-10-11 15:31:56.226'),(8,'1b257760-af03-49ef-8da1-308005c5461f',6,'withdrawal','debit',1000.00,5000.00,4000.00,'withdrawal',3,NULL,'reserve:c364741c-5cf2-45ee-9a67-da14f3e74571',NULL,'2026-10-11 15:33:55.708'),(9,'926139ce-f662-4397-b2f2-ec4b750c1609',6,'withdrawal','debit',2000.00,4000.00,2000.00,'withdrawal',4,NULL,'reserve:3dff0694-e3dd-44fa-b756-2cced65fa1ce',NULL,'2026-10-11 15:35:59.721'),(10,'ba401eed-01ea-483e-bfc2-689c668a614b',6,'withdrawal','debit',1000.00,2000.00,1000.00,'withdrawal',5,NULL,'reserve:8adeea7b-3f05-43ee-854c-14516f53920d',NULL,'2026-10-11 22:50:37.093'),(11,'691b9da6-eec6-4fc4-b1ee-b2cda62d5cac',7,'recharge','credit',100.00,60.00,160.00,'recharge',19,NULL,'recharge:4b38fa3b-7c15-4099-8a35-3554b8ca3ec7','{\"mihpayid\": \"613345778913420998\", \"total_paid\": \"104.00\"}','2026-10-11 23:04:45.147'),(12,'efc74719-a8c9-4fbb-ab90-46dd1dab7869',7,'recharge','credit',1000.00,160.00,1160.00,'recharge',20,NULL,'recharge:39b8e5fa-b0fb-4956-9ad5-a2a2fd62f67d','{\"mihpayid\": \"20000002902\", \"total_paid\": \"1040.00\"}','2026-10-12 20:36:19.662');
/*!40000 ALTER TABLE `wallet_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `withdrawals`
--

DROP TABLE IF EXISTS `withdrawals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `withdrawals` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `requested_amount` decimal(12,2) NOT NULL,
  `tax_amount` decimal(12,2) NOT NULL,
  `net_amount` decimal(12,2) NOT NULL,
  `payout_method` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'upi',
  `payout_upi_id` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','paid','rejected','failed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `processed_by` bigint unsigned DEFAULT NULL,
  `processed_at` datetime(3) DEFAULT NULL,
  `admin_note` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `idempotency_key` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `idempotency_key` (`idempotency_key`),
  KEY `idx_wth_status_created` (`status`,`created_at`),
  KEY `idx_wth_user_time` (`user_id`,`created_at` DESC),
  KEY `fk_wth_admin` (`processed_by`),
  CONSTRAINT `fk_wth_admin` FOREIGN KEY (`processed_by`) REFERENCES `admins` (`id`),
  CONSTRAINT `fk_wth_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `chk_wth_amounts` CHECK (((`requested_amount` >= 100.00) and (`tax_amount` >= 0) and (`net_amount` = (`requested_amount` - `tax_amount`))))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `withdrawals`
--

LOCK TABLES `withdrawals` WRITE;
/*!40000 ALTER TABLE `withdrawals` DISABLE KEYS */;
INSERT INTO `withdrawals` VALUES (1,'w1000000-0000-4000-a000-000000000001',3,500.00,12.50,487.50,'upi','priya.roy@oksbi','paid',1,'2026-10-10 22:13:47.363','jhjhkj','idemp-with-001','2026-10-10 18:00:15.242','2026-10-10 22:13:47.363'),(2,'w1000000-0000-4000-a000-000000000002',5,200.00,5.00,195.00,'upi','sneha98@upi','paid',1,'2026-10-08 22:00:15.242','Settled via IMPS reference #9921884411','idemp-with-002','2026-10-08 22:00:15.242','2026-10-08 22:00:15.242'),(3,'c364741c-5cf2-45ee-9a67-da14f3e74571',6,1000.00,25.00,975.00,'upi','asdcc@oksbi','paid',1,'2026-10-11 15:34:44.361','asdcc@oksbi','6682a7c7-7a88-479f-b087-58559565f48d','2026-10-11 15:33:55.700','2026-10-11 15:34:44.361'),(4,'3dff0694-e3dd-44fa-b756-2cced65fa1ce',6,2000.00,50.00,1950.00,'upi','dbsbs@fjsd','pending',NULL,NULL,NULL,'01be4c03-8e08-4c01-a821-6c84a1eee189','2026-10-11 15:35:59.718','2026-10-11 15:35:59.718'),(5,'8adeea7b-3f05-43ee-854c-14516f53920d',6,1000.00,25.00,975.00,'upi','shchdn@dhs','paid',1,'2026-10-11 22:55:31.432','jgjkhuylh','41c1554c-91b6-4bef-bbaf-9f0e987e9c6e','2026-10-11 22:50:37.089','2026-10-11 22:55:31.432');
/*!40000 ALTER TABLE `withdrawals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'connecto'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-12 23:28:11
