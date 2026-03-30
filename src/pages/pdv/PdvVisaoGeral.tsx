import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

export function PdvVisaoGeral() {
  const { t } = useLanguage();

  const [activities, setActivities] = useState([
    { id: 1, text: t('pdv_vg_act_1'), done: false },
    { id: 2, text: t('pdv_vg_act_2'), done: false },
    { id: 3, text: t('pdv_vg_act_3'), done: false },
    { id: 4, text: t('pdv_vg_act_4'), done: false }
  ]);
  const [newActivityText, setNewActivityText] = useState("");
  const [isAddingActivity, setIsAddingActivity] = useState(false);

  const toggleActivity = (id: number) => {
    setActivities(activities.map(act => act.id === id ? { ...act, done: !act.done } : act));
  };

  const removeActivity = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActivities(activities.filter(act => act.id !== id));
  };

  const addActivity = () => {
    if (newActivityText.trim()) {
      setActivities([...activities, { id: Date.now(), text: newActivityText, done: false }]);
      setNewActivityText("");
      setIsAddingActivity(false);
    }
  };

  const completedCount = activities.filter(a => a.done).length;
  const totalCount = activities.length;

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-12">
      
      {/* Assistente de Vendas em Destaque */}
      <div className="bg-gradient-to-r from-surface-container-highest/30 to-primary/5 border border-primary/20 text-on-surface rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center gap-6 shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0 relative z-10 border border-white/50 shadow-inner">
           <span className="material-symbols-outlined text-[32px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
        </div>
        
        <div className="relative z-10 flex-1">
           <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">{t('pdv_ai_title')}</span>
              <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse shadow-sm">NOVA INSIGHT</span>
           </div>
           <p className="text-lg md:text-xl font-medium text-on-surface leading-snug">
              {t('pdv_ai_insight_share')}
           </p>
        </div>
        
        <div className="relative z-10 shrink-0 w-full md:w-auto mt-2 md:mt-0">
           <button className="w-full md:w-auto bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all px-6 py-3 rounded-xl font-bold text-sm shadow-sm flex items-center justify-center gap-2 border border-primary/20 hover:border-transparent">
             Analisar Detalhes
             <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Atividades Recomendadas */}
        <div className="bg-white border text-on-surface border-surface-container-high rounded-3xl p-8 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8 shrink-0">
            <h3 className="font-bold font-headline text-2xl text-on-surface">{t('pdv_vg_activities_title')}</h3>
            <span className="bg-primary/10 text-primary text-[10px] font-bold px-4 py-1.5 rounded-full">{`${completedCount}/${totalCount} ${t('pdv_vg_completed')}`}</span>
          </div>
          <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2" style={{ maxHeight: '420px' }}>
            {activities.map(act => (
              <div key={act.id} onClick={() => toggleActivity(act.id)} className="group flex justify-between items-center bg-white p-5 rounded-3xl border border-surface-container-highest cursor-pointer hover:border-primary/30 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-4 flex-1 pr-4">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${act.done ? 'bg-primary border-primary text-white' : 'border-outline/30'}`}>
                     {act.done && <span className="material-symbols-outlined text-[16px] font-bold">check</span>}
                  </div>
                  <span className={`text-sm md:text-base font-semibold leading-snug ${act.done ? 'text-on-surface line-through opacity-70' : 'text-on-surface-variant group-hover:text-on-surface'}`}>{act.text}</span>
                </div>
                <button onClick={(e) => removeActivity(act.id, e)} className="text-outline hover:text-error opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-error/10 shrink-0">
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            ))}
            
            {isAddingActivity ? (
              <div className="bg-surface-container-lowest p-5 rounded-3xl border border-primary/30 flex items-center gap-3">
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Nova atividade..."
                  value={newActivityText}
                  onChange={(e) => setNewActivityText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addActivity()}
                  className="flex-1 bg-transparent outline-none text-sm md:text-base border-b border-surface-container-high focus:border-primary transition-colors pb-1 text-on-surface"
                />
                <button onClick={addActivity} className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors flex items-center justify-center shrink-0">
                   <span className="material-symbols-outlined">check</span>
                </button>
                <button onClick={() => { setIsAddingActivity(false); setNewActivityText(''); }} className="text-outline hover:bg-surface-container p-2 rounded-full transition-colors flex items-center justify-center shrink-0">
                   <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            ) : (
              <button onClick={() => setIsAddingActivity(true)} className="flex items-center justify-center gap-2 py-4 border-2 border-dashed border-surface-container-highest rounded-3xl text-outline hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all font-semibold">
                 <span className="material-symbols-outlined mt-0.5">add</span>
                 Nova Atividade
              </button>
            )}
          </div>
        </div>

        {/* Pilares Comerciais */}
        <div className="bg-white border border-surface-container-high rounded-3xl p-8 shadow-sm">
          <div className="mb-8">
            <h3 className="font-bold font-headline text-2xl text-on-surface">{t('pdv_vg_pillars_title')}</h3>
            <p className="text-[10px] font-bold text-outline tracking-widest mt-1 opacity-60">ÚLTIMA ATUALIZAÇÃO: 09/12/2025 ÀS 09:49:33</p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            
            {/* Efetividade */}
            <div className="bg-white border border-surface-container-highest rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden shadow-sm">
               <div className="flex justify-between items-start">
                 <span className="text-base font-bold text-on-surface">{t('pdv_vg_pillar_eff')}</span>
                 <span className="material-symbols-outlined text-green-500 text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
               </div>
               
               <div className="grid grid-cols-2 gap-2">
                 <div>
                    <p className="text-[9px] font-bold text-outline tracking-wider uppercase mb-1">{t('pdv_pillar_realized')}</p>
                    <div className="text-3xl font-black text-on-surface font-headline leading-none">5.4</div>
                 </div>
                 <div className="text-right">
                    <p className="text-[9px] font-bold text-outline tracking-wider uppercase mb-1">{t('pdv_pillar_objective')}</p>
                    <div className="flex items-center justify-end gap-1.5">
                       <span className="text-xs font-bold text-error leading-none">-0.5</span>
                       <span className="text-2xl font-black text-on-surface font-headline leading-none">5.9</span>
                    </div>
                 </div>
               </div>

               <div className="space-y-1.5 mt-2">
                  <p className="text-xs font-black text-green-600 leading-none">91%</p>
                  <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: '91%' }}></div>
                  </div>
               </div>
            </div>

            {/* Varejo Líquido */}
            <div className="bg-white border border-surface-container-highest rounded-3xl p-6 flex flex-col gap-2 relative overflow-hidden shadow-sm aspect-square items-center justify-center">
               <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                 <span className="text-base font-bold text-on-surface">{t('pdv_vg_pillar_net')}</span>
                 <span className="material-symbols-outlined text-error text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
               </div>
            </div>

            {/* Produtividade - Sincronizado: X */}
            <div className="bg-white border border-surface-container-highest rounded-3xl p-6 flex flex-col gap-2 relative overflow-hidden shadow-sm aspect-square items-center justify-center">
               <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                 <span className="text-base font-bold text-on-surface">{t('pdv_vg_pillar_prod')}</span>
                 <span className="material-symbols-outlined text-error text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
               </div>
            </div>

            {/* Pos Parceria - Sincronizado: Check */}
            <div className="bg-white border border-surface-container-highest rounded-3xl p-6 flex flex-col gap-2 relative overflow-hidden shadow-sm aspect-square items-center justify-center">
               <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                 <span className="text-base font-bold text-on-surface">Pos Parceria</span>
                 <span className="material-symbols-outlined text-green-500 text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* Anotações do Cliente */}
      <div className="bg-white border border-surface-container-high rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
             <span className="material-symbols-outlined text-primary text-xl">notes</span>
             <h3 className="font-bold font-headline text-lg text-on-surface">{t('pdv_vg_notes_title')}</h3>
          </div>
          <button className="text-primary font-bold text-sm bg-primary/10 px-4 py-2 flex items-center gap-1.5 hover:bg-primary/20 rounded-lg transition-colors">
            {t('pdv_vg_btn_add_note')}
          </button>
        </div>

        <div className="flex flex-col gap-4">
           {/* Note 1 */}
           <div className="bg-surface-container-lowest border-l-4 border-l-primary rounded-r-xl p-5 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                 <h4 className="font-bold text-on-surface text-sm">{t('pdv_vg_note_1_title')}</h4>
                 <span className="text-[11px] text-outline font-medium">{t('pdv_vg_note_1_time')}</span>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                 {t('pdv_vg_note_1_desc')}
              </p>
           </div>
           
           {/* Note 2 */}
           <div className="bg-surface-container-lowest border-l-4 border-l-surface-container-highest rounded-r-xl p-5">
              <div className="flex justify-between items-start mb-2">
                 <h4 className="font-bold text-on-surface text-sm">{t('pdv_vg_note_2_title')}</h4>
                 <span className="text-[11px] text-outline font-medium">{t('pdv_vg_note_2_time')}</span>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                 {t('pdv_vg_note_2_desc')}
              </p>
           </div>
        </div>
      </div>

      {/* Bottom Banners */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Banner: Lançamento FMC Q4 */}
        <div className="lg:col-span-2 rounded-2xl p-8 relative overflow-hidden bg-slate-900 border border-slate-800 shadow-xl min-h-[220px] flex flex-col justify-end">
           <div className="absolute inset-0 opacity-40 mix-blend-overlay">
              {/* Fake SVG Background as image placeholder for "Lançamento FMC Q4"  */}
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
           </div>
           
           <div className="relative z-10 w-full max-w-md">
             <span className="text-[10px] font-bold text-white/60 tracking-widest uppercase">{t('pdv_vg_market_highlight')}</span>
             <h2 className="text-2xl font-black text-white font-headline mt-1 mb-2">{t('pdv_vg_banner_title')}</h2>
             <p className="text-sm text-white/80 leading-relaxed">
               {t('pdv_vg_banner_desc')}
             </p>
           </div>
        </div>

        {/* Banner: Potencial */}
        <div className="bg-primary border border-primary-dark rounded-2xl p-8 relative overflow-hidden shadow-xl min-h-[220px] flex flex-col justify-center text-white">
           <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
           <div className="absolute top-4 right-4">
              <span className="material-symbols-outlined text-white/30 text-5xl">trending_up</span>
           </div>
           
           <h3 className="text-lg font-bold font-headline mb-4 max-w-[140px] leading-tight z-10">{t('pdv_vg_growth_title')}</h3>
           <div className="font-black text-6xl font-headline tracking-tighter mb-2 z-10">+18%</div>
           <p className="text-xs text-white/80 font-medium z-10 pr-4">
             {t('pdv_vg_growth_desc')}
           </p>
        </div>
      </div>

    </div>
  );
}
