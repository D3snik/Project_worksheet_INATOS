import { FileText, Receipt, FileSpreadsheet, Home } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

import BrandLogo from './BrandLogo';
import Inicio from './Inicio';
import ExtracaoFolhaContainer from './ExtracaoFolhaContainer';
import Notas from './Notas';
import GlosasContainer from './GlosasContainer';

type Section = 'inicio' | 'extracaoFolha' | 'notas' | 'glosas';

export default function HomePage() {
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
      {/* Left Sidebar - Glassmorphism */}
      <aside className="w-64 bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-xl border-r border-white/10 flex flex-col shadow-2xl">
        {/* Logo Section */}
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
          <nav className="flex-1 py-6 px-4">
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
        </nav>

        {/* Glossy Bottom Accent */}
        <div className="p-4">
          <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600 rounded-full shadow-lg shadow-purple-500/50"
               style={{ boxShadow: '0 0 20px rgba(147, 51, 234, 0.6)' }}
          />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

