import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import { pender } from 'redux-pender';

import * as PostAPI from 'lib/api/post';

// action types
const LOAD_POSTLIST = 'community/loadPostList';

// action creator
export const loadPostList = createAction(LOAD_POSTLIST, PostAPI.loadPostList);

// initial state
const initialState = Map({
    posts: List([
        Map({
            _id: null,
            language: null,
            title: null,
            content: null,
            writerid: null,
            writer: null,
            Temp:null,
            postedAt:null
        })
    ])
});

// reducer
export default handleActions({
    ...pender({
        type: LOAD_POSTLIST,
        onSuccess: (state, action) => {
            const { data } = action.payload;
            const posts = List((data).map((item)=>Map(item)));
            return state.set('posts', posts);
        },
        onFailure: (state, action) => {
            return state.set('error', '글쓰기 실패')
        }
    })
}, initialState);