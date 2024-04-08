'use client';
import React, { useState, useEffect, useContext, createContext } from 'react';
import { get } from 'aws-amplify/api';
import { DEVICE_WIDTH } from '../_const/value/deviceWidth';
type stateContextType = {
  cryptoCurrencyRateList: { name: string; price: string; persent_change_24h: string }[];
  isDataFetched: boolean;
};
export const StateContext = createContext<stateContextType>({
  cryptoCurrencyRateList: [{ name: '', price: '', persent_change_24h: '' }],
  isDataFetched: false,
});

export const StateContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cryptoCurrencyRateList, setCryptoCurrencyRateList] = useState([
    { name: '', price: '', persent_change_24h: '' },
  ]);

  const getCryptoCurrencyRateList = async () => {
    try {
      const restOperation = get({
        apiName: String(process.env.NEXT_PUBLIC_API_NAME),
        path: '/api/cryptocurrency',
      });
      const { body } = await restOperation.response;
      const str = await body.text();
      const parsedData = JSON.parse(str);

      return parsedData;
    } catch (error) {
      console.log('GET call failed: ', error);
      throw error;
    }
  };
  const [isDataFetched, setIsDataFetched] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getCryptoCurrencyRateList().then((result) => {
          setCryptoCurrencyRateList(result);
        });
        setIsDataFetched(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <StateContext.Provider
      value={{
        cryptoCurrencyRateList,
        isDataFetched,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const stateContext = () => useContext(StateContext);
