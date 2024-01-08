import React from 'react';
import styles from './Footer.module.scss'; // SCSSファイルをインポート
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // 現在の年を取得

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.logoContainer}>
        <img src='/images/logo.png' className={styles.logo}/>
      </div>
      <div className={styles.testList}>
        <div className={styles.about}>
          <h4>ABOUT</h4>
          <nav>
            <ul>
              <li>
                <Link href={'/privacy-policy'}>privacy policy</Link>
              </li>
              <li>
                <Link href={'/terms-and-conditions'}>Terms＆conditions</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.about}>
          <h4>MEDIA</h4>
          <nav>
            <ul>
              <li>
                <a target='_blank' href='https://twitter.com/metaTrendTalks'>X (Twitter)</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <hr className={styles.divider} /> 
      <div className={styles.copyrightContainer}>
        Copyright © {currentYear} MetaTrendTalks All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
