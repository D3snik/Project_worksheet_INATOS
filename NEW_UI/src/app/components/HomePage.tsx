import { FileText, Receipt, FileSpreadsheet, Home, LogOut, UserCircle2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

import BrandLogo from './BrandLogo';
import Inicio from './Inicio';
import ExtracaoFolhaContainer from './ExtracaoFolhaContainer';
import Notas from './Notas';
import GlosasContainer from './GlosasContainer';
import type { AuthUser } from '../services/auth';

type Section = 'inicio' | 'extracaoFolha' | 'notas' | 'glosas';

interface HomePageProps {
  currentUser: AuthUser;
  onLogout: () => void;
}

export default function HomePage({ currentUser, onLogout }: HomePageProps) {
  const [activeSection, setActiveSection] = useState<Section>('inicio');

  const menuItems = [
    {
      id: 'inicio' as const,
      title: 'Início',
      icon: Home,
      iconColor: 'text-white'
    },
    {
      id: 'extracaoFolha' as const,
      title: 'Extração de Folha',
      icon: FileSpreadsheet,
      iconColor: 'text-emerald-400'
    },
    {
      id: 'notas' as const,
      title: 'Notas',
      icon: Receipt,
      iconColor: 'text-yellow-400'
    },
    {
      id: 'glosas' as const,
      title: 'Glosas',
      icon: FileText,
      iconColor: 'text-red-500'
    }
  ];

  const renderContent = () => {
    const dummyNavigate = () => {};

    switch (activeSection) {
      case 'inicio':
        return <Inicio onNavigate={setActiveSection} />;
      case 'extracaoFolha':
        return <ExtracaoFolhaContainer />;
      case 'notas':
        return <Notas onNavigate={dummyNavigate} />;
      case 'glosas':
        return <GlosasContainer />;
      default:
        return <Inicio onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b0f] via-[#0f1117] to-[#1a1b23] flex">
      <aside className="w-64 bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-xl border-r border-white/10 flex flex-col shadow-2xl">
        <div className="px-6 py-8 border-b border-white/10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BrandLogo
              imageClassName="h-14 w-auto mx-auto drop-shadow-[0_0_16px_rgba(147,51,234,0.35)]"
              subtitle="Sistema de Gestão"
            />
          </motion.div>
        </div>

        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left relative group ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white shadow-lg shadow-purple-500/20 border border-purple-500/30'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
                style={activeSection === item.id ? {
                  boxShadow: '0 0 20px rgba(147, 51, 234, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                } : {}}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  className={`w-5 h-5 flex items-center justify-center ${
                    activeSection === item.id ? item.iconColor : 'text-white/60'
                  }`}
                  style={activeSection === item.id ? {
                    filter: 'drop-shadow(0 0 8px currentColor)'
                  } : {}}
                >
                  <item.icon className="w-5 h-5" />
                </motion.div>
                <span className="text-sm font-semibold tracking-wide">{item.title}</span>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r-full shadow-lg shadow-purple-500/50"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </nav>

        <div className="px-4 pb-6 space-y-3">
          <div
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl border border-white/20 px-4 py-3 shadow-2xl"
            style={{ boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center"
                style={{ boxShadow: '0 0 20px rgba(147, 51, 234, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)' }}
              >
                <UserCircle2 className="h-4 w-4 text-purple-300" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-white/50 font-medium tracking-wider uppercase">Sessão</p>
                <p className="truncate text-sm font-semibold text-white">{currentUser.full_name || currentUser.username}</p>
              </div>
            </div>
          </div>

          <motion.button
            onClick={onLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl border border-white/20 px-4 py-3 shadow-2xl hover:border-red-400/40 transition-all group"
            style={{ boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)' }}
          >
            <div className="flex items-center justify-center gap-2">
              <LogOut className="h-4 w-4 text-white/60 group-hover:text-red-400 transition-colors" />
              <span className="text-sm text-white/80 group-hover:text-white font-semibold transition-colors">Sair</span>
            </div>
          </motion.button>

          <div className="px-0 pt-1">
            <div
              className="h-1 w-full bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600 rounded-full shadow-lg shadow-purple-500/50"
              style={{ boxShadow: '0 0 20px rgba(147, 51, 234, 0.6)' }}
            />
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

