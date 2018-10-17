import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import Counter from "./Counter";
import reducer from "./reducers";
import rootSaga, { helloSaga } from "./sagas";

// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(reducer, applyMiddleware(sagaMiddleware));
// sagaMiddleware.run(helloSaga);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const action = (type, payload) => store.dispatch({ type, payload });
let state = 1;

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onRequest={() => action("REQUEST", state++)}
      onIncrement={() => action("INCREMENT")}
      onDecrement={() => action("DECREMENT")}
      onIncrementAsync={() => action("INCREMENT_ASYNC")}
    />,
    document.getElementById("root")
  );
}

render();
store.subscribe(render);
