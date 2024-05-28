import { useState } from "react";
import styles from "@assets/styles/login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import FormInput from "@components/UI/Form/FormInput";
import loadingStyles from "@assets/styles/loadingState.module.css";
import { useAuth } from "@hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isSubmitting, setisSubmitting] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      setisSubmitting(true);

      const {
        data: { user, session },
        // error,
      } = await login(
        email, password
      );
      if (user && session) {
        navigate("/dashboard");
      }
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
  };

  return (
    <section className={styles.loginPage}>
      <h1
        style={{
          marginBottom: ".6rem",
        }}
      >
        Welcome back
      </h1>
      <form action="" onSubmit={handleSubmit}>
        <FormInput
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="email"
          placeholder="email"
          label="email"
        />

        <FormInput
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="password"
          placeholder="password"
        />
        <div className={styles.loginCTRLs}>
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
