import React from "react";
import * as ReactRedux from "react-redux";
import Counter from "../components/Counter";
import { increase, decrease } from "../modules/counter";
import { RootState } from "../modules";

const CounterContainer: React.FC<{
  number: number;
  increase: () => void;
  decrease: () => void;
}> = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};

export default ReactRedux.connect(
  (state: RootState) => ({
    number: state.counter,
  }),
  {
    increase,
    decrease,
  }
)(CounterContainer);
