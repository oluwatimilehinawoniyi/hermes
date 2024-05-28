import supabase from "@utils/supabase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmailConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const user = supabase.auth.getUser();
      if (await user) {
        navigate("/dashboard");
      } else {
        console.error("User is not authenticated.");
      }
    };

    handleEmailConfirmation();
  }, [navigate]);

  return <div>Confirming your email...</div>;
};

export default EmailConfirmation;
