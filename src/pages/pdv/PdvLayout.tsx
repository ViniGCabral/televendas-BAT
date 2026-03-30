import { Outlet, useLocation, Link, useParams } from "react-router-dom";
import { PdvSidebar } from "./PdvSidebar";
import { useLanguage } from "../../context/LanguageContext";

export function PdvLayout() {
  const location = useLocation();
  const { id } = useParams();
  const { t } = useLanguage();

  const currentTab = location.pathname.split("/").pop();

  return (
    <div className="flex w-full h-screen overflow-hidden bg-surface-container-low">
      <PdvSidebar />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Special Top Nav Bar for PDV Profile */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-surface-container-highest dark:border-slate-800 flex items-center justify-between px-6 shrink-0 shadow-sm z-10 w-full transition-colors duration-300 ease-in-out">
          {/* Left section: Empty space to balance tabs */}
          <div className="w-[280px]"></div>

          {/* Center section: Tabs */}
          <nav className="flex items-end gap-10 h-full">
             <Link 
               to={`/pdv/${id}/visao-geral`}
               className={`h-full flex items-center border-b-[3px] font-bold text-sm px-2 tracking-wide transition-all ${
                 currentTab === 'visao-geral' ? 'border-primary text-primary' : 'border-transparent text-outline hover:text-on-surface'
               }`}
             >
               {t('pdv_tab_overview')}
             </Link>
             <Link 
               to={`/pdv/${id}/fmc`}
               className={`h-full flex items-center border-b-[3px] font-bold text-sm px-2 tracking-wide transition-all ${
                 currentTab === 'fmc' ? 'border-primary text-primary' : 'border-transparent text-outline hover:text-on-surface'
               }`}
             >
               {t('pdv_tab_fmc')}
             </Link>
             <Link 
               to={`/pdv/${id}/parcerias`}
               className={`h-full flex items-center border-b-[3px] font-bold text-sm px-2 tracking-wide transition-all ${
                 currentTab === 'parcerias' ? 'border-primary text-primary' : 'border-transparent text-outline hover:text-on-surface'
               }`}
             >
               {t('pdv_tab_partnerships')}
             </Link>
          </nav>

          {/* Right section: Icons */}
          <div className="flex items-center gap-4 w-[280px] justify-end">
            <button className="text-on-surface hover:bg-surface-container p-2 rounded-full transition-colors">
              <span className="material-symbols-outlined text-[26px]">notifications</span>
            </button>
            <button className="text-on-surface hover:bg-surface-container p-2 rounded-full transition-colors">
              <span className="material-symbols-outlined text-[26px]">history</span>
            </button>
            <button className="text-on-surface hover:bg-surface-container p-2 rounded-full transition-colors">
              <span className="material-symbols-outlined text-[26px]">help</span>
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container shadow-sm border border-surface-container-highest ml-2">
              <img
                alt="Professional profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdlE5L0S8gpGw3FjZxkzZTxSH_gGJtLLSBplg9sBqE1xnRJBdUOEf9kMmTpvt2GbhLvOUCrGbLlEDx-l2T91Wrz0c5drwG-ajKGs0ncMNKN6uDF09oHsbNtCpLtsMQGW2HcTWa_Smo2TO1esEcouLKvWO_sesXyiDEuzXBFKRne3r2BCNY4cpuihlIf9gsrsPr9oGpltUlKt16AeDrp2N67JYqjedV9TWAXj4LwEJHCv4NAp3a7gUYvn0PZHX36Jp72bjrYq-uyEW3"
              />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto w-full pb-12">
          <div className="pt-8 px-8 max-w-[1200px] mx-auto space-y-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
