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
import {
  CHOOSE_COLOR,
  changeUI,
  chooseColor,
  doStuff,
  CHOOSE_NUMBER
} from "./actions";

export function* changeColorSaga() {
  const action = yield take(CHOOSE_COLOR);
  yield put(changeUI(action.payload.color));
}

export function* doStuffThenChangeColor() {
  yield put(doStuff());
  yield put(doStuff());
  const action = yield take(CHOOSE_NUMBER);
  if (action.payload.number % 2 === 0) {
    yield put(changeUI("red"));
  } else {
    yield put(changeUI("blue"));
  }
}
