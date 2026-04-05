import { useState } from 'react';
import { motion } from 'motion/react';
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
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b0f] via-[#0f1117] to-[#1a1b23]">
      <main className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8 flex items-center justify-between"
          >
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-2">
                Dashboard Financeiro
              </h2>
              <p className="text-white/60 tracking-wide">
                Acompanhamento em tempo real
              </p>
            </div>

            {/* Botão Lançamentos - Glossy */}
            {onOpenLancamentos && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenLancamentos}
                className="relative flex items-center gap-2 px-5 py-2.5 text-white font-semibold text-sm rounded-xl overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  boxShadow: '0 4px 20px #ef444460, inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                <FileText className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Lançamentos</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            )}
          </motion.div>

          {/* Stats Grid - Glassmorphism */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
                  }
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-5 shadow-2xl hover:border-white/30 transition-all"
                style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)' }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center mb-3 shadow-lg"
                  style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)' }}
                >
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
                </motion.div>
                <p className="text-white/60 text-sm mb-1 tracking-wide">{stat.title}</p>
                <p className="text-xl font-bold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Chart Section - Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6 mb-6 shadow-2xl"
            style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center shadow-lg"
                     style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                  <BarChart3 className="w-5 h-5 text-blue-400" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-wide">Análise de Rubricas</h2>
                  <p className="text-xs text-white/60">Acompanhamento financeiro</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* View Mode Toggle - Glossy */}
                <div className="flex items-center gap-1 bg-white/10 backdrop-blur-lg rounded-xl p-1 border border-white/20">
                  <button
                    onClick={() => setViewMode('monthly')}
                    className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                      viewMode === 'monthly'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'text-white/60 hover:text-white'
                    }`}
                    style={viewMode === 'monthly' ? {
                      boxShadow: '0 4px 12px rgba(147, 51, 234, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                    } : {}}
                  >
                    Mensal
                  </button>
                  <button
                    onClick={() => setViewMode('category')}
                    className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                      viewMode === 'category'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'text-white/60 hover:text-white'
                    }`}
                    style={viewMode === 'category' ? {
                      boxShadow: '0 4px 12px rgba(147, 51, 234, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                    } : {}}
                  >
                    Categorias
                  </button>
                </div>

                {/* Project Filter - Glossy */}
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 text-white text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold"
                  style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)' }}
                >
                  <option value="all" className="bg-[#1a1b23] text-white">Todos os Projetos</option>
                  <option value="aps12" className="bg-[#1a1b23] text-white">APS 1.2</option>
                  <option value="alpha" className="bg-[#1a1b23] text-white">Projeto Alpha</option>
                  <option value="beta" className="bg-[#1a1b23] text-white">Beta Systems</option>
                  <option value="gamma" className="bg-[#1a1b23] text-white">Gamma Corp</option>
                  <option value="delta" className="bg-[#1a1b23] text-white">Delta Finance</option>
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
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.6} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" style={{ fontSize: '12px', fontWeight: '600' }} />
                    <YAxis
                      stroke="rgba(255,255,255,0.6)"
                      style={{ fontSize: '12px', fontWeight: '600' }}
                      tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(26, 27, 35, 0.95)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '12px',
                        fontSize: '12px',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                        color: '#fff'
                      }}
                      formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
                    />
                    <Legend wrapperStyle={{ paddingTop: '16px', fontSize: '12px', fontWeight: '600' }} />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#8b5cf6"
                      strokeWidth={3}
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
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="category" stroke="rgba(255,255,255,0.6)" style={{ fontSize: '12px', fontWeight: '600' }} />
                    <YAxis
                      stroke="rgba(255,255,255,0.6)"
                      style={{ fontSize: '12px', fontWeight: '600' }}
                      tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(26, 27, 35, 0.95)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '12px',
                        fontSize: '12px',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                        color: '#fff'
                      }}
                      formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
                    />
                    <Bar dataKey="value" fill="url(#barGradient)" radius={[8, 8, 0, 0]} name="Valor" />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </motion.div>

          {/* Projects Overview - Glassmorphism Cards */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.8
                }
              }
            }}
            className="grid grid-cols-5 gap-4"
          >
            {projectsData.map((project, index) => (
              <motion.button
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
                  }
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-white/30 transition-all p-5 shadow-2xl group"
                onClick={() => setSelectedProject(project.name === 'APS 1.2' ? 'aps12' : 'all')}
                style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-2 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}40, ${project.color}60)`,
                    boxShadow: `0 0 20px ${project.color}40, inset 0 1px 0 rgba(255,255,255,0.2)`
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{
                      backgroundColor: project.color,
                      boxShadow: `0 0 12px ${project.color}`
                    }}
                  />
                </div>
                <h3 className="text-white font-bold text-sm mb-1 tracking-wide">{project.name}</h3>
                <p className="text-white/60 text-xs">Projeto Ativo</p>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

