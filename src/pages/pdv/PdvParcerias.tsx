import { useState } from "react";

export function PdvParcerias() {
  const [simulatorValue, setSimulatorValue] = useState(44);

  // Simple simulator logic match print: 0% = 0, 100% = 14
  const packagesGained = Math.floor((simulatorValue / 100) * 14);

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
         {/* Decorative element or secondary info can go here to fill horizontal space if needed */}
         <div className="hidden lg:flex flex-col text-right">
            <span className="text-[10px] font-black text-outline tracking-widest uppercase mb-1">Última Atualização</span>
            <span className="text-sm font-bold text-on-surface-variant">Hoje, 09:42</span>
         </div>
      </div>

      {/* SECTION: STRATEGIC DASHBOARDS - UNIFIED SIZE GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 min-h-[420px]">
        
        {/* COLUNA ESQUERDA: CONECTA PRIME & REWARD */}
        <div className="flex flex-col gap-6 h-full">
           {/* Conecta Prime Card */}
           <div className="bg-[#2d1b94] border border-[#3d2ba4] rounded-[32px] p-8 shadow-lg text-white flex flex-col gap-6 relative overflow-hidden flex-1">
              <div className="flex justify-between items-start">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                       <span className="material-symbols-outlined text-white text-2xl">hub</span>
                    </div>
                    <div>
                       <h3 className="text-xl font-black font-headline">Conecta Prime</h3>
                       <span className="text-[8px] font-bold text-white/50 tracking-[0.2em] uppercase">Aceleração Ativa</span>
                    </div>
                 </div>
                 <div className="bg-white/10 border border-white/10 rounded-xl px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-white/20 transition-colors">
                    <span className="text-xs font-bold">Abril / 25</span>
                    <span className="material-symbols-outlined text-xs">expand_more</span>
                 </div>
              </div>

              <div className="flex flex-col gap-1">
                 <h4 className="text-lg font-black font-headline">Cliente Prime ganha mais!</h4>
                 <p className="text-sm text-white/70">Este varejo já comprou <span className="text-[#3edfff] font-black">78 pacotes</span></p>
              </div>

              <div className="flex flex-col gap-2">
                 <div className="w-full bg-white/10 h-6 rounded-full relative overflow-hidden p-1 border border-white/5">
                    <div className="h-full bg-gradient-to-r from-[#00f2fe] to-[#3edfff] rounded-full flex items-center justify-center transition-all duration-700" 
                         style={{ width: '44%' }}>
                       <span className="text-[10px] font-black text-indigo-900">44%</span>
                    </div>
                 </div>
                 <div className="flex justify-end gap-6 text-[8px] font-black text-white/40 tracking-widest uppercase pr-2">
                    <span>176 UN</span>
                    <span>229 UN</span>
                 </div>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col gap-6 mt-auto">
                 <div className="flex justify-between items-end">
                    <span className="text-[9px] font-black text-white/50 tracking-widest uppercase">GANHEI!</span>
                    <div className="flex gap-8 text-lg font-black font-headline pr-2">
                       <span className={packagesGained > 0 ? "text-[#3edfff]" : "text-white/20"}>{packagesGained}</span>
                       <span className="text-white/20">14</span>
                    </div>
                 </div>
                 <div className="relative flex items-center">
                    <input 
                        type="range" min="0" max="100" value={simulatorValue}
                        onChange={(e) => setSimulatorValue(parseInt(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#3edfff]"
                    />
                 </div>
                 <div className="flex justify-between items-center text-[9px] font-bold italic text-white/50 uppercase tracking-widest">
                    <span>Simule Agora!</span>
                    <span>Ao atingir {simulatorValue}% ganhe {packagesGained} pacote</span>
                 </div>
              </div>
           </div>

           {/* Global Reward Badge */}
           <div className="bg-gradient-to-r from-[#442ba0] to-[#5a3cd1] rounded-3xl p-6 shadow-lg text-white flex items-center justify-between border border-white/5 h-[110px]">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-2xl">card_giftcard</span>
                 </div>
                 <div>
                    <p className="text-[10px] font-medium text-white/80 max-w-[140px] leading-tight">
                        Ganhos acumulados desde <span className="text-white font-black">MARÇO / 25</span>
                    </p>
                 </div>
              </div>
              <div className="text-right">
                 <span className="text-2xl font-black font-headline text-[#fff64d] block">R$ 1.050,00</span>
                 <span className="text-[8px] font-black tracking-widest text-white/50 uppercase">Bonificação</span>
              </div>
           </div>
        </div>

        {/* COLUNA DIREITA: CONECTA VOCÊ & BOOST PLAN */}
        <div className="flex flex-col gap-6 h-full">
           {/* Conecta Você Card */}
           <div className="bg-[#1a5b22] border border-[#2a6b32] rounded-[32px] p-8 shadow-lg text-white flex flex-col gap-6 relative overflow-hidden flex-1">
              <div className="flex justify-between items-start">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                       <span className="material-symbols-outlined text-white text-2xl">groups</span>
                    </div>
                    <div>
                       <h3 className="text-xl font-black font-headline">Conecta Você</h3>
                       <span className="text-[8px] font-bold text-white/50 tracking-[0.2em] uppercase">Meta de Unidade</span>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-1">
                 <h4 className="text-lg font-black font-headline leading-tight">Equipe unida ganha mais!</h4>
                 <p className="text-sm text-white/70">Unidade atingiu <span className="text-[#b7ff42] font-black">85% da meta</span></p>
              </div>

              <div className="w-full bg-white/10 h-6 rounded-full relative overflow-hidden p-1 border border-white/5 mt-4">
                 <div className="h-full bg-[#d0ff7a] rounded-full flex items-center justify-center transition-all duration-700" style={{ width: '85%' }}>
                    <span className="text-[10px] font-black text-[#1a5b22]">85%</span>
                 </div>
              </div>

              <div className="flex items-end justify-between mt-auto">
                 <button className="bg-[#d0ff7a] text-[#1a5b22] px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-md">
                    STAFF
                 </button>
                 <div className="text-right">
                    <div className="text-[9px] font-black text-white/30 tracking-widest uppercase mb-1">Prêmio Final</div>
                    <span className="text-3xl font-black font-headline text-[#d0ff7a]">R$ 300,00</span>
                 </div>
              </div>
           </div>

           {/* Boost Plan */}
           <div className="bg-[#3b9ff5] border border-blue-400 rounded-3xl p-6 shadow-sm flex items-center gap-6 text-white overflow-hidden relative h-[110px]">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                 <span className="material-symbols-outlined text-white text-2xl">rocket_launch</span>
              </div>
              <div className="flex flex-col flex-1">
                 <div className="flex justify-between items-baseline mb-1">
                    <h2 className="text-lg font-black font-headline">Boost Plan</h2>
                    <span className="bg-white text-[#3b9ff5] text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest">ATIVO</span>
                 </div>
                 <p className="text-[10px] font-medium text-white/80 line-clamp-1">Programa exclusivo para metas trimestrais.</p>
                 <span className="text-[9px] font-bold text-white/60 italic mt-1">12 dias restantes</span>
              </div>
           </div>
        </div>

      </div>

      {/* SECTION: OPERATIONAL (TABLE & RECOMMENDATIONS) */}
      <div className="flex flex-col gap-6">
         
         <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
            <h3 className="text-sm font-bold text-outline tracking-widest uppercase">Faturamento por Parceiro</h3>
         </div>

         <div className="bg-white border border-surface-container-high rounded-3xl p-8 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="border-b border-surface-container-highest text-[10px] text-outline tracking-widest uppercase font-bold bg-surface-container-lowest">
                        <th className="py-4 px-4 rounded-tl-xl">Parceiro</th>
                        <th className="py-4 px-4">Objetivo</th>
                        <th className="py-4 px-4">Realizado</th>
                        <th className="py-4 px-4">Diferença</th>
                        <th className="py-4 px-4 rounded-tr-xl">Status</th>
                     </tr>
                  </thead>
                  <tbody className="text-sm font-semibold">
                     <tr className="border-b border-surface-container-highest hover:bg-surface-container-lowest transition-colors">
                        <td className="py-5 px-4 text-on-surface">Bauducco</td>
                        <td className="py-5 px-4 text-on-surface-variant text-[12px]">R$ 1.500</td>
                        <td className="py-5 px-4 text-primary font-black text-[14px]">R$ 1.650</td>
                        <td className="py-5 px-4 text-green-600 text-[12px]">+ R$ 150</td>
                        <td className="py-5 px-4">
                           <span className="bg-[#b7ff42] text-[#486b02] text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">ON TRACK</span>
                        </td>
                     </tr>
                     <tr className="border-b border-surface-container-highest hover:bg-surface-container-lowest transition-colors">
                        <td className="py-5 px-4 text-on-surface">SEDA OCB</td>
                        <td className="py-5 px-4 text-on-surface-variant text-[12px]">R$ 2.000</td>
                        <td className="py-5 px-4 text-primary font-black text-[14px]">R$ 1.800</td>
                        <td className="py-5 px-4 text-error text-[12px]">- R$ 200</td>
                        <td className="py-5 px-4">
                           <span className="bg-error-container text-error text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">BELOW</span>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>

         {/* Recommendations Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
               <div key={item} className="bg-white border border-surface-container-high rounded-3xl p-6 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface-container-highest rounded-2xl flex items-center justify-center shrink-0 p-2">
                     <div className="w-full h-full bg-slate-300/30 rounded-lg"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                     <h4 className="text-sm font-black font-headline text-primary truncate">Oportunidade {item}</h4>
                     <p className="text-[10px] text-outline truncate uppercase tracking-widest">Disponível</p>
                  </div>
                  <span className="material-symbols-outlined text-outline text-lg">chevron_right</span>
               </div>
            ))}
         </div>
      </div>

    </div>
  );
}
