import Link from "next/link";
import Styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={Styles.header}>
      <Link className={Styles.logo} href='/'>
      LF
      </Link>
      <nav className={Styles.nav}>
        <ul>
          <li>
            <Link href="/login">Inicia sesion</Link>
          </li>
          <li>
            <Link href="/signup" className={Styles.containedButton}>Registrate</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
