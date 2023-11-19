import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/blackboard.css";
import "codemirror/mode/python/python";
import "../styles/ResultStyle.css";
import axios from "axios";

function Result() {
  const { qID } = useParams();
  const [data, setData] = useState("");
  const [question, setQuestion] = useState({
    title: "title",
    detail: "detail",
  });

  useEffect(() => {
    const getQuestion = async () => {
      await axios
        .get(`http://localhost:4000/questionAPI/${qID}`)
        .then((res) => {
          setQuestion(res.data);
        });
    };
    const getResult = async () => {
      await axios
        .get(`http://localhost:4000/codeAPI/${qID}/feedback`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        });
    };
    getQuestion();
    getResult();
  }, []);

  return (
    <div>
      <div className="question">
        <div className="title">{question.title}</div>
        <div className="detail">{question.detail}</div>
      </div>
      <div className="result">
        <div className="code">
          <p>제출한 코드</p>
          <CodeMirror
            value={data.code}
            onChange={(editor, data, value) => {}}
            options={{
              mode: "python",
              theme: "blackboard",
              lineNumbers: true,
            }}
          />
        </div>
        <div className="feedback">
          <p>피드백</p>
          {data.feedback}
        </div>
      </div>
    </div>
  );
}

export default Result;
