import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { ListaPDVs } from "./pages/ListaPDVs";
import { Agenda } from "./pages/Agenda";
import { AppProvider } from "./context/AppContext";
import { LanguageProvider } from "./context/LanguageContext";
import { PdvLayout } from "./pages/pdv/PdvLayout";
import { PdvVisaoGeral } from "./pages/pdv/PdvVisaoGeral";
import { PdvFmc } from "./pages/pdv/PdvFmc";
import { PdvParcerias } from "./pages/pdv/PdvParcerias";

function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="pdvs" element={<ListaPDVs />} />
              <Route path="agenda" element={<Agenda />} />
            </Route>

            <Route path="/pdv/:id" element={<PdvLayout />}>
              <Route index element={<Navigate to="visao-geral" replace />} />
              <Route path="visao-geral" element={<PdvVisaoGeral />} />
              <Route path="fmc" element={<PdvFmc />} />
              <Route path="parcerias" element={<PdvParcerias />} />
            </Route>
          </Routes>
        </Router>
      </AppProvider>
    </LanguageProvider>
  );
}

export default App;
