import { useEffect, useState } from "react";
import { motion } from "motion/react";

import HomePage from "./components/HomePage";
import Login from "./components/Login";
import BrandLogo from "./components/BrandLogo";
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
      <div className="min-h-screen bg-gradient-to-br from-[#0a0b0f] via-[#0f1117] to-[#1a1b23] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-md rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-8 text-center shadow-2xl backdrop-blur-xl"
          style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)' }}
        >
          <BrandLogo
            imageClassName="mx-auto h-16 w-auto drop-shadow-[0_0_20px_rgba(147,51,234,0.35)]"
            subtitle="Restaurando sessão"
            subtitleClassName="text-sm text-white/60 tracking-wide"
          />
          <div className="mt-6 space-y-3">
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              />
            </div>
            <p className="text-sm font-medium text-white/75">Validando sessão atual...</p>
          </div>
        </motion.div>
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