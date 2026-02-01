
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
  CheckCircle2,
  Lock,
  Cpu
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
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Welcome back, Resident</p>
      </div>
      <div className="flex items-center gap-2 p-1.5 bg-zinc-900 border border-zinc-800 rounded-full">
        <Bell size={14} className="text-zinc-400" />
        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20">
          <Zap size={12} className="text-emerald-500" />
        </div>
      </div>
    </div>
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-[24px] p-5 space-y-4">
      <div className="flex justify-between items-center">
        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
          <Calendar size={16} />
        </div>
        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full uppercase tracking-widest">Confirmed</span>
      </div>
      <div>
        <h4 className="font-bold text-lg tracking-tight">Tower D - Bay 12</h4>
        <p className="text-xs text-zinc-500">Today, 09:00 PM</p>
      </div>
    </div>
    <div className="space-y-3">
      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Live Availability</h4>
      <div className="flex gap-3">
        <div className="flex-1 bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl">
          <div className="w-1 h-4 bg-emerald-400 rounded-full mb-3"></div>
          <p className="text-[10px] font-bold">Tower A</p>
          <p className="text-[8px] text-emerald-400 mt-1">Ready</p>
        </div>
        <div className="flex-1 bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl">
          <div className="w-1 h-4 bg-emerald-400 rounded-full mb-3"></div>
          <p className="text-[10px] font-bold">Tower B</p>
          <p className="text-[8px] text-emerald-400 mt-1">Ready</p>
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
        <div className="p-2 bg-zinc-900 rounded-lg"><Filter size={14} /></div>
      </div>
    </div>
    <div className="bg-zinc-900 rounded-xl p-1 flex text-[10px] font-bold uppercase tracking-widest">
      <div className="flex-1 text-center bg-zinc-800 py-1.5 rounded-lg">Day</div>
      <div className="flex-1 text-center py-1.5 opacity-40">Week</div>
    </div>
    <div className="flex-1 grid grid-cols-4 gap-2 py-4">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="border border-zinc-900 bg-zinc-900/30 rounded-lg flex items-center justify-center">
          <div className={`w-1 h-1 rounded-full ${i % 3 === 0 ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-800'}`}></div>
        </div>
      ))}
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 bg-emerald-500 border border-emerald-400/30 p-4 rounded-2xl shadow-2xl shadow-emerald-500/20">
      <p className="text-[8px] font-black uppercase text-emerald-950">Reserved</p>
      <p className="text-sm font-black text-white">9:00 PM - 11:00 PM</p>
      <p className="text-[9px] font-bold text-emerald-100 mt-1 uppercase tracking-widest">Tower D</p>
    </div>
  </div>
);

