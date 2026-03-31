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

  const [notes, setNotes] = useState([
    { id: 1, title: t('pdv_vg_note_1_title'), time: t('pdv_vg_note_1_time'), desc: t('pdv_vg_note_1_desc'), isRecent: true },
    { id: 2, title: t('pdv_vg_note_2_title'), time: t('pdv_vg_note_2_time'), desc: t('pdv_vg_note_2_desc'), isRecent: false }
  ]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteDesc, setNewNoteDesc] = useState("");

  const addNote = () => {
    if (newNoteTitle.trim() && newNoteDesc.trim()) {
      setNotes([{ id: Date.now(), title: newNoteTitle, desc: newNoteDesc, time: 'Agora', isRecent: true }, ...notes]);
      setNewNoteTitle("");
      setNewNoteDesc("");
      setIsAddingNote(false);
    }
  };

  const removeNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
  };

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
      
      {/* Alerta de Desempenho (Antigo Assistente) */}
      <div className="bg-error-container/10 border border-error/20 text-on-surface rounded-2xl p-4 md:p-5 relative overflow-hidden flex flex-col md:flex-row items-center md:items-center gap-4 shadow-sm group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-error/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-error/10 transition-colors"></div>
        
        <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center shrink-0 relative z-10 border border-error/20 shadow-inner group-hover:scale-105 transition-transform">
           <span className="material-symbols-outlined text-[24px] text-error font-black">priority_high</span>
        </div>
        
        <div className="relative z-10 flex-1">
           <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-error">{t('pdv_ai_title')}</span>
           </div>
           <p className="text-base font-black text-on-surface leading-tight">
              {t('pdv_ai_insight_share')}
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atividades Recomendadas */}
        <div className="bg-white border text-on-surface border-surface-container-high rounded-3xl px-8 py-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-5 shrink-0">
            <h3 className="font-bold font-headline text-xl text-on-surface">{t('pdv_vg_activities_title')}</h3>
            <span className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full">{`${completedCount}/${totalCount} ${t('pdv_vg_completed')}`}</span>
          </div>
          <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto pr-2" style={{ maxHeight: '380px' }}>
            {activities.map(act => (
              <div key={act.id} onClick={() => toggleActivity(act.id)} className="group flex justify-between items-center bg-white p-3.5 rounded-2xl border border-surface-container-highest cursor-pointer hover:border-primary/30 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-3 flex-1 pr-4">
                  <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${act.done ? 'bg-primary border-primary text-white' : 'border-outline/30'}`}>
                     {act.done && <span className="material-symbols-outlined text-[14px] font-bold">check</span>}
                  </div>
                  <span className={`text-sm font-semibold leading-tight ${act.done ? 'text-on-surface line-through opacity-70' : 'text-on-surface-variant group-hover:text-on-surface'}`}>{act.text}</span>
                </div>
                <button onClick={(e) => removeActivity(act.id, e)} className="text-outline hover:text-error opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-error/10 shrink-0">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            ))}
            
            {isAddingActivity ? (
              <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-primary/30 flex items-center gap-3">
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Nova atividade..."
                  value={newActivityText}
                  onChange={(e) => setNewActivityText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addActivity()}
                  className="flex-1 bg-transparent outline-none text-sm border-b border-surface-container-high focus:border-primary transition-colors pb-1 text-on-surface"
                />
                <button onClick={addActivity} className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors flex items-center justify-center shrink-0">
                   <span className="material-symbols-outlined">check</span>
                </button>
                <button onClick={() => { setIsAddingActivity(false); setNewActivityText(''); }} className="text-outline hover:bg-surface-container p-2 rounded-full transition-colors flex items-center justify-center shrink-0">
                   <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            ) : (
              <button onClick={() => setIsAddingActivity(true)} className="flex items-center justify-center gap-2 py-3 border-2 border-dashed border-surface-container-highest rounded-2xl text-outline hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all text-xs font-bold uppercase tracking-wider">
                 <span className="material-symbols-outlined text-[18px]">add</span>
                 Nova Atividade
              </button>
            )}
          </div>
        </div>

        {/* Pilares Comerciais */}
        <div className="bg-white border border-surface-container-high rounded-3xl px-8 py-6 shadow-sm">
          <div className="mb-5">
            <div className="flex items-baseline gap-3">
               <h3 className="font-bold font-headline text-xl text-on-surface">{t('pdv_vg_pillars_title')}</h3>
               <p className="text-[9px] font-bold text-outline tracking-widest opacity-60 uppercase">DADOS DE HOJE</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Efetividade - With Data */}
            <div className="bg-white border border-surface-container-highest rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden shadow-sm hover:border-primary/20 transition-all group">
               <div className="flex justify-between items-start">
                 <span className="text-sm font-black text-on-surface uppercase tracking-tight">{t('pdv_vg_pillar_eff')}</span>
                 <span className="material-symbols-outlined text-green-500 text-2xl font-bold group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
               </div>
               
               <div className="grid grid-cols-2 gap-1">
                 <div>
                    <p className="text-[8px] font-bold text-outline tracking-wider uppercase">{t('pdv_pillar_realized')}</p>
                    <div className="text-2xl font-black text-on-surface font-headline">5.4</div>
                 </div>
                 <div className="text-right">
                    <p className="text-[8px] font-bold text-outline tracking-wider uppercase">{t('pdv_pillar_objective')}</p>
                    <div className="flex items-center justify-end gap-1">
                       <span className="text-[10px] font-bold text-error leading-none">-0.5</span>
                       <span className="text-xl font-black text-on-surface font-headline">5.9</span>
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

            {/* Varejo Líquido - Purely Binary */}
            <div className="bg-white border border-surface-container-highest rounded-2xl p-5 flex flex-col items-center justify-center min-h-[120px] text-center shadow-sm hover:border-error/20 transition-all group">
               <div className="flex w-full justify-between items-center">
                 <span className="text-sm font-black text-on-surface uppercase tracking-tight">{t('pdv_vg_pillar_net')}</span>
                 <span className="material-symbols-outlined text-error text-[28px] font-bold group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
               </div>
            </div>

            {/* Produtividade - Purely Binary */}
            <div className="bg-white border border-surface-container-highest rounded-2xl p-5 flex flex-col items-center justify-center min-h-[120px] text-center shadow-sm hover:border-error/20 transition-all group">
               <div className="flex w-full justify-between items-center">
                 <span className="text-sm font-black text-on-surface uppercase tracking-tight">{t('pdv_vg_pillar_prod')}</span>
                 <span className="material-symbols-outlined text-error text-[28px] font-bold group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
               </div>
            </div>

            {/* Pos Parceria - Purely Binary */}
            <div className="bg-white border border-surface-container-highest rounded-2xl p-5 flex flex-col items-center justify-center min-h-[120px] text-center shadow-sm hover:border-primary/20 transition-all group">
               <div className="flex w-full justify-between items-center">
                 <span className="text-sm font-black text-on-surface uppercase tracking-tight">Pos Parceria</span>
                 <span className="material-symbols-outlined text-green-500 text-[28px] font-bold group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Anotações do Cliente */}
      <div className="bg-white border border-surface-container-high rounded-3xl px-8 py-5 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
             <span className="material-symbols-outlined text-primary text-xl">notes</span>
             <h3 className="font-bold font-headline text-lg text-on-surface">{t('pdv_vg_notes_title')}</h3>
          </div>
          <button onClick={() => setIsAddingNote(true)} className="text-primary font-bold text-xs bg-primary/10 px-3 py-1.5 flex items-center gap-1.5 hover:bg-primary/20 rounded-lg transition-colors">
            {t('pdv_vg_btn_add_note')}
          </button>
        </div>

        <div className="flex flex-col gap-3">
           {isAddingNote && (
             <div className="bg-surface-container-lowest border border-primary/30 rounded-xl p-5 mb-2 shadow-sm animate-fade-in flex flex-col gap-3">
               <input 
                 autoFocus
                 type="text" 
                 placeholder="Título da nota..." 
                 value={newNoteTitle}
                 onChange={(e) => setNewNoteTitle(e.target.value)}
                 className="w-full bg-transparent border-b border-surface-container-highest focus:border-primary outline-none text-sm font-bold text-on-surface pb-1"
               />
               <textarea 
                 rows={2}
                 placeholder="Descreva a anotação..." 
                 value={newNoteDesc}
                 onChange={(e) => setNewNoteDesc(e.target.value)}
                 className="w-full bg-transparent border border-surface-container-highest focus:border-primary rounded-lg p-2 outline-none text-sm text-on-surface resize-none"
               />
               <div className="flex justify-end gap-2 mt-1">
                 <button onClick={() => setIsAddingNote(false)} className="text-xs font-bold text-outline hover:text-on-surface px-3 py-1.5">Cancelar</button>
                 <button onClick={addNote} className="text-xs font-bold bg-primary text-white px-4 py-1.5 rounded-lg hover:brightness-110">Salvar Nota</button>
               </div>
             </div>
           )}

           {notes.map((note) => (
             <div key={note.id} className={`group relative bg-surface-container-lowest border-l-4 rounded-r-xl p-5 shadow-sm transition-all ${note.isRecent ? 'border-l-primary' : 'border-l-surface-container-highest'}`}>
                <div className="flex justify-between items-start mb-2 pr-8">
                   <h4 className="font-bold text-on-surface text-sm">{note.title}</h4>
                   <span className="text-[11px] text-outline font-medium">{note.time}</span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                   {note.desc}
                </p>
                <button onClick={() => removeNote(note.id)} className="absolute top-4 right-3 text-outline hover:text-error opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full hover:bg-error/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
             </div>
           ))}
           
           {!isAddingNote && notes.length === 0 && (
             <p className="text-sm text-outline italic text-center py-4">Nenhuma nota cadastrada para este cliente.</p>
           )}
        </div>
      </div>

      {/* Campaign Banner - NOW AT THE END */}
      <div className="w-full">
        <div className="rounded-3xl p-4 md:p-6 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-white/10 shadow-xl min-h-[120px] flex flex-col justify-center group">
           <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-primary/10 transition-colors duration-1000"></div>
           
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
             <div className="md:col-span-10">
               <div className="flex items-center gap-2 mb-1">
                 <div className="w-6 h-0.5 bg-primary/60 rounded-full"></div>
                 <span className="text-[9px] font-bold text-white/40 tracking-[0.2em] uppercase">{t('pdv_vg_market_highlight')}</span>
               </div>
               
               <h2 className="text-xl md:text-2xl font-black text-white font-headline leading-tight mb-1">
                 {t('pdv_vg_banner_dunhill_title')}
               </h2>
               
               <div className="flex flex-wrap items-center gap-3">
                  <p className="text-xs md:text-sm text-white/60 font-medium border-l border-primary/30 pl-3">
                    {t('pdv_vg_banner_dunhill_desc')}
                  </p>
                  
                  <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2 py-0.5 rounded-lg backdrop-blur-md">
                     <span className="material-symbols-outlined text-primary text-base font-bold">trending_up</span>
                     <span className="text-[8px] font-black text-white uppercase tracking-widest whitespace-nowrap">EM ANDAMENTO</span>
                  </div>
               </div>
             </div>
             
             <div className="md:col-span-2 flex justify-end">
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl shadow-lg flex flex-col items-center group-hover:scale-105 transition-transform duration-500 min-w-[90px]">
                   <span className="text-[7px] font-black text-primary uppercase tracking-widest mb-0.5 leading-none">FALTAM</span>
                   <div className="text-2xl font-black text-white font-headline leading-none">30</div>
                   <span className="text-[7px] font-bold text-white/30 uppercase mt-0.5 leading-none">Pacotes</span>
                </div>
             </div>
           </div>
        </div>
      </div>

    </div>
  );
}
