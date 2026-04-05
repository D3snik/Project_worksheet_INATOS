import { FileSpreadsheet, Receipt, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface InicioProps {
  onNavigate: (section: 'extracaoFolha' | 'notas' | 'glosas') => void;
}

export default function Inicio({ onNavigate }: InicioProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const cards = [
    {
      id: 'extracaoFolha',
      title: 'Extração de Folha',
      icon: FileSpreadsheet,
      bgColor: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      buttonColor: 'bg-emerald-600 hover:bg-emerald-700',
      description: 'Processamento de folhas de pagamento com opções para extração geral e específica para prestações de contas. Análise detalhada de dados financeiros e recursos humanos.'
    },
    {
      id: 'notas',
      title: 'Notas',
      icon: Receipt,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
      description: 'Gerenciamento e processamento de notas fiscais e documentos financeiros. Upload e análise de arquivos PDF para controle fiscal e financeiro.'
    },
    {
      id: 'glosas',
      title: 'Glosas',
      icon: FileText,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      buttonColor: 'bg-red-600 hover:bg-red-700',
      description: 'Dashboard financeiro com análise de glosas e módulo de lançamentos. Acompanhamento em tempo real de dados apontados pela secretaria.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b0f] via-[#0f1117] to-[#1a1b23]">
      <div className="px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-3 drop-shadow-lg">
              Sistema de Gestão
            </h2>
            <p className="text-white/60 text-lg tracking-wide">
              Selecione o módulo desejado para iniciar suas operações
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-6"
          >
            {cards.map((card) => (
              <motion.div
                key={card.id}
                variants={itemVariants}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                className="relative group"
              >
                {/* Glassmorphism Card */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-8 hover:border-white/30 transition-all shadow-2xl hover:shadow-purple-500/20"
                     style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)' }}>

                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:to-blue-600/10 transition-all duration-500 pointer-events-none" />

                  <div className="relative flex flex-col items-center text-center mb-6">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className={`w-16 h-16 ${card.bgColor} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                      style={{
                        background: `linear-gradient(135deg, ${card.bgColor === 'bg-emerald-100' ? '#10b981' : card.bgColor === 'bg-yellow-100' ? '#f59e0b' : '#ef4444'}20, ${card.bgColor === 'bg-emerald-100' ? '#10b981' : card.bgColor === 'bg-yellow-100' ? '#f59e0b' : '#ef4444'}40)`,
                        boxShadow: `0 0 30px ${card.bgColor === 'bg-emerald-100' ? '#10b98140' : card.bgColor === 'bg-yellow-100' ? '#f59e0b40' : '#ef444440'}`
                      }}
                    >
                      <card.icon className={`w-8 h-8 ${card.iconColor}`} style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                      {card.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed text-sm">
                      {card.description}
                    </p>
                  </div>

                  {/* Glossy Button with Gradient */}
                  <motion.button
                    onClick={() => onNavigate(card.id as 'extracaoFolha' | 'notas' | 'glosas')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-full flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-xl overflow-hidden group/btn"
                    style={{
                      background: `linear-gradient(135deg, ${card.bgColor === 'bg-emerald-100' ? '#10b981' : card.bgColor === 'bg-yellow-100' ? '#f59e0b' : '#ef4444'}, ${card.bgColor === 'bg-emerald-100' ? '#059669' : card.bgColor === 'bg-yellow-100' ? '#d97706' : '#dc2626'})`,
                      boxShadow: `0 4px 20px ${card.bgColor === 'bg-emerald-100' ? '#10b98160' : card.bgColor === 'bg-yellow-100' ? '#f59e0b60' : '#ef444460'}, inset 0 1px 0 rgba(255,255,255,0.2)`
                    }}
                  >
                    <span className="relative z-10">Acessar</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl"
            style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)' }}
          >
            <h4 className="text-sm font-bold text-white mb-3 tracking-wide">
              Informações do Sistema
            </h4>
            <ul className="text-sm text-white/70 space-y-2">
              <li>• Todos os dados são processados de forma segura e confidencial</li>
              <li>• Apenas arquivos PDF são aceitos para upload</li>
              <li>• Cada módulo possui funcionalidades específicas para suas necessidades</li>
              <li>• Em caso de dúvidas, consulte a documentação do sistema</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
