import { login } from "../../utils/supabase/actions";
import Styles from "./page.module.css";
import Image from "next/image";
import Header from "@/components/Header/Header";

const SignUp = () => {
  return (
    <>
      <Header />
      <main className={Styles.main}>
        <section className={Styles.login}>
          <h1>¡Bienvenido!</h1>
          <div>
            <h2>Ingresa a tu cuenta</h2>
            <p>¡Es sencillo!,registrate para acceder a nuestros servicios</p>
          </div>
          <form className={Styles.form}>
            <label htmlFor="email">
              Email
              <input id="email" name="email" type="email" required />
            </label>
            <label htmlFor="password">
              Contraseña
              <input id="password" name="password" type="password" required />
            </label>
            <button formAction={login}>Log In</button>
          </form>
        </section>
        <Image
          className={Styles.banner}
          src="/login-singup.png"
          alt=""
          width={1000}
          height={1000}
        />
      </main>
    </>
  );
};

export default SignUp;
