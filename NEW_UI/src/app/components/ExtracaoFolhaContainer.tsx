import { useState } from 'react';
import ExtracaoFolhaGeral from './ExtracaoFolha';
import ExtracaoFolhaPrestacoes from './ExtracaoFolhaPrestacoes';

type ExtracaoView = 'geral' | 'prestacoes';

export default function ExtracaoFolhaContainer() {
  const [activeView, setActiveView] = useState<ExtracaoView>('prestacoes');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b0f] via-[#0f1117] to-[#1a1b23]">
      {/* Navigation Tabs - Glassmorphism */}
      <div className="bg-gradient-to-r from-white/5 to-white/[0.02] backdrop-blur-xl border-b border-white/10">
        <div className="px-8 py-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveView('prestacoes')}
              className={`px-6 py-3 font-semibold text-sm rounded-xl transition-all relative overflow-hidden group ${
                activeView === 'prestacoes'
                  ? 'text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              style={activeView === 'prestacoes' ? {
                background: 'linear-gradient(135deg, #10b981, #059669)',
                boxShadow: '0 4px 20px #10b98160, inset 0 1px 0 rgba(255,255,255,0.2)'
              } : {}}
            >
              <span className="relative z-10">Prestações</span>
              {activeView === 'prestacoes' && (
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </button>
            <button
              onClick={() => setActiveView('geral')}
              className={`px-6 py-3 font-semibold text-sm rounded-xl transition-all relative overflow-hidden group ${
                activeView === 'geral'
                  ? 'text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              style={activeView === 'geral' ? {
                background: 'linear-gradient(135deg, #10b981, #059669)',
                boxShadow: '0 4px 20px #10b98160, inset 0 1px 0 rgba(255,255,255,0.2)'
              } : {}}
            >
              <span className="relative z-10">Extração Geral</span>
              {activeView === 'geral' && (
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeView === 'geral' ? (
        <ExtracaoFolhaGeral onNavigate={() => {}} />
      ) : (
        <ExtracaoFolhaPrestacoes onNavigate={() => {}} />
      )}
    </div>
  );
}
