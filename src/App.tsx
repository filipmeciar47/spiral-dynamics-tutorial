import React from 'react';
import TutorialViewer from './components/TutorialViewer';

export default function App() {
  const handleClose = () => {
    window.parent.postMessage({ type: 'TUTORIAL_CLOSE' }, '*');
  };

  return (
    <div className="w-full h-screen bg-transparent text-white overflow-hidden relative font-sans">
      <div
        className="absolute inset-0 flex items-center justify-center p-4 z-50 cursor-pointer"
        onClick={handleClose}
      >
        <div
          className="w-full max-w-[700px] rounded-2xl overflow-hidden cursor-default"
          style={{
            maxHeight: '82vh',
            boxShadow: '0 32px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.06)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <TutorialViewer />
        </div>
      </div>
    </div>
  );
}
