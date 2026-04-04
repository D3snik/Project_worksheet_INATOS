import { useState } from "react";
import HomePage from "./components/HomePage";
import Login from "./components/Login";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState<string>("");

  const handleLogin = (username: string, password: string) => {
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Usuário ou senha incorretos");
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} error={loginError} />;
  }

  return <HomePage />;
}