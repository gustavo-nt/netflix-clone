import React from 'react';
import styles from './styles.module.scss';
import { TiSocialInstagram } from 'react-icons/ti';
import {ImTwitter, ImYoutube } from 'react-icons/im';
import { RiFacebookBoxFill } from 'react-icons/ri';

export default () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.containerFooter}>
                <div className={styles.icons}>
                    <RiFacebookBoxFill />
                    <TiSocialInstagram />
                    <ImTwitter />
                    <ImYoutube />
                </div>
                <ul className={styles.details}>
                    <li>Idioma e legendas</li>
                    <li>Audiodescrição</li>
                    <li>Centro de ajuda</li>
                    <li>Cartão pré-pago</li>
                    <li>Imprensa</li>
                    <li>Relações com investidores</li>
                    <li>Carreiras</li>
                    <li>Termos de uso</li>
                    <li>Privacidade</li>
                    <li>Avisos legais</li>
                    <li>Preferências de cookies</li>
                    <li>Informações corporativas</li>
                    <li>Entre em contato</li>
                </ul>
                <div className={styles.security}>
                    <div>Código do serviço</div>
                    <span>© 1997-2021 Netflix, Inc.</span>
                </div>
            </div>
        </footer>
    )
}