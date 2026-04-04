import { FileText, Receipt, FileSpreadsheet } from 'lucide-react';
import { useState } from 'react';
import logo from '../../assets/f267816345d6444779918b0e213ef56871972bde.png';
import ExtracaoFolhaContainer from './ExtracaoFolhaContainer';
import Notas from './Notas';
import GlosasContainer from './GlosasContainer';

type Section = 'extracaoFolha' | 'notas' | 'glosas';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<Section>('extracaoFolha');

  const menuItems = [
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
      case 'extracaoFolha':
        return <ExtracaoFolhaContainer />;
      case 'notas':
        return <Notas onNavigate={dummyNavigate} />;
      case 'glosas':
        return <GlosasContainer />;
      default:
        return <ExtracaoFolhaContainer />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#1e3a5f] border-r border-[#2d4a6f] flex flex-col">
        {/* Logo Section */}
        <div className="px-6 py-8 border-b border-[#2d4a6f]">
          <img src={logo} alt="Inatos Logo" className="h-10 w-auto mb-3" />
          <p className="text-xs text-blue-200">Sistema de Gestão</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                  activeSection === item.id
                    ? 'bg-[#2d4a6f] text-white'
                    : 'text-blue-100 hover:bg-[#2d4a6f] hover:text-white'
                }`}
              >
                <div className={`w-5 h-5 flex items-center justify-center ${
                  activeSection === item.id ? item.iconColor : 'text-blue-300'
                }`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">{item.title}</span>
              </button>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}
