import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { Post } from 'components';

// import redux dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActions from 'store/modules/post';

class WriteContainer extends Component {

    /*componentDidMount() {
        const { PostActions } = this.props;
        PostActions.initialize();
    }*/

	componentWillUnmount() {
        const { PostActions } = this.props;
        PostActions.initialize();
	}

    handleChangeTitle = (e) => {
        const { PostActions } = this.props;
        const { value } = e.target;

        PostActions.changeTitle(value);
    }

    handleChangeContent = (value) => {
        const { PostActions } = this.props;
        PostActions.changeContent(value);
    }

    handleInsertPost = async (temp) => {
        const { PostActions, _id, language, title, content, user, saved } = this.props;
        const writerid = user.get('_id');
        const writer = user.get('displayName');

        if(!title) {
            PostActions.setError('제목을 입력하세요');
            return false;
        }
        else if(!content){
            PostActions.setError('내용을 입력하세요');
            return false;
        }
        else {
            if(saved) {
                await PostActions.updatePost({_id, language, title, content, temp});
            } else {
                await PostActions.insertPost({language, title, content, writerid, writer, temp});
            }
        }

        if(!temp) {
            PostActions.initialize();
            this.props.history.push('community');
        }
    }

    render() {
        const { handleChangeContent, handleChangeTitle, handleInsertPost } = this;
        const { title, content, error, saved } = this.props;
        return (
            <Post
                onChangeTitle={handleChangeTitle}
                onChangeContent={handleChangeContent}
                onInsertPost={handleInsertPost}
                title={title}
                content={content}
                saved={saved}
                error={error}/>
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
        error: state.post.getIn(['post', 'error']),
        user: state.user.get('user')
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(withRouter(WriteContainer));