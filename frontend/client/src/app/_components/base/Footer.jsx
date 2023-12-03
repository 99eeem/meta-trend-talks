import React from 'react';
import styles from './Footer.module.scss'; // SCSSファイルをインポート

const Footer = () => {
  const currentYear = new Date().getFullYear(); // 現在の年を取得

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.logoContainer}>
        <img src='/images/logo.png' className={styles.logo}/>
      </div>
      <hr className={styles.divider} /> {/* 白い白線 */}
      <div className={styles.copyrightContainer}>
        Copyright © {currentYear} MetaTrendTalks All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
