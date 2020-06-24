import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects'
import axios from 'axios'
import shortId from 'shortId'

function addPostAPI(data) {
    return axios.post('/api/post', data)
}

import {
    ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS,
    ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS,
    ADD_POST_TO_ME,
} from '../reducers/post'

function* addPost(action) {
    try {
        //const result = yield call(addPostAPI, action.data)
        yield delay(1000)
        const id = shortId.generate()
        yield put({
            type: ADD_POST_SUCCESS,
            data: {
                id,
                content: action.data,
            }
        })
        yield put({
            type: ADD_POST_TO_ME,
            data: id,
        })
    } catch (err) {
        yield put({
            type: ADD_POST_FAILURE,
            //data: err.response.data
        })
    }
}

function addCommentAPI(data) {
    return axios.post(`api/post/${data.postId}/comment`, data)
}

function* addComment(action) {
    try {
        // const result = yield call(addCommentAPI)
        yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data
        });
    } catch (e) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: e,
        });
    }
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost)
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
    ])
}