import express from "express";

import { jwtAuth } from "../controllers/jwtAuth.js";
import { postCode } from "../controllers/codeController.js";
import { getFeedback } from "../controllers/feedbackController.js";

const codeRouter = express.Router();

codeRouter.post("/submit", jwtAuth, postCode);
codeRouter.get("/:id/feedback", jwtAuth, getFeedback);

export default codeRouter;
