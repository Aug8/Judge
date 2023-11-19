DROP DATABASE IF EXISTS OnlineJudge;
CREATE DATABASE OnlineJudge;

USE OnlineJudge;

DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `Question`;
DROP TABLE IF EXISTS `TestCase`;
DROP TABLE IF EXISTS `Solve`;



CREATE TABLE User (
  `userID` VARCHAR(20) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  PRIMARY KEY(`userID`)
);

CREATE TABLE Question (
  `questionID` INT NOT NULL AUTO_INCREMENT,
  `userID` VARCHAR(20) NOT NULL,
  `title` VARCHAR(20) NOT NULL,
  `detail` VARCHAR(100) NOT NULL,
  PRIMARY KEY(`questionID`),
  FOREIGN KEY (`userID`) REFERENCES User(`userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE TestCase (
  `caseID` INT NOT NULL AUTO_INCREMENT,
  `questionID` INT NOT NULL,
  `testinput` VARCHAR(20) NOT NULL,
  `testoutput` VARCHAR(20) NOT NULL,
  PRIMARY KEY(`caseID`),
  FOREIGN KEY (`questionID`) REFERENCES Question(`questionID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Solve (
  `solveID` INT NOT NULL AUTO_INCREMENT,
  `userID` VARCHAR(20) NOT NULL,
  `questionID` INT NOT NULL,
  `code` TEXT,
  `result` TINYINT(1),
  `feedback` VARCHAR(500),
  PRIMARY KEY (`solveID`),
  FOREIGN KEY (`userID`) REFERENCES User(`userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`questionID`) REFERENCES Question(`questionID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


/* 데이터 삽입 */

INSERT INTO User values
  ('test1', 'password'),
  ('test2', 'password'),
  ('test3', 'password'),
  ('test4', 'password');

INSERT INTO Question(userID, title, detail) values
  ('test1', '출력 연습', 'print문을 사용해보자!'),
  ('test1', '반복문 연습', '반복문을 사용해 1부터 9까지의 숫자를 출력하시오.'),
  ('test1', 'title3', 'desc'),
  ('test2', 'title4', 'desc');

INSERT INTO TestCase(questionID, testinput, testoutput) values
  (1, '', 'Hello World!'),
  (2, '', '123456789'),
  (3, 'input3', 'output3');

INSERT INTO Solve(userID, questionID, code, result, feedback) values
  ('test1', 4, 'code', 0, 'feedback'),
  ('test2', 1, 'code2', 0, 'feedback'),
  ('test2', 2, 'code3', 1, 'feedback');
