import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/blackboard.css";
import "codemirror/mode/python/python";
import "../styles/QuestionStyle.css";
import axios from "axios";

function Question() {
  const navigate = useNavigate();

  const { qID } = useParams();
  const [data, setData] = useState({ title: "title", detail: "detail" });
  const [testcase, setTestcase] = useState([{ testinput: "", testoutput: "" }]);
  const [code, setCode] = useState("");

  useEffect(() => {
    const getQuestion = async () => {
      await axios
        .get(`http://localhost:4000/questionAPI/${qID}`)
        .then((res) => {
          setData(res.data);
        });
    };
    const getTestCase = async () => {
      await axios
        .get(`http://localhost:4000/questionAPI/${qID}/testcase`)
        .then((res) => {
          console.log(res.data);
          setTestcase(res.data);
        });
    };
    getQuestion();
    getTestCase();
  }, []);

  const handleCodeChange = (editor, data, newCode) => {
    setCode(newCode);
  };

  const onSubmitCode = async (e) => {
    await axios
      .post(
        `http://localhost:4000/codeAPI/submit`,
        { qId: qID, code: code },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.status);
      });
    navigate(`/question/${qID}/result`);
  };

  return (
    <div className="Question">
      <div className="problem">
        <h2 className="title">{data.title}</h2>
        <div className="desc">
          {data.detail}
          {testcase.map((t) => {
            return (
              <div className="testbox">
                <div className="testcase">
                  <p className="testtitle">input</p>
                  <p className="testcode">{t.testinput}</p>
                </div>
                <div className="testcase">
                  <p className="testtitle">output</p>
                  <p className="testcode">{t.testoutput}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="code">
        <button className="codebutton" onClick={onSubmitCode}>
          제출
        </button>
        <CodeMirror
          value={code}
          onBeforeChange={handleCodeChange}
          onChange={(editor, data, value) => {}}
          options={{
            mode: "python",
            theme: "blackboard",
            lineNumbers: true,
          }}
        />
      </div>
    </div>
  );
}

export default Question;
