import { delay } from "redux-saga";
import {
  call,
  put,
  takeEvery,
  all,
  select,
  take,
  race,
  cancelled,
  fork,
  spawn
} from "redux-saga/effects";

// import { watchRequests } from "./threads";
import { watchRequests } from "./qsaga";
import { eventSaga } from "./esaga";

export function* helloSaga() {
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
  });
}

function* fetchType() {
  yield call(delay, 1000);
  throw Error("throw fetchType Error");
  console.log("fetch Type");
}

function* fetchUser() {
  try {
    yield call(delay, 2000);
    console.log("fetch User");
  } catch (err) {
    console.log("user err");
    console.log(err.message);
  } finally {
    if (yield cancelled()) {
      console.log("cancel fetchUser");
    }
  }
}

function* fetchPost() {
  try {
    yield call(delay, 3000);
    console.log("fetch Post");
  } catch (err) {
    console.log("post err");
    console.log(err.message);
  } finally {
    if (yield cancelled()) {
      console.log("cancel fetchPost");
    }
  }
}

function* fetchall() {
  try {
    const task1 = yield fork(fetchUser);
    const task2 = yield fork(fetchPost);
    const task3 = yield fork(fetchType);
  } catch (err) {
    console.log(err.message);
  } finally {
    if (yield cancelled) {
      console.log("cancel fetchall");
    }
  }
}

function* workerI(action) {
  const state = yield select();
  setTimeout(() => {
    console.log(state);
  }, 1000);
}

function watchI(patten, saga) {
  return fork(function*() {
    while (true) {
      const action = yield take(patten);
      yield fork(saga, action);
    }
  });
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  try {
    // yield all([watchI("INCREMENT", workerI)]);
    // yield call(fetchall);
    yield all([watchRequests(), watchIncrementAsync()]);
  } catch (err) {
    console.log(err.message);
  }
  // yield all([helloSaga(), watchIncrementAsync(), watchAndLog()]);
}
