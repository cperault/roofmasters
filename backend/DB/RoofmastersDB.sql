-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 07, 2019 at 06:07 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `RoofmastersDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `Messages`
--

CREATE TABLE `Messages` (
  `messageID` int(11) NOT NULL,
  `associatedID` int(11) NOT NULL,
  `senderName` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `senderEmail` char(100) COLLATE utf8_unicode_ci NOT NULL,
  `messageContent` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `messageTimeStamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `RMUsers`
--

CREATE TABLE `RMUsers` (
  `userID` int(11) NOT NULL,
  `firstName` char(30) COLLATE utf8_unicode_ci NOT NULL,
  `lastName` char(30) COLLATE utf8_unicode_ci NOT NULL,
  `phoneNumber` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `emailAddress` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `userPassword` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `userRole` char(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'customer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `RMUsers`
--

INSERT INTO `RMUsers` (`userID`, `firstName`, `lastName`, `phoneNumber`, `emailAddress`, `userPassword`, `userRole`) VALUES
(1, 'Christopher', 'Perault', '402-326-5791', 'cp652540@southeast.edu', '$2y$13$VfHeTdwVNYz/eVeHfmSiH.3VGJQtNemj9RRAYC/0Co.BNce.yrT2K', 'admin'),
(3, 'Alexander', 'Smith', '123-123-1234', 'asmith@gmail.com', '$2y$13$ef6aPdH5Gdu8w1GnSnZ7gO3Aus70ArFPHzZBSiVMe9KnCwIYUkqOC', 'customer'),
(4, 'Emily', 'Morris', '402-123-1521', 'emorris@gmail.com', '$2y$13$BAFSOWqy1dv8Hq8aUABed.0fN/6ngH/lM3Vq1SS6rD9cGzekFLnqe', 'admin'),
(7, 'TestFirst', 'TestLast', '4023130923', 'test@scc.edu', '$2y$13$AIwTa5xfL.eEEhRXg8IhQOF8i7ijfeIVoF9cz/vAjAaNxIDlt6XuW', 'customer'),
(8, 'Glenn', 'Ray', '555-123-2315', 'gray@scc.edu', '$2y$13$Y9q8YSn5UgNKPryakxu6feSvmJtf98hrlS2oX3SmrzHngZ3R4yshS', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Messages`
--
ALTER TABLE `Messages`
  ADD PRIMARY KEY (`messageID`);

--
-- Indexes for table `RMUsers`
--
ALTER TABLE `RMUsers`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Messages`
--
ALTER TABLE `Messages`
  MODIFY `messageID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `RMUsers`
--
ALTER TABLE `RMUsers`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
