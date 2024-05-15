import styles from "@assets/styles/login.module.css";
import { NavLink } from "react-router-dom";

export default function Login() {
  return (
    <section className={styles.loginPage}>
      <h1>Log in to your account</h1>
      <p>Welcome back! Select method to log in:</p>
      <button>Google</button>
      <p>or continue with email</p>
      <form action="">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <div>
          <span>
            <input type="checkbox" />
            <label>Remember me</label>
          </span>
          <a href="#">Forgot password?</a>
        </div>
        <button>Log in</button>
      </form>
      <p>Don't have an account?</p>
      <NavLink to="/auth/signup">Sign up</NavLink>
    </section>
  );
}
