import { ChangeEvent, useState } from "react";
import styles from "@assets/styles/login.module.css";
import { NavLink } from "react-router-dom";
import FormInput from "@components/UI/Form/FormInput";

export default function SignUp() {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");

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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Full Name:", fullName);
    console.log("location:", location);
    console.log("Email:", email);
    console.log("Password:", password);

    setEmail("");
    setPassword("");
    setfullName("");
    setLocation("");
  };

  return (
    <section className={styles.loginPage}>
      <h1>Join our company</h1>
      {/* <p>Let's get you started as our latest branch manager</p> */}
      <button>Sign up with Google</button>
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
        <button type="submit" className="auth_btn">
          Sign Up
        </button>
      </form>
      <div className="auth_options">
        <p>Already have an account?</p>
        <NavLink to="/auth">Log in</NavLink>
      </div>
    </section>
  );
}
