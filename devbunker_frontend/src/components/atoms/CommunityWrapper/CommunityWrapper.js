import React from 'react';
import styles from './CommunityWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const CommunityWrapper = ({children}) => {
    return (
        <div className={cx('community-wrapper')}>
            {children}
        </div>
    );
};

export default CommunityWrapper;