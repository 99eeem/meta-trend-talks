'use client'
import React, { useState } from 'react';
import styles from './pagnation.module.scss'; // CSS Modulesをインポート
import { FiChevronRight, FiChevronLeft} from 'react-icons/fi';
interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    paginate: (page: number) => void;
    currentPage: number;
}

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }: PaginationProps) => {
  const pageNumbers = [];


  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
// 「<」がクリックされたときの処理
const handleBack = (): void => {
    if (currentPage === 1) {
      return;
    }
    paginate(currentPage -1)
  };
  // ページ番号を直接クリックされたときの処理
  const handleMove = (page: number): void => {
    paginate(page)
  };
  // 「>」がクリックされたときの処理
  const handleForward = (): void => {
    if (currentPage === pageNumbers.length) {
      return;
    }
    paginate(currentPage + 1)
  };
  return (
    <div className={styles.pagination}>
      {/* ページ番号が0（= アイテムが0個）のときは何も描画しない */}
      {pageNumbers.length !== 0 && (
        <>
          <FiChevronLeft onClick={() => handleBack()} className={styles.back}/>
          <ul className={styles.pageItems}>
            {Array.from(Array(pageNumbers.length).keys()).map(page => {page++;
              return (
                <li key={page} onClick={() => handleMove(page)} className={`${styles.page} ${currentPage === page ? styles.active : ''}`}>
                  {page}
                </li>
              );
            })}
          </ul>
          <FiChevronRight onClick={() => handleForward()} className={styles.forward}/>
        </>
      )}
    </div>
  );
};

export default Pagination;