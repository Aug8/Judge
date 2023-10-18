import { useEffect, useState } from "react";
import axios from "axios";

function Question() {
  return (
    <div className="Question">
      <div className="problem"></div>
      <div className="code">
        <button>제출</button>
      </div>
    </div>
  );
}

export default Question;
