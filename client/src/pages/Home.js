import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/HomeStyle.css";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getList = async () => {
      await axios.get(`http://localhost:4000/questionAPI/list`).then((res) => {
        setData(res.data);
        console.log(res.data);
      });
    };
    getList();
  }, []);

  return (
    <div className="Home">
      <p>HOME</p>

      {data.map((d) => {
        return (
          <div key={d.questionID}>
            <Link to={`/question/${d.questionID}`}>
              <div>{d.title}</div>
            </Link>
            <div>{d.userID}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
