import Link from "next/link"
import { FiSearch , FiMenu,  FiArrowRightCircle} from 'react-icons/fi';
import styles from './Header.module.scss'; // SCSSファイルを読み込む 
import { getCategoryList } from '../../_features/news/api/getNewsCategory';
import HeaderContenst from "../ui/headerContents/headerContents";
import { use } from "react";

const Header = async () => {
    const contents = await getCategoryList()
    return (
      <header className={styles.header}>
       <HeaderContenst contenst={contents}/>
      </header>
    );
  };
  
  export default Header;