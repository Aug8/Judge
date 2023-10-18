import express from "express";
import { getQuestion } from "../controllers/questionController.js";

const question = express.Router();

question.get("/", getQuestion);

export default question;
