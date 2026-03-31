import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useLanguage } from "../../context/LanguageContext";

export function PdvSidebar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pdvs } = useAppContext();
  const { t } = useLanguage();

  const pdv = pdvs.find((p) => p.id === id) || pdvs[0];
  const [visitStatus, setVisitStatus] = useState<"idle" | "in_progress">("idle");

  return (
    <aside className="w-[340px] bg-slate-50 border-r border-slate-200/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300 ease-in-out flex flex-col shrink-0 h-full overflow-y-auto z-20">
      
      {/* Header with better balanced logo */}
      <div className="h-24 flex items-center justify-start px-6 shrink-0 border-b border-slate-200/40 gap-4 mb-6 bg-white sticky top-0 z-30">
        <button 
          onClick={() => navigate('/pdvs')}
          className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all flex items-center justify-center shrink-0"
          title={t('pdv_header_back')}
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <div className="flex-1 flex items-center justify-start py-1 overflow-hidden pointer-events-none">
           <img 
             src="/logo.png" 
             alt="BAT Telesales" 
             className="h-14 w-auto object-contain" 
           />
        </div>
      </div>

      <div className="px-6 flex flex-col gap-6">
        {/* PDV Profile Card - Balanced Scale */}
        <div className="bg-white border border-slate-200/60 rounded-[32px] p-6 shadow-sm flex flex-col gap-5 relative hover:shadow-md transition-shadow group">
          <div className="flex gap-4 items-start">
             <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-inner">
               <span className="material-symbols-outlined text-[28px]">storefront</span>
             </div>
             <div className="min-w-0 flex-1">
                <h3 className="font-black text-slate-800 leading-tight text-base mb-2 tracking-tight group-hover:text-primary transition-colors truncate" title={pdv?.name}>
                  {pdv?.name || "Cliente Não Encontrado"}
                </h3>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate">SAP: {pdv?.sapId}</span>
                    <button onClick={() => navigator.clipboard.writeText(pdv?.sapId || '')} className="text-slate-300 hover:text-primary transition-colors p-1 rounded-lg">
                      <span className="material-symbols-outlined text-[14px]">content_copy</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate">CNPJ: 12.345.678/0...</span>
                    <button onClick={() => navigator.clipboard.writeText('12.345.678/0001-99')} className="text-slate-300 hover:text-primary transition-colors p-1 rounded-lg">
                      <span className="material-symbols-outlined text-[14px]">content_copy</span>
                    </button>
                  </div>
                </div>
             </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
             <span className="bg-primary text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.1em] shadow-sm">PRIME</span>
             <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.1em] border border-slate-200/50">ADIMPLENTE</span>
             <span className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.1em] border border-green-100">ATIVO</span>
          </div>

          <div className="h-[1px] w-full bg-slate-100/80"></div>

          {visitStatus === "idle" ? (
            <button onClick={() => setVisitStatus("in_progress")} className="w-full bg-[#486b02] hover:bg-[#5a8503] text-[#ccff66] py-3.5 rounded-[20px] font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 uppercase tracking-widest active:scale-[0.98]">
               <span className="material-symbols-outlined text-[20px]">play_circle</span>
               {t('pdv_btn_start_service')}
            </button>
          ) : (
             <div className="flex flex-col gap-3 animate-fade-in">
                <div className="bg-green-50 text-green-700 border border-green-100 py-3 px-4 rounded-xl flex justify-center items-center gap-2">
                   <span className="material-symbols-outlined text-[18px] animate-pulse font-bold">online_prediction</span>
                   <span className="text-[10px] font-black uppercase tracking-widest">Atendimento Ativo</span>
                </div>
                <button onClick={() => setVisitStatus("idle")} className="w-full bg-red-50 text-red-600 border border-red-100 py-3 rounded-xl font-black text-[10px] hover:bg-red-100 transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                   <span className="material-symbols-outlined text-[18px]">stop_circle</span>
                   Encerrar Visita
                </button>
             </div>
          )}
        </div>

        {/* Action Grid - Adjusted spacing */}
        <div className="grid grid-cols-2 gap-3 pb-8 mt-2">
           {[
             { id: 'pedido', icon: 'shopping_cart', label: t('pdv_action_order'), color: 'text-primary bg-primary/5' },
             { id: 'recompra', icon: 'history', label: t('pdv_action_repurchase'), color: 'text-indigo-600 bg-indigo-50' },
             { id: 'conecta', icon: 'hub', label: t('pdv_action_conecta'), color: 'text-purple-600 bg-purple-50' },
             { id: 'finan', icon: 'account_balance_wallet', label: t('pdv_action_finan'), color: 'text-amber-600 bg-amber-50' },
             { id: 'falta', icon: 'error', label: t('pdv_action_missing'), color: 'text-red-500 bg-red-50' },
             { id: 'sugestao', icon: 'lightbulb', label: t('pdv_action_suggestion'), color: 'text-teal-600 bg-teal-50' }
           ].map(action => (
             <button key={action.id} className="bg-white border border-slate-200/60 rounded-[24px] py-6 flex flex-col items-center justify-center gap-2 content-center hover:border-primary/40 hover:bg-slate-50 transition-all shadow-sm active:scale-95 group">
                <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center transition-all group-hover:scale-110 duration-300 shadow-inner`}>
                   <span className="material-symbols-outlined text-[20px]">{action.icon}</span>
                </div>
                <span className="text-[9px] font-black tracking-widest uppercase text-slate-500 group-hover:text-primary transition-colors text-center px-1 leading-tight">{action.label}</span>
             </button>
           ))}
        </div>
      </div>

      <div className="px-6 pb-10 mt-auto">
          <Link 
            to="/agenda" 
            className="w-full bg-white border border-slate-200/80 text-slate-600 py-4 rounded-[20px] font-black text-xs shadow-sm hover:shadow-md hover:border-primary/30 hover:text-primary transition-all flex items-center justify-center gap-2 uppercase tracking-[0.1em] active:scale-[0.98]"
          >
             <span className="material-symbols-outlined text-[20px]">calendar_today</span>
             {t('pdv_sidebar_btn_schedule')}
          </Link>
      </div>

    </aside>
  );
}
