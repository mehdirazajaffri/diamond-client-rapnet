import { call, put, takeLatest, all, takeEvery } from "redux-saga/effects";

const fetchJSON = (url, options = {}) =>
  new Promise((resolve, reject) => {
    return fetch(url, options)
      .then(response => (response.status !== 200 ? reject(response) : response))
      .then(response => response.json())
      .then(response => resolve(response))
      .catch(error => reject(error));
  });

function* authorize({ payload: { email, password } }) {
  const data = {
    email: email,
    password: password
  };

  var formBody = [];
  for (var property in data) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: formBody
  };

  try {
    const { token } = yield call(
      fetchJSON,
      "https://desolate-dusk-24951.herokuapp.com/api/v1/login",
      options
    );
    yield put({ type: "AUTH_SUCCESS", payload: token });
    localStorage.setItem("token", token);
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = "Something went wrong " + error;
    }
    yield put({ type: "AUTH_FAILURE", payload: message });
    localStorage.removeItem("token");
  }
}

function* login(d) {
  const options = {
    method: "GET",
    headers: {
      "x-access-token": d.payload.token || d.payload
    }
  };

  try {
    const { _id, email, first_name, last_name } = yield call(
      fetchJSON,
      "https://desolate-dusk-24951.herokuapp.com/api/v1/me",
      options
    );
    yield put({
      type: "TOKEN_VERIFIED",
      payload: {
        id: _id,
        email: email,
        first_name: first_name,
        last_name: last_name
      }
    });
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = "Something went wrong " + error;
    }
    yield put({ type: "TOKEN_NOT_VERIFIED", payload: message });
  }
}

function* rootSaga() {
  yield all([takeEvery("AUTH_REQUEST", authorize)]);
  yield all([takeEvery("AUTH_SUCCESS", login)]);
  yield all([takeEvery("HAS_TOKEN", login)]);
}
export default rootSaga;
