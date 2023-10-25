import express from "express";

import { jwtAuth } from "../controllers/jwtAuth.js";
import { postCode } from "../controllers/codeController.js";

const codeRouter = express.Router();

codeRouter.post("/submit", jwtAuth, postCode);

export default codeRouter;
