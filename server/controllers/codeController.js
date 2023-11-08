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

  exec(`python -c "${eCode}"`, (error, stdout, stderr) => {
    if (error) {
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
          "당신은 코딩 도우미입니다. 모든 답변은 한국어로 작성되어야 합니다. 사용 언어는 Python입니다. 당신은 정답을 직접 알려줘서는 안 됩니다. 문제를 스스로 해결할 수 있도록, 간단한 조언만 제공해야 합니다. 절대 당신이 코드를 작성하지 마세요. 오직 텍스트만 사용하세요.",
      },
      {
        role: "assistant",
        content: `"""문제: ${question}""" """테스트 케이스: ${testcase}""" """학생의 풀이: ${eCode}"""`,
      },
      {
        role: "user",
        content: `문제를 풀 수 있도록 도와주세요. 하지만 정답을 말해서는 안 됩니다.`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
  return completion.choices[0]["message"]["content"];
}
