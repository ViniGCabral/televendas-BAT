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
    <div className="flex flex-col gap-6 md:gap-8 min-h-full pb-8">
      {/* Header Interativo e Responsivo */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 bg-white dark:bg-slate-900 -mx-4 sm:-mx-8 md:-mx-10 -mt-6 p-6 sm:p-8 border-b border-surface-container-high dark:border-slate-800 sticky top-0 z-30 shadow-sm transition-all">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-on-surface flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl sm:text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>space_dashboard</span>
          {t('dashboard_title')}
        </h1>
        
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3 w-full sm:w-auto">
          
          <div className="relative w-full xl:w-auto" ref={datePickerRef}>
            <button 
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="flex items-center justify-between gap-3 bg-white border border-surface-container-high px-4 py-2.5 rounded-xl text-sm font-bold text-on-surface hover:bg-surface-container-low hover:border-outline-variant transition-all hover:shadow-sm w-full xl:min-w-[220px]"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">calendar_today</span>
                <span>{dateRange === "this_week" ? t('filter_this_week') : dateRange === "this_month" ? t('filter_this_month') : dateRange === "last_30_days" ? t('filter_last_30_days') : dateRange}</span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-outline">expand_more</span>
            </button>

            {isDatePickerOpen && (
              <div className="absolute top-full left-0 xl:right-0 xl:left-auto mt-3 bg-white rounded-2xl shadow-2xl border border-surface-container-high w-full sm:w-[340px] p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex flex-col gap-1 mb-4">
                  <button onClick={() => { setDateRange("this_week"); setIsDatePickerOpen(false); }} className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${dateRange === "this_week" ? 'bg-primary/10 text-primary' : 'hover:bg-surface-container-low text-on-surface'}`}>
                     {t('filter_this_week')}
                     {dateRange === "this_week" && <span className="material-symbols-outlined text-[18px]">check</span>}
                  </button>
                  <button onClick={() => { setDateRange("this_month"); setIsDatePickerOpen(false); }} className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${dateRange === "this_month" ? 'bg-primary/10 text-primary' : 'hover:bg-surface-container-low text-on-surface'}`}>
                     {t('filter_this_month')}
                     {dateRange === "this_month" && <span className="material-symbols-outlined text-[18px]">check</span>}
                  </button>
                  <button onClick={() => { setDateRange("last_30_days"); setIsDatePickerOpen(false); }} className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${dateRange === "last_30_days" ? 'bg-primary/10 text-primary' : 'hover:bg-surface-container-low text-on-surface'}`}>
                     {t('filter_last_30_days')}
                     {dateRange === "last_30_days" && <span className="material-symbols-outlined text-[18px]">check</span>}
                  </button>
                </div>
                
                <div className="pt-4 border-t border-surface-container-high">
                  <div className="text-[10px] font-bold text-outline uppercase mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">event_note</span> {t('filter_custom_range')}
                  </div>
                  <div className="flex gap-2">
                    <input type="date" className="w-full bg-surface-container-lowest border-2 border-surface-container-high rounded-xl p-2.5 text-xs font-bold text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer" />
                    <input type="date" className="w-full bg-surface-container-lowest border-2 border-surface-container-high rounded-xl p-2.5 text-xs font-bold text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer" />
                  </div>
                  <button onClick={() => setIsDatePickerOpen(false)} className="w-full mt-4 bg-primary text-white font-bold py-3.5 rounded-xl text-sm shadow-md hover:shadow-lg hover:bg-primary-dark transition-all active:scale-95">{t('filter_apply')}</button>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-row gap-3 w-full xl:w-auto">
            <button className="flex-1 xl:flex-none flex justify-center items-center gap-2 bg-white border border-surface-container-high px-4 py-2.5 rounded-xl text-sm font-bold text-on-surface hover:bg-surface-container-low hover:border-outline-variant transition-all hover:shadow-sm">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              {t('btn_filters')}
            </button>
            
            <button className="flex-1 xl:flex-none flex justify-center items-center gap-2 bg-white border border-surface-container-high px-4 py-2.5 rounded-xl text-sm font-bold text-on-surface hover:bg-surface-container-low hover:border-outline-variant transition-all hover:shadow-sm">
              <span className="material-symbols-outlined text-[18px]">download</span>
              {t('btn_export')}
            </button>
          </div>

          <div className="w-px h-8 bg-surface-container-high hidden xl:block mx-1"></div>

          <Link 
            to="/pdvs?view=dia" 
            className="flex items-center justify-center bg-primary text-on-primary rounded-xl px-5 py-2.5 font-bold hover:bg-primary-dark transition-all shadow-md hover:shadow-lg active:scale-95 gap-2 w-full xl:w-auto border border-transparent"
          >
            <span className="material-symbols-outlined text-[18px]">storefront</span>
            {t('pdvs_of_day')}
          </Link>
        </div>
      </header>

      {/* Briefing do Dia */}
      <section className="w-full">
        <div className="flex items-center gap-2 mb-4">
          <span
            className="material-symbols-outlined text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            tips_and_updates
          </span>
          <h2 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant font-headline">
            {t('briefing_title')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border-y border-r border-l-4 border-r-surface-container-highest border-y-surface-container-highest border-l-tertiary flex items-start gap-4 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
            <div className="bg-error-container p-2 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-error">
                priority_high
              </span>
            </div>
            <div>
              <p className="font-bold text-on-surface leading-tight text-sm">
                {t('call_critical')} <span className="text-error">2</span> {t('call_critical_desc')}
              </p>
              <span className="text-xs font-bold text-error uppercase mt-2 inline-block">
                {t('call_high_priority')}
              </span>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border-y border-r border-l-4 border-r-surface-container-highest border-y-surface-container-highest border-l-primary flex items-start gap-4 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
            <div className="bg-primary-fixed p-2 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">
                analytics
              </span>
            </div>
            <div>
              <p className="font-bold text-on-surface leading-tight text-sm">
                {t('missing_pdvs')} <span className="text-primary">3</span> {t('missing_pdvs_desc')}
              </p>
              <span className="text-xs font-semibold text-primary mt-2 inline-block">
                {t('goal_near')}
              </span>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border-y border-r border-l-4 border-r-surface-container-highest border-y-surface-container-highest border-l-secondary flex items-start gap-4 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
            <div className="bg-secondary-fixed p-2 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary">
                handshake
              </span>
            </div>
            <div>
              <p className="font-bold text-on-surface leading-tight text-sm">
                {t('renew_partnership')} <span className="text-secondary font-extrabold text-xs">Supermercado Alvorada</span> {t('renew_desc')}
              </p>
              <span className="text-xs font-bold tracking-wider text-secondary mt-2 inline-block">
                {t('renew_action')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Produtividade */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-surface-container-highest transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-headline font-bold text-on-surface-variant text-sm uppercase tracking-wider">
              {t('kpi_productivity')}
            </h3>
            <span className="material-symbols-outlined text-outline">
              query_stats
            </span>
          </div>
          <div className="flex items-center gap-8">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle
                  className="text-surface-container-high"
                  cx="64"
                  cy="64"
                  fill="transparent"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                ></circle>
                <circle
                  className="text-primary"
                  cx="64"
                  cy="64"
                  fill="transparent"
                  r="56"
                  stroke="currentColor"
                  strokeDasharray="351.8"
                  strokeDashoffset="56.3"
                  strokeWidth="8"
                ></circle>
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-extrabold font-headline">84%</span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-outline">{t('totals')}</span>{" "}
                <span className="font-bold">142</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-outline">{t('completed')}:</span>{" "}
                <span className="font-bold text-green-600">120</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-outline">{t('kpi_target')}:</span>{" "}
                <span className="font-bold">138</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-error font-medium">{t('kpi_missing')}</span>{" "}
                <span className="font-bold text-error">18</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Efetividade */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-surface-container-highest transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-headline font-bold text-on-surface-variant text-sm uppercase tracking-wider">
              {t('kpi_effectiveness')}
            </h3>
            <span className="material-symbols-outlined text-outline">speed</span>
          </div>
          <div className="mt-8">
            <div className="flex justify-between mb-2">
              <span className="text-4xl font-extrabold font-headline text-primary">
                92.5%
              </span>
              <span className="text-xs text-outline font-medium self-end uppercase">
                {t('goal')}: 100%
              </span>
            </div>
            <div className="w-full bg-surface-container-high h-4 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full shadow-[0_0_8px_rgba(0,88,188,0.4)]"
                style={{ width: "92.5%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* 3. Base Líquida */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-surface-container-highest transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-headline font-bold text-on-surface-variant text-sm uppercase tracking-wider">
              {t('kpi_net_base')}
            </h3>
            <span className="material-symbols-outlined text-secondary">
              trending_up
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <span className="text-xs text-outline uppercase font-bold">
                {t('kpi_net_retailers')}
              </span>
              <div className="text-3xl font-extrabold font-headline">1.240</div>
            </div>
            <div className="flex items-end gap-1 h-12">
              <div className="w-full bg-secondary opacity-20 h-[40%] rounded-t-sm"></div>
              <div className="w-full bg-secondary opacity-40 h-[60%] rounded-t-sm"></div>
              <div className="w-full bg-secondary opacity-60 h-[75%] rounded-t-sm"></div>
              <div className="w-full bg-secondary opacity-80 h-[85%] rounded-t-sm"></div>
              <div className="w-full bg-secondary h-[95%] rounded-t-sm"></div>
            </div>
            <div className="pt-2 border-t border-surface-container-high flex justify-between items-center text-sm">
              <span className="text-outline">{t('kpi_annual_target')}</span>
              <span className="font-bold">1.300</span>
            </div>
          </div>
        </div>

        {/* 4. Cobertura Prime */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border-2 border-error/20 transition-shadow hover:shadow-[0_4px_20px_rgba(186,26,26,0.1)]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-headline font-bold text-on-surface-variant text-sm uppercase tracking-wider">
              {t('kpi_prime_coverage')}
            </h3>
            <span className="bg-error text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {t('status_critical')}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-20 overflow-hidden">
              <div className="absolute top-0 left-0 w-40 h-40 border-[12px] border-surface-container-high rounded-full"></div>
              <div
                className="absolute top-0 left-0 w-40 h-40 border-[12px] border-error rounded-full"
                style={{
                  clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0% 100%)",
                  transform: "rotate(-18deg)",
                }}
              ></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                <span className="text-2xl font-extrabold font-headline">45%</span>
              </div>
            </div>
            <div className="w-full mt-4 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-outline">{t('kpi_volume')}</span>{" "}
                <span className="font-bold">8.4k m³</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">{t('kpi_target')}</span>{" "}
                <span className="font-bold">15k m³</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Cobertura Conecta Você */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-surface-container-highest transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-headline font-bold text-on-surface-variant text-sm uppercase tracking-wider text-wrap max-w-[120px]">
              {t('kpi_conecta_coverage')}
            </h3>
            <span className="material-symbols-outlined text-orange-500">hub</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 relative">
              <svg className="w-full h-full -rotate-90">
                <circle
                  className="text-surface-container-high"
                  cx="40"
                  cy="40"
                  fill="transparent"
                  r="34"
                  stroke="currentColor"
                  strokeWidth="6"
                ></circle>
                <circle
                  className="text-orange-500"
                  cx="40"
                  cy="40"
                  fill="transparent"
                  r="34"
                  stroke="currentColor"
                  strokeDasharray="213.6"
                  strokeDashoffset="32"
                  strokeWidth="6"
                ></circle>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                85%
              </span>
            </div>
            <div className="flex-1 space-y-1 text-sm">
              <p className="flex justify-between">
                <span className="text-outline">{t('kpi_active')}</span>{" "}
                <span className="font-bold">856</span>
              </p>
              <p className="flex justify-between">
                <span className="text-outline">{t('kpi_target')}</span>{" "}
                <span className="font-bold">1.000</span>
              </p>
              <p className="flex justify-between text-orange-600 font-bold border-t pt-1 mt-1 border-surface-container-highest">
                <span>{t('kpi_gap')}</span> <span>144</span>
              </p>
            </div>
          </div>
        </div>

        {/* 6. Boost Plan */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border-2 border-secondary/30 transition-shadow hover:shadow-[0_4px_20px_rgba(78,103,0,0.1)]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-headline font-bold text-on-surface-variant text-sm uppercase tracking-wider">
              {t('kpi_boost_plan')}
            </h3>
            <span className="bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {t('status_above_target')}
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold font-headline text-secondary">
                102%
              </span>
              <span className="text-sm text-outline font-medium">{t('kpi_performance')}</span>
            </div>
            <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
              <div
                className="bg-secondary h-full rounded-full"
                style={{ width: "100%" }}
              ></div>
            </div>
            <p className="text-sm font-semibold text-on-surface">
              420 / 500 <span className="text-outline font-normal">{t('kpi_pdvs_reached')}</span>
            </p>
          </div>
        </div>

        {/* 7. Positivação Parcerias */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-surface-container-highest transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-headline font-bold text-on-surface-variant text-sm uppercase tracking-wider">
              {t('kpi_partnerships')}
            </h3>
            <span className="material-symbols-outlined text-yellow-600">
              volunteer_activism
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-surface-container-low rounded-xl">
              <span className="text-[10px] text-outline uppercase font-bold block mb-1">
                {t('kpi_activated')}
              </span>
              <span className="text-xl font-bold">238</span>
            </div>
            <div className="p-3 bg-surface-container-low rounded-xl">
              <span className="text-[10px] text-outline uppercase font-bold block mb-1">
                {t('kpi_target')}
              </span>
              <span className="text-xl font-bold">250</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-yellow-700 bg-yellow-50 p-2 rounded-lg text-sm font-bold">
            <span className="material-symbols-outlined text-sm">warning</span>
            {t('kpi_gap')} 12 {t('pdvs_label')}
          </div>
        </div>

        {/* 8. Faturamento Parcerias */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-surface-container-highest relative overflow-hidden transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-headline font-bold text-on-surface-variant text-sm uppercase tracking-wider">
              {t('kpi_sales')}
            </h3>
            <span className="material-symbols-outlined text-primary">payments</span>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-outline font-bold uppercase">{t('kpi_sales_value')}</span>
            <div className="text-4xl font-extrabold font-headline text-primary">
              R$ 185k
            </div>
          </div>
          <div className="mt-6 p-4 bg-surface-container-low rounded-xl">
            <div className="flex justify-between text-xs font-bold text-outline mb-2">
              <span>{t('kpi_monthly_evolution')}</span>
              <span>{t('kpi_target_210')}</span>
            </div>
            <div className="flex gap-1 items-end h-8">
              <div className="flex-1 bg-primary/20 h-1/2 rounded-t-sm"></div>
              <div className="flex-1 bg-primary/40 h-2/3 rounded-t-sm"></div>
              <div className="flex-1 bg-primary h-[88%] rounded-t-sm"></div>
              <div className="flex-1 bg-surface-container-highest h-full rounded-t-sm"></div>
            </div>
          </div>
        </div>

        {/* 9. Market Share & Resolutividade */}
        <div className="space-y-4">
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-surface-container-highest flex items-center justify-between transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <div>
              <h4 className="text-[10px] font-bold text-outline uppercase tracking-wider">
                {t('kpi_share_lmpm')}
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold font-headline">+1.4%</span>
                <span className="material-symbols-outlined text-secondary text-lg">
                  trending_up
                </span>
              </div>
            </div>
            <div className="bg-secondary/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-secondary">
                storefront
              </span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-surface-container-highest flex items-center justify-between transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <div>
              <h4 className="text-[10px] font-bold text-outline uppercase tracking-wider">
                {t('kpi_resolution')}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xl font-bold">94%</span>
                <span className="text-xs text-outline font-medium">{t('kpi_complaints_solved')}</span>
              </div>
            </div>
            <div className="bg-primary/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-primary">
                support_agent
              </span>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
