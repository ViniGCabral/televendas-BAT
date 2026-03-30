import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useLanguage } from "../context/LanguageContext";
import type { CallEvent } from "../context/AppContext";

const initialDate = new Date(2024, 10, 15); // Nov 15, 2024
const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 08:00 to 18:00

export function Agenda() {
  const { events, pdvs, addEvent, updateEvent } = useAppContext();
  const { t } = useLanguage();
  
  const [selectedEvent, setSelectedEvent] = useState<CallEvent | null>(null);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState("");
  
  const [viewMode, setViewMode] = useState<"diario" | "semanal" | "mensal">("semanal");
  const [currentDate, setCurrentDate] = useState(new Date(initialDate));
  
  const [miniCalendarDate, setMiniCalendarDate] = useState(new Date(initialDate));

  const [isCreatingModalOpen, setIsCreatingModalOpen] = useState(false);
  const [newEventSlot, setNewEventSlot] = useState<{day: number, time: string, month: number, year: number} | null>(null);
  const [newEventTag, setNewEventTag] = useState<"ligacao" | "atividade" | "lembrete">("ligacao");

  // New states for form
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [pdvSearch, setPdvSearch] = useState("");
  const [selectedPdvId, setSelectedPdvId] = useState("");
  const [isPdvDropdownOpen, setIsPdvDropdownOpen] = useState(false);
  
  const [newTaskInput, setNewTaskInput] = useState("");
  const [newEventTasks, setNewEventTasks] = useState<{id: string, text: string, done: boolean}[]>([]);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter States
  const [activeFilters, setActiveFilters] = useState({
    ligacao: true,
    atividade: true,
    lembrete: true,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPdvDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const nextPeriod = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "mensal") newDate.setMonth(newDate.getMonth() + 1);
    else if (viewMode === "semanal") newDate.setDate(newDate.getDate() + 7);
    else newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
    setMiniCalendarDate(newDate);
  };

  const prevPeriod = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "mensal") newDate.setMonth(newDate.getMonth() - 1);
    else if (viewMode === "semanal") newDate.setDate(newDate.getDate() - 7);
    else newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
    setMiniCalendarDate(newDate);
  };

  const nextMiniMonth = () => {
    const newDate = new Date(miniCalendarDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setMiniCalendarDate(newDate);
  };

  const prevMiniMonth = () => {
    const newDate = new Date(miniCalendarDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setMiniCalendarDate(newDate);
  };

  let visibleDays: Date[] = [];
  if (viewMode === "diario") {
    visibleDays = [new Date(currentDate)];
  } else if (viewMode === "semanal") {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    visibleDays = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(d.getDate() + i);
      return d;
    });
  } else if (viewMode === "mensal") {
     const year = currentDate.getFullYear();
     const month = currentDate.getMonth();
     const daysInMonth = new Date(year, month + 1, 0).getDate();
     visibleDays = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
  }

  const monthNames = [
    t('month_jan'), t('month_feb'), t('month_mar'), t('month_apr'),
    t('month_may'), t('month_jun'), t('month_jul'), t('month_aug'),
    t('month_sep'), t('month_oct'), t('month_nov'), t('month_dec')
  ];
  const dayNames = [
    t('day_sun_short'), t('day_mon_short'), t('day_tue_short'), t('day_wed_short'),
    t('day_thu_short'), t('day_fri_short'), t('day_sat_short')
  ];
  const minDayNames = [
    t('day_sun_min'), t('day_mon_min'), t('day_tue_min'), t('day_wed_min'),
    t('day_thu_min'), t('day_fri_min'), t('day_sat_min')
  ];

  const handleEventClick = (event: CallEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setEditedNotes(event.notes);
    setIsEditingNotes(false);
  };

  const closeDetails = () => {
    setSelectedEvent(null);
  };

  const toggleActivity = (activityId: string) => {
    if (!selectedEvent) return;
    const updated = {
      ...selectedEvent,
      activities: selectedEvent.activities.map((a) =>
        a.id === activityId ? { ...a, done: !a.done } : a
      ),
    };
    updateEvent(updated);
    setSelectedEvent(updated);
  };

  const saveNotes = () => {
    if (!selectedEvent) return;
    const updated = { ...selectedEvent, notes: editedNotes };
    updateEvent(updated);
    setSelectedEvent(updated);
    setIsEditingNotes(false);
  };

  const openNewEventModal = (day: Date, hourString: string) => {
    setNewEventSlot({
      day: day.getDate(),
      month: day.getMonth(),
      year: day.getFullYear(),
      time: hourString
    });
    setNewEventTitle("");
    setNewEventDescription("");
    setNewEventTasks([]);
    setNewTaskInput("");
    
    setPdvSearch("");
    setSelectedPdvId("");
    setIsPdvDropdownOpen(false);

    setNewEventTag("ligacao");
    setIsCreatingModalOpen(true);
  };

  const createEvent = () => {
    if (!newEventSlot) return;
    
    let finalClientString = newEventTitle;
    let fallbackSapId = "000000";

    if (newEventTag === "lembrete") {
      if (!newEventTitle.trim()) return; 
    } else {
      if (!selectedPdvId) return; // Must select a valid PDV
      const pdv = pdvs.find(p => p.id === selectedPdvId);
      if (pdv) {
        finalClientString = newEventTitle ? `${newEventTitle} - ${pdv.name}` : pdv.name;
        fallbackSapId = pdv.sapId;
      }
    }

    const newEv: CallEvent = {
      id: Date.now().toString(),
      pdvId: newEventTag === "lembrete" ? "" : selectedPdvId,
      client: finalClientString,
      time: newEventSlot.time,
      day: newEventSlot.day,
      month: newEventSlot.month,
      year: newEventSlot.year,
      type: "normal",
      status: "",
      sapId: fallbackSapId,
      notes: newEventDescription,
      eventTag: newEventTag,
      activities: newEventTasks
    };
    
    addEvent(newEv);
    setIsCreatingModalOpen(false);
  };

  const isToday = (d: Date) => {
    return d.toDateString() === new Date().toDateString(); 
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
  };

  const toggleFilter = (tag: "ligacao" | "atividade" | "lembrete") => {
    setActiveFilters(prev => ({ ...prev, [tag]: !prev[tag] }));
  };

  const minYear = miniCalendarDate.getFullYear();
  const minMonth = miniCalendarDate.getMonth();
  const daysInMinMonth = new Date(minYear, minMonth + 1, 0).getDate();
  const minStartDay = new Date(minYear, minMonth, 1).getDay();

  return (
    <div className="flex gap-6 relative overflow-hidden" style={{ height: "calc(100vh - 145px)" }}>

      {/* LEFT COLUMN */}
      <div className="w-[280px] shrink-0 flex flex-col gap-6 h-full pr-2">
        
        <button 
          onClick={() => {
            const now = new Date();
            openNewEventModal(now, `${now.getHours().toString().padStart(2, "0")}:00`);
          }}
          className="w-full py-3.5 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition shadow-md active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">add</span> 
          {t('btn_new_appointment')}
        </button>

        <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-surface-container-highest">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-sm text-on-surface">
              {monthNames[minMonth]} {minYear}
            </span>
            <div className="flex gap-1">
              <button onClick={prevMiniMonth} className="p-1 hover:bg-surface-container rounded-lg text-on-surface-variant transition">
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              <button onClick={nextMiniMonth} className="p-1 hover:bg-surface-container rounded-lg text-on-surface-variant transition">
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {minDayNames.map(d => (
              <span key={d} className="text-[10px] font-bold text-outline">{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({length: minStartDay}).map((_, i) => (
              <div key={`emp-${i}`} className="w-8 h-8"></div>
            ))}
            {Array.from({length: daysInMinMonth}).map((_, i) => {
              const d = new Date(minYear, minMonth, i + 1);
              const isCurr = isSameDay(d, currentDate);
              const isTdy = isToday(d);
              return (
                <button
                  key={i}
                  onClick={() => { setCurrentDate(d); setViewMode("diario"); }}
                  className={`w-8 h-8 rounded-full text-xs font-semibold flex items-center justify-center transition-colors ${
                    isCurr ? "bg-primary text-on-primary" : 
                    isTdy ? "text-primary border border-primary/30" : 
                    "text-on-surface hover:bg-surface-container-low"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-surface-container-highest flex flex-col gap-4">
          <h3 className="text-xs font-bold text-outline uppercase tracking-wider">{t('filter_tags')}</h3>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={activeFilters.ligacao} 
              onChange={() => toggleFilter("ligacao")}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span className="text-sm font-medium text-on-surface">{t('tag_call')}</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={activeFilters.atividade} 
              onChange={() => toggleFilter("atividade")}
              className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500 cursor-pointer"
            />
            <span className="w-3 h-3 rounded-full bg-orange-500"></span>
            <span className="text-sm font-medium text-on-surface">{t('tag_activity')}</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={activeFilters.lembrete} 
              onChange={() => toggleFilter("lembrete")}
              className="w-4 h-4 rounded text-purple-500 focus:ring-purple-500 cursor-pointer"
            />
            <span className="w-3 h-3 rounded-full bg-purple-500"></span>
            <span className="text-sm font-medium text-on-surface">{t('tag_reminder')}</span>
          </label>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-surface-container-highest mt-auto">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-secondary">trending_up</span>
              <span className="text-xs font-bold text-outline uppercase tracking-wider">{t('daily_goal')}</span>
            </div>
            <p className="text-2xl font-bold text-on-surface font-headline">12 / 20</p>
            <div className="w-full bg-surface-container-high h-2 rounded-full mt-3 overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: "60%" }}></div>
            </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="flex-1 flex flex-col h-full bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-surface-container-highest overflow-hidden">
        
        <div className="p-6 border-b border-surface-container-high flex justify-between items-center bg-white z-10 shrink-0">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold font-headline tracking-tight text-on-surface">
                {viewMode === 'diario' 
                    ? `${currentDate.getDate()} ${t('date_separator')} ${monthNames[currentDate.getMonth()]}` 
                    : `${monthNames[currentDate.getMonth()]}, ${currentDate.getFullYear()}`
                }
              </h1>
              <div className="flex items-center gap-1 bg-surface-container-low rounded-lg p-1">
                <button onClick={prevPeriod} className="p-1 rounded hover:bg-surface-container">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button onClick={nextPeriod} className="p-1 rounded hover:bg-surface-container">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-surface-container-low rounded-full p-1 border border-surface-container-highest">
              {(["diario", "semanal", "mensal"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-1.5 text-sm rounded-full capitalize transition-all ${
                    viewMode === mode 
                      ? "font-bold bg-white shadow-sm text-primary" 
                      : "font-medium text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {mode === 'diario' ? t('btn_day') : mode === 'semanal' ? t('btn_week') : t('btn_month')}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-surface-container-low/30">
          {viewMode !== "mensal" ? (
            <div className="min-w-[800px] h-full flex flex-col bg-white">
              <div className="flex border-b border-surface-container-high sticky top-0 bg-surface-container-lowest z-10 shadow-sm shrink-0">
                <div className="w-16 shrink-0 border-r border-surface-container-high p-4"></div>
                {visibleDays.map((day) => {
                  const today = isToday(day);
                  return (
                    <div
                      key={day.getTime()}
                      className={`flex-1 border-r border-surface-container-high p-3 text-center border-b-[3px] ${
                        today ? "border-b-primary bg-primary/5" : "border-b-transparent"
                      }`}
                    >
                      <span className={`text-[10px] font-bold block mb-1 uppercase ${today ? "text-primary" : "text-outline"}`}>
                        {dayNames[day.getDay()]}
                      </span>
                      <span className={`text-xl font-bold ${today ? "text-primary" : "text-on-surface"}`}>
                        {day.getDate()}
                      </span>
                      {today && (
                        <span className="text-[10px] bg-primary text-on-primary px-2 py-0.5 rounded-full absolute mt-1 -ml-4 font-bold hidden xl:inline-block">{t('btn_today').toUpperCase()}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col relative flex-1 pb-10">
                {hours.map((hour) => {
                  const hourStr = `${hour.toString().padStart(2, "0")}:00`;
                  return (
                    <div key={hour} className="flex min-h-[100px] border-b border-surface-container-high relative group">
                      <div className="w-16 shrink-0 border-r border-surface-container-high p-2 text-right bg-surface-container-lowest">
                        <span className="text-[11px] text-outline font-medium tracking-tighter">
                          {hourStr}
                        </span>
                      </div>
                      {visibleDays.map((day) => {
                        const today = isToday(day);
                        return (
                          <div
                            key={day.getTime()}
                            onClick={() => openNewEventModal(day, hourStr)}
                            className={`flex-1 border-r border-surface-container-high relative p-1 cursor-pointer hover:bg-surface-container-low transition-colors ${
                               today ? "bg-primary/[0.02]" : ""
                            }`}
                          >
                            {events
                              .filter(
                                (ev) =>
                                  ev.day === day.getDate() &&
                                  ev.month === day.getMonth() &&
                                  ev.year === day.getFullYear() &&
                                  parseInt(ev.time.split(":")[0]) === hour &&
                                  activeFilters[ev.eventTag]
                              )
                              .map((ev) => {
                                const tagColor = 
                                  ev.eventTag === 'ligacao' ? 'bg-blue-500' : 
                                  ev.eventTag === 'atividade' ? 'bg-orange-500' : 'bg-purple-500';
                                
                                return (
                                <div
                                  key={ev.id}
                                  onClick={(e) => handleEventClick(ev, e)}
                                  className={`absolute inset-x-2 top-1 bottom-1 p-2 rounded-xl border hover:shadow-md transition-all flex flex-col gap-1 overflow-hidden z-20 hover:-translate-y-0.5 shadow-sm bg-white ${
                                    ev.type === "warning" ? "border-error" : 
                                    ev.type === "opportunity" ? "border-secondary" : 
                                    "border-surface-container-highest"
                                  }`}
                                >
                                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${tagColor}`}></div>

                                  <div className="flex items-center gap-1 pl-1">
                                    <span className={`material-symbols-outlined text-[12px] opacity-70 ${
                                      ev.eventTag === 'ligacao' ? 'text-blue-600' : 
                                      ev.eventTag === 'atividade' ? 'text-orange-600' : 'text-purple-600'
                                    }`}>
                                      {ev.eventTag === 'ligacao' ? 'call' : ev.eventTag === 'atividade' ? 'task_alt' : 'push_pin'}
                                    </span>
                                    <span className={`text-[10px] font-bold ${
                                        ev.type === "warning" ? "text-error" : 
                                        ev.type === "opportunity" ? "text-secondary" : "text-on-surface-variant"
                                      }`}>
                                      {ev.time}
                                    </span>
                                  </div>
                                  
                                  <span className="text-xs font-bold leading-tight line-clamp-2 pl-1">
                                    {ev.client}
                                  </span>
                                  {ev.status && (
                                    <span className="text-[10px] font-bold text-error flex items-center gap-1 mt-auto bg-error/10 px-1 py-0.5 rounded-md w-fit ml-1">
                                      <span className="material-symbols-outlined text-[10px]">warning</span>
                                      {ev.status}
                                    </span>
                                  )}
                                </div>
                              )})}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-6 h-full flex flex-col bg-white">
               <div className="grid grid-cols-7 gap-px bg-surface-container-high rounded-xl overflow-hidden border border-surface-container-high flex-1">
                  {dayNames.map(d => (
                    <div key={d} className="bg-surface-container-low p-2 text-center text-[10px] font-bold text-outline uppercase shrink-0">{d}</div>
                  ))}
                  {Array.from({length: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()}).map((_, i) => (
                    <div key={`empty-${i}`} className="bg-surface-container-lowest opacity-50 p-2 min-h-[120px]"></div>
                  ))}
                  {visibleDays.map((day) => {
                     const dayEvents = events.filter((ev) => 
                        ev.day === day.getDate() && ev.month === day.getMonth() && ev.year === day.getFullYear() && activeFilters[ev.eventTag]
                     );
                     const today = isToday(day);
                     return (
                        <div key={day.getDate()} onClick={() => openNewEventModal(day, "09:00")} className={`bg-surface-container-lowest p-2 min-h-[120px] cursor-pointer hover:bg-surface-container-low transition-colors relative ${today ? 'bg-primary/5' : ''}`}>
                          <span className={`text-sm font-bold flex w-6 h-6 items-center justify-center rounded-full ${today ? 'bg-primary text-white' : 'text-on-surface'}`}>{day.getDate()}</span>
                          <div className="mt-2 flex flex-col gap-1 max-h-[80px] overflow-hidden">
                             {dayEvents.slice(0, 3).map(ev => {
                                const tagColor = ev.eventTag === 'ligacao' ? 'bg-blue-500' : ev.eventTag === 'atividade' ? 'bg-orange-500' : 'bg-purple-500';
                                return (
                                <div onClick={(e) => handleEventClick(ev, e)} key={ev.id} className="flex items-center gap-1 text-[10px] truncate px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-medium border border-surface-container-high hover:bg-surface-variant z-10 transition-colors">
                                   <div className={`w-1.5 h-1.5 rounded-full ${tagColor}`}></div>
                                   <span className="truncate">{ev.time} {ev.client}</span>
                                </div>
                             )})}
                             {dayEvents.length > 3 && (
                               <span className="text-[9px] text-outline font-bold pl-1 mt-1">+{dayEvents.length - 3} mais</span>
                             )}
                          </div>
                        </div>
                     )
                  })}
               </div>
            </div>
          )}
        </div>
      </div>

      {/* OVERLAY: Side Panel for Details */}
      {selectedEvent && (
        <div className="absolute right-0 top-0 bottom-0 w-[420px] bg-surface-container-lowest rounded-2xl shadow-2xl flex flex-col border border-surface-container-highest overflow-hidden animate-in slide-in-from-right-8 duration-300 z-40">
          <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full w-fit uppercase flex items-center gap-1 ${
                  selectedEvent.eventTag === 'ligacao' ? 'bg-blue-100 text-blue-700' :
                  selectedEvent.eventTag === 'atividade' ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  <span className="material-symbols-outlined text-[14px]">
                    {selectedEvent.eventTag === 'ligacao' ? 'call' : selectedEvent.eventTag === 'atividade' ? 'task_alt' : 'push_pin'}
                  </span>
                  {selectedEvent.eventTag}
                </span>
                <h2 className="text-2xl font-bold font-headline text-on-surface leading-tight mt-1">
                  {selectedEvent.client}
                </h2>
              </div>
              <button
                onClick={closeDetails}
                className="p-1.5 text-slate-500 hover:bg-surface-container-high rounded-full bg-surface-container-lowest shadow-sm border border-surface-container-highest transition-colors mt-1"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {selectedEvent.type !== "normal" && (
                <div className={`${selectedEvent.type === 'warning' ? 'bg-error-container/50 border-error/30 text-error' : 'bg-secondary-container/50 border-secondary/30 text-secondary-dark'} border p-3 rounded-xl flex items-center gap-2 font-bold text-sm shadow-sm`}>
                  <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}}>
                    {selectedEvent.type === 'warning' ? 'warning' : 'stars'}
                  </span>
                  {selectedEvent.type === 'warning' ? `${t('warning_prefix')} ` + selectedEvent.status : t('opportunity_share')}
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-surface-container-highest shadow-sm">
                <span className="text-[10px] text-outline uppercase font-bold block mb-1">
                  SAP ID
                </span>
                <span className="text-xl font-bold font-headline">{selectedEvent.sapId}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-surface-container-highest shadow-sm">
                <span className="text-[10px] text-outline uppercase font-bold block mb-1">
                  HORÁRIO
                </span>
                <span className="text-xl font-bold font-headline">{selectedEvent.time}</span>
              </div>
            </div>

              <div className="bg-white p-4 rounded-xl border border-surface-container-highest shadow-sm flex flex-col gap-2 relative">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-on-surface-variant uppercase font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">edit_note</span> {t('event_notes')}
                </span>
                <button 
                  onClick={() => isEditingNotes ? saveNotes() : setIsEditingNotes(true)}
                  className="text-primary hover:text-primary-fixed-variant bg-primary-fixed/50 hover:bg-primary-fixed px-3 py-1 rounded-lg text-xs font-bold transition-colors"
                >
                  {isEditingNotes ? t('btn_save') : t('btn_edit')}
                </button>
              </div>
              {isEditingNotes ? (
                <textarea 
                  className="w-full text-sm bg-surface-container-lowest border border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none p-3 rounded-xl resize-none min-h-[120px] transition-all"
                  value={editedNotes}
                  onChange={(e) => setEditedNotes(e.target.value)}
                  autoFocus
                />
              ) : (
                <p className="text-sm text-on-surface-variant leading-relaxed min-h-[40px] mt-1 whitespace-pre-wrap">
                  {selectedEvent.notes || <span className="italic text-outline">{t('ph_edit_notes')}</span>}
                </p>
              )}
            </div>

            {selectedEvent.activities.length > 0 && (
              <div className="bg-white p-4 rounded-xl border border-surface-container-highest shadow-sm flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">checklist</span> {t('linked_activities')}
                  </span>
                </div>
                <div className="space-y-2 mt-1">
                  {selectedEvent.activities.map((activity) => (
                    <label key={activity.id} className="flex items-start gap-3 cursor-pointer group bg-surface-container-lowest p-3 rounded-xl border border-transparent hover:border-surface-container-high transition-colors">
                      <input
                        type="checkbox"
                        checked={activity.done}
                        onChange={() => toggleActivity(activity.id)}
                        className="mt-0.5 w-4.5 h-4.5 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer transition-shadow shadow-sm"
                      />
                      <span className={`text-sm font-medium ${activity.done ? 'line-through text-outline' : 'text-on-surface group-hover:text-primary'} transition-colors`}>
                        {activity.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-auto pt-6 flex flex-col gap-3">
              <button className="flex items-center justify-center bg-primary text-on-primary rounded-xl px-6 py-3.5 font-bold hover:bg-primary-dark transition-all shadow-md hover:shadow-lg active:scale-95 gap-2 w-full text-sm">
                <span className="material-symbols-outlined text-lg">storefront</span>
                {t('btn_view_pdv')}
              </button>
              <button className="flex items-center justify-center bg-white border-2 border-surface-container-highest text-on-surface-variant rounded-xl px-6 py-3.5 font-bold hover:bg-surface-container-lowest hover:text-on-surface transition-all active:scale-95 hover:shadow-sm gap-2 w-full text-sm">
                 <span className="material-symbols-outlined text-lg">event_repeat</span>
                {t('reschedule')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Novo Agendamento */}
      {isCreatingModalOpen && newEventSlot && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
           <div className="bg-surface-container-lowest w-full max-w-lg rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200 max-h-[95vh] overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary p-2 rounded-xl">
                    <span className="material-symbols-outlined">event_available</span>
                  </div>
                  <h3 className="text-2xl font-bold font-headline">{t('modal_new_appointment')}</h3>
                </div>
                <button onClick={() => setIsCreatingModalOpen(false)} className="p-2 rounded-full hover:bg-surface-container transition-colors">
                   <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="space-y-6">                 
                 <div>
                    <label className="text-xs font-bold text-on-surface-variant uppercase mb-2 block">{t('modal_event_type')}</label>
                    <div className="grid grid-cols-3 gap-3">
                        <button 
                          onClick={() => setNewEventTag("ligacao")}
                          className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 font-bold text-sm transition-all ${newEventTag === 'ligacao' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-surface-container-highest text-outline hover:border-outline'}`}
                        >
                          <span className="material-symbols-outlined text-[16px]">call</span> {t('tag_call')}
                        </button>
                        <button 
                          onClick={() => setNewEventTag("atividade")}
                          className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 font-bold text-sm transition-all ${newEventTag === 'atividade' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-surface-container-highest text-outline hover:border-outline'}`}
                        >
                          <span className="material-symbols-outlined text-[16px]">task_alt</span> {t('tag_activity')}
                        </button>
                        <button 
                          onClick={() => setNewEventTag("lembrete")}
                          className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 font-bold text-sm transition-all ${newEventTag === 'lembrete' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-surface-container-highest text-outline hover:border-outline'}`}
                        >
                          <span className="material-symbols-outlined text-[16px]">push_pin</span> {t('tag_reminder')}
                        </button>
                    </div>
                 </div>

                 <div>
                    <label className="text-xs font-bold text-on-surface-variant uppercase mb-2 block">{t('modal_title_optional')}</label>
                    <input 
                      type="text" 
                      value={newEventTitle}
                      onChange={(e) => setNewEventTitle(e.target.value)}
                      placeholder={t('ph_title_example')}
                      className="w-full bg-white border-2 border-surface-container-highest rounded-xl p-3.5 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 font-medium transition-all"
                      autoFocus
                    />
                 </div>

                 {newEventTag !== "lembrete" && (
                   <div className="relative" ref={dropdownRef}>
                      <label className="text-xs font-bold text-on-surface-variant uppercase mb-2 block">{t('modal_link_pdv')} (Obrigatório)</label>
                      <div className="relative">
                         <input 
                           type="text"
                           value={pdvSearch}
                           onChange={(e) => {
                             setPdvSearch(e.target.value);
                             setSelectedPdvId(""); 
                             setIsPdvDropdownOpen(true);
                           }}
                           onFocus={() => setIsPdvDropdownOpen(true)}
                           placeholder={t('modal_select_pdv')}
                           className="w-full bg-white border-2 border-surface-container-highest rounded-xl p-3.5 pl-11 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 font-medium transition-all"
                         />
                         <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-on-surface-variant">search</span>
                         {selectedPdvId && (
                            <span className="material-symbols-outlined absolute right-3.5 top-3.5 text-primary">check_circle</span>
                         )}
                      </div>
                      
                      {isPdvDropdownOpen && (
                         <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-surface-container-highest max-h-[200px] overflow-y-auto z-50">
                            {pdvs.filter(p => p.name.toLowerCase().includes(pdvSearch.toLowerCase())).length > 0 ? (
                              pdvs.filter(p => p.name.toLowerCase().includes(pdvSearch.toLowerCase())).map(p => (
                                <div 
                                  key={p.id}
                                  onClick={() => {
                                    setSelectedPdvId(p.id);
                                    setPdvSearch(p.name);
                                    setIsPdvDropdownOpen(false);
                                  }}
                                  className={`p-3 cursor-pointer border-b border-surface-container-highest last:border-0 font-medium text-sm transition-colors ${selectedPdvId === p.id ? 'bg-primary/5' : 'hover:bg-surface-container-low'}`}
                                >
                                  <div className={`text-on-surface ${selectedPdvId === p.id ? 'text-primary font-bold' : ''}`}>{p.name}</div>
                                  <div className="text-[10px] text-outline mt-0.5">SAP: {p.sapId}</div>
                                </div>
                              ))
                            ) : (
                              <div className="p-4 text-center text-sm text-outline">{t('no_pdvs_found')}</div>
                            )}
                         </div>
                      )}
                   </div>
                 )}

                 <div>
                    <label className="text-xs font-bold text-on-surface-variant uppercase mb-2 block">{t('modal_desc_optional')}</label>
                    <textarea 
                      value={newEventDescription}
                      onChange={(e) => setNewEventDescription(e.target.value)}
                      placeholder={t('ph_desc_example')}
                      className="w-full bg-white border-2 border-surface-container-highest rounded-xl p-3.5 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 font-medium transition-all min-h-[80px] resize-none text-sm"
                    />
                 </div>

                 <div>
                    <label className="text-xs font-bold text-on-surface-variant uppercase mb-2 block">{t('modal_activities_checklist')}</label>
                    <div className="flex gap-2">
                       <input 
                         type="text"
                         value={newTaskInput}
                         onChange={(e) => setNewTaskInput(e.target.value)}
                         onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                               e.preventDefault();
                               if (newTaskInput.trim()) {
                                  setNewEventTasks([...newEventTasks, { id: 'nt_'+Date.now(), text: newTaskInput.trim(), done: false }]);
                                  setNewTaskInput("");
                               }
                            }
                         }}
                         placeholder={t('ph_activity_example')}
                         className="flex-1 bg-white border-2 border-surface-container-highest rounded-xl p-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 font-medium text-sm transition-all"
                       />
                       <button 
                         onClick={(e) => {
                            e.preventDefault();
                            if (newTaskInput.trim()) {
                               setNewEventTasks([...newEventTasks, { id: 'nt_'+Date.now(), text: newTaskInput.trim(), done: false }]);
                               setNewTaskInput("");
                            }
                         }} 
                         className="bg-surface-container-high text-on-surface hover:bg-primary hover:text-white px-4 rounded-xl transition-colors font-bold flex items-center justify-center border-2 border-transparent"
                       >
                          {t('btn_add')}
                       </button>
                    </div>
                    {newEventTasks.length > 0 && (
                       <div className="mt-3 flex flex-col gap-2">
                          {newEventTasks.map(t => (
                             <div key={t.id} className="bg-surface-container-lowest border border-surface-container-highest rounded-lg p-2.5 flex justify-between items-center group">
                                <span className="text-sm font-medium text-on-surface">{t.text}</span>
                                <button 
                                  onClick={(e) => {
                                      e.preventDefault();
                                      setNewEventTasks(newEventTasks.filter(task => task.id !== t.id))
                                  }}
                                  className="text-error opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-error/10"
                                >
                                   <span className="material-symbols-outlined text-[16px]">delete</span>
                                </button>
                             </div>
                          ))}
                       </div>
                    )}
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-on-surface-variant uppercase mb-2 block">{t('selected_date')}</label>
                        <div className="w-full bg-surface-container-low border-2 border-surface-container-highest rounded-xl p-3.5 font-medium text-on-surface-variant cursor-not-allowed">
                           {newEventSlot.day.toString().padStart(2, '0')}/{((newEventSlot.month)+1).toString().padStart(2, '0')}/{newEventSlot.year}
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-on-surface-variant uppercase mb-2 block">{t('selected_time')}</label>
                        <select 
                          value={newEventSlot.time}
                          onChange={(e) => setNewEventSlot({...newEventSlot, time: e.target.value})}
                          className="w-full bg-white border-2 border-surface-container-highest rounded-xl p-3.5 font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer"
                        >
                           {hours.map(h => {
                              const ht = `${h.toString().padStart(2, "0")}:00`;
                              return <option key={ht} value={ht}>{ht}</option>
                           })}
                        </select>
                    </div>
                 </div>
              </div>

              <div className="mt-8 flex gap-4">
                 <button onClick={() => setIsCreatingModalOpen(false)} className="flex-1 py-4 font-bold rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface border-2 border-transparent transition-colors">
                    {t('btn_cancel')}
                 </button>
                 <button 
                  onClick={createEvent} 
                  disabled={newEventTag !== 'lembrete' && !selectedPdvId}
                  className="flex-1 py-4 font-bold rounded-xl bg-primary text-on-primary hover:bg-primary-dark shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                 >
                    {t('btn_confirm_appointment')}
                 </button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
