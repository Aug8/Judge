import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onId = (e) => {
    setId(e.target.value);
  };
  const onPassword = (e) => {
    setPassword(e.target.value);
  };

  const tryLogin = async (e) => {
    await axios
      .post(
        `http://localhost:4000/userAPI/login`,
        {
          id: id,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (!res.data.success) {
          console.log("로그인 오류");
        } else {
          console.log("로그인");
          navigate("/");
        }
      });
  };

  return (
    <div className="Login">
      <div className="LoginContainer">
        <h2>로그인</h2>
        <input
          className="IdInputBox"
          onChange={onId}
          placeholder="아이디를 입력하세요."
        ></input>
        <input
          className="PasswordInputBox"
          type={"password"}
          onChange={onPassword}
          placeholder="비밀번호를 입력하세요."
        ></input>
        <div className="LoginBtns">
          <button onClick={tryLogin}>로그인</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
