import { delay } from "redux-saga";
import { buffers } from "redux-saga";
import { take, actionChannel, call } from "redux-saga/effects";

export function* watchRequests() {
  console.log("watchRequests");
  // 1- 为 REQUEST actions 创建一个 channel
  const requestChan = yield actionChannel("REQUEST");
  console.log("non blocking");
  while (true) {
    // 2- take from the channel
    const { payload } = yield take(requestChan, buffers.sliding(5));
    // 3- 注意这里我们用了一个阻塞调用
    yield call(handleRequest, payload);
  }
}

function* handleRequest(payload) {
  yield call(delay, 1000);
  console.log(payload);
}
