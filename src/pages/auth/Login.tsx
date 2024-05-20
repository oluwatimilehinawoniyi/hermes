import { ChangeEvent, useState } from "react";
import styles from "@assets/styles/login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import FormInput from "@components/UI/Form/FormInput";
import supabase from "@utils/supabase";
import loadingStyles from "@assets/styles/loadingState.module.css";

export default function Login() {
  const navigate = useNavigate();

  const [isSubmitting, setisSubmitting] = useState(false);
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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      setisSubmitting(true);
      const { data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      const { user } = data;
      if (user) {
        navigate("/dashboard");
      }
      console.log(data);
    } catch (error) {
      if (typeof error === "string") {
        alert(error);
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }

    setisSubmitting(false);

    setEmail("");
    setPassword("");
  };

  return (
    <section className={styles.loginPage}>
      <h1>Welcome back</h1>
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
        <button type="submit" className="auth_btn" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className={loadingStyles.loadingDots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            "Log In"
          )}
        </button>
      </form>
      <div className="auth_options">
        <p>Don't have an account?</p>
        <NavLink to="/auth/signup">Sign up</NavLink>
      </div>
    </section>
  );
}
