import express from "express";
import { getList, getQuestion } from "../controllers/questionController.js";

const questionRouter = express.Router();

questionRouter.get("/list", getList);
questionRouter.get("/:id", getQuestion);
// question.post("/submit", getQuestion);

export default questionRouter;
