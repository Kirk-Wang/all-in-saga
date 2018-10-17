import { channel, delay } from "redux-saga";
import { take, fork, call, put } from "redux-saga/effects";

export function* watchRequests() {
  // 创建一个 channel 来队列传入的请求
  const chan = yield call(channel);

  // 创建 3 个 worker 'threads'
  for (var i = 0; i < 1; i++) {
    yield fork(handleRequest, chan);
  }

  while (true) {
    const { payload } = yield take("REQUEST");
    yield put(chan, payload);
  }
}

function* handleRequest(chan) {
  while (true) {
    const payload = yield take(chan);
    // process the request
    yield call(delay, 1000);
    console.log(payload);
  }
}
