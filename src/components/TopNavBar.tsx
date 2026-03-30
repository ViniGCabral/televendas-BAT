import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export function TopNavBar() {
  const { pdvs } = useAppContext();
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pages = [
    { name: t('nav_dashboard_full'), path: '/', icon: 'space_dashboard' },
    { name: t('nav_pdvs_full'), path: '/pdvs', icon: 'storefront' },
    { name: t('nav_agenda_full'), path: '/agenda', icon: 'calendar_month' }
  ];

  const normalizedSearch = searchTerm.toLowerCase();
  
  const filteredPages = pages.filter(p => p.name.toLowerCase().includes(normalizedSearch));
  const filteredPDVs = pdvs.filter(p => 
      p.name.toLowerCase().includes(normalizedSearch) ||
      p.sapId.toLowerCase().includes(normalizedSearch)
  ).slice(0, 5); // Limitar a 5 resultados de PDVs

  const hasResults = filteredPages.length > 0 || filteredPDVs.length > 0;

  return (
    <nav className="w-full shrink-0 flex justify-between items-center px-6 h-16 bg-white dark:bg-slate-900 shadow-sm dark:shadow-none border-b border-surface-container-high dark:border-slate-800">
      
      {/* Barra de Busca Global */}
      <div className="relative w-full max-w-xl" ref={searchRef}>
          <div className={`flex items-center bg-surface-container-lowest border-2 transition-all ${isFocused ? 'border-primary ring-4 ring-primary/10' : 'border-surface-container-highest'} rounded-full px-5 py-2 w-full`}>
            <span className="material-symbols-outlined text-outline mr-3 text-[20px]">search</span>
            <input 
               type="text" 
               placeholder={t('search_placeholder')} 
               className="bg-transparent w-full text-sm font-medium placeholder:font-normal placeholder:text-outline-variant focus:outline-none text-on-surface"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               onFocus={() => setIsFocused(true)}
            />
          </div>

          {/* Menu Suspenso de Resultados */}
          {isFocused && searchTerm.length > 0 && (
            <div className="absolute top-full left-0 mt-3 w-full bg-white rounded-2xl shadow-2xl border border-surface-container-highest overflow-hidden z-[99] animate-in fade-in slide-in-from-top-2">
              <div className="max-h-[60vh] overflow-y-auto w-full p-2">
                
                {/* Seção Páginas do Sistema */}
                {filteredPages.length > 0 && (
                   <div className="mb-4">
                     <div className="text-xs font-semibold text-outline tracking-wider mb-2 uppercase">{t('search_screens')}</div>
                     {filteredPages.map(page => (
                        <button 
                          key={page.path}
                          onClick={() => { navigate(page.path); setIsFocused(false); setSearchTerm(''); }}
                          className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-container-low transition-colors"
                        >
                          <div className="bg-primary/10 text-primary p-2 flex items-center justify-center rounded-lg">
                            <span className="material-symbols-outlined text-[18px]">{page.icon}</span>
                          </div>
                          <span className="text-sm font-bold text-on-surface">{page.name}</span>
                        </button>
                     ))}
                   </div>
                )}

                {/* Seção Base de PDVs */}
                {filteredPDVs.length > 0 && (
                   <div className={`${filteredPages.length > 0 ? "border-t border-surface-container-highest pt-2" : ""}`}>
                     <div className="text-xs font-semibold text-outline tracking-wider mb-2 uppercase">{t('search_results_for')} "{searchTerm}"</div>
                     {filteredPDVs.map(pdv => (
                        <button 
                          key={pdv.id}
                          onClick={() => { navigate(`/pdv/${pdv.id}`); setIsFocused(false); setSearchTerm(''); }}
                          className="w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-container-low transition-colors group"
                        >
                          <div className="bg-secondary/10 text-secondary p-2 flex items-center justify-center rounded-lg mt-0.5 group-hover:bg-secondary group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[18px]">storefront</span>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-sm font-bold text-on-surface leading-tight">{pdv.name}</span>
                             <span className="text-[11px] font-bold text-outline mt-1 bg-surface-container px-1 py-0.5 rounded w-max">SAP: {pdv.sapId}</span>
                          </div>
                        </button>
                     ))}
                   </div>
                )}

                {/* Empty State */}
                {!hasResults && (
                    <div className="px-4 py-10 text-center flex flex-col items-center">
                       <div className="bg-error/10 text-error p-3 rounded-2xl mb-3">
                          <span className="material-symbols-outlined text-3xl">search_off</span>
                       </div>
                       <p className="text-sm font-bold text-on-surface">{t('search_no_match')}</p>
                       <p className="text-xs font-semibold text-outline-variant mt-1.5">{t('search_revise')}</p>
                    </div>
                )}
              </div>
            </div>
          )}

      </div>

      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <button 
          onClick={() => setLanguage(language === 'pt' ? 'es' : 'pt')}
          className="uppercase text-xs font-bold text-outline hover:text-primary transition-colors flex items-center gap-1 bg-surface-container-high px-2 py-1 rounded-md"
        >
          <span className="material-symbols-outlined text-[16px]">language</span>
          {language}
        </button>

        <div className="flex gap-2">
          <span className="material-symbols-outlined text-outline cursor-pointer p-2 hover:bg-surface-container hover:text-primary rounded-full transition-all">
            notifications
          </span>
          <span className="material-symbols-outlined text-outline cursor-pointer p-2 hover:bg-surface-container hover:text-primary rounded-full transition-all">
            settings
          </span>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container shadow-sm border border-surface-container-highest">
          <img
            alt="Professional profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdlE5L0S8gpGw3FjZxkzZTxSH_gGJtLLSBplg9sBqE1xnRJBdUOEf9kMmTpvt2GbhLvOUCrGbLlEDx-l2T91Wrz0c5drwG-ajKGs0ncMNKN6uDF09oHsbNtCpLtsMQGW2HcTWa_Smo2TO1esEcouLKvWO_sesXyiDEuzXBFKRne3r2BCNY4cpuihlIf9gsrsPr9oGpltUlKt16AeDrp2N67JYqjedV9TWAXj4LwEJHCv4NAp3a7gUYvn0PZHX36Jp72bjrYq-uyEW3"
          />
        </div>
      </div>
    </nav>
  );
}
