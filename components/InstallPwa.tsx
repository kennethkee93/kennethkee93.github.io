
import React, { useEffect, useState } from 'react';
import { Download, Smartphone, Share, PlusSquare, X, Monitor, CheckCircle, ExternalLink, Apple } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const APP_URL = "https://ev-charger-reservation-v3-antigravi.vercel.app/";

export const InstallPwa: React.FC<{ className?: string }> = ({ className }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check if app is already installed
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(isStandaloneMode);

    // Platform detection
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
    setIsAndroid(/android/.test(userAgent));

    // Listen for the install prompt on Chrome/Android/Edge
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
      // Direct trigger for Android, Chrome (PC/Mac/Linux), Edge
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        setDeferredPrompt(null);
      });
    } else if (isIOS) {
      // iOS doesn't support the programmatic prompt, show instructions
      setShowIOSInstructions(true);
    } else if (isStandalone) {
      // Already installed, just go to the app
      window.open(APP_URL, '_blank');
    } else {
      // If we are here, the browser doesn't support the prompt or it hasn't fired yet
      // On some browsers (like Chrome on PC), we can sometimes show a custom modal 
      // instead of just redirecting, but usually a redirect to the PWA-enabled app 
      // is the best fallback if we want them to install the CORE app.

      // However, the user asked to FIX the button opening the app directly.
      // So I will change this to show a "Browser not supported" or "Manual Install" hint
      // if the native prompt is missing.
      alert("Native install prompt is not available in this browser. Please use your browser's 'Add to Home Screen' or 'Install' menu option manually.");
    }
  };

  if (!isMounted) return null;

  if (isStandalone) {
    return (
      <button
        onClick={() => window.open(APP_URL, '_blank')}
        className={`flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-6 py-3 rounded-full font-black border border-emerald-500/20 hover:bg-emerald-500/20 transition-all ${className}`}
      >
        <CheckCircle size={18} />
        <span className="uppercase tracking-widest text-[10px]">Open App</span>
      </button>
    );
  }

  return (
    <>
      <button
        onClick={handleInstallClick}
        className={`flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 group ${className}`}
      >
        <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
        <span className="uppercase tracking-[0.2em] text-[10px]">Install App</span>
      </button>

      {/* iOS Instructions Modal */}
      {showIOSInstructions && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setShowIOSInstructions(false)}></div>

          <div className="bg-zinc-900 border border-white/10 rounded-[3rem] max-w-sm w-full p-10 shadow-3xl relative z-[1001] animate-in fade-in zoom-in duration-500 ring-1 ring-white/5">
            <button
              onClick={() => setShowIOSInstructions(false)}
              className="absolute top-8 right-8 p-3 hover:bg-white/5 rounded-full transition-colors text-zinc-500"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-inner shadow-emerald-500/5">
                <Apple size={40} />
              </div>
              <h3 className="text-3xl font-black text-white tracking-tighter">Install for iOS</h3>
              <p className="text-zinc-500 text-sm mt-3 font-medium">Add Emerald Hills EV to your home screen.</p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-white/5 p-3 rounded-2xl border border-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Share className="text-blue-500" size={24} />
                </div>
                <div>
                  <p className="font-black text-white text-sm uppercase tracking-widest">1. Tap Share</p>
                  <p className="text-[11px] text-zinc-500 font-bold uppercase mt-0.5 tracking-wider">Safari Menu</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-white/5 p-3 rounded-2xl border border-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <PlusSquare className="text-zinc-400" size={24} />
                </div>
                <div>
                  <p className="font-black text-white text-sm uppercase tracking-widest leading-none">2. Add to <br /> Home Screen</p>
                  <p className="text-[11px] text-zinc-500 font-bold uppercase mt-1 tracking-wider">In the Share List</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                  <CheckCircle className="text-emerald-500" size={24} />
                </div>
                <div>
                  <p className="font-black text-white text-sm uppercase tracking-widest">3. Confirm</p>
                  <p className="text-[11px] text-emerald-500 font-bold uppercase mt-0.5 tracking-wider">Tap 'Add'</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSInstructions(false)}
              className="mt-12 w-full py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl hover:bg-zinc-200 active:scale-95 transition-all shadow-xl shadow-white/5"
            >
              Ready to Charge
            </button>
          </div>
        </div>
      )}
    </>
  );
};