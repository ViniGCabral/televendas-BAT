import { useState } from "react";

export function PdvParcerias() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-12">
      
      {/* SECTION: FULL WIDTH TOP BANNER */}
      <div className="bg-white border border-surface-container-high rounded-[32px] p-8 shadow-sm flex items-center gap-6 w-full">
         <div className="w-16 h-16 rounded-[20px] bg-[#b7ff42] flex items-center justify-center shrink-0 shadow-inner">
            <span className="material-symbols-outlined text-[#486b02] text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
         </div>
         <div className="flex flex-col flex-1">
            <span className="text-[10px] font-black text-outline tracking-[0.2em] uppercase mb-1">Status de Positivação</span>
            <div className="flex items-center gap-4">
               <h2 className="text-4xl font-black font-headline text-primary tracking-tight">Positivado</h2>
               <div className="flex items-center gap-1.5 text-xs font-black text-[#486b02] bg-[#b7ff42]/30 px-3 py-1 rounded-full">
                 <span className="material-symbols-outlined text-[16px] font-bold">trending_up</span>
                 +12%
               </div>
            </div>
         </div>
         <div className="hidden lg:flex flex-col text-right">
            <span className="text-[10px] font-black text-outline tracking-widest uppercase mb-1">Última Atualização</span>
            <span className="text-sm font-bold text-on-surface-variant">Hoje, 09:42</span>
         </div>
      </div>

      {/* SECTION: OPERATIONAL (BARS) */}
      <div className="flex flex-col gap-6">
          <div className="bg-white border border-surface-container-high rounded-[40px] p-16 shadow-sm flex flex-col items-center">
             <div className="text-center mb-16">
                <span className="text-base font-black text-on-surface-variant/30 tracking-[0.6em] uppercase">Parceiros Sugeridos</span>
             </div>

             <div className="w-full max-w-6xl flex flex-col gap-12">
                {[
                  { name: 'BAUDUCCO', current: 42, target: 98 },
                  { name: 'SEDA OCB', current: 15, target: 68 },
                  { name: 'ENGOV', current: 187, target: 303 },
                  { name: 'BIC DECOR', current: 0, target: 262 },
                ].map((partner, idx) => (
                  <div key={idx} className="flex items-center gap-16 group">
                    <span className="w-48 text-sm font-black text-on-surface-variant tracking-widest text-left uppercase leading-none">{partner.name}</span>
                    
                    <div className="flex-1 h-14 bg-[#f8f9fc] rounded-full relative shadow-inner flex items-center border border-surface-container-highest/50 p-1">
                       {partner.current > 0 && (
                          <div 
                             className="h-full bg-[#ff8a94] rounded-full flex items-center justify-center min-w-[120px] shadow-md transition-all duration-700 ease-out hover:brightness-105"
                             style={{ width: `${Math.max(15, (partner.current / partner.target) * 100)}%` }}
                          >
                             <span className="text-white text-sm font-black tracking-widest">R$ {partner.current}</span>
                          </div>
                       )}
                    </div>

                    <span className="w-40 text-lg font-black text-on-surface tracking-tight text-right leading-none">R$ {partner.target}</span>
                  </div>
                ))}
             </div>
          </div>
      </div>

    </div>
  );
}
