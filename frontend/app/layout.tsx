"use client";
import { AuthProvider } from "../context/AuthContext";
import Header from "./components/Header";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

// Polished Footer
function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-blue-100 mt-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto p-6 flex flex-col sm:flex-row justify-between items-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} StartupBenefits. All rights reserved.</p>
        <div className="mt-2 sm:mt-0 flex gap-4">
          <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
