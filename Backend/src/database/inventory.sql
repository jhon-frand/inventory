-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 16, 2024 at 12:17 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `actividades`
--

CREATE TABLE `actividades` (
  `id_actividad` int NOT NULL,
  `fecha_realizacion_actividad` date NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `fk_mantenimiento` int NOT NULL,
  `fk_tecnico` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `actividades`
--

INSERT INTO `actividades` (`id_actividad`, `fecha_realizacion_actividad`, `descripcion`, `fk_mantenimiento`, `fk_tecnico`) VALUES
(1, '2024-03-20', 'actividad normal', 1, 1),
(3, '2024-05-18', 'Alexander y mantenimiento preventivo del equipo de riego', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int NOT NULL,
  `nombre_categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre_categoria`) VALUES
(1, 'reparar'),
(2, 'funcional'),
(3, 'dañado');

-- --------------------------------------------------------

--
-- Table structure for table `equipos`
--

CREATE TABLE `equipos` (
  `id_equipo` int NOT NULL,
  `serial` int NOT NULL,
  `nombre_equipo` varchar(50) NOT NULL,
  `marca_equipo` varchar(50) NOT NULL,
  `modelo_equipo` varchar(50) NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `tipo_equipo` varchar(50) NOT NULL,
  `estado` enum('activo','inactivo','mantenimiento','excluido') NOT NULL,
  `fk_categoria` int NOT NULL,
  `fk_ubicacion` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `equipos`
--

INSERT INTO `equipos` (`id_equipo`, `serial`, `nombre_equipo`, `marca_equipo`, `modelo_equipo`, `fecha_ingreso`, `descripcion`, `tipo_equipo`, `estado`, `fk_categoria`, `fk_ubicacion`) VALUES
(1, 12345, 'Molino Trit', 'SUMER', '2023', '2021-11-13', 'Molino triturador de cárnicos', 'manual', 'activo', 2, 1),
(2, 11789, 'Demoledor', 'juyi', '45-a', '2023-12-07', 'parchado', 'ww', 'mantenimiento', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `mantenimientos`
--

CREATE TABLE `mantenimientos` (
  `id_mantenimiento` int NOT NULL,
  `tipo_mantenimiento` enum('preventivo','tecnico') NOT NULL,
  `fecha_realizacion_mantenimiento` date NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `resultado` varchar(250) NOT NULL,
  `fk_user_responsable` int NOT NULL,
  `fk_equipo` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mantenimientos`
--

INSERT INTO `mantenimientos` (`id_mantenimiento`, `tipo_mantenimiento`, `fecha_realizacion_mantenimiento`, `descripcion`, `resultado`, `fk_user_responsable`, `fk_equipo`) VALUES
(1, 'tecnico', '2024-03-14', 'reparamiento normal', 'exitoso', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tecnicos`
--

CREATE TABLE `tecnicos` (
  `id_tecnico` int NOT NULL,
  `identificacion` int NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tecnicos`
--

INSERT INTO `tecnicos` (`id_tecnico`, `identificacion`, `nombres`, `apellidos`, `correo`, `telefono`) VALUES
(1, 45465494, 'Bob', 'Reparador', 'bobelreparador@gmail.com', '4787846'),
(2, 45879, 'Alexander', 'Martinez', 'alexa@gmail.com', '3222690225');

-- --------------------------------------------------------

--
-- Table structure for table `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `id_tipo_usuario` int NOT NULL,
  `rol` enum('administrador','encargado') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`id_tipo_usuario`, `rol`) VALUES
(1, 'administrador'),
(2, 'encargado');

-- --------------------------------------------------------

--
-- Table structure for table `ubicaciones`
--

CREATE TABLE `ubicaciones` (
  `id_ubicacion` int NOT NULL,
  `fk_unidad_productiva` int NOT NULL,
  `ambiente` varchar(50) NOT NULL,
  `sitio` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ubicaciones`
--

INSERT INTO `ubicaciones` (`id_ubicacion`, `fk_unidad_productiva`, `ambiente`, `sitio`) VALUES
(1, 3, 'f-2', 'Mesón'),
(2, 2, 'A-13', 'Mesa 2'),
(3, 2, 'Y-13', 'Mesa 5'),
(8, 1, 'y-23', 'mesa 4');

-- --------------------------------------------------------

--
-- Table structure for table `unidades_productivas`
--

CREATE TABLE `unidades_productivas` (
  `id_unidad` int NOT NULL,
  `nombre_unidad` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `unidades_productivas`
--

INSERT INTO `unidades_productivas` (`id_unidad`, `nombre_unidad`) VALUES
(1, 'Escuela del Café'),
(2, 'Gastronomía'),
(3, 'Agroindustria');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL,
  `identificacion` int NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `fk_tipo_usuario` int NOT NULL,
  `fk_unidad_productiva` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `identificacion`, `nombres`, `apellidos`, `email`, `telefono`, `password`, `fk_tipo_usuario`, `fk_unidad_productiva`) VALUES
(1, 454788, 'Aire', 'Viento', 'agua@gmail.com', '78945645', '12345', 1, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actividades`
--
ALTER TABLE `actividades`
  ADD PRIMARY KEY (`id_actividad`),
  ADD KEY `efectuar` (`fk_mantenimiento`),
  ADD KEY `ejecutar` (`fk_tecnico`);

--
-- Indexes for table `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indexes for table `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id_equipo`),
  ADD KEY `formar` (`fk_categoria`),
  ADD KEY `estar` (`fk_ubicacion`);

--
-- Indexes for table `mantenimientos`
--
ALTER TABLE `mantenimientos`
  ADD PRIMARY KEY (`id_mantenimiento`),
  ADD KEY `asignar` (`fk_user_responsable`),
  ADD KEY `realizar` (`fk_equipo`);

--
-- Indexes for table `tecnicos`
--
ALTER TABLE `tecnicos`
  ADD PRIMARY KEY (`id_tecnico`);

--
-- Indexes for table `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`id_tipo_usuario`);

--
-- Indexes for table `ubicaciones`
--
ALTER TABLE `ubicaciones`
  ADD PRIMARY KEY (`id_ubicacion`),
  ADD KEY `contener` (`fk_unidad_productiva`);

--
-- Indexes for table `unidades_productivas`
--
ALTER TABLE `unidades_productivas`
  ADD PRIMARY KEY (`id_unidad`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `ser` (`fk_tipo_usuario`),
  ADD KEY `pertenecer` (`fk_unidad_productiva`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actividades`
--
ALTER TABLE `actividades`
  MODIFY `id_actividad` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id_equipo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `mantenimientos`
--
ALTER TABLE `mantenimientos`
  MODIFY `id_mantenimiento` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tecnicos`
--
ALTER TABLE `tecnicos`
  MODIFY `id_tecnico` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `id_tipo_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ubicaciones`
--
ALTER TABLE `ubicaciones`
  MODIFY `id_ubicacion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `unidades_productivas`
--
ALTER TABLE `unidades_productivas`
  MODIFY `id_unidad` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `actividades`
--
ALTER TABLE `actividades`
  ADD CONSTRAINT `efectuar` FOREIGN KEY (`fk_mantenimiento`) REFERENCES `mantenimientos` (`id_mantenimiento`),
  ADD CONSTRAINT `ejecutar` FOREIGN KEY (`fk_tecnico`) REFERENCES `tecnicos` (`id_tecnico`);

--
-- Constraints for table `equipos`
--
ALTER TABLE `equipos`
  ADD CONSTRAINT `estar` FOREIGN KEY (`fk_ubicacion`) REFERENCES `ubicaciones` (`id_ubicacion`),
  ADD CONSTRAINT `formar` FOREIGN KEY (`fk_categoria`) REFERENCES `categorias` (`id_categoria`);

--
-- Constraints for table `mantenimientos`
--
ALTER TABLE `mantenimientos`
  ADD CONSTRAINT `asignar` FOREIGN KEY (`fk_user_responsable`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `realizar` FOREIGN KEY (`fk_equipo`) REFERENCES `equipos` (`id_equipo`);

--
-- Constraints for table `ubicaciones`
--
ALTER TABLE `ubicaciones`
  ADD CONSTRAINT `contener` FOREIGN KEY (`fk_unidad_productiva`) REFERENCES `unidades_productivas` (`id_unidad`);

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `pertenecer` FOREIGN KEY (`fk_unidad_productiva`) REFERENCES `unidades_productivas` (`id_unidad`),
  ADD CONSTRAINT `ser` FOREIGN KEY (`fk_tipo_usuario`) REFERENCES `tipo_usuario` (`id_tipo_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
