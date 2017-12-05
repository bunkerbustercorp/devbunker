import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';
import { SidebarContainer, LeftbarContainer } from 'containers';


const cx = classNames.bind(styles);

const PageTemplate = ({header, children, responsive, padding, mobileNoPadding, minimum}) => {
    return (
        <div className={cx('page')}>
            <header>
                {header}
            </header>
            
            <main className={cx('content', {
                padding: padding, // sets 3.5 rem padding-top
                responsive,
                minimum,
                'mobile-no-padding': mobileNoPadding
            })}>
                <LeftbarContainer minimum={minimum}/>
                {children}
            </main>
            { header && <SidebarContainer/> }
        </div>
    );
};

export default PageTemplate;