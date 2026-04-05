import { useState } from 'react';
import { LogIn } from 'lucide-react';
import { motion } from 'motion/react';

import BrandLogo from './BrandLogo';

interface LoginProps {
  onLogin: (username: string, password: string) => Promise<void>;
  error?: string;
  isSubmitting?: boolean;
}

export default function Login({ onLogin, error, isSubmitting = false }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onLogin(username, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b0f] via-[#0f1117] to-[#1a1b23] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-md"
      >
        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl"
          style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)' }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <BrandLogo
                imageClassName="h-16 w-auto drop-shadow-[0_0_20px_rgba(147,51,234,0.35)]"
                subtitle="Sistema de Gestão"
                subtitleClassName="text-sm text-white/60 tracking-wide"
              />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-2">
              Bem-vindo
            </h1>
          </div>

          <h2 className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6">
            Acesse sua conta
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">
                Usuário
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-white/40"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
                placeholder="Digite seu usuário"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-white/40"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
                placeholder="Digite sua senha"
                required
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-sm border border-red-500/30 text-red-200 text-sm rounded-xl px-4 py-3"
                style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)' }}
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="relative w-full flex items-center justify-center gap-2 px-4 py-3 text-white font-semibold text-sm rounded-xl overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #9333ea, #7c3aed)',
                boxShadow: '0 4px 20px #9333ea60, inset 0 1px 0 rgba(255,255,255,0.2)',
                opacity: isSubmitting ? 0.8 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              <LogIn className="w-4 h-4 relative z-10" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
              <span className="relative z-10">{isSubmitting ? 'Entrando...' : 'Entrar no Sistema'}</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-xs text-white/50 mt-6 tracking-wide"
        >
          Acesso restrito a usuários autorizados
        </motion.p>
      </motion.div>
    </div>
  );
}

