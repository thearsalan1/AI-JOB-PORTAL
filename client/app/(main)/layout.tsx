"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../components/Main/Sidebar";
import Header from "../components/Main/Header";
import Footer from "../components/Main/Footer";
import { HiOutlineMenuAlt2, HiX } from "react-icons/hi";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidebar, setShowSidebar] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShowSidebar(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen relative">
      {/* {showSidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )} */}

      <aside
        className={`fixed max-h-screen bg-white inset-y-0 left-0 w-64 border-r border-gray-300 z-50
    transform transition-transform duration-200 ease-in-out
    md:translate-x-0 md:z-auto md:w-64 md:shrink-0
    ${showSidebar ? "translate-x-0" : "hidden"}`}
      >
        <Sidebar />
      </aside>

      <div className="flex flex-col flex-1 min-w-0">
        <header className="w-full border-b border-gray-300 bg-white flex items-center justify-between px-2 sm:px-4">
          <button
            className="md:hidden p-2 text-gray-600 shrink-0"
            onClick={() => {
              setShowSidebar((prev) => !prev);
              console.log("showSidebar:", showSidebar);
            }}
            aria-label="Toggle sidebar"
          >
            {showSidebar ? <HiX size={22} /> : <HiOutlineMenuAlt2 size={22} />}
          </button>
          <div className="flex-1 min-w-0">
            <Header />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 bg-gray-100 min-w-0">
          {children}
        </main>

        <footer className="bg-white border-t border-gray-300">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
