import { ArrowLeft, Save } from 'lucide-react';
import { useState } from 'react';
import logo from '../../assets/f267816345d6444779918b0e213ef56871972bde.png';

interface LancamentosProps {
  onNavigate: (page: 'home' | 'dashboard' | 'guiasPrestacao') => void;
  onBack?: () => void;
}

export default function Lancamentos({ onNavigate, onBack }: LancamentosProps) {
  const [formData, setFormData] = useState({
    fornecedor: '',
    projeto: 'APS 1.2',
    tipoServico: 'ADEQUAÇíO DO ESPAÇO IM',
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
    <div className="min-h-screen bg-slate-50">
      <main className="px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
            )}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Módulo de Lançamentos
              </h2>
              <p className="text-slate-600">
                Registro financeiro detalhado
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-8">
            {/* Form Title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                <Save className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Novo Lançamento Manual</h2>
                <p className="text-sm text-slate-600">Preencha os dados abaixo</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nome do Fornecedor
                  </label>
                  <input
                    type="text"
                    value={formData.fornecedor}
                    onChange={(e) => setFormData({ ...formData, fornecedor: e.target.value })}
                    className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Digite o nome do fornecedor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Projeto
                  </label>
                  <select
                    value={formData.projeto}
                    onChange={(e) => setFormData({ ...formData, projeto: e.target.value })}
                    className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="APS 1.2">APS 1.2</option>
                    <option value="Projeto Alpha">Projeto Alpha</option>
                    <option value="Beta Systems">Beta Systems</option>
                    <option value="Gamma Corp">Gamma Corp</option>
                    <option value="Delta Finance">Delta Finance</option>
                  </select>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tipo de Serviço
                  </label>
                  <select
                    value={formData.tipoServico}
                    onChange={(e) => setFormData({ ...formData, tipoServico: e.target.value })}
                    className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="ADEQUAÇíO DO ESPAÇO IM">ADEQUAÇíO DO ESPAÇO IM</option>
                    <option value="CONSULTORIA">CONSULTORIA</option>
                    <option value="DESENVOLVIMENTO">DESENVOLVIMENTO</option>
                    <option value="INFRAESTRUTURA">INFRAESTRUTURA</option>
                    <option value="TREINAMENTO">TREINAMENTO</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Banco
                  </label>
                  <select
                    value={formData.banco}
                    onChange={(e) => setFormData({ ...formData, banco: e.target.value })}
                    className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="Banco do Brasil">Banco do Brasil</option>
                    <option value="Caixa Econômica">Caixa Econômica</option>
                    <option value="Itaú">Itaú</option>
                    <option value="Bradesco">Bradesco</option>
                    <option value="Santander">Santander</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="Cancelado">Cancelado</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Aprovado">Aprovado</option>
                    <option value="Pago">Pago</option>
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-4 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Valor (R$)
                  </label>
                  <input
                    type="text"
                    value={formData.valor}
                    onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                    className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="R$ 0,00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Data do Pgto
                  </label>
                  <input
                    type="text"
                    value={formData.dataPgto}
                    onChange={(e) => setFormData({ ...formData, dataPgto: e.target.value })}
                    className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="dd/mm/aaaa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Competência
                  </label>
                  <input
                    type="text"
                    value={formData.competencia}
                    onChange={(e) => setFormData({ ...formData, competencia: e.target.value })}
                    className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="-------- de ----"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Número NF
                  </label>
                  <input
                    type="text"
                    value={formData.numeroNF}
                    onChange={(e) => setFormData({ ...formData, numeroNF: e.target.value })}
                    className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Ex: NF-1234"
                  />
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Conta Bancária
                  </label>
                  <input
                    type="text"
                    value={formData.contaBancaria}
                    onChange={(e) => setFormData({ ...formData, contaBancaria: e.target.value })}
                    className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Conta"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Descrição / Observações
                  </label>
                  <input
                    type="text"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Digite observações adicionais"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Salvar Pagamento
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
