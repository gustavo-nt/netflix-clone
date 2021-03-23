import React from 'react';
import styles from '../Header/styles.module.css';
import logo from '../../assets/logo.png';
import user from '../../assets/user.png';

export default ({black}) => {
    return (
        <header className={black ? `${styles.black}` : ``}>
            <div className={styles.headerLogo}>
                <a>
                    <img src={logo} alt="Logo Netflix"/>
                </a>
            </div>
            <div className={styles.headerUser}>
                <a>
                    <img src={user} alt="User" />
                </a>
            </div>
        </header>
    )
}