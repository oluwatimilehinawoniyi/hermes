import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth, Home, Login, SignUp } from "./pages";
import Index from "@pages/dashboard/Index";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth" element={<Auth />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        <Route path="/dashboard" element={<Index />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
