import React from 'react';
import styles from './RegisterForm.scss';
import classNames from 'classnames/bind';

import {
    SectionWithTitle,
    Input,
    Button,
    AlignRight
} from 'components';

const cx = classNames.bind(styles);

const RegisterForm = ({
    nickname,
    displayNameExists,
    error,
    onChangeNickname,
    onSubmit,
    onNicknameBlur
}) => {
    return (
        <div className={cx('register-form')}>
            <SectionWithTitle title="닉네임" description="서비스에서 사용 하실 닉네임을 입력하세요.">
                {
                    displayNameExists && <div className={cx('error')}>이미 존재하는 닉네임입니다.</div> 
                }
                <Input maxLength={15} value={nickname} onChange={onChangeNickname} onBlur={onNicknameBlur}/>
            </SectionWithTitle>
            {
                error && (
                    <AlignRight><div className={cx('error')}>{ error }</div></AlignRight>
                )
            }
            <AlignRight>
                <Button disabled={displayNameExists} flat color="teal" className={cx('register-button')} xPadding="2rem" onClick={onSubmit}>가입</Button>
            </AlignRight>
        </div>
    );
};

export default RegisterForm;