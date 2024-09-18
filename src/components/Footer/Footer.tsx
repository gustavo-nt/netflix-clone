import { getYear } from "date-fns";

import { TiSocialInstagram } from "react-icons/ti";
import { RiFacebookBoxFill } from "react-icons/ri";
import { ImTwitter, ImYoutube } from "react-icons/im";

import { staticLinksFooter } from "./utils/getStaticLinks";
import styles from "./styles.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.containerFooter}>
        <div className={styles.icons}>
          <RiFacebookBoxFill />
          <TiSocialInstagram />
          <ImTwitter />
          <ImYoutube />
        </div>

        <ul className={styles.details} role="list">
          {staticLinksFooter.map((item) => (
            <li key={item.id} role="list-item">
              {item.title}
            </li>
          ))}
        </ul>

        <div className={styles.security}>
          <div>Código do serviço</div>
          <span>© 1997-{getYear(new Date())} Netflix, Inc.</span>
        </div>
      </div>
    </footer>
  );
};
