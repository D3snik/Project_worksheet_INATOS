import { useState } from 'react';
import ExtracaoFolhaGeral from './ExtracaoFolha';
import ExtracaoFolhaPrestacoes from './ExtracaoFolhaPrestacoes';

type ExtracaoView = 'geral' | 'prestacoes' | null;

export default function ExtracaoFolhaContainer() {
  const [activeView, setActiveView] = useState<ExtracaoView>(null);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-8 py-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveView('geral')}
              className={`px-6 py-3 font-medium text-sm rounded-lg transition-all ${
                activeView === 'geral'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Extração Geral
            </button>
            <button
              onClick={() => setActiveView('prestacoes')}
              className={`px-6 py-3 font-medium text-sm rounded-lg transition-all ${
                activeView === 'prestacoes'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Prestação
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeView === null ? (
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Selecione um tipo de extração
            </h3>
            <p className="text-slate-600">
              Escolha entre Extração Geral ou Extração para Prestações
            </p>
          </div>
        </div>
      ) : activeView === 'geral' ? (
        <ExtracaoFolhaGeral onNavigate={() => {}} />
      ) : (
        <ExtracaoFolhaPrestacoes onNavigate={() => {}} />
      )}
    </div>
  );
}
