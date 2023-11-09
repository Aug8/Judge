import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import questionRouter from "./routes/questionRouter.js";
import userRouter from "./routes/userRouter.js";
import codeRouter from "./routes/codeRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/questionAPI", questionRouter);
app.use("/userAPI", userRouter);
app.use("/codeAPI", codeRouter);

app.get("*", (req, res) => {
  res.send("testing");
});

app.listen(4000, () => console.log("4000번 포트"));

export default app;
