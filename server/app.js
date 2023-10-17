import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// import testRouters from "./routes/testRouters.js";
import test from "./routes/test.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/testAPI", test);

app.get("*", (req, res) => {
  res.send("testing");
});

app.listen(4000, () => console.log("4000번 포트"));

export default app;
