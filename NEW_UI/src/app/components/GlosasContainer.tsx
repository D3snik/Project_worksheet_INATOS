import { useState } from 'react';
import Dashboard from './Dashboard';
import Lancamentos from './Lancamentos';

type GlosasView = 'dashboard' | 'lancamentos';

export default function GlosasContainer() {
  const [activeView, setActiveView] = useState<GlosasView>('dashboard');

  return (
    <>
      {activeView === 'dashboard' ? (
        <Dashboard onNavigate={() => {}} onOpenLancamentos={() => setActiveView('lancamentos')} />
      ) : (
        <Lancamentos onNavigate={() => {}} onBack={() => setActiveView('dashboard')} />
      )}
    </>
  );
}
