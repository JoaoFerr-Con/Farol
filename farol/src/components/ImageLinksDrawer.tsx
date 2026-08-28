import React, { useState } from 'react';
import { APP_IMAGES } from '../data/assets';
import { ImageAssetInfo } from '../types';

interface ImageLinksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImageLinksDrawer: React.FC<ImageLinksDrawerProps> = ({ isOpen, onClose }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedTagId, setCopiedTagId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!isOpen) return null;

  const categories = ['todos', ...Array.from(new Set(APP_IMAGES.map((img) => img.category)))];

  const filteredImages = APP_IMAGES.filter((img) => {
    const matchesCat = selectedCategory === 'todos' || img.category === selectedCategory;
    const matchesSearch =
      img.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.previewDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const copyToClipboard = (text: string, id: string, isTag = false) => {
    navigator.clipboard.writeText(text);
    if (isTag) {
      setCopiedTagId(id);
      setTimeout(() => setCopiedTagId(null), 2500);
    } else {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-neutral-200">
        {/* Header */}
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-gradient-to-r from-purple-50/50 to-emerald-50/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E9DDFF] flex items-center justify-center text-[#655590]">
              <span className="material-symbols-outlined filled">photo_library</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1C1B1C]">Links Diretos das Imagens (HTML)</h2>
              <p className="text-sm text-neutral-500">
                Acesse, copie links diretos e tags HTML prontas de todas as imagens do projeto
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
            title="Fechar"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="p-4 bg-neutral-50 border-b border-neutral-100 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#14181F] text-white shadow-sm'
                    : 'bg-white text-neutral-600 hover:bg-neutral-200/70 border border-neutral-200'
                }`}
              >
                {cat === 'todos' ? 'Todas as Imagens' : cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[220px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar imagem..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white rounded-full text-xs border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#B9A6E8]"
            />
          </div>
        </div>

        {/* Images List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filteredImages.length === 0 ? (
            <div className="text-center py-12 text-neutral-400">
              <span className="material-symbols-outlined text-4xl mb-2">image_not_supported</span>
              <p>Nenhuma imagem encontrada para este filtro.</p>
            </div>
          ) : (
            filteredImages.map((asset) => {
              const htmlSnippet = `<img src="${asset.url}" alt="${asset.alt}" class="w-full h-auto rounded-xl object-cover" />`;
              const isUrlCopied = copiedId === asset.id;
              const isTagCopied = copiedTagId === asset.id;

              return (
                <div
                  key={asset.id}
                  className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-5 items-start md:items-center hover:border-[#B9A6E8] hover:shadow-md transition-all"
                >
                  {/* Thumbnail */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-200 relative group">
                    <img
                      src={asset.url}
                      alt={asset.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <a
                      href={asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                      title="Abrir em tamanho original"
                    >
                      <span className="material-symbols-outlined text-lg">open_in_new</span>
                    </a>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-neutral-900 text-sm sm:text-base">{asset.name}</h3>
                      <span className="bg-[#E9DDFF] text-[#210F49] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {asset.category}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 line-clamp-2">{asset.previewDescription}</p>

                    {/* Direct URL Box */}
                    <div className="mt-2 flex items-center gap-2 bg-neutral-50 rounded-lg p-1.5 border border-neutral-200">
                      <span className="material-symbols-outlined text-xs text-neutral-400 pl-1">link</span>
                      <code className="text-[11px] text-neutral-600 truncate flex-1 font-mono">
                        {asset.url}
                      </code>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto shrink-0">
                    <button
                      onClick={() => copyToClipboard(asset.url, asset.id, false)}
                      className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isUrlCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#14181F] text-white hover:bg-black'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isUrlCopied ? 'check' : 'content_copy'}
                      </span>
                      {isUrlCopied ? 'URL Copiada!' : 'Copiar Link Direto'}
                    </button>

                    <button
                      onClick={() => copyToClipboard(htmlSnippet, asset.id, true)}
                      className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        isTagCopied
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-300'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isTagCopied ? 'done_all' : 'code'}
                      </span>
                      {isTagCopied ? 'Tag HTML Copiada!' : 'Copiar Tag <img>'}
                    </button>

                    <a
                      href={asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:flex items-center justify-center gap-1 px-3 py-1.5 text-[11px] text-neutral-500 hover:text-neutral-900 transition-colors"
                    >
                      <span className="material-symbols-outlined text-xs">open_in_new</span>
                      Abrir em nova aba
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2">
          <span>{APP_IMAGES.length} imagens disponíveis e otimizadas no HTML.</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const allUrls = APP_IMAGES.map((img) => `${img.name}:\n${img.url}`).join('\n\n');
                navigator.clipboard.writeText(allUrls);
                alert('Todos os links foram copiados para a sua área de transferência!');
              }}
              className="text-[#655590] font-semibold hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-xs">file_copy</span>
              Copiar lista completa de URLs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
