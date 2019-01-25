import * as React from "react";

interface IProps {
  title?: string;
}

const Counter: React.FC<IProps> = props => {
  const [count, setCount] = React.useState(10);

  const decrement = () => {
    let newCount = count - 1;
    if (newCount < 0) {
      newCount = 10;
    }
    setCount(newCount);
  };

  return (
    <div>
      <h1>{props.title}</h1>
      <button onClick={decrement}>{count}</button>
    </div>
  );
};

Counter.defaultProps = {
  title: "Hello friend"
};

export default Counter;
