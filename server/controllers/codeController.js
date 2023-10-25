import db from "../db.js";
import { exec } from "child_process";

function escapeCode(code) {
  return code.replace(/"/g, '\\"');
}

export const postCode = (req, res) => {
  const user = req.user.id;
  if (!user) {
    res.status(500).json({ error: "not login status" });
  }
  const { qId, code } = req.body;
  const eCode = escapeCode(code);

  exec(`python -c "${eCode}"`, (error, stdout, stderr) => {
    if (error) {
      console.log("Python execution error", error.message);
    } else {
      console.log("stdout:", stdout);
      console.log("stderr:", stderr);
    }
  });

  console.log(eCode);
  db.query(
    `INSERT INTO Solve(userID, questionID, code, result, feedback) VALUES (?, ?, ?, ?, ?)`,
    [user, qId, eCode, 1, "temp"],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "postCode ERROR" });
      }
      res.end();
    }
  );
};
