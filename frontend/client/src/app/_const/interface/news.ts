export interface NewsType {
    // データのプロパティと型を定義
    id: string;
    body: string;
    thumbnail: {
      url: string;
      width: string;
      height: string;
    };
    author: {
        name: string,
        linkedIn: string,
        twitter: string,
        description: string,
        image: {
            url: string
        } 
    }
    category: {
      name: string
    };
    title: string;
  createdAt: string;
}

export interface NewsWithRelatedNewsType extends NewsType {
  relatedNewsIds: NewsType[];
}