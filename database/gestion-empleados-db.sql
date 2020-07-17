SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `gestion-empleados-db` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `gestion-empleados-db`;

CREATE TABLE `Empleados` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `tipoIdentificacion` enum('nit','cc') DEFAULT NULL,
  `numeroIdentificacion` int(11) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `fechaIngreso` datetime DEFAULT NULL,
  `salario` decimal(10,2) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Empleados` (`id`, `nombre`, `apellido`, `tipoIdentificacion`, `numeroIdentificacion`, `correo`, `fechaIngreso`, `salario`, `createdAt`, `updatedAt`) VALUES
(1, 'Juan', 'Rojas', 'cc', 1024263283, 'juan@coreo.com', '2020-07-17 15:34:33', '13231232.33', '2020-07-17 15:34:33', '2020-07-17 15:34:33'),
(2, 'Pedro', 'Ramirez', 'cc', 673578726, 'pedro@coreo.com', '2020-07-17 15:34:33', '13231232.33', '2020-07-17 15:34:33', '2020-07-17 15:34:33');

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20200716162746-create-telefonos-empleados.js'),
('20200716162846-create-empleados.js'),
('20200716162906-create-usuarios.js');

CREATE TABLE `Telefonos_Empleados` (
  `id` int(11) NOT NULL,
  `empleado_id` int(11) NOT NULL,
  `telefono` bigint(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Telefonos_Empleados` (`id`, `empleado_id`, `telefono`, `createdAt`, `updatedAt`) VALUES
(1, 1, 12312323, '2020-07-17 15:34:33', '2020-07-17 15:34:33'),
(2, 1, 317263172, '2020-07-17 15:34:33', '2020-07-17 15:34:33'),
(3, 1, 123123888, '2020-07-17 15:34:33', '2020-07-17 15:34:33'),
(4, 2, 342738428, '2020-07-17 15:34:33', '2020-07-17 15:34:33'),
(5, 2, 23718623, '2020-07-17 15:34:33', '2020-07-17 15:34:33');

CREATE TABLE `Usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `contraseña` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Usuarios` (`id`, `nombre`, `apellido`, `correo`, `contraseña`, `active`, `createdAt`, `updatedAt`) VALUES
(1, 'Juan', 'Rojas', 'david@correo.com', '$2b$10$Qg0TsBR8lfQ7YcVVzoCNNumHxs7mkkJ9xQrVJu7jsTMkl600aFysW', 0, '2020-07-17 15:34:33', '2020-07-17 15:34:33');


ALTER TABLE `Empleados`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

ALTER TABLE `Telefonos_Empleados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empleado_id` (`empleado_id`);

ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `Empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `Telefonos_Empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `Usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;


ALTER TABLE `Empleados`
  ADD CONSTRAINT `Empleados_ibfk_1` FOREIGN KEY (`id`) REFERENCES `Telefonos_Empleados` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
