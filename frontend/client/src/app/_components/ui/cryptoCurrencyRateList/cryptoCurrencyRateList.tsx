'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './cryptoCurrencyRateList.module.scss'; // SCSSファイルを読み込む
import { get } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';
import { stateContext } from '../../../context';
import awsconfig from '../../../_lib/aws-config';
Amplify.configure(awsconfig);

const CryptoCurrencyRateList = (props: any) => {
  const { cryptoCurrencyRateList, isDataFetched } = stateContext();
  return (
    <div className={styles.cryptoCurrencyRateList}>
      <div className={styles.scrollItems}>
        {isDataFetched &&
          cryptoCurrencyRateList.map((item) => (
            <div
              key={item.name}
              className={`${styles.crypto} ${
                String(item.persent_change_24h).startsWith('-') ? styles.minus : styles.plus
              }`}
            >
              <span className={styles.name}>{item.name}</span>
              <span className={styles.price}>￥{item.price}</span>
              <div
                className={`${styles.percentContainer} ${
                  String(item.persent_change_24h).startsWith('-') ? styles.minus : styles.plus
                }`}
              >
                <span>
                  <span>{String(item.persent_change_24h)}</span>%
                </span>
              </div>
            </div>
          ))}
      </div>
      <div className={styles.scrollItems}>
        {isDataFetched &&
          cryptoCurrencyRateList.map((item) => (
            <div
              key={item.name}
              className={`${styles.crypto} ${
                String(item.persent_change_24h).startsWith('-') ? styles.minus : styles.plus
              }`}
            >
              <span className={styles.name}>{item.name}</span>
              <span className={styles.price}>￥{item.price}</span>
              <div
                className={`${styles.percentContainer} ${
                  String(item.persent_change_24h).startsWith('-') ? styles.minus : styles.plus
                }`}
              >
                <span>
                  <span>{String(item.persent_change_24h)}</span>%
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CryptoCurrencyRateList;
