import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from '../context/LanguageContext';

export function Dashboard() {
  const { t } = useLanguage();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [dateRange, setDateRange] = useState("this_week");
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-8 md:gap-10 min-h-full pb-16">
      {/* Header Interativo e Responsivo */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 bg-white dark:bg-slate-900 -mx-4 sm:-mx-8 md:-mx-10 -mt-6 p-6 sm:p-8 border-b border-slate-200 sticky top-0 z-30 shadow-sm transition-all">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-slate-800 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl sm:text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>space_dashboard</span>
          {t('dashboard_title')}
        </h1>
        
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3 w-full sm:w-auto">
          
          <div className="relative w-full xl:w-auto" ref={datePickerRef}>
            <button 
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="flex items-center justify-between gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-primary/30 transition-all hover:shadow-sm w-full xl:min-w-[220px]"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">calendar_today</span>
                <span>{dateRange === "this_week" ? t('filter_this_week') : dateRange === "this_month" ? t('filter_this_month') : dateRange === "last_30_days" ? t('filter_last_30_days') : dateRange}</span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-slate-400">expand_more</span>
            </button>

            {isDatePickerOpen && (
              <div className="absolute top-full left-0 xl:right-0 xl:left-auto mt-3 bg-white rounded-2xl shadow-2xl border border-slate-200 w-full sm:w-[340px] p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex flex-col gap-1 mb-4">
                  <button onClick={() => { setDateRange("this_week"); setIsDatePickerOpen(false); }} className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${dateRange === "this_week" ? 'bg-primary/10 text-primary' : 'hover:bg-slate-50 text-slate-600'}`}>
                     {t('filter_this_week')}
                     {dateRange === "this_week" && <span className="material-symbols-outlined text-[18px]">check</span>}
                  </button>
                  <button onClick={() => { setDateRange("this_month"); setIsDatePickerOpen(false); }} className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${dateRange === "this_month" ? 'bg-primary/10 text-primary' : 'hover:bg-slate-50 text-slate-600'}`}>
                     {t('filter_this_month')}
                     {dateRange === "this_month" && <span className="material-symbols-outlined text-[18px]">check</span>}
                  </button>
                  <button onClick={() => { setDateRange("last_30_days"); setIsDatePickerOpen(false); }} className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${dateRange === "last_30_days" ? 'bg-primary/10 text-primary' : 'hover:bg-slate-50 text-slate-600'}`}>
                     {t('filter_last_30_days')}
                     {dateRange === "last_30_days" && <span className="material-symbols-outlined text-[18px]">check</span>}
                  </button>
                </div>
                
                <div className="pt-4 border-t border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">event_note</span> {t('filter_custom_range')}
                  </div>
                  <div className="flex gap-2">
                    <input type="date" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer" />
                    <input type="date" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer" />
                  </div>
                  <button onClick={() => setIsDatePickerOpen(false)} className="w-full mt-4 bg-primary text-white font-bold py-3.5 rounded-xl text-sm shadow-md hover:shadow-lg hover:bg-primary-dark transition-all active:scale-95">{t('filter_apply')}</button>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-row gap-3 w-full xl:w-auto">
            <button className="flex-1 xl:flex-none flex justify-center items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all hover:shadow-sm">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              {t('btn_filters')}
            </button>
            
            <button className="flex-1 xl:flex-none flex justify-center items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all hover:shadow-sm">
              <span className="material-symbols-outlined text-[18px]">download</span>
              {t('btn_export')}
            </button>
          </div>

          <div className="w-px h-8 bg-slate-200 hidden xl:block mx-1"></div>

          <Link 
            to="/pdvs?view=dia" 
            className="flex items-center justify-center bg-primary text-white rounded-xl px-5 py-2.5 font-bold hover:bg-primary-dark transition-all shadow-md hover:shadow-lg active:scale-95 gap-3 w-full xl:w-auto"
          >
            <span className="material-symbols-outlined text-[20px]">storefront</span>
            {t('pdvs_of_day')}
          </Link>
        </div>
      </header>

      {/* Nível 0: Ação Imediata (Briefing do Dia) */}
      <section className="w-full">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>tips_and_updates</span>
          </div>
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 font-headline">
            {t('briefing_title')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-[28px] shadow-sm border border-slate-100 border-l-4 border-l-red-500 flex items-start gap-3.5 transition-all hover:shadow-md hover:-translate-y-1">
            <div className="bg-red-50 p-2.5 rounded-xl flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-red-600 font-bold text-xl">priority_high</span>
            </div>
            <div>
              <p className="font-black text-slate-800 leading-tight text-sm">
                {t('call_critical')} <span className="text-red-600">2</span> {t('call_critical_desc')}
              </p>
              <span className="text-[9px] font-black text-red-600 uppercase tracking-widest mt-1.5 inline-block bg-red-50 px-2 py-0.5 rounded">
                ALTA PRIORIDADE
              </span>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-[28px] shadow-sm border border-slate-100 border-l-4 border-l-primary flex items-start gap-3.5 transition-all hover:shadow-md hover:-translate-y-1">
            <div className="bg-primary/5 p-2.5 rounded-xl flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary font-bold text-xl">analytics</span>
            </div>
            <div>
              <p className="font-black text-slate-800 leading-tight text-sm">
                {t('missing_pdvs')} <span className="text-primary">3</span> {t('missing_pdvs_desc')}
              </p>
              <span className="text-[9px] font-black text-primary uppercase tracking-widest mt-1.5 inline-block bg-primary/5 px-2 py-0.5 rounded">
                META PRÓXIMA
              </span>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-[28px] shadow-sm border border-slate-100 border-l-4 border-l-[#4e6700] flex items-start gap-3.5 transition-all hover:shadow-md hover:-translate-y-1">
            <div className="bg-[#4e6700]/5 p-2.5 rounded-xl flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#4e6700] font-bold text-xl">handshake</span>
            </div>
            <div>
              <p className="font-black text-slate-800 leading-tight text-sm">
                {t('offer_product')} <span className="text-[#4e6700]">{t('product_brand')}</span> para <span className="text-slate-950">Supermercado Alvorada</span>
              </p>
              <span className="text-[9px] font-black text-[#4e6700] uppercase tracking-widest mt-1.5 inline-block bg-[#4e6700]/5 px-2 py-0.5 rounded">
                AÇÃO RECOMENDADA
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 👑 Nível 1: O "Hero" (Priority Máxima) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Share LMPM - Hero Weight 2/3 */}
         <div className="lg:col-span-2 bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-xl flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-3">{t('kpi_share_lmpm')}</h3>
                  <div className="flex items-baseline gap-4">
                    <span className="text-6xl font-black font-headline tracking-tighter group-hover:scale-105 transition-transform duration-500 inline-block">70%</span>
                    <div className="bg-green-500/20 text-green-400 px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)] animate-pulse">
                       <span className="material-symbols-outlined text-[14px] font-black">trending_up</span>
                       <span className="text-[11px] font-black uppercase tracking-widest">+1.4% Acima da Média</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 p-3 rounded-[20px] backdrop-blur-sm border border-white/5 shadow-inner">
                   <span className="material-symbols-outlined text-primary text-2xl">monitoring</span>
                </div>
              </div>

              {/* Real Chart Visual - trending around 70% */}
              <div className="mt-10 flex items-end gap-2.5 h-24 mb-6 group/chart px-2 relative">
                 {/* 70% Benchmark Line */}
                 <div className="absolute left-0 right-0 border-t border-white/5 border-dashed z-0 pointer-events-none" style={{ bottom: '70%', height: '0px' }}>
                    <span className="absolute -top-3 right-0 text-[7px] font-black text-white/20 uppercase tracking-widest">Benchmark 70%</span>
                 </div>

                 {[65, 68, 72, 70, 71, 69, 73, 70, 68, 71, 69, 70].map((h, i) => (
                   <div key={i} className="flex-1 h-full flex flex-col items-center justify-end gap-3 group/bar cursor-pointer relative z-10">
                     {/* Value Tooltip on Hover */}
                     <span className="absolute -top-1 opacity-0 group-hover/bar:opacity-100 transition-all duration-300 text-[9px] font-black text-primary-fixed-dim -translate-y-full">
                        {h}%
                     </span>

                     <div className="w-1.5 sm:w-2.5 h-full bg-white/5 rounded-full relative overflow-hidden group-hover/bar:bg-white/10 transition-colors">
                        <div 
                           className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary via-primary/80 to-primary-fixed-dim rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(0,88,188,0.3)] group-hover/bar:shadow-[0_0_20px_rgba(0,88,188,0.6)]" 
                           style={{ height: `${h}%` }}
                        >
                           {/* Inner light effect */}
                           <div className="absolute top-0 left-0 right-0 h-1 bg-white/20"></div>
                        </div>
                     </div>
                     
                     <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter opacity-30 group-hover/bar:opacity-100 group-hover/bar:text-primary-fixed-dim transition-all font-headline">
                        {['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'][i].charAt(0)}
                     </span>
                   </div>
                 ))}
              </div>
            </div>

            <div className="relative z-10 flex border-t border-white/10 pt-6 mt-2">
               <div className="flex-1">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-1">Mês Anterior</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-200">69.1%</span>
                    <span className="text-[10px] font-bold text-green-400">+0.9%</span>
                  </div>
               </div>
               <div className="flex-1 border-l border-white/10 pl-8">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-1">Média Atual</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-200">68.6%</span>
                  </div>
               </div>
               <div className="flex-[0.5] hidden xl:block"></div>
            </div>
         </div>

         {/* Base Líquida - Hero Weight 1/3 */}
         <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-lg flex flex-col justify-between hover:shadow-xl transition-all">
            <div>
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">{t('kpi_net_base')}</h3>
                  <div className="w-10 h-10 rounded-[16px] bg-[#4e6700]/10 text-[#4e6700] flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl font-bold">group</span>
                  </div>
               </div>
               <div className="mb-6">
                  <span className="text-5xl font-black font-headline text-slate-900 tracking-tighter">150</span>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{t('kpi_net_retailers')}</p>
               </div>
            </div>
            
            <div className="space-y-4">
               <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 shadow-inner">
                  <div className="bg-[#4e6700] h-full rounded-full shadow-md" style={{ width: "75%" }}></div>
               </div>
               <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Base Target</span>
                    <span className="text-lg font-black block">200</span>
                  </div>
                  <div className="bg-[#4e6700]/5 px-4 py-2.5 rounded-[20px] text-right border border-[#4e6700]/10">
                    <span className="text-[9px] font-black text-[#4e6700] uppercase block tracking-widest mb-0.5">{t('kpi_faltam')}</span>
                    <span className="text-2xl font-black text-[#4e6700] leading-none">50</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* ⚙️ Nível 2: O Motor Operacional (Eficiência Compactada) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Produtividade */}
         <div className="bg-white p-7 rounded-[32px] shadow-md border border-slate-100 flex flex-col gap-6 group hover:shadow-lg transition-all">
            <div className="flex justify-between items-center px-1">
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t('kpi_productivity')}</h3>
               <span className="material-symbols-outlined text-primary text-xl opacity-20 group-hover:opacity-100 transition-opacity">query_stats</span>
            </div>
            <div className="flex flex-col gap-5">
               <div className="bg-slate-50/80 p-6 rounded-[32px] border border-slate-100 relative overflow-hidden flex justify-between items-center">
                  <div className="relative z-10">
                    <span className="text-5xl font-black font-headline text-primary">84%</span>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Status: Em Andamento</p>
                  </div>
                  <div className="w-48 xl:w-64 bg-slate-200 h-3 rounded-full overflow-hidden shadow-inner relative z-10 shrink-0 hidden sm:block">
                     <div className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(0,102,255,0.3)] transition-all duration-1000 ease-out" style={{ width: "84%" }}></div>
                  </div>
               </div>
               
               <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 bg-white border border-slate-100 p-4 rounded-[24px] grid grid-cols-3 gap-2 shadow-sm">
                     <div className="text-center">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">{t('totals')}</span>
                        <span className="text-base font-black">142</span>
                     </div>
                     <div className="text-center border-x border-slate-200">
                        <span className="text-[9px] font-bold text-primary uppercase tracking-widest block mb-1">Feitos</span>
                        <span className="text-base font-black text-primary">120</span>
                     </div>
                     <div className="text-center">
                        <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest block mb-1">Target</span>
                        <span className="text-base font-black text-slate-950">138</span>
                     </div>
                  </div>
                  <div className="md:w-48 bg-red-50/50 px-5 py-4 rounded-[24px] flex flex-col justify-center border border-red-100/50">
                     <span className="text-[9px] font-black text-red-600 uppercase tracking-widest mb-1">{t('kpi_missing')}</span>
                     <span className="text-xl font-black text-red-600 leading-none">18 <span className="text-[10px] font-bold uppercase">PDVs</span></span>
                  </div>
               </div>
            </div>
         </div>

         {/* Efetividade */}
         <div className="bg-white p-7 rounded-[32px] shadow-md border border-slate-100 flex flex-col gap-6 group hover:shadow-lg transition-all">
            <div className="flex justify-between items-center px-1">
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t('kpi_effectiveness')}</h3>
               <span className="material-symbols-outlined text-primary text-xl opacity-20 group-hover:opacity-100 transition-opacity">speed</span>
            </div>
            <div className="flex flex-col gap-5">
               <div className="bg-slate-50/80 p-6 rounded-[32px] border border-slate-100 relative overflow-hidden flex justify-between items-center">
                  <div className="relative z-10">
                    <span className="text-5xl font-black font-headline text-primary">92.5%</span>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Goal: 100%</p>
                  </div>
                  <div className="w-48 xl:w-64 bg-slate-200 h-3 rounded-full overflow-hidden shadow-inner relative z-10 shrink-0 hidden sm:block">
                     <div className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(0,102,255,0.3)] transition-all duration-1000 ease-out" style={{ width: "92.5%" }}></div>
                  </div>
               </div>
               <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white border border-slate-100 p-3.5 rounded-[20px] text-center shadow-sm">
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Realizado</span>
                     <span className="text-xl font-black text-slate-900">131</span>
                  </div>
                  <div className="bg-white border border-slate-100 p-3.5 rounded-[20px] text-center shadow-sm">
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Target</span>
                     <span className="text-xl font-black text-slate-950">142</span>
                  </div>
                  <div className="bg-red-50 border border-red-100 p-3.5 rounded-[20px] text-center shadow-sm">
                     <span className="text-[9px] font-black text-red-600 uppercase tracking-widest block mb-1">Gap</span>
                     <span className="text-xl font-black text-red-600 underline decoration-red-200 decoration-3 underline-offset-2">9</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 🤝 Nível 3: Programas de Engajamento (Prime + Conecta Você + Boost Plan) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Cobertura Prime */}
         <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex flex-col gap-5 hover:shadow-md transition-all border-t-8 border-t-red-500">
            <div className="flex justify-between items-start">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('kpi_prime_coverage')}</h3>
              <span className="bg-red-500 text-white text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">{t('status_critical')}</span>
            </div>
            <div className="flex flex-col gap-4">
               <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-red-600">62%</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Meta: 100%</span>
               </div>
               <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full rounded-full" style={{ width: "62%" }}></div>
               </div>
               <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="text-center">
                    <span className="text-[8px] font-black text-slate-400 uppercase block mb-0.5">Real.</span>
                    <span className="text-sm font-black">310k</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[8px] font-black text-slate-400 uppercase block mb-0.5">Tgt.</span>
                    <span className="text-sm font-black">500k</span>
                  </div>
                  <div className="bg-red-50 p-1.5 rounded-xl text-center border border-red-100">
                    <span className="text-[8px] font-black text-red-600 uppercase block mb-0.5">Gap</span>
                    <span className="text-sm font-black text-red-600">190k</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Cobertura Conecta Você */}
         <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex flex-col gap-5 hover:shadow-md transition-all border-t-8 border-t-orange-500">
           <div className="flex justify-between items-start">
             <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('kpi_conecta_coverage')}</h3>
             <span className="material-symbols-outlined text-orange-500 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
           </div>
           <div className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                 <span className="text-3xl font-black text-orange-600">60%</span>
                 <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Meta: 100%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                 <div className="bg-orange-500 h-full rounded-full" style={{ width: "60%" }}></div>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1">
                 <div className="text-center">
                   <span className="text-[8px] font-black text-slate-400 uppercase block mb-0.5">Ativos</span>
                   <span className="text-sm font-black">30</span>
                 </div>
                 <div className="text-center">
                   <span className="text-[8px] font-black text-slate-400 uppercase block mb-0.5">Tgt.</span>
                   <span className="text-sm font-black">50</span>
                 </div>
                 <div className="bg-orange-50 p-1.5 rounded-xl text-center border border-orange-100">
                   <span className="text-[8px] font-black text-orange-600 uppercase block mb-0.5">Gap</span>
                   <span className="text-sm font-black text-orange-600">20</span>
                 </div>
              </div>
           </div>
         </div>

         {/* Boost Plan */}
         <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex flex-col gap-5 hover:shadow-md transition-all border-t-8 border-t-[#4e6700]">
           <div className="flex justify-between items-start">
             <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('kpi_boost_plan')}</h3>
             <span className="bg-[#4e6700] text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">ABOVE TARGET</span>
           </div>
           <div className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                 <span className="text-3xl font-black text-[#4e6700]">102%</span>
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Performance</p>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                 <div className="bg-[#4e6700] h-full rounded-full shadow-md" style={{ width: "100%" }}></div>
              </div>
              <div className="bg-[#4e6700]/5 p-3 rounded-xl border border-[#4e6700]/10 text-center">
                 <span className="text-base font-black text-[#4e6700]">510 <span className="text-[9px] font-black text-slate-500 uppercase">PDVs atingidos</span></span>
              </div>
           </div>
         </div>
      </section>

      {/* 📊 Nível 4: Métricas Secundárias (Densidade Balanceada) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Volume Mensal */}
         <div className="bg-white p-8 rounded-[32px] shadow-md border border-slate-100 flex flex-col sm:flex-row gap-8 items-center hover:shadow-lg transition-all group">
            <div className="flex-1 w-full flex flex-col gap-4">
               <div className="flex justify-between items-center px-1">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t('kpi_volume_monthly')}</h3>
                 <span className="material-symbols-outlined text-primary text-xl group-hover:rotate-12 transition-transform">bar_chart</span>
               </div>
               <div className="space-y-1">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block">{t('kpi_sales_value')}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-slate-900 tracking-tighter">6,2K</span>
                    <span className="text-xs font-black text-slate-400">m³</span>
                  </div>
               </div>
               <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner">
                  <div className="bg-primary h-full rounded-full" style={{ width: "77.5%" }}></div>
               </div>
            </div>
            <div className="w-full sm:w-48 shrink-0 bg-slate-50/80 p-5 rounded-[24px] border border-slate-100 flex flex-col gap-3">
               <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Target</span>
                  <span className="text-base font-black">8,0K</span>
               </div>
               <div className="h-px bg-slate-200"></div>
               <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black text-primary uppercase tracking-widest">Faltantes</span>
                  <span className="text-base font-black text-primary">1,8K</span>
               </div>
            </div>
         </div>

         {/* Positivação Parcerias */}
         <div className="bg-white p-8 rounded-[32px] shadow-md border border-slate-100 flex flex-col sm:flex-row gap-8 items-center hover:shadow-lg transition-all group">
            <div className="flex-1 w-full flex flex-col gap-4">
               <div className="flex justify-between items-center px-1">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t('kpi_partnerships')}</h3>
                 <span className="material-symbols-outlined text-yellow-600 text-xl group-hover:-rotate-12 transition-transform">volunteer_activism</span>
               </div>
               <div className="space-y-1">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block">{t('kpi_activated')}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-slate-900 tracking-tighter">238</span>
                    <span className="text-xs font-black text-slate-400">{t('pdvs_label')}</span>
                  </div>
               </div>
               <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner">
                  <div className="bg-yellow-500 h-full rounded-full shadow-lg" style={{ width: "95.2%" }}></div>
               </div>
            </div>
            <div className="w-full sm:w-48 shrink-0 bg-slate-50/80 p-5 rounded-[24px] border border-slate-100 flex flex-col gap-3">
               <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Target</span>
                  <span className="text-base font-black">250</span>
               </div>
               <div className="h-px bg-slate-200"></div>
               <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black text-yellow-700 uppercase tracking-widest">Gap</span>
                  <span className="text-base font-black text-yellow-700">12</span>
               </div>
            </div>
         </div>
      </section>

      {/* 📊 Seção: Saúde do Atendimento (Refatorada para consistência Rounded) */}
      <section className="bg-slate-100/50 p-8 sm:p-10 rounded-[48px] border border-slate-200/60 shadow-inner">
         <div className="flex items-center gap-3 mb-8 ml-2">
           <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
             <span className="material-symbols-outlined text-primary text-xl">medical_services</span>
           </div>
           <div>
             <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 font-headline">Saúde do Atendimento</h2>
           </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Resolução de Reclamações */}
            <div className="bg-white p-8 rounded-[36px] shadow-sm border border-slate-100 flex items-center gap-6 group hover:shadow-md transition-all">
               <div className="bg-primary/5 w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 border border-primary/5">
                  <span className="material-symbols-outlined text-primary text-2xl">support_agent</span>
               </div>
               <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-end">
                     <div>
                        <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{t('kpi_resolution')}</h4>
                        <span className="text-3xl font-black text-slate-900 leading-none tracking-tighter">94%</span>
                     </div>
                     <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                        <span className="text-[9px] font-black text-primary uppercase tracking-widest">Gap: 6%</span>
                     </div>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                     <div className="bg-primary h-full rounded-full transition-all duration-1000 ease-out" style={{ width: "94%" }}></div>
                  </div>
               </div>
            </div>

            {/* Problemas Operacionais */}
            <div className="bg-white p-8 rounded-[36px] shadow-sm border border-slate-100 flex items-center gap-6 group hover:shadow-lg transition-all">
               <div className="bg-tertiary/5 w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 border border-tertiary/5">
                  <span className="material-symbols-outlined text-tertiary text-2xl">engineering</span>
               </div>
               <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-end">
                     <div>
                        <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{t('kpi_resolution_ops')}</h4>
                        <span className="text-3xl font-black text-slate-900 leading-none tracking-tighter">30%</span>
                     </div>
                     <div className="bg-tertiary/5 px-3 py-1.5 rounded-xl border border-tertiary/10">
                        <span className="text-[9px] font-black text-tertiary uppercase tracking-widest">Gap: 70%</span>
                     </div>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                     <div className="bg-tertiary h-full rounded-full transition-all duration-1000 ease-out" style={{ width: "30%" }}></div>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
