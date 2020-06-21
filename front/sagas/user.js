import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects'
// takeEvery : 요청마다 실행
// takeLatest : 요청여러번 무시 - 프론트에서(응답)만무시 백엔드요청은 감 (백엔드엔 데이터저장)
// throttle : 몇초(시간) 동안 요청안됨
import axios from 'axios'

function logInAPI(data) {
    return axios.post('/api/login', data)
}

function* logIn(action) {
    try {
        //const result = yield call(logInAPI, action.data) // call fork  / call 은 값받아올때까지 기다림
        yield delay(1000)
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: action.data
        })
    } catch (err) {
        yield put({
            type: 'LOG_IN_FAILURE',
            //data: err.response.data
        })
    }
}

function* watchLogIn() {
    yield takeLatest('LOG_IN_REQUEST', logIn) // 로그인액션 실행까지 기다림
}

function logOutAPI(data) {
    return axios.post('/api/logout', data)
}

function* logOut() {
    try {
        //const result = yield call(logOutAPI)
        yield delay(1000)
        yield put({
            type: 'LOG_OUT_SUCCESS',
            //data: result.data
        })
    } catch (err) {
        yield put({
            type: 'LOG_OUT_FAILURE',
            //data: err.response.data
        })
    }
}

function* watchLogOut() {
    yield takeLatest('LOG_OUT_REQUEST', logOut)
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn), // call fork
        fork(watchLogOut),
    ])
}