
CREATE TABLE IF NOT EXISTS `todos` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `completed` tinyint(1) NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`)
) 