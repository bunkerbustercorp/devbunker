import React, { Component } from 'react';
import { withRouter } from 'react-router'

// import redux dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as communityActions from 'store/modules/community';
import * as postActions from 'store/modules/post';

import { Community } from 'components';

class CommunityContainer extends Component {

    componentDidMount() {
        const { CommunityActions } = this.props;
        CommunityActions.loadPostList();
    }

    handleLoadPost = async (_id) => {
        const { PostActions } = this.props;
        await PostActions.loadPost({_id});
        this.props.history.push('read');
    }

    render() {
        const { posts } = this.props;
        const { handleLoadPost } = this;

        return (
            <Community posts={posts} onLoadPost={handleLoadPost}/>
        );
    }
}

export default connect(
    (state) => ({
        posts: state.community.get('posts')
    }),
    (dispatch) => ({
        CommunityActions: bindActionCreators(communityActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(withRouter(CommunityContainer));
