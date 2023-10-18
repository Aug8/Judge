import db from "../db.js";

export const getQuestion = (req, res) => {
  db.query(`select * from Question where questionID = 1`, (err, results) => {
    if (err) {
      res.status(500).json({ error: "getQuestion ERROR" });
    }
    res.send(results[0]);
  });
};

export const getTestCase = (req, res) => {
  db.query(`select * from Question where questionID = 1`, (err, results) => {
    if (err) {
      res.status(500).json({ error: "getQuestion ERROR" });
    }
    res.send(results[0]);
  });
};
