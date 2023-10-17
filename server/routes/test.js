import express from "express";
import { getTest } from "../controllers/testController.js";

const test = express.Router();

test.get("/", getTest);

export default test;
