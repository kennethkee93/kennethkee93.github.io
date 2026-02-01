
import React, { useEffect, useState } from 'react';
import { Download, Smartphone, Share, PlusSquare, X, Monitor, CheckCircle, ExternalLink, Apple, ArrowRight } from 'lucide-react';

const APP_URL = "https://ev-charger-reservation-v3-antigravi.vercel.app/";

export const InstallPwa: React.FC<{ className?: string }> = ({ className }) => {
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
  }, []);

  const handleInstallClick = () => {
    if (isIOS) {
      setShowIOSInstructions(true);
    } else {
      // For PC and Android, we take them to the app portal with an install flag.
      // This is because a browser cannot trigger an install for a different domain.
      window.location.href = `${APP_URL}?install=true`;
    }
  };

  if (!isMounted) return null;

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
              <p className="text-zinc-500 text-sm mt-3 font-medium">To install, we'll take you to the app portal.</p>
            </div>

            <div className="space-y-6 bg-zinc-800/50 p-6 rounded-3xl border border-white/5 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-emerald-500 text-black rounded-full flex items-center justify-center text-xs font-black">1</div>
                <p className="text-white text-xs font-bold">Tap "Continue to Portal"</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-zinc-700 text-zinc-400 rounded-full flex items-center justify-center text-xs font-black">2</div>
                <p className="text-zinc-400 text-xs font-bold">Tap <Share size={14} className="inline mx-1" /> Share in Safari</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-zinc-700 text-zinc-400 rounded-full flex items-center justify-center text-xs font-black">3</div>
                <p className="text-zinc-400 text-xs font-bold">Select "Add to Home Screen"</p>
              </div>
            </div>

            <button
              onClick={() => window.location.href = APP_URL}
              className="w-full py-6 bg-emerald-500 text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl hover:bg-emerald-400 active:scale-95 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3"
            >
              Continue to Portal <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};