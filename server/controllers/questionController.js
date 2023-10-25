import db from "../db.js";

export const getQuestion = (req, res) => {
  const id = req.params.id;
  db.query(
    `select * from Question where questionID = ${id}`,
    (err, results) => {
      if (err) {
        res.status(500).json({ error: "getQuestion ERROR" });
      }
      res.send(results[0]);
    }
  );
};

export const getList = (req, res) => {
  db.query(`select * from Question`, (err, results) => {
    if (err) {
      res.status(500).json({ error: "getList ERROR" });
    }
    res.send(results);
  });
};

export const getTestCase = (req, res) => {
  db.query(`select * from TestCase where questionID = 1`, (err, results) => {
    if (err) {
      res.status(500).json({ error: "getTestCase ERROR" });
    }
    res.send(results[0]);
  });
};
