import React from 'react';
import styles from './RegisterTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const RegisterTemplate = ({children}) => {
    return (
        <div className={cx('register-template')}>
            <h1>회원 등록</h1>
            <p>거의 다 끝났습니다. DevBunker에서 사용할 닉네임을 입력하세요.</p>
            <section>
                {children}
            </section>
        </div>
    );
};

export default RegisterTemplate;