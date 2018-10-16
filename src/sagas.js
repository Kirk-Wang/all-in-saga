import { delay } from "redux-saga";
import {
  call,
  put,
  takeEvery,
  all,
  select,
  take,
  race,
  cancelled
} from "redux-saga/effects";

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

function* watchAndLog() {
  yield takeEvery("*", function* logger(action) {
    const state = yield select();

    // console.log("action", action);
    // console.log("state after", state);
  });
}

function* play() {
  try {
    while (true) {
      const action = yield take("INCREMENT");
      const state = yield select();
      if (state == 5) {
        break;
      }
    }
    return true;
  } catch (err) {
    throw err;
  } finally {
    if (yield cancelled()) {
      console.log("You Lost!");
    }
  }
}

// 必须在 3 秒内加到 5
function* game() {
  while (true) {
    console.log("Start");
    console.log("3s……");
    const { timeout, score } = yield race({
      timeout: call(delay, 3000),
      score: call(play)
    });
    if (score) {
      console.log("You Win!");
    }
    yield put({ type: "RESET" });
    console.log("after 2 s，Restart");
    yield call(delay, 2000);
  }
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync(), watchAndLog()]);
}
