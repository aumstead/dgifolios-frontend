import styles from "./Footer.module.scss";
import Logo from "./LogoFooterSvg";

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.flexContainer}>
        
          <span className={styles.text__copy}>&copy; 2020</span>
          <span className={styles.logo}><Logo/></span>
       
          <span className={styles.text__contact}>Contact: dgifolios@gmail.com</span>
      
      </div>
    </footer>
  );
}

export default Footer;
