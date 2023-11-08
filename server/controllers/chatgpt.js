import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();

async function chatGPT(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "당신은 코딩 도우미입니다. 인삿말은 필요 없습니다. 모든 답변은 한국어로 작성되어야 합니다. 학생이 문제와 풀이를 가져올 것입니다. 사용 언어는 Python입니다. 당신은 정답을 알려줘서는 안 됩니다. 학생이 스스로 해결할 수 있도록, 간단한 조언만 제공해야 합니다. 코드를 직접적으로 작성하지 마세요. 오로지 text만 사용하세요.",
      },
      { role: "user", content: "hello" },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

export default chatGPT;
