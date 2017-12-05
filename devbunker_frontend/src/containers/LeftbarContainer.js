import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Leftbar } from 'components';
import { withRouter } from 'react-router'

class LeftbarContainer extends Component {
    render() {
        const { user, minimum } = this.props;
        return [
            <Leftbar user={user} minimum={minimum} key={0}/>
        ]
    }
}

export default connect(
    (state) => ({
        user: state.user.get('user')
    }),
    (dispatch) => ({
    })
)(withRouter(LeftbarContainer));