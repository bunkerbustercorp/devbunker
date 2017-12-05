import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import { 
    Logo,
    Button,
    HeaderNav,
    UserButton,
    UserMenu
} from 'components';

const cx = classNames.bind(styles);

const Header = ({
    onLoginButtonClick,
    onShowUserMenu,
    onHideUserMenu,
    onLogout,
    userMenu,
    user,
    solid,
    shadow,
    isRegister
}) => {
    return (
        <div className={cx('header', { solid, shadow })}>
            <div className={cx('responsive')}>
                <div className={cx('logo-wrapper')}>
                    <Logo user={user}/>
                </div>
                { !isRegister && <div className={cx('desktop-only')}>
                    <HeaderNav logged={user}/>
                    {
                        user ? (
                            <UserButton displayName={user.get('displayName')} onClick={onShowUserMenu}/>
                        ) : (
                            <Button 
                                invert 
                                className={cx('login-button')}
                                onClick={onLoginButtonClick}>
                                로그인
                            </Button>
                        )
                    }
                </div> }
                <UserMenu visible={userMenu} onHide={onHideUserMenu} eventTypes={["mouseup", "touchend"]} onLogout={onLogout}/>
            </div>
        </div>
    );
};

export default Header;