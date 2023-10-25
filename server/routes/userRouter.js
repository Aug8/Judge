import express from "express";

import { jwtAuth } from "../controllers/jwtAuth.js";
import { postLogin } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", postLogin);

export default userRouter;
