import { faker } from '@faker-js/faker';

export function createUser() {
    return {

    };
}

//users
/*
CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) NOT NULL UNIQUE,
  `email` varchar(100) NOT NULL UNIQUE,
  `password` char(32) NOT NULL,
  `role` enum('user','admin','gold','bot') NOT NULL DEFAULT 'user',
  `avatar` text DEFAULT NULL,
  `created_at` date NOT NULL,
  `status` enum('banned','verified','registered') NOT NULL DEFAULT 'registered',
  `online` tinyint(3) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 */