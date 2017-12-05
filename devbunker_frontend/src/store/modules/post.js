import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as PostAPI from 'lib/api/post';

// action types
const INITIALIZE = 'INITIALIZE';

const CHANGE_TITLE = 'post/changeTitle';
const CHANGE_CONTENT = 'post/changeContent';

const INSERT_POST = 'post/insertPost';
const UPDATE_POST = 'post/updatePost';
const DELETE_POST = 'post/deletePost';

const LOAD_POST = 'post/loadPost';
const LOAD_POSTLIST = 'post/loadPostList';
const SET_ERROR = 'post/setError';

// action creator
export const initialize = createAction(INITIALIZE);

export const changeTitle = createAction(CHANGE_TITLE);
export const changeContent = createAction(CHANGE_CONTENT);

export const insertPost = createAction(INSERT_POST, PostAPI.insertPost);
export const updatePost = createAction(UPDATE_POST, PostAPI.updatePost);
export const deletePost = createAction(DELETE_POST, PostAPI.deletePost);

export const loadPost = createAction(LOAD_POST, PostAPI.loadPost);
export const loadPostList = createAction(LOAD_POSTLIST, PostAPI.loadPostList);
export const setError = createAction(SET_ERROR);

// initial state
const initialState = Map({
    post: Map({
        _id: null,
        language: 'javascript',
        title: null,
        content: null,
        writerid: null,
        writer: null,
        error: null,
        temp: true,
        saved: false
    })
});

// reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_TITLE]: (state, action) => {
        return state.setIn(['post', 'title'], action.payload)
    },
    [CHANGE_CONTENT]: (state, action) => {
        return state.setIn(['post', 'content'], action.payload)
    },
    [SET_ERROR]: (state, action) => {
        return state.setIn(['post', 'error'], action.payload)
    },
    ...pender({
        type: INSERT_POST,
        onSuccess: (state, action) => {
            const { data } = action.payload;
            return state.set('post', Map(data));
        },
        onFailure: (state, action) => {
            return state.setIn(['post', 'error'], '글쓰기 실패')
        }
    }),
    ...pender({
        type: UPDATE_POST,
        onSuccess: (state, action) => {
            const { data } = action.payload;
            return state.set('post', Map(data));
        },
        onFailure: (state, action) => {
            return state.setIn(['post', 'error'], '수정하기 실패')
        }
    }),
    ...pender({
        type: DELETE_POST,
        onSuccess: (state, action) => {
            return initialState
        },
        onFailure: (state, action) => {
            return state.setIn(['post', 'error'], '삭제하기 실패')
        }
    }),
    ...pender({
        type: LOAD_POST,
        onSuccess: (state, action) => {
            const { data } = action.payload;
            return state.set('post', Map(data[0]));
        },
        onFailure: (state, action) => {
            return state.set('error', '불러오기 실패')
        }
    }),
    ...pender({
        type: LOAD_POSTLIST,
        onSuccess: (state, action) => {
            const { data } = action.payload;
            return state.set('post', Map(data));
        },
        onFailure: (state, action) => {
            return state.set('error', '불러오기 실패')
        }
    })
}, initialState);