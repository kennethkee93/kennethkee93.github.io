
import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Smartphone, 
  BatteryCharging,
  CreditCard,
  Navigation,
  ChevronRight,
  ArrowRight,
  Menu,
  X,
  Globe,
  Bell,
  Clock,
  History,
  LayoutDashboard,
  Filter,
  Search,
  CheckCircle2
} from 'lucide-react';
import { InstallPwa } from './components/InstallPwa';
import { FeatureCard } from './components/FeatureCard';

const APP_URL = "https://ev-charger-reservation-v3-antigravi.vercel.app/";

// Mini-screen components for the rotating mockup
const DashboardScreen = () => (
  <div className="h-full bg-black text-white p-5 pt-12 flex flex-col gap-6 animate-in fade-in duration-500">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-black tracking-tight">Dashboard</h2>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Welcome back, Kenneth</p>
      </div>
      <div className="flex items-center gap-2 p-1.5 bg-[#121212] border border-[#1e1e1e] rounded-full">
         <Bell size={14} />
         <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10">
           <img src="https://i.pravatar.cc/50?u=ev1" alt="avatar" />
         </div>
      </div>
    </div>
    <div className="bg-[#121212] border border-[#1e1e1e] rounded-[24px] p-5 space-y-4">
      <div className="flex justify-between items-center">
         <div className="w-8 h-8 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
            <Calendar size={16} />
         </div>
         <span className="text-[10px] font-bold text-teal-400 bg-teal-400/10 px-2 py-0.5 rounded-full uppercase tracking-widest">Up Next</span>
      </div>
      <div>
        <h4 className="font-bold text-lg tracking-tight">Tower D</h4>
        <p className="text-xs text-slate-500">Tomorrow, 09:00 AM</p>
      </div>
    </div>
    <div className="space-y-3">
       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Charger Status</h4>
       <div className="flex gap-3">
          <div className="flex-1 bg-[#121212] border border-[#1e1e1e] p-4 rounded-2xl">
            <div className="w-0.5 h-6 bg-teal-400 rounded-full mb-3"></div>
            <p className="text-[10px] font-bold">Tower A</p>
          </div>
          <div className="flex-1 bg-[#121212] border border-[#1e1e1e] p-4 rounded-2xl">
            <div className="w-0.5 h-6 bg-teal-400 rounded-full mb-3"></div>
            <p className="text-[10px] font-bold">Tower B</p>
          </div>
       </div>
    </div>
  </div>
);

const ScheduleScreen = () => (
  <div className="h-full bg-black text-white p-5 pt-12 flex flex-col gap-4 animate-in fade-in duration-500">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-black tracking-tight">Schedule</h2>
      <div className="flex gap-1">
        <div className="p-2 bg-[#121212] rounded-lg"><Filter size={14} /></div>
      </div>
    </div>
    <div className="bg-[#121212] rounded-xl p-2 flex text-[10px] font-bold uppercase tracking-widest">
       <div className="flex-1 text-center bg-[#1e1e1e] py-1.5 rounded-lg">Day</div>
       <div className="flex-1 text-center py-1.5 opacity-40">Week</div>
    </div>
    <div className="flex-1 grid grid-cols-4 gap-1 opacity-20">
       {[...Array(16)].map((_, i) => <div key={i} className="border border-white/5 rounded"></div>)}
    </div>
    {/* Visual Schedule Block */}
    <div className="absolute top-1/2 left-1/4 w-1/2 h-24 bg-teal-500/80 rounded-2xl p-3 border border-white/20">
       <p className="text-[8px] font-black uppercase">VLH8859</p>
       <p className="text-[10px] font-bold">9:00 AM - 5:00 PM</p>
    </div>
  </div>
);

const ActivityScreen = () => (
  <div className="h-full bg-black text-white p-5 pt-12 flex flex-col gap-6 animate-in fade-in duration-500">
    <h2 className="text-2xl font-black tracking-tight">My Activity</h2>
    <div className="space-y-3">
       <div className="bg-[#121212] border border-[#1e1e1e] rounded-[20px] p-4 border-l-4 border-l-red-500">
          <div className="flex justify-between items-start mb-2">
            <div className="font-bold text-sm tracking-tight">Tower D</div>
            <span className="text-[8px] font-black bg-white/5 px-2 py-1 rounded-full text-slate-400">UPCOMING</span>
          </div>
          <p className="text-[10px] text-slate-500">2/2/2026 • 09:00 AM</p>
       </div>
       <div className="bg-[#121212] border border-[#1e1e1e] rounded-[20px] p-4 border-l-4 border-l-teal-500">
          <div className="flex justify-between items-start mb-2">
            <div className="font-bold text-sm tracking-tight">Tower B</div>
            <span className="text-[8px] font-black bg-teal-500/10 px-2 py-1 rounded-full text-teal-400">UPCOMING</span>
          </div>
          <p className="text-[10px] text-slate-500">3/2/2026 • 09:00 AM</p>
       </div>
    </div>
  </div>
);

