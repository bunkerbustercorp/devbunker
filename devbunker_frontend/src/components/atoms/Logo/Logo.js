import React from 'react';
import styles from './Logo.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Logo = ({user}) => {
	const path = user ? '/newspeed' : '/'
	return (
		<Link to={path} className={cx('logo')}>
			DevBunker
		</Link>
	);
};

export default Logo;