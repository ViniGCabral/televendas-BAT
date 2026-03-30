import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [isPdvsOpen, setIsPdvsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={`${
        isOpen ? "w-[280px]" : "w-[72px]"
      } bg-white dark:bg-slate-900 border-r border-surface-container-high dark:border-slate-800 transition-all duration-300 ease-in-out flex flex-col shrink-0`}
    >
      <div className="h-16 flex items-center justify-center lg:justify-start px-4 shrink-0 border-b border-surface-container-high dark:border-slate-800 gap-3 relative overflow-hidden">
        <button
          onClick={onToggle}
          className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center justify-center shrink-0"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        {isOpen && (
          <div className="flex-1 flex items-center justify-start h-full py-1 -ml-2 overflow-hidden">
            <img 
              src="/logo.png" 
              alt="BAT Telesales" 
              className="h-full w-auto object-contain transform scale-[1.5] origin-left mix-blend-multiply" 
            />
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 mt-4 flex-1 overflow-x-hidden">
        <Link
          to="/"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
            isActive("/")
              ? "bg-primary/10 text-primary font-bold"
              : "text-on-surface hover:bg-surface-container"
          }`}
        >
          <span className="material-symbols-outlined text-[20px] mb-0.5">dashboard</span>
          {isOpen && <span className="font-medium">{t('nav_dashboard')}</span>}
        </Link>

        <Link
          to="/agenda"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
            isActive("/agenda")
              ? "bg-primary/10 text-primary font-bold"
              : "text-on-surface hover:bg-surface-container"
          }`}
        >
          <span className="material-symbols-outlined text-[20px] mb-0.5">calendar_today</span>
          {isOpen && <span className="font-medium">{t('nav_agenda')}</span>}
        </Link>

        <div className="flex flex-col">
          <button
            onClick={() => setIsPdvsOpen(!isPdvsOpen)}
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all w-full text-left bg-transparent ${
              isActive("/pdvs") || isPdvsOpen
                ? "bg-primary/5 text-primary"
                : "text-on-surface hover:bg-surface-container"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] mb-0.5">storefront</span>
              {isOpen && <span className="font-medium">{t('nav_pdvs')}</span>}
            </div>
            {isOpen && (
              <span className="material-symbols-outlined text-[18px]">
                {isPdvsOpen ? "expand_less" : "expand_more"}
              </span>
            )}
          </button>
          
          {/* Submenus */}
          {isOpen && isPdvsOpen && (
            <div className="pl-12 pr-4 py-2 flex flex-col gap-2 mt-1">
              <NavLink
                to="/pdvs"
                end
                className={({ isActive }) =>
                  `text-sm p-2 rounded-lg transition-colors ${
                    isActive
                      ? "text-primary font-bold bg-primary/10"
                      : "text-slate-500 hover:text-slate-800 hover:bg-surface-container-low"
                  }`
                }
              >
                {t('pdvs_full_base')}
              </NavLink>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-surface-container-high dark:border-slate-800">
        <button
          className={`flex items-center justify-center bg-primary text-on-primary rounded-xl font-bold text-sm hover:opacity-90 transition-all scale-95 active:scale-90 ${
            isOpen ? "px-4 py-3 w-full gap-2" : "w-12 h-12"
          }`}
          title={t('btn_new_call')}
        >
          <span className="material-symbols-outlined text-lg">add_call</span>
          {isOpen && <span className="whitespace-nowrap">{t('btn_new_call')}</span>}
        </button>
      </div>
    </aside>
  );
}
