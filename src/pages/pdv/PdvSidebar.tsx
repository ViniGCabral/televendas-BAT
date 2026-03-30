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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visitStatus, setVisitStatus] = useState<"idle" | "in_progress">("idle");
  return (
    <aside className="w-[360px] bg-white dark:bg-slate-900 border-r border-surface-container-high dark:border-slate-800 transition-all duration-300 ease-in-out flex flex-col shrink-0 h-full overflow-y-auto">
      {/* Cabeçalho da Sidebar */}
      <div className="h-16 flex items-center justify-start px-4 shrink-0 border-b border-surface-container-high dark:border-slate-800 gap-3 mb-6 relative overflow-hidden">
        <button 
          onClick={() => navigate('/pdvs')}
          className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center justify-center shrink-0"
          title={t('pdv_header_back')}
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex-1 flex items-center justify-start h-full py-1 -ml-2 overflow-hidden">
           <img 
             src="/logo.png" 
             alt="BAT Telesales" 
             className="h-full w-auto object-contain transform scale-[1.5] origin-left mix-blend-multiply" 
           />
        </div>
      </div>

      <div className="px-6 flex flex-col gap-4">
        {/* PDV Card Component in Sidebar */}
        <div className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-4 shadow-sm flex flex-col gap-3 relative">
          <div className="flex gap-3 items-start">
             <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xl shrink-0">
               <span className="material-symbols-outlined">storefront</span>
             </div>
             <div>
                <h3 className="font-bold text-on-surface leading-tight text-sm">{pdv?.name || "Cliente Não Encontrado"}</h3>
                <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                  <span className="text-[10px] text-outline font-medium">SAP: {pdv?.sapId}</span>
                  <button onClick={() => navigator.clipboard.writeText(pdv?.sapId || '')} className="text-outline hover:text-primary transition-colors flex items-center justify-center p-1 rounded hover:bg-surface-container" title="Copiar SAP">
                    <span className="material-symbols-outlined text-[12px]">content_copy</span>
                  </button>
                  <span className="text-[10px] text-outline font-medium mx-1">•</span>
                  <span className="text-[10px] text-outline font-medium">CNPJ: 12.345/0001-99</span>
                  <button onClick={() => navigator.clipboard.writeText('12.345/0001-99')} className="text-outline hover:text-primary transition-colors flex items-center justify-center p-1 rounded hover:bg-surface-container" title="Copiar CNPJ">
                    <span className="material-symbols-outlined text-[12px]">content_copy</span>
                  </button>
                </div>
             </div>
          </div>
          
          <div className="flex gap-2 text-[9px] font-bold mt-1">
             <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-widest">B2B</span>
             <span className="bg-secondary/15 text-secondary px-2 py-0.5 rounded-full uppercase tracking-widest">ADIMPLENTE</span>
             <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase tracking-widest">ATIVO</span>
          </div>

          {visitStatus === "idle" ? (
            <button onClick={() => setIsModalOpen(true)} className="mt-2 w-full bg-secondary text-white py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:bg-secondary-dark transition-all flex items-center justify-center gap-2 animate-fade-in">
               <span className="material-symbols-outlined text-lg font-bold">play_arrow</span>
               {t('pdv_btn_start_service')}
            </button>
          ) : (
             <div className="mt-2 flex flex-col gap-2 animate-fade-in">
                <div className="bg-green-100 text-green-800 border border-green-200 py-2 px-3 rounded-xl flex justify-center items-center gap-1.5 shadow-sm">
                   <span className="material-symbols-outlined text-[16px] animate-pulse">sensors</span>
                   <span className="text-xs font-black uppercase tracking-widest">Em Andamento</span>
                </div>
                <button onClick={() => setVisitStatus("idle")} className="w-full bg-error text-white py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2">
                   <span className="material-symbols-outlined text-lg">stop_circle</span>
                   Encerrar Visita
                </button>
             </div>
          )}
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-3 gap-2 mt-2 border-b border-surface-container-high pb-8">
           {[
             { id: 'pedido', icon: 'shopping_cart', label: t('pdv_action_order') },
             { id: 'recompra', icon: 'history', label: t('pdv_action_repurchase') },
             { id: 'conecta', icon: 'hub', label: t('pdv_action_conecta') },
             { id: 'finan', icon: 'account_balance_wallet', label: t('pdv_action_finan') },
             { id: 'falta', icon: 'error', label: t('pdv_action_missing') },
             { id: 'sugestao', icon: 'lightbulb', label: t('pdv_action_suggestion') }
           ].map(action => (
             <button key={action.id} className="bg-white border text-outline border-surface-container-highest rounded-2xl py-3 flex flex-col items-center justify-center gap-1.5 hover:border-primary hover:text-primary transition-all shadow-sm hover:shadow-md cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">{action.icon}</span>
                <span className="text-[9px] font-bold tracking-widest uppercase">{action.label}</span>
             </button>
           ))}
        </div>
      </div>

      <div className="px-6 pb-8 mt-auto">
          <Link 
            to="/agenda" 
            className="w-full bg-surface-container-high text-primary py-4 rounded-xl font-bold text-sm shadow-sm hover:shadow-md hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 border border-primary/20"
          >
             <span className="material-symbols-outlined text-lg">calendar_add_on</span>
             {t('pdv_sidebar_btn_schedule')}
          </Link>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-[32px] p-8 max-w-sm w-full relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
             
             <div className="text-center mb-6">
                <h2 className="text-xl font-black font-headline text-on-surface mb-2 leading-tight">Confirme as atividades mandatórias</h2>
                <p className="text-sm text-outline font-medium">Certifique-se de realizar as tarefas obrigatórias para este PDV antes de encerrar sua visita.</p>
             </div>

             <div className="flex flex-col gap-3 mb-8">
                {[
                  { id: 1, text: "Estimule Sell Out de 30 PCTs de Dunhill Red" },
                  { id: 2, text: "Venda +40 PCTs via Prime" },
                  { id: 3, text: "Ative PDV no Prime" },
                  { id: 4, text: "Ative Staff no Conecta Você" }
                ].map((act) => (
                  <div key={act.id} className="bg-surface-container-lowest border border-surface-container-high rounded-xl p-4 flex items-center gap-4">
                     <div className="w-6 h-6 rounded-full border border-primary/30 bg-primary/5 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                        {act.id}
                     </div>
                     <span className="text-sm font-semibold text-on-surface leading-tight">{act.text}</span>
                  </div>
                ))}
             </div>

             <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    setVisitStatus("in_progress");
                  }} 
                  className="w-full bg-[#00A84D] text-white py-4 rounded-2xl font-black text-sm shadow-md hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-widest"
                >
                  Iniciar Visita
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="w-full bg-surface-container-lowest text-on-surface-variant py-4 rounded-2xl font-bold text-sm hover:bg-surface-container hover:text-on-surface transition-colors"
                >
                  Voltar
                </button>
             </div>

          </div>
        </div>
      )}

    </aside>
  );
}
