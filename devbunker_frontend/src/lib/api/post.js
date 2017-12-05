import axios from 'axios';

export const insertPost = ({
    language,
    title,
    content,
    writerid,
    writer,
    temp
}) => axios.post('/api/post/insertpost', {
    language,
    title,
    content,
    writerid,
    writer,
    temp
});

export const updatePost = ({
    _id,
    language,
    title,
    content,
    temp
}) => axios.post('/api/post/updatepost', {
    _id,
    language,
    title,
    content,
    temp
});

export const deletePost = ({
    _id
}) => axios.post('/api/post/deletepost', {_id});

export const loadPost = ({
    _id
}) => axios.post('/api/post/loadpost', {_id});

export const loadPostList = () => axios.get('/api/post/loadpostlist');