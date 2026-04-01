import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface PDV {
  id: string;
  name: string;
  sapId: string;
  lastContact: string;
  badges: string[];
  statusIcon: string;
  statusColor: string;
  statusBg: string;
  mainBadge: { text: string; icon: string; bg: string; textCol: string };
  isPriority: boolean;
}

export interface CallEvent {
  id: string;
  pdvId: string;
  client: string; // for fallback or display
  time: string;
  day: number;
  month: number;
  year: number;
  type: "opportunity" | "warning" | "normal";
  status: string;
  sapId: string;
  notes: string;
  eventTag: "ligacao" | "atividade" | "lembrete";
  activities: { id: string; text: string; done: boolean }[];
}

interface AppContextProps {
  pdvs: PDV[];
  events: CallEvent[];
  addEvent: (event: CallEvent) => void;
  updateEvent: (event: CallEvent) => void;
}

export const initialPdvs: PDV[] = [
  {
    id: "p1",
    name: "Mercado Central de Alimentos Ltda",
    sapId: "00045291",
    lastContact: "22/05/2024",
    badges: ["BOOST PLAN EM ABERTO"],
    statusIcon: "priority_high",
    statusColor: "text-tertiary",
    statusBg: "bg-error-container",
    mainBadge: { text: "SHARE CRÍTICO", icon: "warning", bg: "bg-tertiary-container", textCol: "text-white" },
    isPriority: true,
  },
  {
    id: "p2",
    name: "Distribuidora de Bebidas Vale do Sol",
    sapId: "00082134",
    lastContact: "15/05/2024",
    badges: ["POTENCIAL DE UPSELL", "POSITIVADO HOJE"],
    statusIcon: "priority_high",
    statusColor: "text-tertiary",
    statusBg: "bg-error-container",
    mainBadge: { text: "SHARE CRÍTICO", icon: "warning", bg: "bg-tertiary-container", textCol: "text-white" },
    isPriority: true,
  },
  {
    id: "p3",
    name: "Conveniência Posto Ipiranga R10",
    sapId: "00109922",
    lastContact: "19/05/2024",
    badges: ["SEM PENDÊNCIAS"],
    statusIcon: "trending_up",
    statusColor: "text-primary",
    statusBg: "bg-primary/10",
    mainBadge: { text: "OPORTUNIDADE DE SHARE", icon: "", bg: "bg-primary/10", textCol: "text-primary" },
    isPriority: false,
  },
  {
    id: "p4",
    name: "Supermercado Silva e Filhos",
    sapId: "00033182",
    lastContact: "24/05/2024",
    badges: ["BOOST PLAN EM ABERTO"],
    statusIcon: "add_box",
    statusColor: "text-secondary",
    statusBg: "bg-secondary-container",
    mainBadge: { text: "POTENCIAL DE UPSELL", icon: "", bg: "bg-secondary-container", textCol: "text-secondary" },
    isPriority: false,
  },
  {
    id: "p5",
    name: "Padaria e Lanchonete Alvorada",
    sapId: "00099451",
    lastContact: "10/05/2024",
    badges: [],
    statusIcon: "store",
    statusColor: "text-outline",
    statusBg: "bg-surface-container",
    mainBadge: { text: "SEM PENDÊNCIAS", icon: "", bg: "bg-surface-container-high", textCol: "text-on-surface-variant" },
    isPriority: false,
  },
  ...(() => {
    const tobaccoNames = [
      "Banca do João", "Conveniência Rota 66", "Tabacaria Central", 
      "Posto Estrela do Sul", "Mercadinho São José", "Banca da Praça", 
      "Conveniência 24 Horas", "Tabacaria Premium", "Banca do Parque", 
      "Posto e Conveniência Avenida", "Supermercado Compre Bem", 
      "Banca Central Executiva", "Empório dos Fumos", "Lojinha da Esquina", 
      "Banca do Metrô", "Tabacaria e Café Ouro", "Conveniência Pit Stop", 
      "Banca Jornal e Cia", "Posto Ipiranga Centro", "Banca do Terminal", 
      "Mercado Novo Horizonte", "Tabacaria Charuto's", "Banca Copacabana", 
      "Conveniência Express", "Banca Cultural"
    ];
    return Array.from({ length: 25 }, (_, i) => ({
      id: `p_gen_${i}`,
      name: tobaccoNames[i % tobaccoNames.length],
      sapId: `000${10000 + i}`,
      lastContact: "10/05/2024",
      badges: i % 3 === 0 ? ["BOOST PLAN EM ABERTO"] : [],
      statusIcon: i % 2 === 0 ? "store" : "trending_up",
      statusColor: i % 2 === 0 ? "text-outline" : "text-primary",
      statusBg: i % 2 === 0 ? "bg-surface-container" : "bg-primary/10",
      mainBadge: i % 4 === 0 
        ? { text: "SHARE CRÍTICO", icon: "warning", bg: "bg-tertiary-container", textCol: "text-white" }
        : { text: "SEM PENDÊNCIAS", icon: "", bg: "bg-surface-container-high", textCol: "text-on-surface-variant" },
      isPriority: i % 4 === 0,
    }));
  })()
];
const now = new Date();
const inTwoDays = new Date();
inTwoDays.setDate(now.getDate() + 2);

const initialEvents: CallEvent[] = [
  {
    id: "e1",
    pdvId: "p1",
    client: "Mercado Central de Alimentos Ltda",
    time: "09:00",
    day: now.getDate(),
    month: now.getMonth(),
    year: now.getFullYear(),
    type: "warning",
    status: "Inadimplente",
    sapId: "00045291",
    notes: "Cliente interessado em novo mix.",
    eventTag: "ligacao",
    activities: [
      { id: "a1", text: "Verificar estoque de Lucky Strike", done: false }
    ],
  },
  {
    id: "e2",
    pdvId: "p5",
    client: "Padaria e Lanchonete Alvorada",
    time: "11:30",
    day: inTwoDays.getDate(),
    month: inTwoDays.getMonth(),
    year: inTwoDays.getFullYear(),
    type: "opportunity",
    status: "",
    sapId: "00099451",
    notes: "Foco em positivação.",
    eventTag: "atividade",
    activities: [],
  }
];

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [pdvs] = useState<PDV[]>(initialPdvs);
  const [events, setEvents] = useState<CallEvent[]>(initialEvents);

  const addEvent = (event: CallEvent) => {
    setEvents((prev) => [...prev, event]);
  };

  const updateEvent = (event: CallEvent) => {
    setEvents((prev) => prev.map((e) => (e.id === event.id ? event : e)));
  };

  return (
    <AppContext.Provider value={{ pdvs, events, addEvent, updateEvent }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