const ActivityScreen = () => (
  <div className="h-full bg-black text-white p-5 pt-12 flex flex-col gap-6 animate-in fade-in duration-500">
    <h2 className="text-2xl font-black tracking-tight">Activity</h2>
    <div className="space-y-3">
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-[20px] p-4 border-l-2 border-emerald-500">
        <div className="flex justify-between items-start mb-1">
          <div className="font-bold text-sm tracking-tight text-white">Session Complete</div>
          <span className="text-[8px] font-black bg-emerald-500/10 px-2 py-0.5 rounded-full text-emerald-400">12.4 kWh</span>
        </div>
        <p className="text-[10px] text-zinc-500">Yesterday • Tower B</p>
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-[20px] p-4 border-l-2 border-zinc-700">
        <div className="flex justify-between items-start mb-1">
          <div className="font-bold text-sm tracking-tight text-zinc-300">Rescheduled</div>
          <span className="text-[8px] font-black bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-500">SYSTEM</span>
        </div>
        <p className="text-[10px] text-zinc-500">2 days ago • Tower A</p>
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
    <div className="relative mx-auto border-zinc-800 bg-zinc-900 border-[10px] rounded-[48px] h-[660px] w-[320px] shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] overflow-hidden scale-90 lg:scale-100 ring-1 ring-white/5">
      <div className="w-[110px] h-[24px] bg-zinc-900 top-0 rounded-b-[1.2rem] left-1/2 -translate-x-1/2 absolute z-40"></div>

      <div className="h-full bg-black overflow-hidden relative">
        {screen === 0 && <DashboardScreen />}
        {screen === 1 && <ScheduleScreen />}
        {screen === 2 && <ActivityScreen />}

        {/* Dynamic Nav Indicator */}
        <div className="absolute bottom-8 left-6 right-6 h-14 bg-zinc-900/90 backdrop-blur-xl border border-white/5 rounded-full flex items-center justify-around px-4 z-50">
          <div className={`p-2.5 rounded-full transition-all duration-300 ${screen === 0 ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-zinc-600 hover:text-zinc-400'}`}><LayoutDashboard size={18} /></div>
          <div className={`p-2.5 rounded-full transition-all duration-300 ${screen === 1 ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-zinc-600 hover:text-zinc-400'}`}><Calendar size={18} /></div>
          <div className={`p-2.5 rounded-full transition-all duration-300 ${screen === 2 ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-zinc-600 hover:text-zinc-400'}`}><History size={18} /></div>
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
    <div className="min-h-screen bg-black font-sans selection:bg-emerald-500 selection:text-black antialiased overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'
        }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Zap className="text-black w-5 h-5" fill="currentColor" />
            </div>
            <span className="font-black text-xl md:text-2xl tracking-tighter text-white">Emerald Hills EV</span>
          </div>

          <div className="flex items-center gap-6 md:gap-10">
            <a href="#features" className="hidden lg:block text-zinc-500 hover:text-emerald-400 transition-colors text-[10px] font-black tracking-[0.3em] uppercase">Intelligence</a>
            <div className="flex items-center gap-4">
              <a href={APP_URL} className="hidden sm:block text-xs font-black text-emerald-400 hover:text-emerald-300 uppercase tracking-widest px-4">Open Web</a>
              <InstallPwa className="!shadow-none" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center pt-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8 w-full z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left pt-12 lg:pt-0">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-black text-[10px] mb-8 tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
              Resident Exclusive Access
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black text-white leading-[0.9] tracking-tighter mb-8">
              Smart <br />
              <span className="text-emerald-500">Charging.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-500 mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed font-bold">
              Effortless reservation for Emerald Hills residents. Track availability, schedule charging, and manage your EV experience in real-time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
              <InstallPwa className="w-full sm:w-auto !py-5 !px-12 !text-[12px] !rounded-2xl" />
              <a
                href={APP_URL}
                className="group w-full sm:w-auto flex items-center justify-center gap-3 text-zinc-300 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:text-white px-12 py-5 rounded-2xl font-black text-[12px] uppercase tracking-widest transition-all"
              >
                Go to App <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          <div className="flex-1 relative pb-20 lg:pb-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-32 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">Designed for Seamless Power.</h2>
            <p className="text-zinc-500 text-lg font-bold leading-relaxed">
              We built the Emerald Hills charging hub to be intelligent and fair. Our reservation system ensures every resident has access to power when they need it most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FeatureCard
              accentColor="#10b981"
              title="Real-time Tracking"
              status="Live"
              description="Monitor exact bay availability across Tower A, B, and the Clubhouse instantly."
            />
            <FeatureCard
              accentColor="#10b981"
              title="Secure Scheduling"
              status="Active"
              description="Advanced booking logic prevents congestion and ensures your slot is guaranteed."
            />
            <FeatureCard
              accentColor="#10b981"
              title="Visual Calendar"
              status="Pro"
              description="A beautiful, interactive calendar view to plan your morning or evening charging cycles."
            />
            <FeatureCard
              accentColor="#10b981"
              title="Resident Identity"
              status="Secure"
              description="Authenticated access tied to your unit ensures the hub remains exclusive to residents."
            />
          </div>
        </div>
      </section>

      {/* Technical Excellence */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-12">
            <div className="space-y-4">
              <div className="bg-emerald-500/10 text-emerald-400 w-fit px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">PWA Architecture</div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Performance First.</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-3xl group hover:border-emerald-500/30 transition-colors">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Lock size={24} />
                </div>
                <h4 className="text-xl font-bold text-white mb-2 tracking-tight">Enterprise Security</h4>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">Secured with unit verification and encrypted scheduling logs.</p>
              </div>
              <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-3xl group hover:border-emerald-500/30 transition-colors">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Cpu size={24} />
                </div>
                <h4 className="text-xl font-bold text-white mb-2 tracking-tight">Visual UI</h4>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">Built with high-performance React and optimized state management.</p>
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] rounded-full"></div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-[40px] p-8 md:p-12 relative z-10">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-white tracking-tight">System Status</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                  <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Operational</span>
                </div>
              </div>
              <div className="space-y-6">
                {[
                  { label: 'Cloud Sync', status: '99.9%' },
                  { label: 'Booking Logic', status: 'Optimized' },
                  { label: 'User Verification', status: 'Secure' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-zinc-800/50">
                    <span className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">{item.label}</span>
                    <span className="text-white font-black text-sm">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-emerald-600 rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-300/10 blur-[100px] rounded-full"></div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-[1.1]">
                Ready to charge your life?
              </h2>
              <p className="text-emerald-100/70 text-lg md:text-xl font-bold mb-14">
                Join the exclusive circle of Emerald Hills residents using the smart charging hub today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-5">
                <InstallPwa className="!py-6 !px-16 !text-[12px] !bg-white !shadow-2xl !shadow-emerald-950/20" />
                <a href={APP_URL} className="group px-16 py-6 rounded-2xl font-black text-white border border-white/20 hover:bg-white/10 transition-all uppercase tracking-widest text-[12px] flex items-center justify-center gap-2">
                  Launch Dashboard <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/10 p-2 rounded-lg">
              <Zap size={16} className="text-emerald-500" />
            </div>
            <span className="text-white font-black uppercase tracking-[0.2em] text-sm">Emerald Hills EV</span>
          </div>

          <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Security</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Contact</a>
          </div>

          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
            © {new Date().getFullYear()} • Alam Damai - Cheras
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;