function take() {
  return {
    type: "take"
  };
}

function* saga() {
  while (true) {
    const action = yield take();
    console.log(action);
  }
}

// 我们的纽带
function channel() {
  let taker;

  function take(cb) {
    taker = cb;
  }

  function put(input) {
    if (taker) {
      const temptaker = taker;
      taker = null;
      temptaker(input);
    }
  }

  return {
    take,
    put
  };
}

function runSaga(fn, chan) {
  const itr = fn();
  function next(args) {
    const { value, done } = itr.next(args);
    if (!done) {
      if (value.type === "take") {
        // 监听
        chan.take(input => {
          next(input);
        });
      }
    }
  }
  next();
}

export function domSagaChannel() {
  let chan = channel();
  let count = 1;
  let $btn = document.getElementById("btn");
  // 订阅，然后上链条
  runSaga(saga, chan);

  $btn.addEventListener("click", () => {
    const action = {
      type: "TEST",
      payload: count++
    };
    chan.put(action);
  });
}
