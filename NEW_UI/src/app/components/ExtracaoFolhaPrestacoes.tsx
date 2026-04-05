import { Upload, FileText } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

import { downloadBlob, extractFolha } from '../services/extractFolha';

interface ExtracaoFolhaPrestacoes {
  onNavigate: (page: 'home') => void;
}

export default function ExtracaoFolhaPrestacoes({ onNavigate: _onNavigate }: ExtracaoFolhaPrestacoes) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const isValidPdf = (file: File) => file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0 && isValidPdf(files[0])) {
      setErrorMessage('');
      setSuccessMessage('');
      setSelectedFile(files[0]);
    } else if (files.length > 0) {
      setErrorMessage('Selecione um arquivo PDF válido.');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (!isValidPdf(files[0])) {
        setSelectedFile(null);
        setErrorMessage('Selecione um arquivo PDF válido.');
        setSuccessMessage('');
        return;
      }

      setErrorMessage('');
      setSuccessMessage('');
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || isUploading) {
      return;
    }

    setIsUploading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const { blob, filename } = await extractFolha(selectedFile);
      downloadBlob(blob, filename);
      setSuccessMessage('Arquivo processado com sucesso. O download foi iniciado.');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Não foi possível processar o arquivo.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 text-center"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-emerald-200 to-green-200 bg-clip-text text-transparent mb-2">
              Extração de Folha para Prestações
            </h2>
            <p className="text-white/60 tracking-wide">
              Faça upload de um arquivo PDF para processamento
            </p>
          </motion.div>

          {/* Upload Area - Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border-2 border-dashed p-12 text-center transition-all shadow-2xl ${
              isDragging
                ? 'border-emerald-400/60 bg-emerald-500/10 shadow-emerald-500/30'
                : 'border-white/20 hover:border-emerald-400/40'
            }`}
            style={{ boxShadow: isDragging ? '0 0 40px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)' : '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)' }}
          >
            <div className="flex flex-col items-center gap-5">
              <motion.div
                animate={isDragging ? { scale: 1.15 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl flex items-center justify-center shadow-lg"
                style={{ boxShadow: '0 0 30px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)' }}
              >
                <Upload className="w-8 h-8 text-emerald-400" style={{ filter: 'drop-shadow(0 0 12px currentColor)' }} />
              </motion.div>

              <div>
                <p className="text-lg font-bold text-white mb-1 tracking-wide">
                  Arraste e solte seu arquivo PDF aqui
                </p>
                <p className="text-sm text-white/60">
                  ou clique no botão abaixo para selecionar
                </p>
              </div>

              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload-prestacoes"
              />
              <label htmlFor="file-upload-prestacoes">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 text-white font-semibold text-sm rounded-xl relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    boxShadow: '0 4px 20px #10b98160, inset 0 1px 0 rgba(255,255,255,0.2)'
                  }}
                >
                  <FileText className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Selecionar Arquivo</span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </label>

              {selectedFile && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 p-5 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl border border-white/20 w-full max-w-md shadow-lg"
                  style={{ boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-lg flex items-center justify-center shadow-lg"
                           style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                        <FileText className="w-5 h-5 text-emerald-400" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-white">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-white/60">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setSelectedFile(null);
                        setErrorMessage('');
                        setSuccessMessage('');
                      }}
                      className="text-sm text-white/60 hover:text-red-400 font-semibold"
                    >
                      Remover
                    </motion.button>
                  </div>
                  {isUploading && (
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-emerald-400 to-green-400 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2, ease: 'linear' }}
                        style={{ boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)' }}
                      />
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Upload Button - Glossy Gradient */}
          {selectedFile && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUpload}
                className="relative w-full py-3 text-white font-bold rounded-xl overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  boxShadow: '0 4px 20px #10b98160, inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                <span className="relative z-10">Processar Arquivo</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </motion.div>
          )}

          {errorMessage && (
            <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
              {successMessage}
            </div>
          )}
        </motion.div>
      </main>
  );
}

