import db from "../db.js";
import jwt from "jsonwebtoken";

export const postLogin = (req, res) => {
  const { id, password } = req.body;
  db.query(
    `select * from User where userID = '${id}' and password = '${password}'`,
    (err, results) => {
      if (err) {
        res.status(500).json({ success: false, error: "login ERROR" });
      } else {
        const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "5h",
        });
        console.log(token);
        res.cookie("jwt", token);

        res.status(200).json({ success: true });
      }
    }
  );
};
