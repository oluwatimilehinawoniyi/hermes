import { ChangeEvent, useEffect, useState } from "react";
import styles from "@assets/styles/login.module.css";
import loadingStyles from "@assets/styles/loadingState.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import FormInput from "@components/UI/Form/FormInput";
import supabase from "@utils/supabase";

export default function SignUp() {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
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

  const handlefullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setfullName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            fullName,
            location,
          },
          // emailRedirectTo: "https://localhost:5173/dashboard",
          emailRedirectTo: "https://hermeslogistics.vercel.app/dashboard",
        },
      });
      console.log(data);
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

    setEmail("");
    setPassword("");
    setfullName("");
    setLocation("");
  };

  function SignUpWithGoogle() {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://iuzjrvqnnpwvkoguvgxn.supabase.co/auth/v1/callback",
      },
    });
  }

  return (
    <section className={styles.loginPage}>
      {signupSuccess ? (
        <>
          <p>
            A confirmation email has been sent to {email}. Please check your
            inbox and click the link to verify your account.
          </p>

          <button onClick={() => navigate("/")}>Go to Home</button>
        </>
      ) : (
        <>
          <h1>Join our company</h1>
          <button onClick={SignUpWithGoogle}>Sign up with Google</button>
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
              label="full name"
              value={fullName}
              onChange={handlefullNameChange}
              placeholder="full name"
            />
            <FormInput
              type="text"
              id="location"
              label="select location"
              value={location}
              onChange={handleLocationChange}
              placeholder="choose a country"
            />
            <FormInput
              type="email"
              id="email"
              label="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="email"
            />
            <FormInput
              type="password"
              id="password"
              label="select password"
              value={password}
              onChange={handlePasswordChange}
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
