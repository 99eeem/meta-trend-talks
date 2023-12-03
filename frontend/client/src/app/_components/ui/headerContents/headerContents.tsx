"use client"
import Link from "next/link"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch , FiMenu,  FiArrowRightCircle} from 'react-icons/fi';
import styles from './headerContents.module.scss'; // SCSSファイルを読み込む 

const HeaderContenst = (props: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };
  
    const toggleSearch = () => {
      setIsSearchVisible(!isSearchVisible);
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    };
    const handleSearchKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && searchValue.trim() !== '') {
        // ページ遷移
        router.push(`/news/?searchValue=${searchValue}`)
      }
    };
  
    return (    
        <div className={styles.headerContents}>    
          <Link href="/" className={styles.logoContainer}>
            <div className={styles.logoBox}>
              <img src='/images/logoWithBlackName.png'/>
            </div>
          </Link>
        <div className={styles.menu}>
          {!isSearchVisible && <ul className={styles.headerCategory}>
              {props.contenst.map((item: any, index: number) => (
            <Link key={index} href={`/news/${item.link}`}><li>{item.name}</li></Link>
            ))}
            </ul>}
          <div className={`${styles.menuItem} ${styles.search}`} onClick={toggleSearch}>
            {isSearchVisible ? <FiArrowRightCircle/> : <FiSearch/>}
          </div>
          {!isSearchVisible && <div className={`${styles.menuItem} ${styles.categoryMenu}`} onClick={toggleModal}>
            {isModalOpen ? <FiArrowRightCircle/> : <FiMenu/>}</div>}
          </div>
          <div className={`${styles.modal} ${isModalOpen ? styles.active : ''}`}>
          <ul className={styles.categoryList}>
            {props.contenst.map((item: any, index: number) => (
            <Link key={index} href={`/news/${item.link}`} onClick={toggleModal}><li>{item.name}</li></Link>
            ))}
          </ul>
    </div>
          {isSearchVisible && <input type="text" className={styles.searchInput} placeholder="Search..."
          value={searchValue}
          onChange={handleInputChange}
          onKeyPress={handleSearchKeyPress}/>}
      </div>
    );
  };
  
  export default HeaderContenst;