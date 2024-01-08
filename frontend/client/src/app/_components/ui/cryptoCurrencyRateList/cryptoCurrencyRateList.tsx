"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiSmile,FiFrown } from "react-icons/fi";
import styles from './cryptoCurrencyRateList.module.scss'; // SCSSファイルを読み込む 
import { get } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../_lib/aws-config';
Amplify.configure(awsconfig);

const CryptoCurrencyRateList = (props: any) => {
    const [cryptoCurrencyRateList, setCryptoCurrencyRateList] = useState<any[]>([{name: '', price: '', persent_change_24h: ''}]);
    const [cryptoClass, setCryptClass] = useState('')

    const getCryptoCurrencyRateList = async (): Promise<any[]> => {
        try {
            const restOperation = get({ 
                apiName: String(process.env.NEXT_PUBLIC_API_NAME),
                path: '/api/cryptocurrency'
            });
            const { body } = await restOperation.response;
            const str = await body.text();
            const parsedData = JSON.parse(str);

            return parsedData;
        } catch (error) {
            console.log('GET call failed: ', error);
            throw error;
        }
    }

        useEffect(() => {
            const fetchData = async () => {
                try {
                    await getCryptoCurrencyRateList().then((result) => {
                        setCryptoCurrencyRateList(result)
                    })
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }, []);

    return (
        <div className={styles.cryptoCurrencyRateList}>
            <div className={styles.scrollItems}>
                  {cryptoCurrencyRateList.map((item) => (
                <div key={item.name} className={`${styles.crypto} ${String(item.persent_change_24h).startsWith('-') ? styles.minus : styles.plus}`}>
                    <span className={styles.name}>{item.name}</span>
                          <span className={styles.price}>￥{item.price}</span>
                          <div className={`${styles.percentContainer} ${String(item.persent_change_24h).startsWith('-') ? styles.minus : styles.plus}`}>
                               {String(item.persent_change_24h).startsWith('-') ? <FiFrown/> : <FiSmile/>}
                    <span>{String(item.persent_change_24h)}%</span>
                    </div>
                </div>
                  ))}
              {cryptoCurrencyRateList.map((item) => (
                <div key={item.name} className={`${styles.crypto} ${String(item.persent_change_24h).startsWith('-') ? styles.minus : styles.plus}`}>
                    <span className={styles.name}>{item.name}</span>
                          <span className={styles.price}>￥{item.price}</span>
                          <div className={`${styles.percentContainer} ${String(item.persent_change_24h).startsWith('-') ? styles.minus : styles.plus}`}>
                               {String(item.persent_change_24h).startsWith('-') ? <FiFrown/> : <FiSmile/>}
                    <span>{String(item.persent_change_24h)}%</span>
                          </div>
                </div>
                  ))}
                {cryptoCurrencyRateList.map((item) => (
                <div key={item.name} className={`${styles.crypto} ${String(item.persent_change_24h).startsWith('-') ? styles.minus : styles.plus}`}>
                    <span className={styles.name}>{item.name}</span>
                          <span className={styles.price}>￥{item.price}</span>
                          <div className={`${styles.percentContainer} ${String(item.persent_change_24h).startsWith('-') ? styles.minus : styles.plus}`}>
                               {String(item.persent_change_24h).startsWith('-') ? <FiFrown/> : <FiSmile/>}
                    <span>{String(item.persent_change_24h)}%</span>
                          </div>
                </div>
                  ))}
            </div>
        </div>
    );
  };
  
  export default CryptoCurrencyRateList;