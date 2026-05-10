import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { TUTORIAL_CATEGORIES, UI_STRINGS } from '../constants';
import { Category, Slide } from '../types';

export default function TutorialViewer() {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [lang, setLang] = useState<'sk' | 'en' | 'de'>('sk');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const l = params.get('lang') as any;
    if (l && ['sk', 'en', 'de'].includes(l)) {
      setLang(l);
    }
  }, []);

  const currentCategory = TUTORIAL_CATEGORIES[currentCategoryIndex];
  const currentSlide = currentCategory.slides[currentSlideIndex];
  const t = UI_STRINGS[lang];

  const handleNext = () => {
    if (currentSlideIndex < currentCategory.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else if (currentCategoryIndex < TUTORIAL_CATEGORIES.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentSlideIndex(0);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    } else if (currentCategoryIndex > 0) {
      const prevCategory = TUTORIAL_CATEGORIES[currentCategoryIndex - 1];
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      setCurrentSlideIndex(prevCategory.slides.length - 1);
    }
  };

  const handleClose = () => {
    window.parent.postMessage({ type: 'TUTORIAL_CLOSE', completed: true }, '*');
    // For local preview feedback
    console.log('PostMessage sent: TUTORIAL_CLOSE');
  };

  const setCategory = (index: number) => {
    setCurrentCategoryIndex(index);
    setCurrentSlideIndex(0);
  };

  const progress = useMemo(() => {
    const totalSlides = TUTORIAL_CATEGORIES.reduce((acc, cat) => acc + cat.slides.length, 0);
    let passedSlides = 0;
    for (let i = 0; i < currentCategoryIndex; i++) {
      passedSlides += TUTORIAL_CATEGORIES[i].slides.length;
    }
    passedSlides += currentSlideIndex + 1;
    return (passedSlides / totalSlides) * 100;
  }, [currentCategoryIndex, currentSlideIndex]);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-black/30 backdrop-blur-md font-sans">
      {/* Header */}
      <header className="px-4 py-2 bg-black/20 border-b border-white/10 flex flex-col gap-2 relative z-20">
        <div className="flex items-center justify-between">
          <h1 className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-black">
            Tutorial
          </h1>
          <button 
            onClick={handleClose}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors text-neutral-400 hover:text-white"
            title={t.close}
          >
            <X size={14} />
          </button>
        </div>

        <nav className="grid grid-cols-4 gap-1 w-full">
          {TUTORIAL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => setCategory(idx)}
              className={`relative flex flex-col items-center justify-center py-1 px-1 rounded-lg border transition-all duration-300 group min-h-[40px] ${
                idx === currentCategoryIndex 
                  ? 'bg-neutral-800 border-white/30 shadow-xl scale-105 z-10' 
                  : 'bg-black/10 border-white/5 hover:border-white/20'
              }`}
            >
              <span className={`text-[9px] sm:text-[10px] leading-tight uppercase tracking-tight font-black text-center px-0.5 max-w-full break-words ${
                idx === currentCategoryIndex ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'
              }`}>
                {cat.title}
              </span>
              
              {idx === currentCategoryIndex && (
                <motion.div 
                  layoutId="activeCategory"
                  className="absolute -bottom-0.5 w-1/4 h-0.5 bg-blue-500 rounded-full"
                />
              )}
            </button>
          ))}
        </nav>
      </header>

      {/* Progress Bar */}
      <div className="h-0.5 bg-white/5 overflow-hidden relative z-20">
        <motion.div 
          className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 relative flex items-center justify-center bg-transparent overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentCategory.id}-${currentSlide.id}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute inset-0 flex flex-col p-2"
          >
            <div className="flex-1 flex items-center justify-center relative overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center bg-black/10 rounded-xl">
                <img 
                  src={currentSlide.imageUrl} 
                  alt={currentSlide.title}
                  className="max-w-full max-h-full object-contain shadow-2xl rounded-lg pointer-events-none select-none transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                     (e.target as HTMLImageElement).src = 'https://placehold.co/1200x800/171717/FFFFFF?text=' + encodeURIComponent(currentSlide.title);
                  }}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
 
        {/* Floating Nav Arrows */}
        <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
          <button 
            onClick={handlePrev}
            className={`pointer-events-auto p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur border border-white/10 text-white transition-all ${currentCategoryIndex === 0 && currentSlideIndex === 0 ? 'opacity-0' : 'opacity-100'}`}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={handleNext}
            className="pointer-events-auto p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur border border-white/10 text-white transition-all opacity-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-2 bg-black/20 border-t border-white/10 relative z-20">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentCategoryIndex === 0 && currentSlideIndex === 0}
            className="text-[11px] font-black uppercase tracking-widest text-neutral-500 hover:text-neutral-200 disabled:opacity-0 transition-colors"
          >
            {t.prev}
          </button>

          <div className="flex flex-col items-center gap-1 scale-90">
            <span className="text-[10px] uppercase tracking-widest font-black text-neutral-500">
              {currentCategory.title}: {currentSlideIndex + 1}/{currentCategory.slides.length}
            </span>
            <div className="flex gap-1">
              {currentCategory.slides.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-0.5 transition-all duration-300 rounded-full ${
                    idx === currentSlideIndex ? 'w-3 bg-blue-500' : 'w-1 bg-neutral-800'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleClose}
              className="text-[11px] font-black uppercase tracking-widest text-neutral-500 hover:text-neutral-200 transition-colors"
            >
              {t.skip}
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20"
            >
              {currentCategoryIndex === TUTORIAL_CATEGORIES.length - 1 && currentSlideIndex === currentCategory.slides.length - 1 
                ? t.finish 
                : t.next}
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
