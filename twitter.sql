CREATE DATABASE twitter;

CREATE TABLE users;

CREATE TABLE users (
id integer auto_increment,
first_name varchar(30),
last_name varchar(50),
date_of_birth date,
email varchar(120) not null,
password varchar(100) not null,
phone_number int(10),
city varchar(50),
username varchar(20) not null,
PRIMARY KEY (id)
);

CREATE TABLE tweets (
id integer auto_increment,
text varchar(144) not null,
creation_date date,
user_id integer not null,
PRIMARY KEY (id),
FOREIGN KEY (user_id) references users(id)
);


INSERT INTO users
VALUES (6, "Laure", "Platon", "1960-12-23", "laureplaton@gmail.com", "laure2021", 0143222315, "Lyon", "laure_platon"),
(7, "Vincent", "Cicéron", "1980-09-22", "vincent.ciceron@gmail.com", "vincent2021", 0345464748, "Londres", "vincent_ciceron"),
(8, "Diego", "Shakespeare", "1985-08-10", "diego.shakespeare@gmail.com", "diego2021", 0234455678, "Naples", "diego_shakespeare"),
(9, "Leïla", "Racine", "1979-03-12", "leila.racine@gmail.com", "leila2021", 0123456789, "Bordeaux", "leila_racine"),
(10, "Marilyn", "Ghandi", "1983-06-03", "marilyn.ghandi@gmail.com", "marilyn2021", 0789678546, "Toronto", "marilyn_ghandi");

INSERT INTO tweets
VALUES (1, "On peut en savoir plus sur quelqu'un en une heure de jeu qu'en une année de conversation", "2020-12-08", 6),
(2, "Ce n'est pas parce qu'on craint de la commettre, mais c'est parce qu'on craint de la subir que l'on blâme l'injustice", "2021-02-08", 6),
(3, "La nécessité est la mère de l’invention", "2021-03-04", 6),
(4, "L'essentiel n'est pas de vivre, mais de bien vivre", "2021-01-22", 6),
(5, "Une pièce sans livres, c'est comme un corps sans âme", "2021-01-08", 7),
(6, "C'est dans l'adversité que se révèlent les vrais amis", "2021-01-12", 7),
(7, "La vie des morts consiste à survivre dans l'esprit des vivants", "2021-03-22", 7),
(8, "Les orateurs élèvent la voix quand ils manquent d'arguments", "2021-03-26", 7),
(9, "Rien n'exprime mieux la joie que le silence. Si j'ai pu dire combien grand était mon bonheur, c'est qu'il était petit.", "2021-02-18", 8),
(10, "La poésie est cette musique que tout homme porte en soi.", "2021-03-09", 8),
(11, "Nous sommes faits de la même étoffe que les songes et notre petite vie, un somme la parachève.", "2021-01-17", 8),
(12, "On peut faire beaucoup avec la haine, mais encore plus avec l'amour.", "2021-03-11", 8);
(13, "J’embrasse mon rival, mais c’est pour l’étouffer", "2021-02-19", 9),
(14, "Ma vengeance est perdue s’il ignore en mourant que c’est moi qui le tue", "2021-01-25", 9),
(15, "Il n'est point de secrets que le temps ne révèle.", "2021-03-02", 9),
(16, "Le conseil le plus prompt est le plus salutaire.", "2021-03-06", 9),
(17, "La vie est un mystère qu'il faut vivre, et non un problème à résoudre.", "2021-02-13", 10),
(18, "Notre vie est une longue et pénible quête de la Vérité.", "2021-03-13", 10),
(19, "Le bonheur c’est lorsque vos actes sont en accord avec vos paroles.", "2021-01-14", 10),
(20, "Vis comme si tu devais mourir demain, apprends comme si tu devais vivre toujours.", "2021-03-01", 10);