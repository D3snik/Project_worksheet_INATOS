import { useState } from 'react';
import { ArrowLeft, Wallet, TrendingUp, CheckCircle, BarChart3, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';


interface DashboardProps {
  onNavigate: (page: 'home' | 'lancamentos' | 'guiasPrestacao') => void;
  onOpenLancamentos?: () => void;
}

const projectsData = [
  { name: 'APS 1.2', color: '#3b82f6' },
  { name: 'Projeto Alpha', color: '#8b5cf6' },
  { name: 'Beta Systems', color: '#ec4899' },
  { name: 'Gamma Corp', color: '#f59e0b' },
  { name: 'Delta Finance', color: '#10b981' }
];

const monthlyData = [
  { month: 'Jan', total: 850000, aps12: 320000, alpha: 180000, beta: 150000, gamma: 120000, delta: 80000 },
  { month: 'Fev', total: 920000, aps12: 340000, alpha: 195000, beta: 165000, gamma: 135000, delta: 85000 },
  { month: 'Mar', total: 1100000, aps12: 410000, alpha: 235000, beta: 195000, gamma: 160000, delta: 100000 },
  { month: 'Abr', total: 1050000, aps12: 385000, alpha: 220000, beta: 185000, gamma: 150000, delta: 110000 },
  { month: 'Mai', total: 1250000, aps12: 465000, alpha: 265000, beta: 220000, gamma: 180000, delta: 120000 },
  { month: 'Jun', total: 1369625, aps12: 510000, alpha: 290000, beta: 240000, gamma: 195000, delta: 134625 }
];

const categoryData = [
  { category: 'Consultoria', value: 580000 },
  { category: 'Desenvolvimento', value: 420000 },
  { category: 'Infraestrutura', value: 210000 },
  { category: 'Treinamento', value: 159625 }
];

export default function Dashboard({ onNavigate, onOpenLancamentos }: DashboardProps) {
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'monthly' | 'category'>('monthly');

  const stats = [
    {
      title: 'Total de Pagamentos',
      value: '525',
      icon: Wallet,
      iconColor: 'text-red-600'
    },
    {
      title: 'Valor Total',
      value: 'R$ 1.369.625,34',
      icon: TrendingUp,
      iconColor: 'text-blue-600'
    },
    {
      title: 'Pagamentos com Sucesso',
      value: '523',
      icon: CheckCircle,
      iconColor: 'text-emerald-600'
    },
    {
      title: 'QGD Anual',
      value: 'R$ 22.738.480,32',
      icon: BarChart3,
      iconColor: 'text-orange-600'
    }
  ];

  const filteredData = selectedProject === 'all'
    ? monthlyData
    : monthlyData.map(item => ({
        ...item,
        total: item[selectedProject as keyof typeof item] as number || 0
      }));

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Dashboard Financeiro
              </h2>
              <p className="text-slate-600">
                Acompanhamento em tempo real
              </p>
            </div>

            {/* Botão Lançamentos */}
            {onOpenLancamentos && (
              <button
                onClick={onOpenLancamentos}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-lg transition-colors"
              >
                <FileText className="w-4 h-4" />
                Lançamentos
              </button>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-slate-200 p-5"
              >
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-3">
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <p className="text-slate-600 text-sm mb-1">{stat.title}</p>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Main Chart Section */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Análise de Rubricas</h2>
                  <p className="text-xs text-slate-600">Acompanhamento financeiro</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('monthly')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                      viewMode === 'monthly'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Mensal
                  </button>
                  <button
                    onClick={() => setViewMode('category')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                      viewMode === 'category'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Categorias
                  </button>
                </div>

                {/* Project Filter */}
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos os Projetos</option>
                  <option value="aps12">APS 1.2</option>
                  <option value="alpha">Projeto Alpha</option>
                  <option value="beta">Beta Systems</option>
                  <option value="gamma">Gamma Corp</option>
                  <option value="delta">Delta Finance</option>
                </select>
              </div>
            </div>

            {/* Chart */}
            {viewMode === 'monthly' ? (
              <div className="h-80" key="monthly-chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={filteredData} key={`area-chart-${selectedProject}`}>
                    <defs>
                      <linearGradient id={`colorTotal-${selectedProject}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
                    <YAxis
                      stroke="#64748b"
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
                    />
                    <Legend wrapperStyle={{ paddingTop: '16px', fontSize: '12px' }} />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill={`url(#colorTotal-${selectedProject})`}
                      name="Valor Total"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-80" key="category-chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="category" stroke="#64748b" style={{ fontSize: '12px' }} />
                    <YAxis
                      stroke="#64748b"
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
                    />
                    <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Valor" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Projects Overview */}
          <div className="grid grid-cols-5 gap-4">
            {projectsData.map((project, index) => (
              <button
                key={index}
                className="bg-white rounded-lg border border-slate-200 hover:shadow-lg transition-all p-5"
                onClick={() => setSelectedProject(project.name === 'APS 1.2' ? 'aps12' : 'all')}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${project.color}20` }}
                >
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                </div>
                <h3 className="text-slate-900 font-semibold text-sm mb-1">{project.name}</h3>
                <p className="text-slate-600 text-xs">Projeto Ativo</p>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
