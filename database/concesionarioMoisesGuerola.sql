-- MariaDB dump 10.19  Distrib 10.6.5-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: gconcesionario
-- ------------------------------------------------------
-- Server version	10.6.5-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `body`
--

DROP TABLE IF EXISTS `body`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `body` (
  `id_body` char(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body_name` char(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_body`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `body`
--

LOCK TABLES `body` WRITE;
/*!40000 ALTER TABLE `body` DISABLE KEYS */;
INSERT INTO `body` VALUES ('BER','Berlina'),('BMU','Bólido Muscle'),('COM','Compacto'),('CRO','Crossover'),('DEP','Deportivo'),('FAM','Familiar'),('FUR','Furgoneta'),('HBK','Hatchback'),('LIM','Limusina'),('MIC','Microcoche'),('MON','Monovolumen');
/*!40000 ALTER TABLE `body` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brand` (
  `id_brand` char(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand_name` char(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url_brand` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_brand`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES ('AUD','AUDI','view/images/logos/audi.png'),('BMW','BMW','view/images/logos/bmw.png'),('CVR','CHEVROLET','view/images/logos/chevrolet.png'),('FRD','FORD','view/images/logos/ford.png'),('ITA','FIAT','view/images/logos/fiat.png'),('MNI','MINI','view/images/logos/mini.png'),('SAT','SEAT','view/images/logos/Seat_logo.png');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_imgs`
--

DROP TABLE IF EXISTS `car_imgs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `car_imgs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carID` int(11) DEFAULT NULL,
  `imgUrl` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `carID` (`carID`),
  CONSTRAINT `car_imgs_ibfk_1` FOREIGN KEY (`carID`) REFERENCES `cars` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_imgs`
--

LOCK TABLES `car_imgs` WRITE;
/*!40000 ALTER TABLE `car_imgs` DISABLE KEYS */;
INSERT INTO `car_imgs` VALUES (3,4,'view/images/models/bmw_serie1.png'),(4,4,'view/images/models/BMW-1-Series-Hatchback-F40.jpg'),(5,4,'https://i.bstr.es/highmotor/2019/05/BMW-Serie-1-2019-10.jpg'),(6,4,'https://i.bstr.es/highmotor/2019/05/BMW-Serie-1-2019-11.jpg'),(7,4,'https://i.bstr.es/highmotor/2019/05/BMW-Serie-1-2019-14.jpg'),(9,12,'https://i.bstr.es/highmotor/2019/11/audi-a7-55-tfsie-1.jpg'),(10,12,'https://i.bstr.es/highmotor/2019/11/audi-a7-55-tfsie-2.jpg'),(11,12,'https://i.bstr.es/highmotor/2019/11/audi-a7-55-tfsie-3.jpg'),(12,12,'https://i.bstr.es/highmotor/2019/11/audi-a7-55-tfsie-5.jpg'),(13,12,'https://i.bstr.es/highmotor/2019/11/audi-a7-55-tfsie-6.jpg');
/*!40000 ALTER TABLE `car_imgs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vin_number` char(18) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `number_plate` char(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kms` int(11) DEFAULT NULL,
  `color` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `n_doors` int(11) DEFAULT NULL,
  `cv` int(11) DEFAULT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cyear` int(11) DEFAULT NULL,
  `carUrl` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `count` int(11) NOT NULL DEFAULT 0,
  `id_model` char(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_body` char(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_cat` char(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_type` char(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_id_model` (`id_model`),
  KEY `FK_id_body` (`id_body`),
  KEY `FK_id_cat` (`id_cat`),
  KEY `FK_id_type` (`id_type`),
  CONSTRAINT `FK_id_body` FOREIGN KEY (`id_body`) REFERENCES `body` (`id_body`),
  CONSTRAINT `FK_id_cat` FOREIGN KEY (`id_cat`) REFERENCES `category` (`id_cat`),
  CONSTRAINT `FK_id_model` FOREIGN KEY (`id_model`) REFERENCES `model` (`id_model`),
  CONSTRAINT `FK_id_type` FOREIGN KEY (`id_type`) REFERENCES `type` (`id_type`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES (3,'aaalalall','asda',567,'White',765,4,2342,38.7645,-0.613235,'Bocairent',3242,'view/images/models/audi_a1.png',5,'AA1','BER','0KM','BIO'),(4,'AOSAJSDND25134679','1263 AJN',0,'Blue',19000,3,334,38.825,-0.607513,'Ontinyent',2019,'view/images/models/bmw_serie1.png',4,'SE1','HBK','0KM','GAS'),(12,'ILAJFNSRN1237654','1624 ANH',2345,'Red',19000,5,160,38.7832,-0.785194,'Fontanars dels Alforins',2019,'view/images/models/audi_a7_rojo.png',1,'AA7','DEP','2MA','GAS'),(13,'AKXFRDTGH84512634','8452AJS',25000,'White',18000,5,120,38.84,-0.520343,'Albaida',2019,'view/images/models/seat_ibiza.png',0,'IBI','COM','2MA','GAS');
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id_cat` char(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cat_name` char(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url_cat` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_cat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('0KM','Kilómetro 0','Si hablamos de los coches de kilómetro 0, se trata de vehículos que, aunque estén totalmente nuevos y a estrenar, ya han sido matriculados por el concesionario o el propio fabricante y por lo tanto se transfieren al comprador.','view/images/category/kilometro0.jpeg'),('2MA','Segunda Mano','Cualquier automóvil que no compres directamente en el concesionario, sino que lo venda un particular, puede ser considerado un vehículo usado o de segunda mano. Coche de ocasión: son seminuevos que por lo general han tenido un único dueño.','view/images/category/coche2mano.jpg'),('REN','Renting','Es un contrato de alquiler de bienes muebles, a cambio del pago de cuotas periódicas prefijadas, que suele ser ofrecido por entidades de crédito y compañías especializadas, pero también por divisiones y filiales de los propios fabricantes de los bienes.','view/images/category/renting.jpg');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model`
--

DROP TABLE IF EXISTS `model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model` (
  `id_model` char(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_name` char(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url_model` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_brand` char(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_model`),
  KEY `FK_id_brand` (`id_brand`),
  CONSTRAINT `FK_id_brand` FOREIGN KEY (`id_brand`) REFERENCES `brand` (`id_brand`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model`
--

LOCK TABLES `model` WRITE;
/*!40000 ALTER TABLE `model` DISABLE KEYS */;
INSERT INTO `model` VALUES ('AA1','A1','view/images/models/audi_a1.png','AUD'),('AA7','A7','view/images/models/audi_a7.png','AUD'),('AA8','A8','view/images/models/audi_a8.png','AUD'),('AR8','R8','view/images/models/audi_r8.png','AUD'),('BM2','M2','view/images/models/bmw_m2.png','BMW'),('IBI','Ibiza','view/images/models/seat_ibiza.png','SAT'),('RS6','RS6','view/images/models/audi_rs6.png','AUD'),('SE1','Serie 1','view/images/models/bmw_serie1.png','BMW'),('SE2','Serie 2','view/images/models/bmw_serie2.png','BMW'),('SE3','Serie 3','view/images/models/bmw_serie3.png','BMW');
/*!40000 ALTER TABLE `model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type` (
  `id_type` char(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type_name` char(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon_class` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES ('BIO','Biodiésel','fa fa-gas-pump','El BIODIESEL es por definición un biocarburante o biocombustible líquido producido a partir de los aceites vegetales y grasas animales, siendo la soja, la colza, y el girasol, las materias primas más utilizadas mundialmente para este fin.'),('ELE','Eléctrico','fa fa-battery-full','Un vehículo de pila de combustible es un tipo de vehículo eléctrico que usa una pila de combustible para producir energía eléctrica.'),('ETN','Etanol','fa fa-gas-pump','El etanol es un compuesto químico obtenido a partir de la fermentación de los azúcares que puede utilizarse como combustible, solo, o bien, mezclado en cantidades variadas con gasolina.'),('GAS','Gasolina','fa fa-gas-pump','Un motor de gasolina es un motor de combustión interna (máquina térmica) que funciona bajo el Ciclo Otto y obviamente a gasolina; se caracteriza por ser un motor ágil, potente y de bajo torque, si lo comparamos con motores diesel.'),('GLP','GLP','fa fa-burn','El gas licuado del petróleo ​ es la mezcla de gases licuados presentes en el gas natural o disueltos en el petróleo. Lleva consigo procesos físicos y químicos, por ejemplo el uso de metano.'),('GNA','Gas Natural','fa fa-burn','El gas natural es una mezcla de gases ligeros de origen natural entre los que se encuentra en mayor proporción el metano, también incluye cantidades de etano, dióxido de carbono, propano entre otros. Su origen parte de la degradación de materia orgánica.'),('HID','Hidrógeno','fa fa-battery-full','Las pilas de combustible en los vehículos de hidrógeno crean electricidad para hacer funcionar un motor eléctrico usando hidrógeno o un combustible de hidrocarbono y oxígeno del aire. ');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-07 17:23:20
