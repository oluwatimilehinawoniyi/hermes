import styles from "@assets/styles/login.module.css";
import { NavLink } from "react-router-dom";

export default function SignUp() {
  return (
    <section className={styles.loginPage}>
      <h1>Join our company</h1>
      <p>Let's get you started as our latest branch manager</p>
      <button>Sign up with Google</button>
      <form action="">
        <input type="text" placeholder="firstname" />
        <input type="text" placeholder="lastname" />
        <input type="email" placeholder="enter an email" />
        <input type="text" placeholder="select a location" />
        <input type="password" placeholder="create a password" />
        <button>Sign Up</button>
      </form>
      <p>Already have an account?</p>
      <NavLink to="/auth">Log in</NavLink>
    </section>
  );
}