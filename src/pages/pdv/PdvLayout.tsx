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
        {/* Special Top Nav Bar for PDV Profile - Aligned with Sidebar Header height */}
        <header className="h-24 bg-white dark:bg-slate-900 border-b border-surface-container-highest dark:border-slate-800 flex items-center justify-between px-10 shrink-0 shadow-sm z-10 w-full transition-colors duration-300 ease-in-out">
          {/* Left section: Balances the 380px sidebar for centering tabs */}
          <div className="w-[40px] xl:w-[80px] hidden lg:block"></div>

          {/* Center section: Tabs - Larger and More Professional */}
          <nav className="flex items-end gap-16 h-full">
             <Link 
               to={`/pdv/${id}/visao-geral`}
               className={`h-full flex items-center border-b-[5px] font-black text-base px-6 tracking-wide transition-all ${
                 currentTab === 'visao-geral' ? 'border-primary text-primary' : 'border-transparent text-outline hover:text-on-surface'
               }`}
             >
               {t('pdv_tab_overview')}
             </Link>
             <Link 
               to={`/pdv/${id}/fmc`}
               className={`h-full flex items-center border-b-[5px] font-black text-base px-6 tracking-wide transition-all ${
                 currentTab === 'fmc' ? 'border-primary text-primary' : 'border-transparent text-outline hover:text-on-surface'
               }`}
             >
               {t('pdv_tab_fmc')}
             </Link>
             <Link 
               to={`/pdv/${id}/parcerias`}
               className={`h-full flex items-center border-b-[5px] font-black text-base px-6 tracking-wide transition-all ${
                 currentTab === 'parcerias' ? 'border-primary text-primary' : 'border-transparent text-outline hover:text-on-surface'
               }`}
             >
               {t('pdv_tab_partnerships')}
             </Link>
          </nav>

          {/* Right section: Icons */}
          <div className="flex items-center gap-8 justify-end min-w-[200px]">
            <button className="text-on-surface hover:bg-surface-container p-3 rounded-full transition-colors relative">
              <span className="material-symbols-outlined text-[32px]">notifications</span>
              <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="text-on-surface hover:bg-surface-container p-3 rounded-full transition-colors">
              <span className="material-symbols-outlined text-[32px]">history</span>
            </button>
            <button className="text-on-surface hover:bg-surface-container p-3 rounded-full transition-colors">
              <span className="material-symbols-outlined text-[32px]">help</span>
            </button>
            <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container shadow-md border border-surface-container-highest ml-2 cursor-pointer hover:ring-4 hover:ring-primary/20 transition-all">
              <img
                alt="Professional profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdlE5L0S8gpGw3FjZxkzZTxSH_gGJtLLSBplg9sBqE1xnRJBdUOEf9kMmTpvt2GbhLvOUCrGbLlEDx-l2T91Wrz0c5drwG-ajKGs0ncMNKN6uDF09oHsbNtCpLtsMQGW2HcTWa_Smo2TO1esEcouLKvWO_sesXyiDEuzXBFKRne3r2BCNY4cpuihlIf9gsrsPr9oGpltUlKt16AeDrp2N67JYqjedV9TWAXj4LwEJHCv4NAp3a7gUYvn0PZHX36Jp72bjrYq-uyEW3"
              />
            </div>
          </div>
        </header>

        {/* Main Content Area - Full Breadth Utilization */}
        <main className="flex-1 overflow-y-auto w-full pb-20 scroll-smooth bg-slate-50/50">
          <div className="pt-12 px-12 max-w-[1600px] mx-auto space-y-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
