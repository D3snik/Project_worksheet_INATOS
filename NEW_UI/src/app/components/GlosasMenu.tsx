import { BarChart3, FileText } from "lucide-react";
import { useState } from "react";
import Dashboard from "./Dashboard";
import Lancamentos from "./Lancamentos";

interface GlosasMenuProps {
  onNavigate: (
    page: "home" | "dashboard" | "lancamentos",
  ) => void;
}

type GlosasSection = "menu" | "dashboard" | "lancamentos";

export default function GlosasMenu({
  onNavigate,
}: GlosasMenuProps) {
  const [activeSection, setActiveSection] =
    useState<GlosasSection>("menu");

  const modules = [
    {
      id: "dashboard" as const,
      title: "Dashboard Financeiro",
      description:
        "Visualize métricas financeiras, análise de rubricas e acompanhamento de projetos em tempo real.",
      icon: BarChart3,
      iconColor: "text-blue-600",
    },
    {
      id: "lancamentos" as const,
      title: "Módulo de Lançamentos",
      description:
        "Registre e gerencie lançamentos financeiros com informações detalhadas de fornecedores e pagamentos.",
      icon: FileText,
      iconColor: "text-red-600",
    },
  ];

  const dummyNavigate = () => {};

  if (activeSection === "dashboard") {
    return <Dashboard onNavigate={dummyNavigate} />;
  }

  if (activeSection === "lancamentos") {
    return <Lancamentos onNavigate={dummyNavigate} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Main Content */}
      <main className="px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Glosas
            </h2>
            <p className="text-slate-600">
              Escolha o módulo que deseja acessar
            </p>
          </div>

          {/* Modules Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveSection(module.id)}
                className="group bg-white rounded-lg hover:shadow-lg transition-all p-8 text-left border border-slate-200"
              >
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <module.icon
                    className={`w-6 h-6 ${module.iconColor}`}
                  />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {module.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {module.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
