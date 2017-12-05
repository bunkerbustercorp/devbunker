import React from 'react';
import { HomeTemplate, PolyBackground, BgColor } from 'components';
import { HeaderContainer } from 'containers';
import styles from './HomePage.scss';
import classNames from 'classnames/bind';
import IntroQuestionContainer from 'containers/IntroQuestionContainer';
import { Link } from 'react-router-dom';
import TrophyIcon from 'react-icons/lib/fa/trophy';
import GithubIcon from 'react-icons/lib/go/mark-github';
import EmailIcon from 'react-icons/lib/md/email';

const cx = classNames.bind(styles);

const HomePage = () => {
    return (
        <HomeTemplate header={<HeaderContainer/>}>
            <PolyBackground home>
                <IntroQuestionContainer/>
            </PolyBackground>
            <BgColor color="#d6d6d6"/>
            <div className={cx('block', 'responsive')}>
                <h2>Devbunker에서 여러분의 자료를 공유하고 다양한 정보를 얻어보세요.</h2>
                <div className={cx('more')}>
                    <Link className={cx('more-button')} to="/community">
                        커뮤니티에서 더 보기
                    </Link>
                </div>
            </div>
            <div className={cx('third')}>
                <div className={cx('responsive')}>
                <Link to="/ranking" className={cx('column')}>
                    <TrophyIcon/>
                    <div className={cx('description')}>
                        <h3>구독 시스템</h3>
                        <p>관심 있는 자료를 편하게 다시 보고 싶으세요? <br/>구독하기 버튼을 눌러보세요!</p>
                    </div>
                </Link>
                <a className={cx('column')} href="https://github.com/bunkerbustercorp/devbunker" target="_blank" rel="noopener noreferrer">
                    <GithubIcon/>
                    <div className={cx('description')}>
                    <h3>오픈소스</h3>
                    <p>DevBunker는 오픈소스 프로젝트 입니다. <br/>Pull Request는 언제나 환영입니다.</p>
                    </div>
                </a>
                </div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('email')}>
                    <EmailIcon/> leesehyuno2@gmail.com
                </div>
                <div className={cx('copyright')}>
                    Copyright © 2017 DevBunker
                </div>
            </div>
        </HomeTemplate>
    );
};

export default HomePage;