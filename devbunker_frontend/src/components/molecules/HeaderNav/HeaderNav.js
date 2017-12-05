import React from 'react';
import styles from './HeaderNav.scss';
import classNames from 'classnames/bind';
import { FlexBox } from 'components';

const cx = classNames.bind(styles);

const HeaderNav = ({ logged }) => {
    return (  
        <FlexBox row className={cx('header-nav')}>
            {/*{logged && <NavItem to="/mypage">
                마이페이지
            </NavItem> }
            <NavItem to="/write">
                글쓰기
    </NavItem>*/}
        </FlexBox>
    );
};

export default HeaderNav;