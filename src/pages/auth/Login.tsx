import { ChangeEvent, useState } from "react";
import styles from "@assets/styles/login.module.css";
import { NavLink } from "react-router-dom";
import FormInput from "@components/UI/Form/FormInput";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);

    setEmail("");
    setPassword("");
    setRememberMe(false);
  };

  return (
    <section className={styles.loginPage}>
      <h1>Welcome back</h1>
      {/* <p>Sign in with</p> */}
      <button>Google</button>
      <p
        style={{
          marginBottom: ".6rem",
          textAlign: "center",
          fontSize: "var(--size-very-small)",
        }}
      >
        or continue with email
      </p>
      <form action="" onSubmit={handleSubmit}>
        <FormInput
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          aria-label="email"
          placeholder="email"
          label="email"
        />

        <FormInput
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          label="password"
          placeholder="password"
        />
        <div className={styles.loginCTRLs}>
          <FormInput
            type="checkbox"
            checked={rememberMe}
            id="rememberMe"
            label="remember me"
            onChange={handleRememberMeChange}
          />
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit" className="auth_btn">
          Log in
        </button>
      </form>
      <div className="auth_options">
        <p>Don't have an account?</p>
        <NavLink to="/auth/signup">Sign up</NavLink>
      </div>
    </section>
  );
}
