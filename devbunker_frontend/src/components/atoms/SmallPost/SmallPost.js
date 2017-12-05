import React from 'react';
import styles from './SmallPost.scss';
import classNames from 'classnames/bind';
import ThumbUp from 'react-icons/lib/fa/thumbs-o-up';
import Comment from 'react-icons/lib/fa/comment-o';

const cx = classNames.bind(styles);

const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
}

const SmallPost = ({ onLoadPost, _id, title, writer, content, Temp, postedAt, language, children}) => {
    return (
        <div className={cx('smallpost-wrapper')} onClick={()=>onLoadPost(_id)}>
            <div className={cx('smallpost-header')}>
                <div className={cx('thumbnail', `${language}`)}>
                </div>
            </div>
            <div className={cx('smallpost-content')}>
                <div className={cx('title')}> {title} </div>
                <div className={cx('writer')}> {writer} </div>
                <div className={cx('postedAt')}> {formatDate(postedAt)} </div>
            </div>
            <div className={cx('smallpost-footer')}>
                <div className={cx('recommend')}>
                    <ThumbUp/>좋아요(개발예정)
                </div>
                <div className={cx('comment')}>
                    <Comment/>댓글(개발예정)
                </div>
            </div>
        </div>
    );
};

export default SmallPost;