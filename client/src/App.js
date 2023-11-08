import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Question from "./pages/Question";
import Login from "./pages/login";
import Result from "./pages/Result";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/question/:qID" element={<Question />} />
          <Route path="/question/:qID/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
