import React from 'react';
import styles from './IntroQuestion.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const IntroQuestion = ({onClick}) => (
    <div className={cx('question')}>          
        <div>
            <h1>
                내 컴퓨터 안에 개발한 소스들이 어지럽게 섞여있다면,
                다시 찾아보고, 재사용하기 힘들지 않나요?
            </h1>
            <p>
                Syntax Highlighting이 지원되는
                <br/>DevBunker에 자료를 정리해보세요!
            </p>
        </div>
        <div className={cx('button')} onClick={onClick}>
            DevBunker 들어가기
        </div>
    </div>
);

export default IntroQuestion;