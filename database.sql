CREATE DATABASE `helloword`;
USE `helloword`;

CREATE TABLE `carros` (
    `codigo` INT(11) NOT NULL,
    `modelo` VARCHAR(40)CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
    `placa` VARCHAR(40)CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT ''
)  ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE = utf8_unicode_ci;

CREATE TABLE `produtos` (
    `codigo` int(11) NOT NULL,
    `produto` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
    `descricao` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
    `valor` float NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `usuarios` (
    `codigo` int(11) NOT NULL,
    `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
    `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
    `password` varchar(32) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `carros`
    ADD PRIMARY KEY (`codigo`);

ALTER TABLE `produtos`
    ADD PRIMARY KEY (`codigo`);

ALTER TABLE `usuarios`
    ADD PRIMARY KEY (`codigo`);

ALTER TABLE `carros`
    MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `produtos`
    MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `usuarios`
    MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;