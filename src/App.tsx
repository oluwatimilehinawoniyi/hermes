import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth, Dashboard, Home, Login, SignUp } from "@pages/index";
import { AppHome } from "@pages/app";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth" element={<Auth />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<AppHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
