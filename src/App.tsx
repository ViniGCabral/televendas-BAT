import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { ListaPDVs } from "./pages/ListaPDVs";
import { Agenda } from "./pages/Agenda";
import { AppProvider } from "./context/AppContext";
import { LanguageProvider } from "./context/LanguageContext";

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
          </Routes>
        </Router>
      </AppProvider>
    </LanguageProvider>
  );
}

export default App;
