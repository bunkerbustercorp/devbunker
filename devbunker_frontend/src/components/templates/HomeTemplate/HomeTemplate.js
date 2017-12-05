import React from 'react';
import styles from './HomeTemplate.scss';
import classNames from 'classnames/bind';
import { SidebarContainer } from 'containers';


const cx = classNames.bind(styles);

const HomeTemplate = ({header, children, responsive, padding, mobileNoPadding}) => {
    return (
        <div className={cx('home')}>
            <header>
                {header}
            </header>
            { header && <SidebarContainer/> }
            
            <main className={cx('content', {
                padding: padding, // sets 3.5 rem padding-top
                responsive,
                'mobile-no-padding': mobileNoPadding
            })}>
                {children}
            </main>
        </div>
    );
};

export default HomeTemplate;