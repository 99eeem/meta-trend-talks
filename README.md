# MetaTrendTalks 🚀

**Web3, Cryptocurrency & Blockchain News Media Platform for Japan**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![AWS CDK](https://img.shields.io/badge/AWS%20CDK-2.0-orange)](https://aws.amazon.com/cdk/)
[![Sass](https://img.shields.io/badge/Sass-1.69-pink)](https://sass-lang.com/)

## 🌟 Project Background & Motivation

Japan significantly lags behind other countries in Web3 and blockchain knowledge adoption, creating concerns about future competitive disadvantages in the global digital economy.

Through my professional experience working on Web3-related projects, I identified a **critical need to improve Japan's Web3 literacy**. Key challenges include:

- 🌐 **Language Barriers**: Most Web3 information is available only in English
- 📚 **Knowledge Gap**: Limited understanding of blockchain technology among Japanese users  
- 🔗 **Lack of Local Use Cases**: Insufficient information about Japanese implementations and success stories
- 💡 **Innovation Gap**: Disconnect between technological possibilities and practical adoption

**MetaTrendTalks** was developed to address these challenges and serve as **a bridge connecting Japan to the decentralized future**.

## 📖 Overview

A comprehensive news media platform delivering **the latest Web3.0 information in accessible Japanese**. 
The platform covers blockchain, cryptocurrency, NFT, DeFi, DAO, and related fields, 
aiming to contribute to improving Japan's Web3 literacy and fostering innovation.

> **"BUILDING BRIDGES TO JAPAN'S DECENTRALIZED FUTURE"**  
> *Connecting Japan with the decentralized network future*

## ✨ Key Features

### 🎯 User Experience
- 📰 **Latest News Distribution**: Efficient content management using microCMS
- 💰 **Real-time Cryptocurrency Rates**: Instant price information for major currencies
- 🔍 **Categorized Articles**: Information organized by Crypto, NFT, DeFi, DAO categories
- 💡 **Recommended Articles**: Content recommendations based on user interests

### 📱 Technical Features
- **Responsive Design**: Mobile-first UI/UX approach
- **SEO Optimization**: Enhanced metadata and OGP support for better content distribution
- **High Performance**: Optimized loading with Next.js App Router
- **3D Interactions**: Visual representation of Web3 technologies through cube animations

## 🏗️ Architecture Design

Scalable architecture based on enterprise-level experience:

```
meta-trend-talks/
├── frontend/client/          # Next.js Frontend Application
│   ├── src/app/(routes)/     # App Router Page Structure
│   ├── _components/          # Reusable UI Components
│   ├── _features/            # Business Logic Separation
│   └── _const/              # Type Definitions & Constants
├── backend/lambda/           # AWS Lambda Backend Services
├── infrastructure/           # AWS CDK Infrastructure as Code
└── docs/                     # Project Documentation
```

## 🚀 Technology Stack & Rationale

| Domain | Technology | Selection Rationale |
|--------|------------|---------------------|
| **Frontend** | Next.js 14, TypeScript, Sass | Performance & DX focus, type safety |
| **Backend** | AWS Lambda, Node.js | Serverless for cost efficiency & scalability |
| **Infrastructure** | AWS CDK, CloudFront, S3 | IaC for reproducibility & maintainability |
| **CMS** | microCMS | Japanese Headless CMS, editor-friendly |
| **External APIs** | Twitter API, CoinGecko API | Real-time information aggregation |

## 💡 Implementation Highlights

### 1. **User-Centric Design**
```tsx
// Real-time cryptocurrency rate display
<CryptoCurrencyRateList />

// Intuitive category navigation
<CategoryList />

// User-friendly time display
date={toPassedHours(item.createdAt)}
```

### 2. **Performance Optimization**
- Efficient routing with App Router
- Image optimization and CDN distribution
- Proper component separation and lazy loading

### 3. **SEO & Accessibility**
```tsx
// Comprehensive metadata configuration
export const metadata: Metadata = {
  title: 'MetaTrendTalks - Web3 | 暗号通貨 | ビットコイン ニュース',
  description: '様々なジャンルのweb3に関係のあるニュースを発信しています。',
  openGraph: {
    title: 'MetaTrendTalks - Web3 | 暗号通貨 | ビットコイン ニュース',
    description: '様々なジャンルのweb3に関係のあるニュースを発信しています。',
    url: `https://${process.env.MTT_DOMAIN}`,
    siteName: 'metaTrendTalks.com',
    images: [...],
    locale: 'ja_JP',
    type: 'website',
  },
};
```

### 4. **Modern Development Practices**
- Type safety with TypeScript
- Component-driven architecture
- Environment-based configuration management
- Infrastructure as Code with AWS CDK

## 🎨 UI/UX Design Concept

### Web3 Visual Representation
```tsx
// 3D cube animation visualizing Web3 technologies
<div className={styles.cube}>
  <div className={`${styles.panel} ${styles.front}`}>
    <p>Crypto</p>     {/* Cryptocurrency */}
  </div>
  <div className={`${styles.panel} ${styles.back}`}>
    <p>NFT</p>        {/* Non-Fungible Tokens */}
  </div>
  <div className={`${styles.panel} ${styles.left}`}>
    <p>DeFi</p>       {/* Decentralized Finance */}
  </div>
  <div className={`${styles.panel} ${styles.right}`}>
    <p>DAO</p>        {/* Decentralized Autonomous Organization */}
  </div>
  <div className={`${styles.panel} ${styles.top}`}>
    <p>Bitcoin</p>    {/* Blockchain Representative */}
  </div>
  <div className={`${styles.panel} ${styles.bottom}`}>
    <p>Meta</p>       {/* Metaverse */}
  </div>
</div>
```

**Design Principles:**
- **Futuristic Design**: Expressing Web3 innovation
- **Information Architecture**: Clear structuring of complex technical information
- **Brand Consistency**: Unified color palette and typography
- **Intuitive Navigation**: User-friendly information design

## 📊 Core Implementation

### Homepage Architecture
```tsx
const Home = async () => {
  // Parallel data fetching for performance
  const contents = await getNewsList(10);
  const recommendNews: NewsType[] = await getRecommendNews('true');
  
  return (
    <div className={styles.home}>
      {/* Real-time cryptocurrency rates */}
      <div className={styles.cryptListContainer}>
        <CryptoCurrencyRateList />
      </div>
      
      <div className={styles.allContainer}>
        {/* Main featured articles */}
        <div className={styles.topContainer}>
          <MainNewsArticle contents={contents.slice(0, 4)} />
        </div>
        
        {/* Brand messaging banner */}
        <img
          className={styles.mainBanner}
          src="/images/web3ConnectJapan.png"
          alt="main page banner"
        />
        
        <div className={styles.mainContainer}>
          {/* Latest news section */}
          <div className={styles.latestNewsContainer}>
            <Title title="最新のニュース" />
            <div>
              {contents.map((item, index) => (
                <div className={styles.latestNews} key={index}>
                  <NewsArticle
                    date={toPassedHours(item.createdAt)}
                    title={item.title}
                    id={item.id}
                    category={item.category.name}
                    thumbnail={item.thumbnail.url}
                    author={item.author}
                    body={item.body}
                    type="new"
                  />
                </div>
              ))}
            </div>
            <MoreItems text="View More" href="news/all" />
          </div>
          
          {/* Sidebar with categories and recommendations */}
          <div className={styles.rightContainer}>
            <CategoryList />
            <div className={styles.recommendedNewsConatiner}>
              <Title title="おすすめのニュース" />
              <div className={styles.recommendedNewsBox}>
                {recommendNews.map((item, index) => (
                  <div className={styles.recommendedNews} key={index}>
                    <NewsArticle
                      date={toPassedHours(item.createdAt)}
                      title={item.title}
                      id={item.id}
                      category={item.category.name}
                      thumbnail={item.thumbnail.url}
                      isfixedHeight={true}
                      type="recommended"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Mission statement with 3D visualization */}
        <div className={styles.aboutUsContainer}>
          <div className={styles.textBox}>
            <h3>BUILDING BRIDGES TO JAPAN'S DECENTRALIZED FUTURE</h3>
            <p>
              <span>MetaTrendTalks</span>
              は、最新のWEB3.0ニュースとメディアを通じて、ブロックチェーンや暗号通貨のテクノロジーと、我々と共存できる未来の架け橋となることを目指しています。我々の目標は、日本と分散型ネットワークの未来を結ぶことです。
            </p>
          </div>
          <div className={styles.imageBox}>
            <div className={styles.backgroundImage}></div>
            <div className={styles.stage}>
              <div className={styles.cube}>
                {/* 3D Web3 technology visualization */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

## 🔧 Development Environment Setup

### Prerequisites
- Node.js 18+
- AWS CLI configured
- Docker (for development)

### Installation & Setup
```bash
# Clone repository
git clone https://github.com/[username]/meta-trend-talks.git
cd meta-trend-talks

# Frontend setup
cd frontend/client
npm install
cp .env.example .env.local
npm run dev

# Infrastructure setup (separate terminal)
cd infrastructure
npm install
npx cdk bootstrap
npx cdk deploy
```

### Environment Variables
```bash
# frontend/client/.env.local
NEXT_PUBLIC_MICROCMS_API_KEY=your_microcms_api_key
NEXT_PUBLIC_GOOGLE_ID=your_google_analytics_id
MTT_DOMAIN=your_domain_name

# backend/lambda/.env
X_API_KEY=your_twitter_api_key
X_API_SECRET=your_twitter_api_secret
X_ACCESS_TOKEN=your_twitter_access_token
X_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret
```

## 🎯 Professional Experience Applied

This project leverages knowledge gained from enterprise Web3 development:

### ✅ Technical Skills Demonstrated
- **Modern React Development**: Hooks, App Router, TypeScript
- **Cloud Architecture**: AWS CDK, Lambda, CloudFront
- **API Design**: RESTful APIs, external service integration
- **DevOps**: Git workflows, CI/CD, infrastructure automation
- **UI/UX Design**: User-centered design, accessibility standards
- **Web3 Understanding**: Blockchain, DeFi, NFT implementation knowledge

### 💼 Business Impact & Market Understanding
- **Problem Solving**: Addressing Japan's Web3 literacy gap as a societal challenge
- **User Needs Analysis**: Identifying demand for Japanese Web3 content
- **Technology Trends**: Understanding decentralized technology adoption and future potential
- **Market Opportunity**: Creating educational content value

## 📈 Future Roadmap

- [ ] **User Authentication**: Registration, login, and personalization features
- [ ] **Community Features**: Comments, ratings, and discussion forums
- [ ] **Educational Content**: Web3 beginner guides and tutorials
- [ ] **Internationalization**: English version for global expansion
- [ ] **PWA Implementation**: Offline reading capabilities
- [ ] **AI Integration**: Article summarization, translation, and recommendation systems

## 🌟 Project Significance

### Social Impact
- **Web3 Education**: Contributing to Japan's digital technology literacy
- **Information Accessibility**: Bridging language barriers for knowledge sharing
- **Innovation Catalyst**: Promoting understanding and adoption of emerging technologies

### Technical Value
- **Modern Development Practices**: Practical application of cutting-edge technology stack
- **Scalable Architecture**: Growth-ready system design
- **User Experience**: Intuitive UI hiding technical complexity

## 🏆 Key Learning Outcomes

Through this project, I have demonstrated proficiency in:

- **Full-Stack Development**: End-to-end application development
- **Cloud-Native Architecture**: Serverless and scalable system design
- **User Experience Design**: Creating intuitive interfaces for complex domains
- **Business Problem Solving**: Addressing real market needs through technology
- **Cross-Cultural Communication**: Building bridges between global tech and local needs

## 🤝 Contributing

We welcome contributions from those who share our vision of advancing Web3 knowledge in Japan!

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 👨‍💻 Author

**[Your Name]**
- Software Engineer passionate about bridging Japan's Web3 knowledge gap through enterprise-level development
- GitHub: [@yourusername](https://github.com/yourusername)  
- Email: your.email@example.com
- Portfolio: https://your-portfolio.com
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)

---

**"Building Bridges to Japan's Decentralized Future"** 🌉  
*Connecting traditional Japan with the decentralized world through technology and education*
