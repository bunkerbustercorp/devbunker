import React from 'react';
import styles from './HeaderNav.scss';
import classNames from 'classnames/bind';
import { FlexBox, NavItem } from 'components';

const cx = classNames.bind(styles);

const HeaderNav = ({logged}) => {
  return (
    <FlexBox row
      className={cx('header-nav')}>
      <NavItem to="/newspeed">
        뉴스피드
      </NavItem>
      {logged && <NavItem to="/mypage">
        마이페이지
      </NavItem> }
    </FlexBox>
  );
};

export default HeaderNav;