import logo from "./logo.svg";
import "./App.css";
import ProgressBar from "./Components/ProgressBar";
import Counter from "./Components/Counter";
import { useState } from "react";

function App() {
  const [total, setTotal] = useState(0);
  const totalOfAllCompont = (count) => {
    setTotal((prev) => prev + count);
  };
  return (
    <div className="App">
      <Counter totalOfAllCompont={totalOfAllCompont} />
      <Counter totalOfAllCompont={totalOfAllCompont} />
      <Counter totalOfAllCompont={totalOfAllCompont} />
      Total: {total}
    </div>
  );
}

export default App;
