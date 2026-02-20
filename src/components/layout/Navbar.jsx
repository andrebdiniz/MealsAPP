import React, { useState } from 'react';
import { Activity, LogOut, Menu, X } from 'lucide-react';

export default function Navbar({
  currentUser,
  logout,
  setCurrentRoute,
  setPartnerApplyType,
  setPartnerApplySubmitted,
  setPreSelectedPlan
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentRoute('HOME')}>
            <Activity className="h-8 w-8 text-green-600 mr-2" />
            <span className="font-bold text-xl text-gray-900">LisboaMealMatch</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {!currentUser ? (
              <>
                <button onClick={() => setCurrentRoute('ABOUT_US')} className="text-gray-600 hover:text-green-600">Quem Somos</button>
                <button onClick={() => setCurrentRoute('HOME')} className="text-gray-600 hover:text-green-600">Para Clientes</button>
                <button onClick={() => { setCurrentRoute('APPLY_PARTNER'); setPartnerApplyType(null); setPartnerApplySubmitted(false); }} className="text-gray-600 hover:text-green-600">Para Parceiros</button>
                <button onClick={() => setCurrentRoute('LOGIN')} className="font-medium text-green-600">Entrar</button>
                <button onClick={() => { setPreSelectedPlan('PREMIUM'); setCurrentRoute('REGISTER_CLIENT'); }} className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
                  Quero um Plano
                </button>
              </>
            ) : (
              <>
                <span className="text-sm text-gray-500">Olá, {currentUser.firstName} {currentUser.lastName} ({currentUser.role})</span>
                <button onClick={() => setCurrentRoute('DASHBOARD')} className="text-gray-600 hover:text-green-600">Dashboard</button>
                <button onClick={logout} className="flex items-center text-red-500 hover:text-red-700">
                  <LogOut className="h-4 w-4 mr-1" /> Sair
                </button>
              </>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {!currentUser ? (
            <>
              <button onClick={() => { setCurrentRoute('ABOUT_US'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-gray-600">Quem Somos</button>
              <button onClick={() => { setCurrentRoute('HOME'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-gray-600">Para Clientes</button>
              <button onClick={() => { setCurrentRoute('APPLY_PARTNER'); setPartnerApplyType(null); setPartnerApplySubmitted(false); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-gray-600">Para Parceiros</button>
              <button onClick={() => { setCurrentRoute('LOGIN'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 font-medium text-green-600">Entrar</button>
              <button onClick={() => { setPreSelectedPlan('PREMIUM'); setCurrentRoute('REGISTER_CLIENT'); setMobileMenuOpen(false); }} className="block w-full text-center mt-4 bg-green-600 text-white px-4 py-2 rounded-lg">
                Quero um Plano
              </button>
            </>
          ) : (
            <>
              <button onClick={() => { setCurrentRoute('DASHBOARD'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-gray-600">Dashboard</button>
              <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-red-500">Sair</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
