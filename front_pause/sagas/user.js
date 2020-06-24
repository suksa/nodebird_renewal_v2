import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects'
// takeEvery : 요청마다 실행
// takeLatest : 요청여러번 무시 - 프론트에서(응답)만무시 백엔드요청은 감 (백엔드엔 데이터저장)
// throttle : 몇초(시간) 동안 요청안됨
import axios from 'axios'

import {
    LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS,
    LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS,
    SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS,
} from '../reducers/user';

function logInAPI(data) {
    return axios.post('/api/login', data)
}

function* logIn(action) {
    try {
        //const result = yield call(logInAPI, action.data) // call fork  / call 은 값받아올때까지 기다림
        yield delay(1000)
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data
        })
    }
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn) // 로그인액션 실행까지 기다림
}

function logOutAPI(data) {
    return axios.post('/api/logout', data)
}

function* logOut() {
    try {
        //const result = yield call(logOutAPI)
        yield delay(1000)
        yield put({
            type: LOG_OUT_SUCCESS,
            //data: result.data
        })
    } catch (err) {
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data
        })
    }
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut)
}

function signUpAPI() {
    // 서버에 요청을 보내는 부분
    return axios.post('/api/signUp');
}

function* signUp() {
    try {
        // yield call(signUpAPI);
        yield delay(1000);
        yield put({ // put은 dispatch 동일
            type: SIGN_UP_SUCCESS,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: SIGN_UP_FAILURE,
            error: e,
        });
    }
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn), // call fork
        fork(watchLogOut),
        fork(watchSignUp),
    ])
}