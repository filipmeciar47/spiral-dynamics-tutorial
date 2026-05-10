import React from 'react';
import TutorialViewer from './components/TutorialViewer';

export default function App() {
  const handleClose = () => {
    window.parent.postMessage({ type: 'TUTORIAL_CLOSE' }, '*');
    console.log('PostMessage sent: TUTORIAL_CLOSE (from backdrop)');
  };

  return (
    <div className="w-full h-screen bg-transparent text-white overflow-hidden relative font-sans">
      {/* THE TUTORIAL MODAL BACKDROP */}
      <div 
        className="absolute inset-0 flex items-center justify-center p-2 md:p-4 z-50 cursor-pointer"
        onClick={handleClose}
      >
        {/* THE MODAL CONTENT */}
        <div 
          className="w-full h-full max-w-6xl max-h-[95vh] rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10 relative cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <TutorialViewer />
        </div>
      </div>
    </div>
  );
}
