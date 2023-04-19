-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 19, 2023 at 08:34 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sibenice`
--

-- --------------------------------------------------------

--
-- Table structure for table `ids`
--

CREATE TABLE `ids` (
  `idK` int(11) NOT NULL,
  `usrId` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ids`
--

INSERT INTO `ids` (`idK`, `usrId`) VALUES
(1, '$argon2id$v=19$m=65536,t=4,p=1$WXgzMGViNHBHaEUvOGJuNg$zJoVk6gOnhf0taYDGlSGnctsJp49Nmf9RAQlS5yaxA4'),
(2, '$argon2id$v=19$m=65536,t=4,p=1$RG92S1dpQmZFWVRDVVd5aw$XWjr4HYDp5FvWoIIqg7FVjwVbNB4Y46HT3t8A4a//zM'),
(3, '$argon2id$v=19$m=65536,t=4,p=1$ZkhiNENXdjllWDMyUy9CbQ$eCCLVv3A8dpKzugjEXfaKEvXN9Jrvus3svtOPqwdoLE'),
(4, '$argon2id$v=19$m=65536,t=4,p=1$LzRYVG5HZDhzcGdzWEViaw$2hBjePGL1HPkn59itl4KwJLOrsFBapcdrhuYwsuRXIM'),
(5, '$argon2id$v=19$m=65536,t=4,p=1$OWZOR24xWFloTVdvbS9GSg$o2UjcgAeM/oGsSyr83T3H70QmBv4gJ1KJHlzYsHJlxo');

-- --------------------------------------------------------

--
-- Table structure for table `statistics`
--

CREATE TABLE `statistics` (
  `statisticId` int(11) NOT NULL,
  `wonGame` int(11) NOT NULL,
  `lostGame` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `wordId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `statistics`
--

INSERT INTO `statistics` (`statisticId`, `wonGame`, `lostGame`, `userId`, `wordId`) VALUES
(11, 2, 9, 22, 7),
(12, 1, 0, 16, 5),
(13, 1, 0, 16, 10);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `userMail` varchar(50) NOT NULL,
  `userPass` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userMail`, `userPass`) VALUES
(16, 'frantauzdichca@gmail.com', '$2y$10$5ebVdnjQei0yDx9IeglZe.p5dJY/kjAzLGsHE.0c0rrM6DsioIWNG'),
(17, 'frantapazdichca@gmail.com', '$2y$10$TGLnurPpB2v3cgB07dV5/eyQbJEMMt9WacBf.3id/z6d8G3kUwBBq'),
(20, 'pepega@gmail.com', '$2y$10$/RCjd85TLfNIcwrbepZLHeTgTvAuvBd3r3KrSJNqvv7OxBIfGnYt.'),
(21, 'fsadmfa@gmail.com', '$2y$10$isd.fkxtCJfQYv0EmV/sWeF5LOejEOwm6eHaAcxHeAEi7Ia1KnVOW'),
(22, 'asbuzbauszd@gmail.com', '$2y$10$Usgt5tsOUOx2rojjT.Dg4OF4ZIPU6Brlu01k.8c0efJlxzYq17QXu');

-- --------------------------------------------------------

--
-- Table structure for table `words`
--

CREATE TABLE `words` (
  `wordId` int(11) NOT NULL,
  `word` varchar(33) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `words`
--

INSERT INTO `words` (`wordId`, `word`) VALUES
(1, 'kůň'),
(2, 'farma'),
(3, 'chleba'),
(4, 'okno'),
(5, 'podlaha'),
(6, 'židle'),
(7, 'stůl'),
(8, 'nebe'),
(9, 'dveře'),
(10, 'postel');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ids`
--
ALTER TABLE `ids`
  ADD PRIMARY KEY (`idK`);

--
-- Indexes for table `statistics`
--
ALTER TABLE `statistics`
  ADD PRIMARY KEY (`statisticId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `wordId` (`wordId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `userMail` (`userMail`);

--
-- Indexes for table `words`
--
ALTER TABLE `words`
  ADD PRIMARY KEY (`wordId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ids`
--
ALTER TABLE `ids`
  MODIFY `idK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `statistics`
--
ALTER TABLE `statistics`
  MODIFY `statisticId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `words`
--
ALTER TABLE `words`
  MODIFY `wordId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `statistics`
--
ALTER TABLE `statistics`
  ADD CONSTRAINT `statistics_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `statistics_ibfk_2` FOREIGN KEY (`wordId`) REFERENCES `words` (`wordId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
