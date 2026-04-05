import { ArrowLeft, Save } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

interface LancamentosProps {
  onNavigate: (page: 'home' | 'dashboard' | 'guiasPrestacao') => void;
  onBack?: () => void;
}

export default function Lancamentos({ onNavigate, onBack }: LancamentosProps) {
  const [formData, setFormData] = useState({
    fornecedor: '',
    projeto: 'APS 1.2',
    tipoServico: 'ADEQUAÇÃO DO ESPAÇO IM',
    banco: 'Banco do Brasil',
    status: 'Cancelado',
    valor: 'R$ 0,00',
    dataPgto: '',
    competencia: '-------- de ----',
    numeroNF: '',
    contaBancaria: '',
    descricao: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b0f] via-[#0f1117] to-[#1a1b23]">
      <main className="px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-4"
          >
            {onBack && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="p-2 bg-white/5 backdrop-blur-sm hover:bg-white/10 rounded-xl transition-all border border-white/10"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </motion.button>
            )}
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent mb-2">
                Módulo de Lançamentos
              </h2>
              <p className="text-white/60">
                Registro financeiro detalhado
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl"
            style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)' }}
          >
            {/* Form Title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-blue-400/30">
                <Save className="w-6 h-6 text-blue-400" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Novo Lançamento Manual</h2>
                <p className="text-sm text-white/60">Preencha os dados abaixo</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">
                    Nome do Fornecedor
                  </label>
                  <input
                    type="text"
                    value={formData.fornecedor}
                    onChange={(e) => setFormData({ ...formData, fornecedor: e.target.value })}
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-white/40"
                    style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
                    placeholder="Digite o nome do fornecedor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">
                    Projeto
                  </label>
                  <select
                    value={formData.projeto}
                    onChange={(e) => setFormData({ ...formData, projeto: e.target.value })}
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
                  >
                    <option value="APS 1.2" className="bg-[#0f1117] text-white">APS 1.2</option>
                    <option value="Projeto Alpha" className="bg-[#0f1117] text-white">Projeto Alpha</option>
                    <option value="Beta Systems" className="bg-[#0f1117] text-white">Beta Systems</option>
                    <option value="Gamma Corp" className="bg-[#0f1117] text-white">Gamma Corp</option>
                    <option value="Delta Finance" className="bg-[#0f1117] text-white">Delta Finance</option>
                  </select>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">
                    Tipo de Serviço
                  </label>
                  <select
                    value={formData.tipoServico}
                    onChange={(e) => setFormData({ ...formData, tipoServico: e.target.value })}
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
                  >
                    <option value="ADEQUAÇÃO DO ESPAÇO IM" className="bg-[#0f1117] text-white">ADEQUAÇÃO DO ESPAÇO IM</option>
                    <option value="CONSULTORIA" className="bg-[#0f1117] text-white">CONSULTORIA</option>
                    <option value="DESENVOLVIMENTO" className="bg-[#0f1117] text-white">DESENVOLVIMENTO</option>
                    <option value="INFRAESTRUTURA" className="bg-[#0f1117] text-white">INFRAESTRUTURA</option>
                    <option value="TREINAMENTO" className="bg-[#0f1117] text-white">TREINAMENTO</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">
                    Banco
                  </label>
                  <select
                    value={formData.banco}
                    onChange={(e) => setFormData({ ...formData, banco: e.target.value })}
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
                  >
                    <option value="Banco do Brasil" className="bg-[#0f1117] text-white">Banco do Brasil</option>
                    <option value="Caixa Econômica" className="bg-[#0f1117] text-white">Caixa Econômica</option>
                    <option value="Itaú" className="bg-[#0f1117] text-white">Itaú</option>
                    <option value="Bradesco" className="bg-[#0f1117] text-white">Bradesco</option>
                    <option value="Santander" className="bg-[#0f1117] text-white">Santander</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
                  >
                    <option value="Cancelado" className="bg-[#0f1117] text-white">Cancelado</option>
                    <option value="Pendente" className="bg-[#0f1117] text-white">Pendente</option>
                    <option value="Aprovado" className="bg-[#0f1117] text-white">Aprovado</option>
                    <option value="Pago" className="bg-[#0f1117] text-white">Pago</option>
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-4 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">
                    Valor (R$)
                  </label>
                  <input
                    type="text"
                    value={formData.valor}
                    onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-white/40"
                    style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
                    placeholder="R$ 0,00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">
                    Data do Pgto
                  </label>
                  <input
                    type="text"
                    value={formData.dataPgto}
                    onChange={(e) => setFormData({ ...formData, dataPgto: e.target.value })}
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-white/40"
                    style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
                    placeholder="dd/mm/aaaa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">
                    Competência
                  </label>
                  <input
                    type="text"
                    value={formData.competencia}
                    onChange={(e) => setFormData({ ...formData, competencia: e.target.value })}
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-white/40"
                    style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
                    placeholder="-------- de ----"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">
                    Número NF
                  </label>
                  <input
                    type="text"
                    value={formData.numeroNF}
                    onChange={(e) => setFormData({ ...formData, numeroNF: e.target.value })}
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-white/40"
                    style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
                    placeholder="Ex: NF-1234"
                  />
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">
                    Conta Bancária
                  </label>
                  <input
                    type="text"
                    value={formData.contaBancaria}
                    onChange={(e) => setFormData({ ...formData, contaBancaria: e.target.value })}
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-white/40"
                    style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
                    placeholder="Conta"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">
                    Descrição / Observações
                  </label>
                  <input
                    type="text"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-white/40"
                    style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
                    placeholder="Digite observações adicionais"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="relative flex items-center gap-2 px-6 py-3 text-white font-semibold text-sm rounded-xl overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    boxShadow: '0 4px 20px #3b82f660, inset 0 1px 0 rgba(255,255,255,0.2)'
                  }}
                >
                  <Save className="w-4 h-4 relative z-10" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
                  <span className="relative z-10">Salvar Pagamento</span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

