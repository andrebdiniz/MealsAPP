import React from 'react';
import { Activity, Mail, MapPin, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h4 className="text-white font-bold text-xl mb-4 flex items-center">
              <Activity className="h-6 w-6 text-green-500 mr-2" />
              LisboaMealMatch
            </h4>
            <p className="max-w-xs text-gray-400">
              A ligar os melhores profissionais de nutrição às cozinhas locais de excelência para lhe entregar o plano alimentar perfeito à sua porta.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Apoio ao Cliente</h4>
            <ul className="space-y-2">
              <li><button className="hover:text-green-400 transition-colors">Termos e Condições</button></li>
              <li><button className="hover:text-green-400 transition-colors">Política de Privacidade</button></li>
              <li><button className="hover:text-green-400 transition-colors">Política de Cookies</button></li>
              <li><button className="hover:text-green-400 transition-colors">Resolução de Litígios</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Empresa</h4>
            <ul className="space-y-2">
              <li className="flex items-center"><Mail className="h-4 w-4 mr-2" /> info@lisboamealmatch.pt</li>
              <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> Sede: Lisboa, Portugal</li>
              <li className="flex items-center text-gray-500 mt-2">NIF: 500 000 000</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} LisboaMealMatch. Todos os direitos reservados.</p>
          <p className="mt-2 md:mt-0 flex items-center">
            <ShieldCheck className="h-4 w-4 mr-1 text-green-500" />
            Plataforma em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD).
          </p>
        </div>
      </div>
    </footer>
  );
}
