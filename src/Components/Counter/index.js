import React from "react";

function Counter({ totalOfAllCompont }) {
  const [count, setCount] = React.useState(0);
  const increment = () => {
    setCount((prev) => {
      let temp = prev + 1;
      totalOfAllCompont(1);
      return temp;
    });
  };
  const decrement = () => {
    if (count > 0) {
      setCount((prev) => {
        let temp = prev - 1;
        totalOfAllCompont(-1);
        return temp;
      });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid black",
        width: "151px",
      }}
    >
      <button onClick={decrement}>-</button>
      <div>{count}</div>
      <button onClick={increment}>+</button>
    </div>
  );
}

export default Counter;
