import express from "express";
import {
  getList,
  getQuestion,
  getTestCase,
} from "../controllers/questionController.js";

const questionRouter = express.Router();

questionRouter.get("/list", getList);
questionRouter.get("/:id", getQuestion);
questionRouter.get("/:id/testcase", getTestCase);

// question.post("/submit", getQuestion);

export default questionRouter;
