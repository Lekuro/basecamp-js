-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Час створення: Січ 27 2019 р., 20:34
-- Версія сервера: 8.0.13
-- Версія PHP: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База даних: `users`
--

-- --------------------------------------------------------

--
-- Структура таблиці `userdata`
--

CREATE TABLE `userdata` (
  `id` int(10) UNSIGNED NOT NULL,
  `pub_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `firstname` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `surname` tinytext NOT NULL,
  `phone` varchar(255) NOT NULL,
  `addres` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `create_date` date NOT NULL,
  `skills` text NOT NULL,
  `education` text NOT NULL,
  `interest` text,
  `languages` text NOT NULL,
  `sent_email` varchar(255) DEFAULT NULL,
  `sent_message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `userdata`
--

INSERT INTO `userdata` (`id`, `firstname`, `surname`, `phone`, `addres`, `email`, `birthday`, `create_date`, `skills`, `education`, `interest`, `languages`, `sent_email`, `sent_message`) VALUES
(2, 'Bob', 'Pupckin', '+38 088 333 69 69', 'lviv', 'l@i.ua', '2019-01-01', '2019-01-21', 'I know such programing languages: Html for a 40%, Css for a 50%, JS for a 60%, PHP for a 10%, Node.js for a 20%.', 'I learned in Hight School at 1991-2000.Successfully.', 'I love , sports.', 'I know such languages: English for a 4 point, Ukrainian for a 5 point.', '', 'I love to study.');

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `userdata`
--
ALTER TABLE `userdata`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `userdata`
--
ALTER TABLE `userdata`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
