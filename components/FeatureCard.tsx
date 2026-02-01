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
    <div className={`bg-[#121212] border border-[#1e1e1e] p-5 rounded-[20px] transition-all duration-300 hover:border-emerald-500/30 ${className}`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`w-1 h-8 rounded-full`} style={{ backgroundColor: accentColor }}></div>
        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
      </div>
      
      <div className="space-y-1 mb-6">
        <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
        <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider">{status}</p>
      </div>
      
      <p className="text-sm text-slate-500 font-medium leading-tight">
        {description}
      </p>
    </div>
  );
};
