import { useAppContext } from "../context/AppContext";
import { useLanguage } from "../context/LanguageContext";
import { pt } from "../locales/pt";

export function ListaPDVs() {
  const { pdvs, events } = useAppContext();
  const { t } = useLanguage();

  // Helper to check if PDV has a scheduled event today
  const getTodayEventForPDV = (pdvId: string) => {
    const today = new Date();
    return events.find(
      (ev) =>
        ev.pdvId === pdvId &&
        ev.day === today.getDate() &&
        ev.month === today.getMonth() &&
        ev.year === today.getFullYear()
    );
  };

  // Helper to translate status/badge strings from mock data
  const translateMockString = (str: string) => {
    const mapping: Record<string, keyof typeof pt> = {
      "BOOST PLAN EM ABERTO": "badge_boost_open",
      "POTENCIAL DE UPSELL": "badge_upsell_potential",
      "POSITIVADO HOJE": "badge_positivado_today",
      "SEM PENDÊNCIAS": "badge_no_pending",
      "SHARE CRÍTICO": "main_badge_share_critical",
      "OPORTUNIDADE DE SHARE": "main_badge_share_opportunity",
      "Inadimplente": "status_inadimplente",
    };
    const key = mapping[str];
    return key ? t(key as any) : str;
  };

  return (
    <>
      {/* Search & Filter Section */}
      <section className="mb-8 mt-4">
        <div className="flex flex-col gap-6 mb-8">
          <h1 className="text-4xl font-extrabold font-headline tracking-tight text-primary">
            {t('pdvs_title')}
          </h1>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 w-full md:max-w-2xl">
              <div className="relative flex-grow group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline material-symbols-outlined">
                  search
                </span>
                <input
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest rounded-xl border-none shadow-[0_2px_12px_rgba(0,0,0,0.03)] border-2 border-transparent focus:border-primary/20 focus:ring-0 transition-all placeholder:text-outline/60 text-lg"
                  placeholder={t('pdvs_search_ph')}
                  type="text"
                />
              </div>
              <button className="flex items-center gap-2 px-5 py-3.5 bg-surface-container-lowest text-on-surface-variant font-bold rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-surface-container-high hover:bg-surface-container transition-all">
                <span className="material-symbols-outlined text-lg">filter_list</span>
                {t('pdvs_filter')}
              </button>
            </div>
            <div className="bg-surface-container-high p-1.5 rounded-full flex gap-1 h-fit select-none">
              <button className="px-6 py-2.5 rounded-full bg-surface-container-lowest text-primary font-bold shadow-sm transition-all">
                {t('pdvs_day_pdvs')}
              </button>
              <button className="px-6 py-2.5 rounded-full text-on-surface-variant font-semibold hover:bg-surface-container-low transition-all">
                {t('pdvs_full_base')}
              </button>
            </div>
          </div>
        </div>

        {/* Unified Summary Card */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-surface-container-highest mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Progress Bar Section */}
            <div className="lg:col-span-5 border-r border-surface-container-high pr-8">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <span className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1">
                    {t('pdvs_calls_vs_planned')}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black font-headline text-primary">
                      18
                    </span>
                    <span className="text-lg font-bold text-outline">/ 124</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">
                  14.5%
                </span>
              </div>
              <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(0,88,188,0.4)]"
                  style={{ width: "14.5%" }}
                ></div>
              </div>
            </div>

            {/* Metrics Grid Section */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1">
                  {t('pdvs_calls_gap')}
                </span>
                <div className="flex items-center gap-2 text-tertiary">
                  <span className="text-2xl font-bold font-headline">106</span>
                  <span className="material-symbols-outlined text-lg">
                    pending_actions
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1">
                  {t('pdvs_blocked_value')}
                </span>
                <div className="flex items-center gap-1 text-on-surface">
                  <span className="text-sm font-bold text-outline mt-1">R$</span>
                  <span className="text-2xl font-bold font-headline">45.2k</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1">
                  {t('pdvs_fmc_volume')}
                </span>
                <div className="flex items-center gap-2 text-secondary">
                  <span className="text-2xl font-bold font-headline">84%</span>
                  <span className="material-symbols-outlined text-lg">
                    trending_up
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PDVs List Grid (Continuous Scroll) */}
      <div className="flex flex-col gap-4">
        {pdvs.map((pdv) => {
          const todayEvent = getTodayEventForPDV(pdv.id);

          return (
            <div
              key={pdv.id}
              className={`group bg-surface-container-lowest p-6 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border-y border-r border-y-surface-container-highest border-r-surface-container-highest border-l-4 transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 relative overflow-hidden ${
                pdv.statusColor === "text-tertiary"
                  ? "border-l-tertiary"
                  : pdv.statusColor === "text-primary"
                  ? "border-l-primary"
                  : pdv.statusColor === "text-secondary"
                  ? "border-l-secondary"
                  : "border-l-outline-variant"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${pdv.statusBg} ${pdv.statusColor}`}
                  >
                    <span className="material-symbols-outlined text-2xl">
                      {pdv.statusIcon}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold font-headline text-on-surface">
                        {pdv.name}
                      </h3>
                      {todayEvent && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">calendar_today</span>
                          {t('pdvs_today_agenda')} {todayEvent.time}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-on-surface-variant">
                      <span className="flex items-center gap-1 font-medium bg-surface-container-low px-2 py-0.5 rounded-md">
                        <span className="text-xs text-outline font-bold">SAP:</span>{" "}
                        {pdv.sapId}
                      </span>
                      <span className="flex items-center gap-1 font-medium bg-surface-container-low px-2 py-0.5 rounded-md">
                        <span className="text-xs text-outline font-bold">
                          {t('pdvs_last_contact')}
                        </span>{" "}
                        {pdv.lastContact}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                  {/* Main priority badge */}
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 ${pdv.mainBadge.bg} ${pdv.mainBadge.textCol}`}
                  >
                    {pdv.mainBadge.icon && (
                      <span
                        className="material-symbols-outlined text-xs"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {pdv.mainBadge.icon}
                      </span>
                    )}
                    {translateMockString(pdv.mainBadge.text)}
                  </span>

                  {/* Other badges */}
                  {pdv.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-surface-container-high text-on-surface-variant text-xs font-bold rounded-full"
                    >
                      {translateMockString(badge)}
                    </span>
                  ))}

                  <div className="h-8 w-px bg-outline-variant/30 mx-2 hidden lg:block"></div>
                  <button className="flex items-center gap-2 bg-surface-container-high hover:bg-primary hover:text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all active:scale-95 shadow-sm border border-surface-container-highest pb">
                    <span className="material-symbols-outlined text-lg">
                      visibility
                    </span>
                    {t('btn_view_details')}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
