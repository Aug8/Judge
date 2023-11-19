import dotenv from "dotenv";
import db from "../db.js";
import { exec } from "child_process";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function escapeCode(code) {
  return code.replace(/"/g, '\\"');
}

export const postCode = (req, res) => {
  const user = req.user.id;
  if (!user) {
    res.status(500).json({ error: "not login status" });
  }
  const { qId, code } = req.body;
  const eCode = escapeCode(code);

  let execerror = "";
  exec(`python -c "${eCode}"`, (error, stdout, stderr) => {
    if (error) {
      execerror = error.message;
      console.log("Python execution error", error.message);
    } else {
      console.log("stdout:", stdout);
      console.log("stderr:", stderr);
    }
  });

  let question = "";
  let testcase = [];
  let feedback = "";

  db.query(
    `SELECT detail FROM Question where questionID = ${qId}`,
    (err, results) => {
      if (err) {
        console.error(err);
        return;
      }
      question = results[0]["detail"];

      db.query(
        `SELECT testinput, testoutput FROM TestCase where questionID = ${qId}`,
        async (err, results) => {
          if (err) {
            console.error(err);
            return;
          }
          testcase = results;

          console.log(question, testcase, code);

          try {
            feedback = await chatGPT(question, testcase, eCode);
          } catch (error) {
            console.error("Error getting feedback:", error);
            res.status(500).json({ error: "Error getting feedback" });
            return;
          }

          db.query(
            `INSERT INTO Solve(userID, questionID, code, result, feedback) VALUES (?, ?, ?, ?, ?)`,
            [user, qId, eCode, 1, feedback],
            (err, results) => {
              if (err) {
                console.log(err);
                res.status(500).json({ error: "postCode ERROR" });
                return;
              }
              res.end();
            }
          );
        }
      );
    }
  );
};

async function chatGPT(question, testcase, eCode) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "당신은 코딩 선생님입니다. 모든 답변은 한국어로 작성되어야 합니다. 답변 내용에 코드를 포함하면 안 됩니다. 예시를 들면 안 됩니다. 학습자가 문제를 스스로 해결할 수 있도록, 간단한 조언만 제공해야 합니다.",
      },
      {
        role: "assistant",
        content: `"""문제: ${question}""" """테스트 케이스: ${testcase}""" """풀이: ${eCode}"""`,
      },
      {
        role: "user",
        content: `제가 코드를 개선할 수 있도록 조언해주세요! 제가 직접 해결하고 싶으니 정답을 알려줘서는 안 됩니다. 간접적으로 조언해 주세요. 풀이 방법은 필요 없습니다. 문제점을 짚어주세요.`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
  return completion.choices[0]["message"]["content"];
}
