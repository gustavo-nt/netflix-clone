import React from 'react';
import styles from './styles.module.scss';
// import logo from '/logo.png';
import logo from '../../../public/logo.png'
import user from '../../../public/user.png';
import { CgSearch } from 'react-icons/cg';
import { AiOutlineGift } from 'react-icons/ai';
import { FaBell } from 'react-icons/fa';

export default ({black}) => {
    return (
        <header className={`${black ? styles.black : ''} ${styles.header}`}>
            <div className={styles.headerMenu}>
                <div className={styles.headerLogo}>
                    <a>
                        <img src={logo} alt="Logo Netflix"/>
                    </a>                                
                </div>
                <ul>
                    <li>Navegar</li>
                    <li>Início</li>
                    <li>Séries</li>
                    <li>Filmes</li>
                    <li>Bombando</li>
                    <li>Minha Lista</li>
                </ul>
            </div>
            <div className={styles.headerContainerUser}>
                <div className={styles.headerIcons}>
                    <CgSearch />
                    <AiOutlineGift />
                    <FaBell />
                </div>
                <div className={styles.headerUser}>
                    <a>
                        <img src={user} alt="User" />
                    </a>
                </div>
            </div>
        </header>
    )
}