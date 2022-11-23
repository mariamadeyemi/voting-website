CREATE TABLE if not exists parties(
    id int(11) unsigned PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(255),
    `acronym` varchar(255),
    `logo` varchar(255),
    `slogan` varchar(255)
);


CREATE TABLE if not exists elections (
     id int(11) unsigned PRIMARY KEY AUTO_INCREMENT,
     `name` varchar(255),
     office varchar(255),
      `year`date,
     `start_date` DATETIME
);

CREATE TABLE if not exists voters(
     id int(11) unsigned PRIMARY KEY AUTO_INCREMENT,
     surname varchar(255),
     first_name varchar(255),
     other_name varchar(255),
     admission_number varchar(255),
     `address` varchar(255),
     date_of_birth date,
     state_of_origin varchar(255),
     gender ENUM('Male', 'Female'),
     phone_number int(11) unique,
     email_address varchar(255) unique
     
     );

CREATE TABLE if not exists staff(
    id int(11) unsigned PRIMARY KEY AUTO_INCREMENT,
    username varchar(255),
    `password` varchar(255),
    `name` varchar(255),
    employment_date date
    );
CREATE TABLE if not exists candidates(
     id int(11) unsigned PRIMARY KEY AUTO_INCREMENT,
     surname varchar(255),
     first_name varchar(255),
     other_name varchar(255),
     party_id int(11) unsigned,
     election_id int(11) unsigned,
     date_of_birth date,
     state_of_origin varchar(255),
     `address` varchar(255),
     gender ENUM('Male', 'Female'),
     phone_number int(11) unique,
     email_address varchar(255) unique,
     photo varchar(255),
     constraint fk_candidates_party_id FOREIGN KEY (party_id) REFERENCES parties(id),
     constraint fk_candidates_election_id FOREIGN KEY (election_id) REFERENCES elections(id)            
);

CREATE TABLE if not exists votes(
    id int(11) unsigned PRIMARY KEY AUTO_INCREMENT,
    election_id int(11) unsigned,
    vote int(11)unsigned,
    voter_id int(11) unsigned,
    `date_time` DATETIME,
    CONSTRAINT FK_votes_elections_id FOREIGN KEY (election_id) REFERENCES elections(id),      
    CONSTRAINT FK_votes_voters_id FOREIGN KEY (voter_id) REFERENCES voters(id),     
    CONSTRAINT FK_votes_votes_id FOREIGN KEY (vote) REFERENCES parties(id),      
    CONSTRAINT UQ_votes_elections_id_voter_id UNIQUE(election_id, voter_id)
   );

