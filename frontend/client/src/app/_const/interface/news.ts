import { AuthorType } from './author';
export interface NewsType {
  // データのプロパティと型を定義
  id: string;
  body: string;
  thumbnail: {
    url: string;
    width: string;
    height: string;
  };
  author: AuthorType;
  category: {
    id: string;
    name: string;
  };
  title: string;
  createdAt: string;
  seoTitle: string;
  seoMeta: string;
}

export interface NewsWithRelatedNewsType extends NewsType {
  relatedNewsIds: NewsType[];
}
