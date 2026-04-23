import Footer from "../components/Main/Footer";
import Header from "../components/Main/Header";
import Sidebar from "../components/Main/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">

      <aside className="w-64 bg-white border-r border-2 border-gray-300 hidden md:block">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">

        {/* Header */}
        <header className="w-full border-b border-gray-300 bg-white">
          <Header />
        </header>
      {/* Sidebar */}

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 bg-gray-100">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t">
          <Footer />
        </footer>

      </div>
    </div>
  );
}