import React from 'react';
import styles from './Community.scss';
import classNames from 'classnames/bind';

import { SmallPost } from 'components';

const cx = classNames.bind(styles);

const Community = ({ posts, onLoadPost }) => {
    
    const test = posts.map(
        (data, i) => (
            <SmallPost key={i} {...data.toJS()} onLoadPost={onLoadPost}/>
        )
    )
    return (
        <div className={cx('community')}>
            {test}
        </div>
    );
};

export default Community;