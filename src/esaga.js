import { take, put, call } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";

function countdown(secs) {
  return eventChannel(emitter => {
    const iv = setInterval(() => {
      secs -= 1;
      if (secs > 0) {
        emitter(secs);
      } else {
        // 这里将导致 channel 关闭
        emitter(END);
      }
    }, 1000);
    // subscriber 必须回传一个 unsubscribe 函数
    return () => {
      clearInterval(iv);
    };
  });
}

export function* eventSaga() {
  const chan = yield call(countdown, 10);
  console.log("eventChannel");
  try {
    while (true) {
      // take(END) 将造成 saga 终止，跳到 finally 区块
      let seconds = yield take(chan);
      console.log(`countdown: ${seconds}`);
    }
  } finally {
    console.log("countdown terminated");
  }
}
