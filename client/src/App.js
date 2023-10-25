import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Question from "./pages/Question";
import Login from "./pages/login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/question/:qID" element={<Question />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
