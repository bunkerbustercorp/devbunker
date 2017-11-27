import React, { Component } from 'react';
import { RegisterForm } from 'components';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as registerActions from 'store/modules/register';
import * as userActions from 'store/modules/user';
import debounce from 'lodash/debounce';
import { withRouter } from 'react-router';

import storage from 'lib/storage';

class RegisterFormContainer extends Component {

    componentDidMount() {
        const { RegisterActions } = this.props;
        RegisterActions.initialize();
    }
    
    handleChangeNickname = (e) => {
        const { value } = e.target;
        const { RegisterActions } = this.props;

        RegisterActions.changeNickname(value);
        this.checkDisplayName(value);
    }

    checkDisplayName = debounce((value) => {
        const { RegisterActions } = this.props;
        RegisterActions.checkDisplayName(value);
    }, 500)

    handleNicknameBlur = () => {
        const { nickname, RegisterActions } = this.props;
        RegisterActions.checkDisplayName(nickname);
    }

    handleSubmit = async () => {
        const { socialInfo, nickname, authForm, history, RegisterActions, UserActions } = this.props;

        if(nickname.length < 1) {
            RegisterActions.setError('닉네임을 입력하세요')
            return;
        }

        const nicknamePattern = /^[a-zA-Z0-9ㄱ-ㅎ가-힣]{3,12}$/;
        if(!nicknamePattern.test(nickname)) {
            RegisterActions.setError('닉네임은 3~12자의 영어/숫자/한글이 허용됩니다.')
            return;
        }

        // social register
        if(socialInfo) {
            const { accessToken, provider } = socialInfo.toJS();

            await RegisterActions.socialRegister({
                displayName: nickname,
                provider,
                accessToken
            });
            
            const { result } = this.props;
            UserActions.setUser(result);
            history.push('/');
            
            return;
        }

        // local register

        const { email, password } = authForm.toJS();
        
        try {
            await RegisterActions.submit({
                displayName: nickname,
                email,
                password
            });
            const { result } = this.props;
            storage.set('__DEVBUNKER_USER__', result);
            UserActions.setUser(result);
            history.push('/newspeed');
        } catch (e) {
            console.log(e);
        }

    }

    render() {
        const { nickname, displayNameExists, error } = this.props;
        
        const {
            handleChangeNickname,
            handleNicknameBlur,
            handleSubmit
        } = this;

        return (
            <RegisterForm
                nickname={nickname}
                displayNameExists={displayNameExists}
                error={error}
                onChangeNickname={handleChangeNickname}
                onSubmit={handleSubmit}
                onNicknameBlur={handleNicknameBlur}
            />
        );
    }
}

export default connect(
    (state) => ({
        authForm: state.auth.get('form'),
        nickname: state.register.get('nickname'),
        optionIndex: state.register.get('optionIndex'),
        displayNameExists: state.register.get('displayNameExists'),
        error: state.register.get('error'),
        result: state.register.get('result'),
        socialInfo: state.auth.get('socialInfo')
    }),
    (dispatch) => ({
        RegisterActions: bindActionCreators(registerActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(withRouter(RegisterFormContainer));