const PhoneMockup = () => {
  const [screen, setScreen] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setScreen((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto border-[#1a1a1a] bg-[#1a1a1a] border-[10px] rounded-[48px] h-[660px] w-[320px] shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] overflow-hidden scale-90 lg:scale-100">
      <div className="w-[110px] h-[24px] bg-[#1a1a1a] top-0 rounded-b-[1.2rem] left-1/2 -translate-x-1/2 absolute z-40"></div>
      
      <div className="h-full bg-black overflow-hidden relative">
        {screen === 0 && <DashboardScreen />}
        {screen === 1 && <ScheduleScreen />}
        {screen === 2 && <ActivityScreen />}

        {/* Dynamic Nav Indicator */}
        <div className="absolute bottom-8 left-6 right-6 h-14 bg-[#121212]/90 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-around px-4 z-50">
           <div className={`p-2.5 rounded-full transition-colors ${screen === 0 ? 'bg-teal-500 text-black' : 'text-slate-600'}`}><LayoutDashboard size={18} /></div>
           <div className={`p-2.5 rounded-full transition-colors ${screen === 1 ? 'bg-teal-500 text-black' : 'text-slate-600'}`}><Calendar size={18} /></div>
           <div className={`p-2.5 rounded-full transition-colors ${screen === 2 ? 'bg-teal-500 text-black' : 'text-slate-600'}`}><History size={18} /></div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-teal-500 selection:text-black antialiased overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'
      }`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-teal-400 p-2 rounded-xl shadow-[0_0_20px_rgba(45,212,191,0.3)]">
              <Zap className="text-black w-5 h-5" fill="currentColor" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-white">Emerald Hills</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-slate-400 hover:text-white transition-colors text-[10px] font-black tracking-[0.3em] uppercase">Architecture</a>
            <a href="#scheduling" className="text-slate-400 hover:text-white transition-colors text-[10px] font-black tracking-[0.3em] uppercase">Intelligence</a>
            <div className="flex items-center gap-4">
              <a href={APP_URL} className="text-xs font-black text-teal-400 hover:text-teal-300 uppercase tracking-widest px-4">Open Web</a>
              <InstallPwa className="!shadow-none" />
            </div>
          </div>
        </div>
      </nav>

      {/* Page 1: Hero & Architecture */}
      <section className="min-h-screen relative flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-teal-500/[0.04] rounded-full blur-[160px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-8 w-full z-10 flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-teal-400/10 border border-teal-400/20 text-teal-400 font-black text-[10px] mb-10 tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(45,212,191,0.5)]"></span>
              Emerald Hills Infrastructure
            </div>
            <h1 className="text-7xl lg:text-[110px] font-black text-white leading-[0.85] tracking-tighter mb-10">
              Power <br />
              <span className="text-teal-400/60">Delivered.</span>
            </h1>
            <p className="text-xl text-slate-500 mb-14 max-w-lg mx-auto lg:mx-0 leading-relaxed font-bold">
              Exclusive charging for the residents of Emerald Hills. Experience intelligence in every kilowatt.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <InstallPwa className="w-full sm:w-auto !py-5 !px-12 !text-sm !rounded-[24px]" />
              <a 
                href={APP_URL}
                className="w-full sm:w-auto flex items-center justify-center gap-3 text-white bg-[#121212] border border-[#1e1e1e] hover:bg-[#1a1a1a] px-12 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest transition-all"
              >
                Go to Dashboard <ArrowRight size={18} />
              </a>
            </div>
          </div>
          <div className="flex-1 relative">
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* Page 2: Intelligence (Scheduling & Activity) */}
      <section id="scheduling" className="min-h-screen bg-[#080808] flex items-center py-32">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="order-2 lg:order-1 relative">
               <div className="absolute -inset-20 bg-teal-500/10 blur-[100px] opacity-20 rounded-full"></div>
               {/* Visual Calendar Feature Card */}
               <div className="bg-[#121212] border border-[#1e1e1e] rounded-[32px] p-8 space-y-8 shadow-2xl relative z-10">
                  <div className="flex justify-between items-center">
                     <h3 className="text-2xl font-black text-white tracking-tight">Visual Schedule</h3>
                     <div className="bg-teal-500/10 text-teal-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Live Sync</div>
                  </div>
                  <div className="grid grid-cols-7 gap-3 opacity-30">
                     {[...Array(21)].map((_, i) => (
                       <div key={i} className={`h-24 rounded-xl border border-white/10 flex items-end p-2 ${i === 11 ? 'bg-teal-500/20 border-teal-500/40' : ''}`}>
                          <div className={`h-1 w-full rounded-full ${i === 11 ? 'bg-teal-400' : 'bg-white/10'}`}></div>
                       </div>
                     ))}
                  </div>
                  <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                     <div className="flex-1">
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Peak Utilization</p>
                        <p className="text-xl font-bold text-white tracking-tight">09:00 - 11:30</p>
                     </div>
                     <div className="w-12 h-12 bg-teal-500/10 text-teal-400 rounded-full flex items-center justify-center">
                        <CheckCircle2 size={24} />
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-12">
               <div>
                  <h2 className="text-5xl font-black text-white tracking-tighter mb-6">Visual Intelligence.</h2>
                  <p className="text-slate-500 text-lg font-bold leading-relaxed tracking-tight">
                    Plan your charging with visual precision. Our adaptive calendar view helps you avoid congestion and manage your time at the Emerald Hills charging hub.
                  </p>
               </div>
               
               <div className="space-y-8">
                  <div className="flex gap-6">
                     <div className="w-12 h-12 rounded-2xl bg-[#121212] border border-[#1e1e1e] flex items-center justify-center text-teal-400">
                        <Calendar size={20} />
                     </div>
                     <div>
                        <h4 className="font-bold text-white mb-1 tracking-tight">Precise Bookings</h4>
                        <p className="text-slate-500 text-sm font-medium">Select your favorite tower and hold your slot instantly.</p>
                     </div>
                  </div>
                  <div className="flex gap-6">
                     <div className="w-12 h-12 rounded-2xl bg-[#121212] border border-[#1e1e1e] flex items-center justify-center text-teal-400">
                        <History size={20} />
                     </div>
                     <div>
                        <h4 className="font-bold text-white mb-1 tracking-tight">Activity Stream</h4>
                        <p className="text-slate-500 text-sm font-medium">Full history of your sessions at Alam Damai - Cheras.</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Page 3: Infrastructure & CTA */}
      <section id="features" className="min-h-[80vh] flex flex-col justify-center py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 w-full z-10">
           <div className="text-center mb-20">
              <h2 className="text-5xl font-black text-white tracking-tighter mb-4">Tower Status</h2>
              <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Alam Damai - Cheras Station</p>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-32">
              <FeatureCard accentColor="#2dd4bf" title="Tower A" status="Available" description="Standard fast charge ready." />
              <FeatureCard accentColor="#2dd4bf" title="Tower B" status="Available" description="High-throughput charging bay." />
              <FeatureCard accentColor="#2dd4bf" title="Clubhouse" status="Available" description="Priority resident parking." />
              <FeatureCard accentColor="#ef4444" title="Tower D" status="Available" description="Rapid voltage station." />
           </div>

           <div className="bg-[#121212] border border-[#1e1e1e] rounded-[40px] p-12 lg:p-24 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-teal-500/[0.02] group-hover:bg-teal-500/[0.04] transition-colors"></div>
              <div className="relative z-10">
                 <h2 className="text-5xl md:text-7xl font-black text-white mb-12 tracking-tighter leading-none">
                    Start your <br/> session today.
                 </h2>
                 <div className="flex flex-col sm:flex-row justify-center gap-5">
                    <InstallPwa className="!py-6 !px-16 !text-[10px] !bg-white !text-black !rounded-full !font-black !uppercase !tracking-[0.2em]" />
                    <a href={APP_URL} className="px-16 py-6 rounded-full font-black text-white border border-white/10 hover:bg-white/5 transition-all uppercase tracking-widest text-[10px]">
                       Launch System
                    </a>
                 </div>
              </div>
           </div>
        </div>

        {/* Minimal Footer */}
        <footer className="mt-32 pt-20 border-t border-white/5">
           <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 pb-12">
              <div className="flex items-center gap-4">
                 <div className="p-1.5 bg-teal-500/10 rounded-lg">
                    <Zap size={14} className="text-teal-400" fill="currentColor" />
                 </div>
                 <span>© {new Date().getFullYear()} Emerald Hills EV</span>
              </div>
              <div className="flex gap-12">
                 <a href="#" className="hover:text-white transition-colors">Security</a>
                 <a href="#" className="hover:text-white transition-colors">Privacy</a>
              </div>
              <span className="opacity-40">Alam Damai - Cheras</span>
           </div>
        </footer>
      </section>
    </div>
  );
}

export default App;