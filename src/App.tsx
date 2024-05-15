import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth, Home, Login, SignUp } from "./pages";


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="auth" element={<Auth />}>
                    <Route index element={<Login />} />
                    <Route path="signup" element={<SignUp /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
