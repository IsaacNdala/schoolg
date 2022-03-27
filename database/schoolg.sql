-- MySQL dump 10.13  Distrib 8.0.12, for macos10.13 (x86_64)
--
-- Host: localhost    Database: schoolg
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alunos`
--

DROP TABLE IF EXISTS `alunos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `alunos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `sexo` varchar(255) NOT NULL,
  `dtNascimento` varchar(255) NOT NULL,
  `telefone` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `endereco` varchar(255) NOT NULL DEFAULT ' ',
  `estadoCivil` varchar(255) NOT NULL,
  `codBi` varchar(255) NOT NULL,
  `numProcesso` int(11) NOT NULL,
  `foto` text,
  `status` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `encarregadoId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `encarregadoId` (`encarregadoId`),
  KEY `userId` (`userId`),
  CONSTRAINT `alunos_ibfk_1` FOREIGN KEY (`encarregadoId`) REFERENCES `encarregados` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `alunos_ibfk_5` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alunos`
--

LOCK TABLES `alunos` WRITE;
/*!40000 ALTER TABLE `alunos` DISABLE KEYS */;
INSERT INTO `alunos` VALUES (2,'Joana Corteira António','Masculino','2000-06-10',934207242,'joana@gmail.com','Luanda, Samba, Camuxiba','Solteiro','007328844LA049',2343,'SG_IMG_1647507087508.png','activo','2021-06-16 20:16:39','2022-03-17 08:51:27',3,2),(3,'Miguel António','Masculino','2000-07-05',987456765,'miguel@server.com','Luanda, Maianga, Prenda','Solteiro','55587654321230',5050,'SG_IMG_1645881929121.png','activo','2022-02-26 13:25:30','2022-03-17 08:50:34',3,NULL),(4,'António Walela','Masculino','2008-12-02',984732348,'antonionwalela@server.com','Luanda, Samba, Camuxiba','Solteiro','0023987LA928',2989,'SG_IMG_1646984796303.png','activo','2022-03-11 07:46:36','2022-03-17 08:50:15',3,NULL),(5,'Manuela Afonso','Femenino','2000-12-31',985737475,'manuelaafonso@gmail.com','Luanda, Samba, Camuxiba','Solteiro','007228844LA049',3984,'SG_IMG_1647031661514.png','activo','2022-03-11 20:47:41','2022-03-17 08:49:45',3,NULL),(6,'Milton Tomas','Masculino','2000-12-03',985048375,'miltotomas@gmail.com','Luanda, Camam, Simeone','Solteiro','98574738938475',8749,'SG_IMG_1647445862102.png','activo','2022-03-14 17:00:36','2022-03-16 15:51:02',3,NULL),(7,'Anacleto Bernado ','Masculino','2000-12-22',984838474,'anacletobernado@gmail.com','Luanda, Belas, Futundo','Solteiro','98393484857490',7373,'SG_IMG_1647445831818.png','inactivo','2022-03-14 22:08:41','2022-03-18 16:14:46',5,NULL),(10,'Dalton Antunes','Masculino','2003-12-12',938373737,'daltonantunes@gmail.com','Luanda, Samba, Camuxiba','Casado','838392839LA039',7378,'SG_IMG_1647618928468.png','activo','2022-03-18 15:55:28','2022-03-18 16:14:58',5,18),(11,'Daniel da Costa','Masculino','2001-12-12',938474694,'danielcosta@server.com','Luanda, Benfica, Patriota','Solteiro','039394848LA939',8474,'SG_IMG_1647621987947.png','activo','2022-03-18 16:46:04','2022-03-19 23:54:37',3,18),(12,'Santos Vala','Masculino','2002-12-12',938475809,'santosvala@server.com','Luanda, Benfica, Patriota','Solteiro','039394829LA038',9382,'SG_IMG_1647623289721.png','activo','2022-03-18 17:07:49','2022-03-18 17:08:26',5,18),(13,'Augusto Costa','Masculino','2002-12-12',948372893,'augustocosta@gmail.com','Luanda, Benfica, Patriota','Solteiro','938484938LA032',3839,'SG_IMG_1647623891655.png','activo','2022-03-18 17:17:50','2022-03-18 17:19:34',3,18);
/*!40000 ALTER TABLE `alunos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `designacao` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,'Pré-escolar','2020-09-04 14:22:31','2020-09-04 14:43:02',2),(5,'1','2020-09-04 14:28:19','2020-09-04 14:28:19',2),(6,'2','2020-09-04 14:30:05','2020-09-04 14:30:05',2),(7,'3','2020-09-04 14:30:11','2020-09-04 14:30:11',2),(8,'4','2020-09-04 14:30:27','2020-09-04 14:30:27',2),(9,'5','2020-09-04 14:30:33','2020-09-04 14:30:33',2),(10,'6','2020-09-04 14:30:47','2020-09-04 14:30:47',2),(11,'7','2020-09-04 14:30:57','2020-09-04 14:30:57',2),(12,'8','2020-09-04 14:31:10','2020-09-04 14:31:10',2),(13,'9','2020-09-04 14:31:17','2020-09-04 14:31:17',2),(14,'10','2020-09-04 14:31:29','2020-09-04 14:31:29',2),(15,'11','2020-09-04 14:31:38','2020-09-04 14:31:38',2),(16,'12','2020-09-04 14:31:45','2020-09-04 14:31:45',2),(17,'13','2020-09-04 14:31:57','2020-09-04 14:31:57',2);
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cursos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `designacao` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `cursos_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` VALUES (1,'Regular','2020-09-04 13:29:45','2020-09-04 13:31:32',2),(2,'Técnico de Informática','2020-09-04 13:31:47','2020-09-04 13:31:47',2),(3,'Enfermagem','2020-09-04 13:32:05','2020-09-04 13:32:05',2),(4,'Desenhador Projectista','2020-09-04 13:32:36','2020-09-04 13:32:36',2),(5,'Técnico de Electricidade','2020-09-04 13:32:55','2020-09-04 13:32:55',2),(6,'Ciências Econômicas e Jurídicas','2020-09-04 13:34:24','2020-09-04 13:34:24',2),(7,'Ciências Físicas e Biológicas','2020-09-04 13:35:04','2020-09-04 13:35:04',2),(9,'Contabilidade','2022-03-18 16:47:15','2022-03-18 16:47:15',18),(10,'Geologia','2022-03-18 17:08:58','2022-03-18 17:08:58',18),(11,'Anatomia','2022-03-18 17:18:52','2022-03-18 17:18:52',18);
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disciplinas`
--

DROP TABLE IF EXISTS `disciplinas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `disciplinas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `designacao` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `disciplinas_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disciplinas`
--

LOCK TABLES `disciplinas` WRITE;
/*!40000 ALTER TABLE `disciplinas` DISABLE KEYS */;
INSERT INTO `disciplinas` VALUES (2,'Matemática','2022-03-15 14:04:20','2022-03-15 14:04:20',NULL),(3,'Física','2022-03-15 14:04:33','2022-03-15 14:04:33',NULL),(4,'Língua Portuguesa','2022-03-15 14:04:53','2022-03-15 14:04:53',NULL),(5,'Química','2022-03-15 14:05:12','2022-03-15 14:05:12',NULL),(6,'Educação Física','2022-03-15 14:05:35','2022-03-15 14:10:00',NULL);
/*!40000 ALTER TABLE `disciplinas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encarregados`
--

DROP TABLE IF EXISTS `encarregados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `encarregados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `telefone` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `parentesco` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `encarregados_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encarregados`
--

LOCK TABLES `encarregados` WRITE;
/*!40000 ALTER TABLE `encarregados` DISABLE KEYS */;
INSERT INTO `encarregados` VALUES (2,'Miguel Domingos Martins',986704954,'miguel@gmail.com','Pai','2020-08-30 17:15:00','2020-08-30 17:15:00',2),(3,'João Domingos Pinto',984783709,'joao@gmail.com','Pai','2020-08-30 17:15:50','2020-08-30 17:15:50',2),(5,'Júlio da Cunha',985068947,'julio@gmail.com','Outro','2020-08-30 17:27:48','2022-03-13 19:36:18',2),(6,'Domingos Boate',938472039,'domingosboate@gmail.com','Pai','2022-03-17 08:30:03','2022-03-17 08:30:03',18),(7,'Manuel Vila',984730493,'manuelvial@gmail.com','Pai','2022-03-17 08:30:45','2022-03-17 08:30:45',18);
/*!40000 ALTER TABLE `encarregados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcaos`
--

DROP TABLE IF EXISTS `funcaos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `funcaos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `designacao` varchar(255) NOT NULL,
  `descricao` text,
  `nivelAcesso` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `funcaos_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcaos`
--

LOCK TABLES `funcaos` WRITE;
/*!40000 ALTER TABLE `funcaos` DISABLE KEYS */;
INSERT INTO `funcaos` VALUES (1,'Director','Director(a)',1,'2020-08-27 13:24:12','2022-03-15 16:20:30',2),(2,'Professor',NULL,2,'2020-08-31 16:35:49','2022-03-15 16:20:38',2),(3,'Secretário',NULL,3,'2020-08-31 16:36:51','2022-03-15 16:20:46',2),(5,'Faxineiro',NULL,4,'2020-08-31 16:43:06','2022-03-15 16:20:52',2),(6,'Segurança',NULL,4,'2020-08-31 16:43:53','2020-08-31 16:43:53',2);
/*!40000 ALTER TABLE `funcaos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `funcionarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `dtNascimento` varchar(255) NOT NULL,
  `sexo` varchar(255) NOT NULL,
  `telefone` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `endereco` varchar(255) NOT NULL DEFAULT ' ',
  `salario` double NOT NULL,
  `numConta` bigint(20) NOT NULL,
  `estadoCivil` varchar(255) NOT NULL,
  `codBi` varchar(255) NOT NULL,
  `foto` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `funcaoId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `funcaoId` (`funcaoId`),
  KEY `userId` (`userId`),
  CONSTRAINT `funcionarios_ibfk_4` FOREIGN KEY (`funcaoId`) REFERENCES `funcaos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `funcionarios_ibfk_5` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
INSERT INTO `funcionarios` VALUES (2,'Isaac Augusto Figueira Ndala','2000-06-17','Masculino',923432423,'isaac@server.com','Luanda, Talatona, Camama',400000,897387623908746,'Solteiro','007325844LA043','SG_IMG_1598531441281.png','activo','2020-08-27 12:30:42','2021-06-18 16:23:55',1,2),(19,'Demo User','1990-12-12','Masculino',937474747,'demo@user.com','Luanda, Benfica, Patriota',400000,938475930393939,'Solteiro','093848393LA900','SG_IMG_1647463488704.png','activo','2022-03-16 20:44:49','2022-03-16 20:44:49',3,2),(20,'Domingos Alexandre','1992-12-04','Masculino',984848484,'domingosalexandre@gmail.com','Luanda, Samba, Camuxiba',299202,199200229,'Solteiro','030399300LA303','SG_IMG_1647466964155.png','activo','2022-03-16 21:42:44','2022-03-16 21:42:44',2,18),(21,'António Bento','1990-12-12','Masculino',948302938,'antoniobento@server.com','Luanda, Maianga, Alvalade',5000000,394920194,'Solteiro','0394849584LA02','SG_IMG_1647505560844.png','activo','2022-03-17 08:26:01','2022-03-17 08:26:01',2,18),(22,'Cándido Andrade','1995-02-06','Masculino',958403840,'candidoandrade@gmail.com','Luanda, Belas, Futundo',400000,90403030,'Casado','059483949LA930','SG_IMG_1647505704574.png','activo','2022-03-17 08:28:25','2022-03-17 08:28:25',2,18),(23,'Ana Duarte','1990-12-01','Femenino',948503857,'anaduarte@gmail.com','Luanda, Samba, Coreia',300000,394039303,'Casado','049382948LA049','SG_IMG_1647505964482.png','activo','2022-03-17 08:32:45','2022-03-17 08:32:45',2,18),(25,'Sebastião Oliveira','1992-12-12','Masculino',938484384,'sebastiaooliveira@gmail.com','Luanda, Belas, Futundo',300000,9380293928,'Casado','939393939LA039','SG_IMG_1647685919680.png','activo','2022-03-19 10:32:00','2022-03-19 10:32:00',2,18),(26,'Júlia Andrade','1990-12-16','Masculino',938403848,'juliaandrade@gmail.com','Luanda, Belas, Futundo',250000,393939302,'Casado','003939393LA039','SG_IMG_1647686081910.png','activo','2022-03-19 10:34:42','2022-03-19 10:34:42',3,18);
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matriculas`
--

