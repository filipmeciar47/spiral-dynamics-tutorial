import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { TUTORIAL_CATEGORIES, UI_STRINGS } from '../constants';

export default function TutorialViewer() {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [lang, setLang] = useState<'sk' | 'en' | 'de'>('sk');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const l = params.get('lang') as any;
    if (l && ['sk', 'en', 'de'].includes(l)) setLang(l);
  }, []);

  const currentCategory = TUTORIAL_CATEGORIES[currentCategoryIndex];
  const currentSlide = currentCategory.slides[currentSlideIndex];
  const t = UI_STRINGS[lang];

  const isFirst = currentCategoryIndex === 0 && currentSlideIndex === 0;
  const isLast =
    currentCategoryIndex === TUTORIAL_CATEGORIES.length - 1 &&
    currentSlideIndex === currentCategory.slides.length - 1;

  const handleNext = () => {
    if (currentSlideIndex < currentCategory.slides.length - 1) {
      setCurrentSlideIndex((s) => s + 1);
    } else if (currentCategoryIndex < TUTORIAL_CATEGORIES.length - 1) {
      setCurrentCategoryIndex((i) => i + 1);
      setCurrentSlideIndex(0);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((s) => s - 1);
    } else if (currentCategoryIndex > 0) {
      const prev = TUTORIAL_CATEGORIES[currentCategoryIndex - 1];
      setCurrentCategoryIndex((i) => i - 1);
      setCurrentSlideIndex(prev.slides.length - 1);
    }
  };

  const handleClose = () => {
    window.parent.postMessage({ type: 'TUTORIAL_CLOSE', completed: true }, '*');
  };

  const setCategory = (index: number) => {
    setCurrentCategoryIndex(index);
    setCurrentSlideIndex(0);
  };

  const progress = useMemo(() => {
    const total = TUTORIAL_CATEGORIES.reduce((acc, cat) => acc + cat.slides.length, 0);
    let passed = 0;
    for (let i = 0; i < currentCategoryIndex; i++) passed += TUTORIAL_CATEGORIES[i].slides.length;
    passed += currentSlideIndex + 1;
    return (passed / total) * 100;
  }, [currentCategoryIndex, currentSlideIndex]);

  return (
    <div
      className="flex flex-col w-full font-sans overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #090e1d 0%, #050810 100%)',
        height: '100%',
        minHeight: 0,
      }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between gap-2 px-3 py-2 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <nav className="flex items-center gap-1 flex-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {TUTORIAL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => setCategory(idx)}
              className="relative whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest transition-all duration-200 flex-shrink-0"
              style={
                idx === currentCategoryIndex
                  ? {
                      background: 'rgba(37,99,235,0.18)',
                      color: '#93c5fd',
                      border: '1px solid rgba(59,130,246,0.35)',
                    }
                  : {
                      color: 'rgba(255,255,255,0.35)',
                      border: '1px solid transparent',
                    }
              }
            >
              {cat.title}
            </button>
          ))}
        </nav>

        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1.5 rounded-full transition-all"
          style={{ color: 'rgba(255,255,255,0.3)', border: '1px solid transparent' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.85)';
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.07)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.3)';
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          }}
        >
          <X size={13} />
        </button>
      </header>

      {/* Progress bar */}
      <div className="h-px flex-shrink-0" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <motion.div
          className="h-full"
          style={{ background: 'rgba(59,130,246,0.5)' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Image */}
      <main className="relative flex-1 overflow-hidden" style={{ minHeight: 0 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentCategory.id}-${currentSlide.id}`}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src={currentSlide.imageUrl}
              alt=""
              className="w-full h-full object-contain select-none pointer-events-none"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://placehold.co/1200x800/090e1d/FFFFFF?text=' +
                  encodeURIComponent(currentSlide.title);
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
        {!isFirst && (
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full backdrop-blur-sm transition-all z-10"
            style={{
              background: 'rgba(0,0,0,0.45)',
              border: '1px solid rgba(255,255,255,0.09)',
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            <ChevronLeft size={16} />
          </button>
        )}
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full backdrop-blur-sm transition-all z-10"
          style={{
            background: 'rgba(0,0,0,0.45)',
            border: '1px solid rgba(255,255,255,0.09)',
            color: 'rgba(255,255,255,0.65)',
          }}
        >
          <ChevronRight size={16} />
        </button>
      </main>

      {/* Footer */}
      <footer
        className="flex items-center justify-between px-4 py-2 flex-shrink-0"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span
          className="text-[10px] uppercase tracking-widest font-medium tabular-nums"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          {currentSlideIndex + 1} / {currentCategory.slides.length}
        </span>

        <div className="flex items-center gap-1">
          {currentCategory.slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className="flex items-center justify-center"
              style={{ padding: '4px 2px' }}
            >
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: idx === currentSlideIndex ? 14 : 4,
                  height: 3,
                  background:
                    idx === currentSlideIndex
                      ? 'rgba(96,165,250,0.85)'
                      : 'rgba(255,255,255,0.15)',
                }}
              />
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="text-[10px] font-semibold uppercase tracking-widest transition-colors"
          style={{ color: 'rgba(96,165,250,0.8)' }}
        >
          {isLast ? t.finish : t.next} →
        </button>
      </footer>
    </div>
  );
}
