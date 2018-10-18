/*eslint-disable no-unused-vars */
import React, { Component } from "react";
import PropTypes from "prop-types";
const Counter = ({
  value,
  onIncrement,
  onDecrement,
  onRequest,
  onIncrementAsync
}) => (
  <div>
    <button id="btn">dom-btn-click</button>{" "}
    <button onClick={onRequest}>REQUEST</button>{" "}
    <button onClick={onIncrement}>Increment</button>{" "}
    <button onClick={onDecrement}>Decrement</button>{" "}
    <button onClick={onIncrementAsync}>Increment after 1 second</button>
    <hr />
    <div>Clicked: {value} times</div>
  </div>
);

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onRequest: PropTypes.func.isRequired,
  onIncrementAsync: PropTypes.func.isRequired
};

export default Counter;
