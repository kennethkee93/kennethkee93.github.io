
import React, { useEffect, useState } from 'react';
import { Download, Smartphone, Share, PlusSquare, X, Monitor, CheckCircle, ExternalLink } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const APP_URL = "https://ev-charger-reservation-v3-antigravi.vercel.app/";

export const InstallPwa: React.FC<{ className?: string }> = ({ className }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                             (window.navigator as any).standalone === true;
    setIsStandalone(isStandaloneMode);

    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Browser supports the install prompt (Android/Chrome/Edge)
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('App installation accepted');
        }
        setDeferredPrompt(null);
      });
    } else if (isIOS) {
      // iOS doesn't support the prompt, show manual instructions
      setShowIOSInstructions(true);
    } else {
      // If no prompt is available (e.g., if this landing page is on a different domain or already handled)
      // Redirect to the actual app URL to allow installation from there.
      window.location.href = APP_URL;
    }
  };

  if (!isMounted) return null;

  if (isStandalone) {
    return (
      <button 
        className={`flex items-center gap-2 bg-teal-500/10 text-teal-400 px-6 py-3 rounded-full font-semibold cursor-default border border-teal-500/20 ${className}`}
      >
        <CheckCircle size={18} />
        Installed
      </button>
    );
  }

  return (
    <>
      <button
        onClick={handleInstallClick}
        className={`flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-black px-6 py-3 rounded-full font-black transition-all shadow-lg shadow-teal-500/10 hover:scale-105 active:scale-95 uppercase tracking-widest text-[10px] ${className}`}
      >
        <Download size={18} />
        Install App
      </button>

      {/* iOS Instructions Modal */}
      {showIOSInstructions && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#121212] border border-white/10 rounded-[2.5rem] max-w-sm w-full p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setShowIOSInstructions(false)}
              className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-teal-500/10 text-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Smartphone size={32} />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tighter">Install on iOS</h3>
              <p className="text-slate-500 text-sm mt-2">Add Emerald Hills EV to your home screen.</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                  <Share className="text-blue-500" size={24} />
                </div>
                <div>
                  <p className="font-bold text-white">1. Tap Share</p>
                  <p className="text-xs text-slate-500">Found in your Safari browser menu.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                  <PlusSquare className="text-slate-400" size={24} />
                </div>
                <div>
                  <p className="font-bold text-white">2. Add to Home Screen</p>
                  <p className="text-xs text-slate-500">Scroll down and select this option.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-teal-500/10 p-3 rounded-2xl border border-teal-500/20">
                  <CheckCircle className="text-teal-500" size={24} />
                </div>
                <div>
                  <p className="font-bold text-white">3. Confirm</p>
                  <p className="text-xs text-slate-500">Tap 'Add' to finish installation.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSInstructions(false)}
              className="mt-8 w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-slate-200 transition-colors shadow-lg"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
};