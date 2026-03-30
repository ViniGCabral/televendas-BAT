import { useLanguage } from "../../context/LanguageContext";

export function PdvFmc() {
  const { t } = useLanguage();

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
        <div className="bg-white border border-surface-container-high rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden shadow-sm">
           <div className="flex justify-between items-start">
             <span className="text-base font-bold text-on-surface">{t('pdv_vg_pillar_eff')}</span>
             <span className="material-symbols-outlined text-green-500 text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
           </div>
           
           <div className="grid grid-cols-2 gap-2">
             <div>
                <p className="text-[9px] font-bold text-outline tracking-wider uppercase mb-1">{t('pdv_pillar_realized')}</p>
                <div className="text-3xl font-black text-on-surface font-headline leading-none">82%</div>
             </div>
             <div className="text-right">
                <p className="text-[9px] font-bold text-outline tracking-wider uppercase mb-1">{t('pdv_pillar_objective')}</p>
                <div className="flex items-center justify-end gap-1.5">
                   <span className="text-xs font-bold text-error leading-none">-18%</span>
                   <span className="text-2xl font-black text-on-surface font-headline leading-none">100%</span>
                </div>
             </div>
           </div>

           <div className="space-y-1.5 mt-2">
              <p className="text-xs font-black text-green-600 leading-none">82%</p>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full rounded-full" style={{ width: '82%' }}></div>
              </div>
           </div>
        </div>

        {/* Produtividade - Binary Layout (Sincronizado: X) */}
        <div className="bg-white border border-surface-container-high rounded-3xl p-6 flex flex-col gap-2 relative overflow-hidden shadow-sm items-center justify-center min-h-[160px]">
           <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
             <span className="text-base font-bold text-on-surface">{t('pdv_vg_pillar_prod')}</span>
             <span className="material-symbols-outlined text-error text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
           </div>
        </div>

        {/* Varejo Líquido - Binary Layout (Sincronizado: X) */}
        <div className="bg-white border border-surface-container-high rounded-3xl p-6 flex flex-col gap-2 relative overflow-hidden shadow-sm items-center justify-center min-h-[160px]">
           <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
             <span className="text-base font-bold text-on-surface">{t('pdv_vg_pillar_net')}</span>
             <span className="material-symbols-outlined text-error text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
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

      {/* Active Campaigns Section */}
      <div className="flex flex-col gap-6">
        <h3 className="text-sm font-bold text-outline tracking-widest uppercase">{t('pdv_fmc_campaigns_title')}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Campaign 1: Promoção */}
           <div className="bg-primary border border-primary-dark rounded-2xl overflow-hidden shadow-sm flex flex-col text-white relative">
              <div className="absolute right-0 top-0 opacity-10 mix-blend-overlay w-32 h-32 rotate-12 -mt-4 -mr-4">
                <span className="material-symbols-outlined text-[150px]">rocket_launch</span>
              </div>
              <div className="p-6 pb-8 flex-1 relative z-10">
                 <span className="text-[9px] font-bold tracking-widest uppercase text-white/70">{t('pdv_fmc_promo')}</span>
                 <h4 className="font-bold font-headline text-xl leading-tight mt-1">{t('pdv_fmc_campaign_1')}</h4>
              </div>
              <div className="bg-white p-5 flex flex-col gap-4 relative z-10">
                 <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant">
                   <span>{t('pdv_fmc_campaign_1_desc')}</span>
                 </div>
                 <button className="w-full py-2.5 border border-surface-container-highest rounded-xl text-primary font-bold text-sm hover:bg-surface-container-low transition-colors">
                   {t('pdv_fmc_view_details')}
                 </button>
              </div>
           </div>

           {/* Campaign 2: Incentivo */}
           <div className="bg-[#608b04] border border-[#486b02] rounded-2xl overflow-hidden shadow-sm flex flex-col text-white relative">
              <div className="absolute right-0 bottom-32 opacity-20 w-32 h-32 flex items-center justify-center -mr-16">
                <span className="material-symbols-outlined text-[120px]">stars</span>
              </div>
              <div className="p-6 pb-8 flex-1 relative z-10">
                 <span className="text-[9px] font-bold tracking-widest uppercase text-white/70">{t('pdv_fmc_incentive')}</span>
                 <h4 className="font-bold font-headline text-xl leading-tight mt-1">{t('pdv_fmc_campaign_2')}</h4>
              </div>
              <div className="bg-white p-5 flex flex-col gap-4 relative z-10">
                 <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant">
                   <span>{t('pdv_fmc_campaign_2_desc')}</span>
                 </div>
                 <button className="w-full py-2.5 border border-surface-container-highest rounded-xl text-primary font-bold text-sm hover:bg-surface-container-low transition-colors">
                   {t('pdv_fmc_view_details')}
                 </button>
              </div>
           </div>

           {/* Campaign 3: Vendas */}
           <div className="bg-orange-600 border border-orange-700 rounded-2xl overflow-hidden shadow-sm flex flex-col text-white relative">
              <div className="absolute right-0 bottom-32 opacity-20 w-32 h-32 flex items-center justify-center rotate-45 -mr-12 opacity-30">
                <span className="material-symbols-outlined text-[120px]">sell</span>
              </div>
              <div className="p-6 pb-8 flex-1 relative z-10">
                 <span className="text-[9px] font-bold tracking-widest uppercase text-white/70">{t('pdv_fmc_sales')}</span>
                 <h4 className="font-bold font-headline text-xl leading-tight mt-1">{t('pdv_fmc_campaign_3')}</h4>
              </div>
              <div className="bg-white p-5 flex flex-col gap-4 relative z-10">
                 <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant">
                   <span>{t('pdv_fmc_campaign_3_desc')}</span>
                 </div>
                 <button className="w-full py-2.5 border border-surface-container-highest rounded-xl text-primary font-bold text-sm hover:bg-surface-container-low transition-colors">
                   {t('pdv_fmc_view_details')}
                 </button>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
}
