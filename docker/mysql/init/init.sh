#!/bin/bash
set -e
mysql -uhomestead -psecret <<-EOSQL
CREATE DATABASE IF NOT EXISTS homestead;
USE homestead;
DROP TABLE IF EXISTS users;
CREATE TABLE users (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name TEXT NOT NULL
)DEFAULT CHARACTER SET=utf8;
INSERT INTO users (name) VALUES ("太郎"),("花子"),("令和"),("令和2");
EOSQL