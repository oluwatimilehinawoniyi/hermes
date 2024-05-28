import { useRef, useState } from "react";
import styles from "@assets/styles/login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import FormInput from "@components/UI/Form/FormInput";
import loadingStyles from "@assets/styles/loadingState.module.css";
import { useAuth } from "@context/AuthProvider";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isSubmitting, setisSubmitting] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      setisSubmitting(true);

      const {
        data: { user, session },
        // error,
      } = await login(
        emailRef.current?.value || "",
        passwordRef.current?.value || ""
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
      <h1>Welcome back</h1>
      <form action="" onSubmit={handleSubmit}>
        <FormInput
          id="email"
          type="email"
          ref={emailRef}
          aria-label="email"
          placeholder="email"
          label="email"
        />

        <FormInput
          id="password"
          type="password"
          ref={passwordRef}
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