DROP TABLE IF EXISTS `matriculas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `matriculas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numProcesso` int(11) NOT NULL,
  `turno` varchar(255) NOT NULL,
  `anoLectivo` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matriculas`
--

LOCK TABLES `matriculas` WRITE;
/*!40000 ALTER TABLE `matriculas` DISABLE KEYS */;
/*!40000 ALTER TABLE `matriculas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notas`
--

DROP TABLE IF EXISTS `notas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `notas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mac` double NOT NULL,
  `pp` double NOT NULL,
  `pe` double NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `alunoId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `alunoId` (`alunoId`),
  CONSTRAINT `notas_ibfk_1` FOREIGN KEY (`alunoId`) REFERENCES `alunos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notas`
--

LOCK TABLES `notas` WRITE;
/*!40000 ALTER TABLE `notas` DISABLE KEYS */;
/*!40000 ALTER TABLE `notas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salas`
--

DROP TABLE IF EXISTS `salas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `salas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `designacao` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `salas_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salas`
--

LOCK TABLES `salas` WRITE;
/*!40000 ALTER TABLE `salas` DISABLE KEYS */;
INSERT INTO `salas` VALUES (1,'Sala 1','2020-09-04 15:18:43','2020-09-04 15:18:43',2),(2,'Sala 2','2020-09-04 15:18:52','2020-09-04 15:18:52',2),(3,'Sala 3','2020-09-04 15:19:01','2020-09-04 15:19:01',2),(8,'Lab. de Física','2020-09-04 15:20:35','2020-09-04 15:25:27',2),(9,'Lab. de Química','2020-09-04 15:20:52','2020-09-04 15:25:47',2),(10,'Lab. de Electricidade','2020-09-04 15:21:20','2020-09-04 15:26:02',2);
/*!40000 ALTER TABLE `salas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turmas`
--

DROP TABLE IF EXISTS `turmas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `turmas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `designacao` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `classeId` int(11) DEFAULT NULL,
  `salaId` int(11) DEFAULT NULL,
  `cursoId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `classeId` (`classeId`),
  KEY `salaId` (`salaId`),
  KEY `cursoId` (`cursoId`),
  KEY `userId` (`userId`),
  CONSTRAINT `turmas_ibfk_1` FOREIGN KEY (`classeId`) REFERENCES `classes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `turmas_ibfk_2` FOREIGN KEY (`salaId`) REFERENCES `salas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `turmas_ibfk_3` FOREIGN KEY (`cursoId`) REFERENCES `cursos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `turmas_ibfk_4` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turmas`
--

LOCK TABLES `turmas` WRITE;
/*!40000 ALTER TABLE `turmas` DISABLE KEYS */;
INSERT INTO `turmas` VALUES (1,'I10BM','2020-09-19 13:31:08','2020-09-19 13:31:08',14,1,2,2),(2,'I11BM','2020-09-19 13:32:04','2020-09-19 13:32:04',15,3,2,2),(3,'Default','2020-10-03 17:57:57','2020-10-03 17:57:57',1,1,1,2);
/*!40000 ALTER TABLE `turmas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'isaac@server.com','$2a$12$Ad3TdXQSd3CgrZ3NpOBRH.b7Az/Jq.H3TjJMD3f5gI1RPFbhno6YO','activo','2020-08-27 12:30:42','2022-03-17 14:40:47'),(18,'demo@user.com','$2a$12$.f3rBtsJ3IXwFBzqJW7wtOxoJpvQR.jvBCc/jnRnhWg75RtVbOVfi','activo','2022-03-16 20:44:49','2022-03-19 10:28:52'),(19,'domingosalexandre@gmail.com','$2a$12$1qSkYIXJM55T.Rp1GYjlnuaBIC4OyXLvwXgwkGLA88MU2SA8k4jXi','activo','2022-03-16 21:42:44','2022-03-17 14:32:14'),(20,'antoniobento@server.com','$2a$12$opQ6Gbuco0y1HzNsOEMiCuYpo147EGWbSatRGrp0QM3BP6Pz9LfW.','activo','2022-03-17 08:26:01','2022-03-17 08:26:01'),(21,'candidoandrade@gmail.com','$2a$12$ePbpIP0Leolynbhu5BzgsOBcReKAynlkFKN9AmEYLbdTjyIQt.R0K','activo','2022-03-17 08:28:24','2022-03-17 08:28:24'),(22,'anaduarte@gmail.com','$2a$12$9COITqy/hNQyOY5wBQ8XtuUn/Kszl1VWxcT2q22cqs/0Q3TM/MdCW','activo','2022-03-17 08:32:44','2022-03-17 08:32:44'),(24,'sebastiaooliveira@gmail.com','$2a$12$8AlC3HbQWCXd5vzhmLBpYuUZuKHzo/MCyA/08k3xMuTQG1LIo6LEy','activo','2022-03-19 10:32:00','2022-03-19 10:32:00'),(25,'juliaandrade@gmail.com','$2a$12$xMYXog3ct370ZK1uind4VOyfI14Tf6we.Ps5eyI5DaYsltkZ2lomG','activo','2022-03-19 10:34:42','2022-03-19 10:34:42');
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

-- Dump completed on 2022-03-27 11:39:41
