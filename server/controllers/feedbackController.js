import dotenv from "dotenv";
import db from "../db.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getFeedback = (req, res) => {
  const qId = req.params.id;
  const user = req.user.id;
  if (!user) {
    res.status(500).json({ error: "not login status" });
  }

  db.query(
    `SELECT code, feedback FROM Solve where userID = '${user}' and questionID = ${qId} ORDER BY solveID DESC LIMIT 1`,
    (err, results) => {
      if (err) {
        print(err);
      }
      res.send(results[0]);
      console.log(results);
    }
  );
};
