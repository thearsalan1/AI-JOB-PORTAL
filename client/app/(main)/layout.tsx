"use client";

import { useState } from "react";
import Sidebar from "../components/Main/Sidebar";
import Header from "../components/Main/Header";
import Footer from "../components/Main/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar only visible on md+ OR toggle on mobile */}
      {showSidebar && (
        <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-300 z-50 md:static md:block">
          <Sidebar />
        </aside>
      )}

      <div className="flex flex-col flex-1">
        <header className="w-full border-b border-gray-300 bg-white flex items-center justify-between px-4">
          <Header />
          {/* Mobile toggle button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            ☰
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-6 bg-gray-100">{children}</main>

        <footer className="bg-white border-t border-gray-300">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
