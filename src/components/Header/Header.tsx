import { useState, useEffect } from "react";

import { Search } from "./components/Search";
import { useSearch } from "../../context/SearchContext";

import { FaBell } from "react-icons/fa";

import logo from "../../assets/logo.png";
import user from "../../assets/user.png";

import { staticLinksHeader } from "./utils/getStaticLinks";
import styles from "./styles.module.scss";

export const Header = () => {
  const { openSearchBox } = useSearch();
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const scrollListener = () => {
      window.scrollY > 10 ? setBlackHeader(true) : setBlackHeader(false);
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <header
      className={styles.header}
      style={{
        backgroundColor:
          blackHeader || openSearchBox ? "#141414" : "transparent",
      }}
      role="header"
    >
      <div className={styles.headerMenu}>
        <div className={styles.headerLogo}>
          <img src={logo} alt="Logo Netflix" />
        </div>

        <ul role="list">
          {staticLinksHeader.map((item) => (
            <li key={item.id} role="list-item">
              {item.title}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.headerContent}>
        <div className={styles.headerActions}>
          <Search />
          <FaBell />
        </div>

        <div className={styles.headerUser}>
          <img src={user} alt="User" />
        </div>
      </div>
    </header>
  );
};
