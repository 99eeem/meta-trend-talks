import React from 'react';
import styles from './moreItems.module.scss';
import { FiChevronsRight} from 'react-icons/fi';
import Link from "next/link"

const MoreItems = ({text, href}) => {
  return (
    <Link className={styles.moreItems} href={href}>
        <p className={styles.text}>{text}</p>
        <FiChevronsRight className={styles.arrowIcon}/>
    </Link>
  );
}

export default MoreItems;