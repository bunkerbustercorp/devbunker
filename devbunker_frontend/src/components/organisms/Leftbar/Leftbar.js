import React from 'react';
import styles from './Leftbar.scss';
import classNames from 'classnames/bind';
import { LeftbarWrapper } from 'components';
import { Link } from 'react-router-dom';

import Community from 'react-icons/lib/fa/newspaper-o';
import Popular from 'react-icons/lib/fa/star';
import SubScribe from 'react-icons/lib/fa/leanpub';
import Mypage from 'react-icons/lib/fa/user';

const cx = classNames.bind(styles);

const MenuItem = ({ to, children, minimum }) => {
    return (<Link className={cx('menu-item', { minimum })} to={to}>{children}</Link>)
}

const Leftbar = ({user, minimum}) => (
    <LeftbarWrapper minimum={minimum}>
        <div className={cx('leftbar')}>
            <div className={cx('menu')}>
                <MenuItem minimum to="/community">
                    <Community/>
                    { minimum ? <span className={cx('tooltip', 'a')}>커뮤니티</span> : '커뮤니티'}
                </MenuItem>
                <MenuItem minimum to="/popular">
                    <Popular/>
                    { minimum ? <span className={cx('tooltip', 'b')}>인기(개발예정)</span> : '인기 (개발 예정)'}
                </MenuItem>
                { user && <MenuItem minimum to="/subscribe">
                    <SubScribe/>
                    { minimum ? <span className={cx('tooltip', 'c')}>구독(개발예정)</span> : '구독 (개발 예정)'}
                </MenuItem>}
                { user && <MenuItem minimum to="/mypage">
                    <Mypage/>
                    { minimum ? <span className={cx('tooltip', 'd')}>마이페이지(개발예정)</span> : '마이페이지'}
                </MenuItem>}
            </div>
            { minimum && <div className={cx('project')}>
                {/*프로젝트 리스트*/}
            </div>}
        </div>
    </LeftbarWrapper>
);

export default Leftbar;