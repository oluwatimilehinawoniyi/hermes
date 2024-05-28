import { useEffect, useState } from "react";
import styles from "@assets/styles/login.module.css";
import loadingStyles from "@assets/styles/loadingState.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import FormInput from "@components/UI/Form/FormInput";
import supabase from "@utils/supabase";

export default function SignUp() {
  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setCountdown] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    if (signupSuccess) {
      const timer = setInterval(() => {
        setCountdown((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [signupSuccess]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            fullname,
          },
          emailRedirectTo: "http://localhost:5173/",
        },
      });

      if (error) {
        console.error("Signup error:", error.message);
      } else {
        console.log("Signup success:", data);
        // Navigate to dashboard or next step
      }
      setSignupSuccess(true);
    } catch (error) {
      if (typeof error === "string") {
        alert(error);
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.loginPage}>
      {signupSuccess ? (
        <>
          <p>
            A confirmation email has been sent to your mail. Please check your
            inbox and click the link to verify your account.
          </p>

          <button onClick={() => navigate("/")}>Go to Home</button>
        </>
      ) : (
        <>
          <h1>Join our company</h1>
          <p
            style={{
              marginBottom: ".6rem",
              textAlign: "center",
              fontSize: "var(--size-very-small)",
            }}
          >
            or continue with email
          </p>
          <form onSubmit={handleSubmit}>
            <FormInput
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setfullname(e.target.value)}
              label="full name"
              placeholder="full name"
            />
            <FormInput
              type="email"
              id="email"
              label="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="email"
            />
            <FormInput
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="select password"
              placeholder="password"
            />
            <button type="submit" className="auth_btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className={loadingStyles.loadingDots}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <div className="auth_options">
            <p>Already have an account?</p>
            <NavLink to="/auth">Log in</NavLink>
          </div>
        </>
      )}
    </section>
  );
}
