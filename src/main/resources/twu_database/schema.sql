CREATE TABLE  `ideaboardz`.`comments` (
  `commentID` int(11) NOT NULL AUTO_INCREMENT,
  `boardID` int(11),
  `name` varchar(20),
  `comment` varchar(200),
  `createdAt` varchar(20),
  PRIMARY KEY (`commentID`)
);