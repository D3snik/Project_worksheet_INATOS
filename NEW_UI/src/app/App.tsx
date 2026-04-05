import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import { getCurrentUser, login, logout, type AuthUser } from "./services/auth";

export default function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isRestoringSession, setIsRestoringSession] = useState(true);
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);
  const [loginError, setLoginError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      try {
        const user = await getCurrentUser();

        if (!cancelled) {
          setCurrentUser(user);
        }
      } catch (error) {
        if (!cancelled) {
          setLoginError(
            error instanceof Error
              ? error.message
              : "Não foi possível validar a sessão atual."
          );
        }
      } finally {
        if (!cancelled) {
          setIsRestoringSession(false);
        }
      }
    }

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogin = async (username: string, password: string) => {
    setIsSubmittingLogin(true);
    setLoginError("");

    try {
      await login(username, password);
      const user = await getCurrentUser();

      if (!user) {
        throw new Error("Não foi possível carregar os dados da sessão autenticada.");
      }

      setCurrentUser(user);
    } catch (error) {
      setCurrentUser(null);
      setLoginError(
        error instanceof Error
          ? error.message
          : "Não foi possível autenticar o usuário."
      );
    } finally {
      setIsSubmittingLogin(false);
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setLoginError("");
  };

  if (isRestoringSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0b0f] via-[#0f1117] to-[#1a1b23] flex items-center justify-center text-white/70">
        Validando sessão...
      </div>
    );
  }

  if (!currentUser) {
    return (
      <Login
        onLogin={handleLogin}
        error={loginError}
        isSubmitting={isSubmittingLogin}
      />
    );
  }

  return <HomePage currentUser={currentUser} onLogout={handleLogout} />;
}