import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

export function PdvFmc() {
  const { t } = useLanguage();
  const [simulatorValue, setSimulatorValue] = useState(44);

  const packagesGained = Math.floor((simulatorValue / 100) * 14);

  const shareData = [
    { month: 'Jan', value: 78 },
    { month: 'Fev', value: 82 },
    { month: 'Mar', value: 75 },
    { month: 'Abr', value: 85 },
    { month: 'Mai', value: 80 },
    { month: 'Jun', value: 81 },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-12">
      
      {/* Top Metrics Row: Performance Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Efetividade - Progressive Layout */}
        <div className="bg-white border border-surface-container-highest rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden shadow-sm hover:border-primary/20 transition-all group">
           <div className="flex justify-between items-start">
             <span className="text-sm font-black text-on-surface uppercase tracking-tight">{t('pdv_vg_pillar_eff')}</span>
             <span className="material-symbols-outlined text-green-500 text-2xl font-bold group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
           </div>
           
           <div className="grid grid-cols-2 gap-1">
             <div>
                <p className="text-[8px] font-bold text-outline tracking-wider uppercase">{t('pdv_pillar_realized')}</p>
                <div className="text-2xl font-black text-on-surface font-headline leading-none">5.4</div>
             </div>
             <div className="text-right">
                <p className="text-[8px] font-bold text-outline tracking-wider uppercase">{t('pdv_pillar_objective')}</p>
                <div className="flex items-center justify-end gap-1">
                   <span className="text-[10px] font-bold text-error leading-none">-0.5</span>
                   <span className="text-xl font-black text-on-surface font-headline leading-none">5.9</span>
                </div>
             </div>
           </div>

           <div className="space-y-1">
              <p className="text-[10px] font-black text-green-600 leading-none">91%</p>
              <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full rounded-full" style={{ width: '91%' }}></div>
              </div>
           </div>
        </div>

        {/* Produtividade */}
        <div className="bg-white border border-surface-container-highest rounded-2xl p-5 flex flex-col items-center justify-center min-h-[120px] text-center shadow-sm hover:border-error/20 transition-all group">
           <div className="flex w-full justify-between items-center">
             <span className="text-sm font-black text-on-surface uppercase tracking-tight">{t('pdv_vg_pillar_prod')}</span>
             <span className="material-symbols-outlined text-error text-[28px] font-bold group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
           </div>
        </div>

        {/* Varejo Líquido */}
        <div className="bg-white border border-surface-container-highest rounded-2xl p-5 flex flex-col items-center justify-center min-h-[120px] text-center shadow-sm hover:border-error/20 transition-all group">
           <div className="flex w-full justify-between items-center">
             <span className="text-sm font-black text-on-surface uppercase tracking-tight">{t('pdv_vg_pillar_net')}</span>
             <span className="material-symbols-outlined text-error text-[28px] font-bold group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
           </div>
        </div>

      </div>

      {/* Mid Volume and Chart Row */}
      <div className="bg-white border border-surface-container-high rounded-2xl p-6 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10">
         
         {/* Volume do Mês */}
         <div className="lg:col-span-4 flex flex-col justify-between">
           <div className="flex items-center gap-2 mb-8 mt-2">
             <span className="bg-teal-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-widest">FMC</span>
             <h3 className="text-sm font-bold text-outline tracking-widest uppercase">{t('pdv_fmc_vol_month')}</h3>
           </div>
           
           <div className="flex flex-col gap-6 border-b border-surface-container-highest pb-6 mb-6">
             <div>
                <span className="text-[10px] font-bold text-outline tracking-widest uppercase">{t('pdv_fmc_realized')}</span>
                <div className="text-4xl font-black font-headline text-on-surface mt-1">82.4%</div>
             </div>
             
             <div className="flex justify-between items-end">
                <div>
                   <span className="text-[10px] font-bold text-outline tracking-wider uppercase mb-1">{t('pdv_fmc_difference')}</span>
                   <div className="text-2xl font-bold font-headline text-error flex items-center gap-1 mt-1">
                      -2.6%
                      <span className="material-symbols-outlined text-sm">trending_down</span>
                   </div>
                </div>
                <div>
                   <span className="text-[10px] font-bold text-outline tracking-wider uppercase mb-1">{t('pdv_fmc_objective')}</span>
                   <div className="text-2xl font-bold text-on-surface-variant mt-1">85.0%</div>
                </div>
             </div>
           </div>

           <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant">
             <span className="uppercase tracking-widest">{t('pdv_fmc_avg_semester')}</span>
             <span className="text-on-surface">85.0%</span>
           </div>
         </div>

         {/* Share Chart Area */}
         <div className="lg:col-span-8 flex flex-col h-full border-l border-surface-container-highest pl-10">
            <div className="flex justify-between items-center mb-10 w-full mt-2">
               <h3 className="text-sm font-bold text-outline tracking-widest uppercase">{t('pdv_fmc_share_title')}</h3>
               <span className="bg-surface-container-highest text-outline text-[9px] font-bold px-3 py-1 rounded-full tracking-widest uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  {t('pdv_fmc_real_time')}
               </span>
            </div>

            <div className="flex-1 flex items-end justify-between gap-4 h-[200px] pb-2">
               {shareData.map((d, index) => (
                 <div key={index} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group">
                   <div className="w-full bg-surface-container-highest rounded-t-lg relative overflow-hidden transition-all duration-500 hover:bg-primary/20" 
                        style={{ height: `${d.value}%` }}>
                     <div className="absolute inset-x-0 bottom-0 bg-primary opacity-80 group-hover:opacity-100 transition-opacity" style={{ height: '100%' }}></div>
                     <div className="absolute top-2 inset-x-0 text-center text-[10px] font-black text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        {d.value}%
                     </div>
                   </div>
                   <span className="text-[10px] font-bold text-outline uppercase tracking-wider">{d.month}</span>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* ACTIVE CAMPANHAS SECTION - REDIRECTED FROM PARCERIAS */}
      <div className="flex flex-col gap-6">
        <h3 className="text-sm font-bold text-outline tracking-widest uppercase">{t('pdv_fmc_campaigns_title')}</h3>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
           
           {/* Conecta Prime Card */}
           <div className="bg-[#2d1b94] border border-[#3d2ba4] rounded-[32px] p-8 shadow-lg text-white flex flex-col gap-6 relative overflow-hidden min-h-[380px]">
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
                 <div className="bg-white/10 border border-white/10 rounded-xl px-3 py-1.5 flex items-center gap-2">
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

           {/* Conecta Você Card */}
           <div className="bg-[#1a5b22] border border-[#2a6b32] rounded-[32px] p-8 shadow-lg text-white flex flex-col gap-6 relative overflow-hidden min-h-[380px]">
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

           {/* Rewards & Boost Row */}
           <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ganhos Acumulados */}
              <div className="bg-gradient-to-r from-[#442ba0] to-[#5a3cd1] rounded-3xl p-6 shadow-lg text-white flex items-center justify-between border border-white/5 min-h-[120px]">
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

              {/* Boost Plan */}
              <div className="bg-[#3b9ff5] border border-blue-400 rounded-3xl p-6 shadow-sm flex items-center gap-6 text-white overflow-hidden relative min-h-[120px]">
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
      </div>

    </div>
  );
}
