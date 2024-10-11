import { Search } from "./components/Search";

import { useSearch } from "../../context/SearchContext";
import { useHeader } from "./hooks/useHeader";

import { FaBell } from "react-icons/fa";

import logo from "../../assets/logo.png";
import user from "../../assets/user.png";

import { staticLinksHeader } from "./utils/getStaticLinks";
import styles from "./styles.module.scss";

export const Header = () => {
  const { blackHeader } = useHeader();
  const { openSearchBox } = useSearch();

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
