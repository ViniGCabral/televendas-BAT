import { useState } from "react";
import { Outlet } from "react-router-dom";
import { TopNavBar } from "./TopNavBar";
import { Sidebar } from "./Sidebar";

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex w-full h-screen overflow-hidden bg-surface-container-low">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <TopNavBar />
        <main className="flex-1 overflow-y-auto w-full pb-12">
          <div className="pt-8 px-6 max-w-[1600px] mx-auto space-y-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
