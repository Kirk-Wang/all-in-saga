import { delay } from "redux-saga";
import { call, put, takeEvery, all, select, take } from "redux-saga/effects";

export function* helloSaga() {
  // const num = yield 1;
  // console.log(num);
  // const delay = yield new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve("delay 1 s");
  //   }, 1000);
  // });
  // console.log(delay);
  console.log("Hello Saga!");
}

export function* incrementAsync() {
  yield call(delay, 1000);
  yield put({ type: "INCREMENT" });
}

export function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

// function* watchAndLog() {
//   yield takeEvery("*", function* logger(action) {
//     const state = yield select();

//     console.log("action", action);
//     console.log("state after", state);
//   });
// }

function* watchAndLog() {
  while (true) {
    const action = yield take("*");
    const state = yield select();

    console.log("action", action);
    console.log("state after", state);
  }
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync(), watchAndLog()]);
}
