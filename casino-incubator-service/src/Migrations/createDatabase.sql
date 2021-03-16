-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: incubator_mysql
-- Generation Time: Apr 18, 2019 at 11:07 AM
-- Server version: 10.2.8-MariaDB-10.2.8+maria~jessie
-- PHP Version: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `RatingsDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `Emotions`
--

CREATE TABLE `Emotions` (
  `EmotionId` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Icon` longblob DEFAULT NULL,
  `OrderNumber` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Emotions`
--

INSERT INTO `Emotions` (`EmotionId`, `Name`, `Icon`, `OrderNumber`) VALUES
(1, 'Happy', NULL, NULL),
(2, 'Satisfied', NULL, NULL),
(3, 'Meh', NULL, NULL),
(4, 'Dissatisfied', NULL, NULL),
(5, 'Sad', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Ratings`
--

CREATE TABLE `Ratings` (
  `RatingId` int(11) NOT NULL,
  `EmotionId` int(11) NOT NULL,
  `TimeRated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Ratings`
--


-- --------------------------------------------------------

--
-- Table structure for table `Settings`
--

CREATE TABLE `Settings` (
  `NumberOfEmotions` varchar(10) DEFAULT '1',
  `Message` varchar(50) DEFAULT NULL,
  `MessageTimeout` int(11) DEFAULT 1000
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Settings`
--

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `UserId` int(11) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `RefreshToken` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Users`
--

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Emotions`
--
ALTER TABLE `Emotions`
  ADD PRIMARY KEY (`EmotionId`);

--
-- Indexes for table `Ratings`
--
ALTER TABLE `Ratings`
  ADD PRIMARY KEY (`RatingId`),
  ADD KEY `FK_RatingsEmotions` (`EmotionId`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`UserId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Emotions`
--
ALTER TABLE `Emotions`
  MODIFY `EmotionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Ratings`
--
ALTER TABLE `Ratings`
  MODIFY `RatingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Ratings`
--
ALTER TABLE `Ratings`
  ADD CONSTRAINT `FK_RatingsEmotions` FOREIGN KEY (`EmotionId`) REFERENCES `Emotions` (`EmotionId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
