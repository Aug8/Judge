import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/HomeStyle.css";

function Home() {
  const [data, setData] = useState();

  useEffect(() => {
    const testFunction = async () => {
      await axios.get(`http://localhost:4000/testAPI`).then((res) => {
        setData(res.data);
      });
    };
    testFunction();
  });

  return (
    <div className="Home">
      <p>test</p>
      {data}
    </div>
  );
}

export default Home;
