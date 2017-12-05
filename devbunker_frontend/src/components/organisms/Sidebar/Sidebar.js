import React from 'react';
import styles from './Sidebar.scss';
import classNames from 'classnames/bind';
import { SidebarWrapper, Button } from 'components';
import { Link } from 'react-router-dom';

import Community from 'react-icons/lib/fa/newspaper-o';
import Popular from 'react-icons/lib/fa/star';
import SubScribe from 'react-icons/lib/fa/leanpub';
import Mypage from 'react-icons/lib/fa/user';

const cx = classNames.bind(styles);

const MenuItem = ({ to, children, onClick}) => {
    return (<Link onClick={onClick} className={cx('menu-item')} to={to}>{children}</Link>)
}

const Sidebar = ({
    visible,
    user,
    onLoginClick,
    onClose,
    onLogout
}) => (
    <SidebarWrapper visible={visible}>
        <div className={cx('upper-block')}>
        {
            user ? [
                <div className={cx('message')} key={0}>
                    <b>{user.get('displayName')}</b>님,<br/> 안녕하세요!
                </div>,
                <Button key={1} className={cx('sign-button')} invert onClick={onLogout}>로그아웃</Button>
            ]
            : [
                <div className={cx('message')} key={0}>
                    DevBunker에 자료를 정리해보세요
                </div>,
                <Button className={cx('sign-button')} invert onClick={onLoginClick} key={1}>
                    로그인 / 회원가입
                </Button>
            ]
        }
        </div>
        <div className={cx('menu')}>
            <MenuItem to="/community">
                <Community/>
                커뮤니티
            </MenuItem>
            <MenuItem to="/subscribe">
                <Popular/>
                인기 (개발 예정)
            </MenuItem>
            <MenuItem to="/subscribe">
                <SubScribe/>
                구독 (개발 예정))
            </MenuItem>
            { user && <MenuItem to="/mypage">
                <Mypage/>
                마이페이지
            </MenuItem>}
        </div>
    </SidebarWrapper>
);

export default Sidebar;