'use client';
import React from 'react';
import styles from './ArticleAgenda.module.scss';
import { FiList, FiChevronDown } from 'react-icons/fi';

interface AgendaItem {
  text: string;
  id: string;
  name: string;
}

interface ArticleAgendaProps {
  items: AgendaItem[];
}

const ArticleAgenda = ({ items }: ArticleAgendaProps) => {
  const [isOpened, setIsOpened] = React.useState(false);
  const handleAgendaClick = () => {
    setIsOpened(!isOpened);
  };
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderItems = (headings: any) => {
    let currentH2: any = null;

    return headings.map((item: AgendaItem) => {
      if (item.name === 'h2') {
        currentH2 = item;
        return (
          <li key={item.id} onClick={() => handleClick(item.id)}>
            {item.text}
          </li>
        );
      } else if (item.name === 'h3' && currentH2) {
        return (
          <li key={item.id} onClick={() => handleClick(item.id)} className={styles.h3Item}>
            <span>・{item.text}</span>
          </li>
        );
      }

      return null;
    });
  };

  return (
    <div className={styles.articleAgenda}>
      <div className={styles.agendaTitle} onClick={handleAgendaClick}>
        {isOpened ? <FiList /> : <FiChevronDown />}
        <span>目次</span>
      </div>
      {isOpened && <ul className={isOpened ? 'opened' : ''}>{renderItems(items)}</ul>}
    </div>
  );
};
export default ArticleAgenda;
