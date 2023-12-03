"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { getNewsByFullTextSearch } from "../../../_features/news/api/getNewsByFullTextSearch";
import ArticleList from "./ArticleList";
import Title from "../../ui/title/title";

export default function SearchArticleList() {
  const [news, setNews] = useState<any>([]);
  const searchParams = useSearchParams();
  const searchValue = useMemo(() => searchParams.get("searchValue"), [
    searchParams,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getNewsByFullTextSearch(searchValue);
        setNews(result);
        // ここで検索結果を処理するロジックを追加
      } catch (error) {
        console.error("Error fetching data:", error);
        // エラーハンドリングを行う場合はここに追加
      }
    };
    if (searchValue) {
      fetchData();
    }
  }, [searchValue]); // searchValueが変更されたときだけ再実行
  return (
    <div>
    <Title title={`検索結果: ${searchParams.get("searchValue")}`} />
      <ArticleList news={news} />
    </div>
  );
}