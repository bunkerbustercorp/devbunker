import React from 'react';
import styles from './LeftbarWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const LeftbarWrapper = ({children, minimum}) => (
    <div>
        <div className={cx('leftbar-wrapper', { minimum })}>
            {minimum}
            {children}
        </div>
        <div className={cx('leftbar-spacer', { minimum })}>
        </div>
    </div>
);

export default LeftbarWrapper;