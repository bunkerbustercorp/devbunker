import React, { Component } from 'react';
import { withRouter } from 'react-router'

// import redux dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActions from 'store/modules/post';

import { Post } from 'components';

class ReadContainer extends Component {

    handleEditPost = async () => {
        this.props.history.push('write');
    }

    handleDeletePost = async () => {
        const { PostActions, _id } = this.props;
        await PostActions.deletePost({_id});
        this.props.history.push('community');
    }

    render() {
        const { title, content } = this.props;
        const { handleEditPost, handleDeletePost } = this;
        return (
            <Post
                title={title}
                content={content}
                onEditPost={handleEditPost}
                onDeletePost={handleDeletePost}
                readonly/>
        );
    }
}

export default connect(
    (state) => ({
        _id: state.post.getIn(['post', '_id']),
        language: state.post.getIn(['post', 'language']),
        title: state.post.getIn(['post', 'title']),
        content: state.post.getIn(['post', 'content']),
        saved: state.post.getIn(['post', 'saved']),
        user: state.user.get('user')
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(withRouter(ReadContainer));