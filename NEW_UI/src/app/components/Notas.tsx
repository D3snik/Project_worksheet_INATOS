import { ArrowLeft, Upload, FileText } from 'lucide-react';
import { useState } from 'react';
import logo from '../../assets/f267816345d6444779918b0e213ef56871972bde.png';

interface NotasProps {
  onNavigate: (page: 'home') => void;
}

export default function Notas({ onNavigate }: NotasProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
    if (files.length > 0 && files[0].type === 'application/pdf') {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile.name);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Main Content */}
      <main className="px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Notas
            </h2>
            <p className="text-slate-600">
              Faça upload de um arquivo PDF para processamento
            </p>
          </div>

          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`bg-white rounded-lg border-2 border-dashed p-12 text-center transition-all ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-300 hover:border-blue-400'
            }`}
          >
            <div className="flex flex-col items-center gap-5">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                <Upload className="w-8 h-8 text-yellow-400" />
              </div>

              <div>
                <p className="text-lg font-bold text-slate-900 mb-1">
                  Arraste e solte seu arquivo PDF aqui
                </p>
                <p className="text-sm text-slate-600">
                  ou clique no botão abaixo para selecionar
                </p>
              </div>

              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <div className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors">
                  <FileText className="w-4 h-4" />
                  Selecionar Arquivo
                </div>
              </label>

              {selectedFile && (
                <div className="mt-4 p-5 bg-slate-100 rounded-lg border border-slate-200 w-full max-w-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-slate-900">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-slate-600">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="text-sm text-slate-600 hover:text-red-600 font-medium"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Upload Button */}
          {selectedFile && (
            <div className="mt-6">
              <button
                onClick={handleUpload}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Processar Arquivo
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
