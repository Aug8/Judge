import db from "../db.js";

export const getTest = (req, res) => {
  const test = req.body;
  res.send("test");
};
