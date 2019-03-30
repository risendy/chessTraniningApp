## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
* [Installation](#installation)
* [Screenshots](#screenshots)

## General info
Symfony/js app to solve chess puzzles using chess.js and chessboard.js libraries. The puzzles are loaded from the database in the FEN format using AJAX. Puzzle solution is kept in json array.
	
## Technologies
Project is created with:
* Symfony 3.4
* FOSUserBundle for user login/registration
* MySQL database
* Chess.js
* Chessboard.js
* EasyAdmin-bundle

## Features
* Solving chess puzzles
* Computing rating difference for puzzle and user using ELO ranking system.
* Comes with the admin panel to add new puzzles
* Comes with the data fixtures to load new user and 10 puzzles. User credentials are: user1/pass1

## Installation
#### Clone the repository
#### Run composer
```
composer install
```
#### Run migrations
```
php bin/console doctrine:migrations:migrate
```
#### Load fixtures
```
php bin/console doctrine:fixtures:load
```

## Screenshots

### Failed puzzle
![Main page](web/img/img2.png)

### Successful puzzle
![Main page](web/img/img3.png)

### Admin panel
![Main page](web/img/img4.png)
