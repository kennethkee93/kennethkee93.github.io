
import React from 'react';

interface FeatureCardProps {
  accentColor: string;
  title: string;
  status: string;
  description: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  accentColor,
  title,
  status,
  description,
  className = ""
}) => {
  return (
    <div className={`bg-zinc-900/50 border border-zinc-800 p-6 rounded-[24px] transition-all duration-500 hover:border-emerald-500/50 hover:bg-zinc-900 group ${className}`}>
      <div className="flex justify-between items-start mb-8">
        <div className={`w-1 h-8 rounded-full`} style={{ backgroundColor: accentColor }}></div>
        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] group-hover:scale-125 transition-transform"></div>
      </div>

      <div className="space-y-1 mb-6">
        <h3 className="text-xl font-black text-white tracking-tight">{title}</h3>
        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">{status}</p>
      </div>

      <p className="text-sm text-zinc-500 font-bold leading-relaxed">
        {description}
      </p>
    </div>
  );
};
