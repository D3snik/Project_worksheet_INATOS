import { useState } from 'react';
import { LogIn } from 'lucide-react';
import logo from '../../assets/f267816345d6444779918b0e213ef56871972bde.png';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
  error?: string;
}

export default function Login({ onLogin, error }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen bg-[#1e3a5f] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Inatos Logo" className="h-16 w-auto" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Bem-vindo</h1>
          <p className="text-sm text-blue-200">Sistema de Gestão</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Acesse sua conta</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Usuário
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition-all"
                placeholder="Digite seu usuário"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition-all"
                placeholder="Digite sua senha"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#2d4a6f] hover:bg-[#1e3a5f] text-white font-medium text-sm rounded-lg transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Entrar no Sistema
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-blue-200 mt-6">
          Acesso restrito a usuários autorizados
        </p>
      </div>
    </div>
  );
}
