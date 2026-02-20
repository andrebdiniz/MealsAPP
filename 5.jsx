import React, { useState, useEffect, useCallback } from 'react';
import { 
  Menu, X, Check, ChevronRight, User, Users, ClipboardList, 
  Settings, LogOut, ArrowRight, Activity, Calendar, FileText, 
  MapPin, ShieldCheck, Mail, Phone, Heart, Sparkles,
  CreditCard, Apple, Scale, Truck, ShoppingBag,
  ChefHat, Utensils, TrendingUp, Trash2, ArrowLeft, UploadCloud, FileCheck, FileSpreadsheet, Receipt, Plus, Download, Clock, Lock, Eye, Video
} from 'lucide-react';

import Navbar from './src/components/layout/Navbar';
import Footer from './src/components/layout/Footer';
import ProgressChart from './src/components/shared/ProgressChart';
import useAuth from './src/hooks/useAuth';
import { ALL_DISTRICTS, ALLERGY_OPTIONS, DISEASE_OPTIONS, NUTRITION_SPECIALTIES, WEEK_DAYS, defaultDayPlan, defaultPlan, defaultCapacity, defaultSubscriptionSchedule, initialDB } from './src/data/appData';
import { callGemini } from './src/services/geminiService';

// Dados e serviços extraídos para módulos dedicados.

// ==========================================
// 2. MAIN APP COMPONENT & STATE
// ==========================================
export default function App() {
  const [db, setDb] = useState(initialDB);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRoute, setCurrentRoute] = useState('HOME');
  const [preSelectedPlan, setPreSelectedPlan] = useState('PREMIUM');

  // Estados para a página de candidatura de parceiros
  const [partnerApplyType, setPartnerApplyType] = useState(null);
  const [partnerApplySubmitted, setPartnerApplySubmitted] = useState(false);

  // Mantém o estado dos separadores globalmente para não voltarem ao início ao guardar dados
  const [clientTab, setClientTab] = useState('OVERVIEW');
  const [adminTab, setAdminTab] = useState('OVERVIEW');
  const [adminPartnerFilter, setAdminPartnerFilter] = useState('ALL');

  // Garante que o ecrã sobe para o topo sempre que se muda de página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentRoute]);

  const updateDB = useCallback((newData) => {
    setDb((prevDb) => ({ ...prevDb, ...newData }));
  }, []);

  const { login, loginWithGoogle, loginWithApple, logout } = useAuth({
    db,
    setCurrentUser,
    setCurrentRoute,
    updateDB
  });

  // ==========================================
  // 4. PUBLIC PAGES & REGISTRATION
  // ==========================================
  const AboutUsPage = () => (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Cabeçalho */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">A Nossa Missão</h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Acreditar que a alimentação saudável não tem de ser uma dor de cabeça. Unimos a ciência da nutrição à conveniência das refeições preparadas.
          </p>
        </div>

        {/* O Problema & A Solução */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">O Problema</h3>
              <p className="text-gray-600 leading-relaxed">
                Quantas vezes foi ao nutricionista, recebeu um plano alimentar incrível, mas desistiu na segunda semana por não ter tempo de cozinhar, pesar alimentos e organizar as marmitas para o trabalho? A falta de tempo é o maior inimigo da consistência.
              </p>
            </div>
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-bold text-green-600 mb-4">A Nossa Solução</h3>
              <p className="text-gray-600 leading-relaxed">
                Criámos a LisboaMealMatch para fechar esta falha. Ligamos os melhores profissionais de nutrição diretamente a cozinhas locais de excelência. O seu plano é traçado pelo nutricionista e executado rigorosamente pela cozinha. Você só tem de receber e saborear.
              </p>
            </div>
          </div>
        </div>

        {/* Valores */}
        <div>
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-10">Os Nossos Pilares</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Saúde em 1º Lugar</h4>
              <p className="text-sm text-gray-500">Acompanhamento real por profissionais certificados.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                <ShieldCheck className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Confiança</h4>
              <p className="text-sm text-gray-500">Parceiros rigorosamente selecionados e validados por nós.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mb-4">
                <ChefHat className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Qualidade Local</h4>
              <p className="text-sm text-gray-500">Apoio ao comércio e cozinhas locais da zona de Lisboa.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 mb-4">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Conveniência</h4>
              <p className="text-sm text-gray-500">Sem stress, sem sujar a cozinha. Pronto a comer e a evoluir.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-green-600 rounded-2xl shadow-lg p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Pronto para transformar a sua rotina?</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Estamos a dar os primeiros passos nesta grande missão de simplificar a alimentação em Lisboa. Junte-se aos nossos primeiros clientes, transforme a sua rotina e faça parte do nosso crescimento.
          </p>
          <button 
            onClick={() => { setPreSelectedPlan('PREMIUM'); setCurrentRoute('REGISTER_CLIENT'); }} 
            className="bg-white text-green-600 font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-50 transition transform hover:-translate-y-1"
          >
            Quero começar agora
          </button>
        </div>

      </div>
    </div>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">A nutrição e as marmitas,</span>
            <span className="block text-green-600">totalmente coordenadas.</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Em Lisboa, ligamos os melhores nutricionistas e as melhores cozinhas a si. Um plano alimentar feito à sua medida, entregue à sua porta.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-full shadow">
              <button onClick={() => { setPreSelectedPlan('PREMIUM'); setCurrentRoute('REGISTER_CLIENT'); }} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10">
                Começar agora
              </button>
            </div>
            <div className="mt-3 rounded-full shadow sm:mt-0 sm:ml-3">
              <button onClick={() => { setCurrentRoute('APPLY_PARTNER'); setPartnerApplyType(null); setPartnerApplySubmitted(false); }} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-green-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                Sou Parceiro
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing/Plans Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">Escolha o seu plano</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Standard Plan */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col">
            <h3 className="text-2xl font-bold text-gray-900">Standard</h3>
            <p className="mt-4 text-gray-500 flex-1">Acesso à nossa rede de cozinhas parceiras. Refeições saudáveis prontas a comer.</p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start"><Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"/> <span className="text-gray-600">Matching com Cozinha Parceira</span></li>
              <li className="flex items-start"><Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"/> <span className="text-gray-600">Personalização de intolerâncias</span></li>
              <li className="flex items-start text-gray-400"><X className="h-5 w-5 mr-2 flex-shrink-0"/> <span>Sem acompanhamento nutricional</span></li>
            </ul>
            <button onClick={() => { setPreSelectedPlan('STANDARD'); setCurrentRoute('REGISTER_CLIENT'); }} className="mt-8 w-full bg-green-50 text-green-700 font-bold py-3 rounded-xl hover:bg-green-100 transition">
              Escolher Standard
            </button>
          </div>
          
          {/* Premium Plan */}
          <div className="bg-green-600 rounded-2xl shadow-xl p-8 flex flex-col transform md:-translate-y-4 border-2 border-green-500">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">Premium</h3>
              <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold tracking-wide uppercase">Recomendado</span>
            </div>
            <p className="mt-4 text-green-100 flex-1">Nutricionista dedicado + refeições preparadas à medida das suas macros.</p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start"><Check className="h-5 w-5 text-white mr-2 flex-shrink-0"/> <span className="text-white">Matching com Nutricionista</span></li>
              <li className="flex items-start"><Check className="h-5 w-5 text-white mr-2 flex-shrink-0"/> <span className="text-white">Plano alimentar 100% à medida</span></li>
              <li className="flex items-start"><Check className="h-5 w-5 text-white mr-2 flex-shrink-0"/> <span className="text-white">Matching com Cozinha Parceira</span></li>
              <li className="flex items-start"><Check className="h-5 w-5 text-white mr-2 flex-shrink-0"/> <span className="text-white">Comunicação e ajustes contínuos</span></li>
            </ul>
            <button onClick={() => { setPreSelectedPlan('PREMIUM'); setCurrentRoute('REGISTER_CLIENT'); }} className="mt-8 w-full bg-white text-green-600 font-bold py-3 rounded-xl hover:bg-gray-50 transition shadow-md">
              Escolher Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Iniciar Sessão</h2>
          <p className="mt-2 text-center text-sm text-gray-600">admin@lisboafit.pt | joao@nutri.pt | carlos@email.com (pass: 123)</p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); login(email, password); }}>
              <div><label className="block text-sm font-medium text-gray-700">Email</label><input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" /></div>
              <div><label className="block text-sm font-medium text-gray-700">Palavra-passe</label><input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" /></div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">Entrar</button>
            </form>
            <div className="mt-6">
              <div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Ou</span></div></div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button onClick={loginWithGoogle} className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Google
                </button>
                <button onClick={loginWithApple} className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                  Apple
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RegisterClientPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      firstName: '', lastName: '', email: '', password: '', plan: preSelectedPlan, goal: 'Perder Peso', 
      gender: '', age: '', deliveryDistrict: '',
      selectedAllergies: [], otherAllergies: '',
      selectedDiseases: [], otherDiseases: '',
      consent: false
    });

    const handleCheckboxChange = (field, value) => {
      setFormData(prev => {
        const currentList = prev[field];
        if (currentList.includes(value)) {
          return { ...prev, [field]: currentList.filter(item => item !== value) };
        } else {
          return { ...prev, [field]: [...currentList, value] };
        }
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const newUser = { id: Date.now(), firstName: formData.firstName, lastName: formData.lastName, email: formData.email, role: 'CLIENT', password: formData.password };
      const newClient = { 
        id: Date.now(), userId: newUser.id, status: 'LEAD', planType: formData.plan, deliveryMethod: 'DELIVERY', city: formData.deliveryDistrict,
        deliveryAddress: { district: formData.deliveryDistrict, city: '', street: '', zipCode: '', door: '', floor: '' },
        intake: { 
          goal: formData.goal, gender: formData.gender, age: formData.age, weight: '', height: '',
          allergies: formData.selectedAllergies, otherAllergies: formData.otherAllergies, 
          diseases: formData.selectedDiseases, otherDiseases: formData.otherDiseases 
        } 
      };
      updateDB({ users: [...db.users, newUser], clients: [...db.clients, newClient] });
      setCurrentUser(newUser); 
      setCurrentRoute('REGISTRATION_SUCCESS'); 
    };

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-green-600 py-6 px-8 text-white"><h2 className="text-2xl font-bold">Quero um Plano</h2><p className="opacity-90 mt-1">Passo {step} de 3</p></div>
          <div className="p-8">
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Selecione o seu plano inicial</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div onClick={() => setFormData({...formData, plan: 'STANDARD'})} className={`p-4 border-2 rounded-lg cursor-pointer transition ${formData.plan === 'STANDARD' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}><h4 className="font-bold text-gray-900">Standard</h4><p className="text-sm text-gray-500 mt-1">Apenas refeições.</p></div>
                  <div onClick={() => setFormData({...formData, plan: 'PREMIUM'})} className={`p-4 border-2 rounded-lg cursor-pointer transition ${formData.plan === 'PREMIUM' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}><h4 className="font-bold text-gray-900">Premium</h4><p className="text-sm text-gray-500 mt-1">Nutricionista + Refeições.</p></div>
                </div>
                <button onClick={() => setStep(2)} className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800">Continuar</button>
              </div>
            )}
            {step === 2 && (
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                <h3 className="text-lg font-medium text-gray-900">Dados da Conta</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700">Nome</label><input required type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium text-gray-700">Apelido</label><input required type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} /></div>
                </div>
                <div><label className="block text-sm font-medium text-gray-700">Email</label><input required type="email" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
                <div><label className="block text-sm font-medium text-gray-700">Palavra-passe</label><input required type="password" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} /></div>
                <div className="flex gap-4 mt-6">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg">Voltar</button>
                  <button type="submit" className="flex-1 bg-gray-900 text-white py-3 rounded-lg">Continuar</button>
                </div>
              </form>
            )}
            {step === 3 && (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <h3 className="text-lg font-medium text-gray-900">O seu perfil</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Género</label>
                    <select required className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                      <option value="">Selecione...</option><option>Feminino</option><option>Masculino</option><option>Outro</option><option>Prefiro não dizer</option>
                    </select>
                  </div>
                  <div><label className="block text-sm font-medium text-gray-700">Idade</label><input required type="number" min="16" max="120" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} /></div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alergias ou Intolerâncias (Opcional)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                    {ALLERGY_OPTIONS.map(option => (
                      <label key={option} className="flex items-center text-sm text-gray-600"><input type="checkbox" className="mr-2 rounded text-green-600" checked={formData.selectedAllergies.includes(option)} onChange={() => handleCheckboxChange('selectedAllergies', option)} />{option}</label>
                    ))}
                  </div>
                  <input type="text" placeholder="Outras..." className="mt-2 block w-full border border-gray-300 rounded-md py-2 px-3 text-sm" value={formData.otherAllergies} onChange={e => setFormData({...formData, otherAllergies: e.target.value})} />
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700">Distrito de Entrega</label>
                  <select required className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 bg-white" value={formData.deliveryDistrict} onChange={e => setFormData({...formData, deliveryDistrict: e.target.value})}>
                    <option value="">Onde pretende receber as refeições?</option>{ALL_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {formData.deliveryDistrict && (
                    <div className="mt-3">
                      {db.settings.availableDistricts?.includes(formData.deliveryDistrict) 
                        ? <p className="text-sm text-green-700 flex items-start font-medium"><Check className="h-5 w-5 mr-1 flex-shrink-0"/> Boas notícias! Já operamos em {formData.deliveryDistrict}.</p>
                        : <p className="text-sm text-orange-700 flex items-start"><MapPin className="h-5 w-5 mr-1 flex-shrink-0 mt-0.5"/> Ainda não operamos em {formData.deliveryDistrict}. O seu perfil ficará em lista de espera!</p>}
                    </div>
                  )}
                </div>
                <div className="flex items-start mt-2">
                   <div className="flex items-center h-5"><input required id="consent" type="checkbox" className="h-4 w-4 text-green-600 rounded" checked={formData.consent} onChange={e => setFormData({...formData, consent: e.target.checked})} /></div>
                   <div className="ml-3 text-sm"><label htmlFor="consent" className="font-medium text-gray-700">Consentimento RGPD</label></div>
                </div>
                <div className="flex gap-4 mt-6"><button type="button" onClick={() => setStep(2)} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg">Voltar</button><button type="submit" className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold">Concluir Registo</button></div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ApplyPartnerPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [partnerType, setPartnerType] = useState(null);
    const [selectedSpecialties, setSelectedSpecialties] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
      // Quando a página carrega ou o componente remonta, garantir que começamos na landing
      setShowForm(false);
      setPartnerType(null);
      setSubmitted(false);
    }, []);

    const handleSpecialtyChange = (spec) => {
      setSelectedSpecialties(prev => prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]);
    };

    if (submitted) return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-md">
          <Check className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-2">Enviado com Sucesso!</h2>
          <p className="text-gray-500 mb-8">Analisaremos a sua candidatura e entraremos em contacto brevemente.</p>
          <button onClick={() => setCurrentRoute('HOME')} className="text-green-600 font-bold hover:underline">Voltar ao Início</button>
        </div>
      </div>
    );

    if (!showForm) {
      return (
        <div className="min-h-screen bg-gray-50 py-16 px-4">
          <div className="max-w-5xl mx-auto space-y-20">
            
            {/* Hero Section */}
            <div className="text-center">
              <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Junte-se à Rede LisboaMealMatch</h1>
              <p className="text-xl text-gray-500 leading-relaxed max-w-3xl mx-auto">
                Aumente a sua faturação, simplifique a sua operação e faça parte do futuro da alimentação saudável e conveniente em Lisboa.
              </p>
            </div>

            {/* O Contributo */}
            <div className="bg-white p-10 md:p-14 rounded-3xl shadow-sm border border-gray-100 text-center">
              <Heart className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-6">O Seu Contributo para a Mudança</h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                Na LisboaMealMatch, acreditamos que a barreira principal para uma vida saudável não é a falta de vontade, mas a falta de tempo. Ao juntar-se à nossa rede, <b>o seu talento</b> passa a ser a solução. Os Nutricionistas traçam o caminho com ciência, e as Cozinhas materializam esse caminho com sabor. Juntos, acabamos com as desculpas e mudamos a saúde dos lisboetas, uma marmita de cada vez.
              </p>
            </div>

            {/* A Simplificação do Processo */}
            <div>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">A Simplificação do Ecossistema</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-blue-600 w-10 h-10" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">1. Captação</h4>
                  <p className="text-sm text-gray-500">Nós angariamos o cliente e fazemos o <i>matching</i> inteligente com o seu perfil.</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Apple className="text-green-600 w-10 h-10" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">2. Prescrição</h4>
                  <p className="text-sm text-gray-500">O Nutricionista usa o nosso portal para definir metas, ementas e instruções facilmente.</p>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ChefHat className="text-orange-600 w-10 h-10" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">3. Preparação</h4>
                  <p className="text-sm text-gray-500">A Cozinha recebe as indicações exatas e prepara as refeições com a máxima antecedência.</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="text-purple-600 w-10 h-10" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">4. Evolução</h4>
                  <p className="text-sm text-gray-500">O cliente atinge resultados, a cozinha garante volume fixo e a retenção do nutricionista dispara.</p>
                </div>
              </div>
            </div>

            {/* Vantagens Exclusivas */}
            <div>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Vantagens Exclusivas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
                  <Apple className="h-12 w-12 text-green-600 mb-6" />
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Para Nutricionistas</h3>
                  <ul className="space-y-6 text-gray-600">
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-green-500 mr-4 flex-shrink-0 mt-0.5" /> 
                      <div>
                        <b className="block text-gray-900 text-lg mb-1">Aumento drástico da retenção</b>
                        <p>Os seus pacientes deixam de desistir do plano por "falta de tempo para cozinhar".</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-green-500 mr-4 flex-shrink-0 mt-0.5" /> 
                      <div>
                        <b className="block text-gray-900 text-lg mb-1">Zero atrito tecnológico</b>
                        <p>Prescreva na nossa plataforma web, e a cozinha trata imediatamente da logística.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-green-500 mr-4 flex-shrink-0 mt-0.5" /> 
                      <div>
                        <b className="block text-gray-900 text-lg mb-1">Novos clientes recorrentes</b>
                        <p>Receba novos pacientes encaminhados diretamente pelo nosso algoritmo de <i>matching</i>.</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
                  <ChefHat className="h-12 w-12 text-orange-500 mb-6" />
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Para Cozinhas & Restaurantes</h3>
                  <ul className="space-y-6 text-gray-600">
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-orange-500 mr-4 flex-shrink-0 mt-0.5" /> 
                      <div>
                        <b className="block text-gray-900 text-lg mb-1">Receita e volume previsíveis</b>
                        <p>Encomendas semanais fixas, permitindo-lhe planear ingredientes e evitar desperdício.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-orange-500 mr-4 flex-shrink-0 mt-0.5" /> 
                      <div>
                        <b className="block text-gray-900 text-lg mb-1">Novas opções de ementa</b>
                        <p>Acesso a menus e orientações otimizadas por nutricionistas de excelência.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-orange-500 mr-4 flex-shrink-0 mt-0.5" /> 
                      <div>
                        <b className="block text-gray-900 text-lg mb-1">Maior rentabilidade</b>
                        <p>Otimize a capacidade ociosa da sua cozinha e staff fora das horas normais de ponta.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-3xl p-12 text-center text-white shadow-xl">
              <h2 className="text-3xl font-bold mb-6">Pronto para dar o próximo passo?</h2>
              <p className="text-gray-400 mb-10 max-w-2xl mx-auto">A submissão é gratuita. Após a candidatura, a nossa equipa entrará em contacto para uma breve validação técnica e logística antes de lhe dar acesso ao portal.</p>
              <button onClick={() => { setShowForm(true); window.scrollTo(0,0); }} className="bg-green-600 text-white font-bold py-4 px-12 rounded-full shadow-lg hover:bg-green-700 transition scale-110">
                Iniciar Candidatura
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {!partnerType ? (
            <div>
              <div className="flex items-center mb-10 border-b pb-6">
                <button onClick={() => setShowForm(false)} className="mr-6 text-gray-400 hover:text-green-600 p-2 hover:bg-gray-200 rounded-full transition"><ArrowLeft className="w-6 h-6"/></button>
                <h3 className="text-3xl font-bold text-gray-900">Qual é o seu perfil profissional?</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div onClick={() => setPartnerType('NUTRITIONIST')} className="bg-white p-12 rounded-3xl shadow-sm border-2 border-transparent cursor-pointer text-center hover:border-green-500 transition-all hover:shadow-xl group">
                  <Apple className="h-16 w-16 text-green-600 mx-auto mb-6 group-hover:scale-110 transition" /><h3 className="text-2xl font-bold">Sou Nutricionista</h3>
                </div>
                <div onClick={() => setPartnerType('KITCHEN')} className="bg-white p-12 rounded-3xl shadow-sm border-2 border-transparent cursor-pointer text-center hover:border-orange-500 transition-all hover:shadow-xl group">
                  <ChefHat className="h-16 w-16 text-orange-500 mx-auto mb-6 group-hover:scale-110 transition" /><h3 className="text-2xl font-bold">Sou Cozinha / Restaurante</h3>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex items-center mb-10 border-b pb-6">
                <button onClick={() => setPartnerType(null)} className="mr-6 text-gray-400 hover:text-green-600 p-2 hover:bg-gray-50 rounded-full transition"><ArrowLeft className="w-6 h-6"/></button>
                <h3 className="text-3xl font-bold text-gray-900">Candidatura: {partnerType === 'NUTRITIONIST' ? 'Nutricionista' : 'Cozinha'}</h3>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-8">
                
                {partnerType === 'NUTRITIONIST' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">Nome / Empresa</label><input required type="text" className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500" /></div>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">Email</label><input required type="email" className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500" /></div>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">Telemóvel</label><input required type="tel" className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500" /></div>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">Instagram ou Website</label><input type="text" className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500" placeholder="@seuinstagram ou www.site.pt" /></div>
                    </div>
                    
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">Nº Cédula Profissional</label><input required type="text" className="w-full md:w-1/2 border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500" /></div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-4">Especialidades</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {NUTRITION_SPECIALTIES.map(s => (
                          <label key={s} className="text-sm flex items-center p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition">
                            <input type="checkbox" className="mr-3 h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500" onChange={() => handleSpecialtyChange(s)} /> {s}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Anexar Currículo</label>
                      <input type="file" accept=".pdf,.doc,.docx" className="w-full md:w-1/2 border border-gray-300 rounded-xl p-2 outline-none focus:ring-2 focus:ring-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition cursor-pointer" />
                    </div>
                  </div>
                )}

                {partnerType === 'KITCHEN' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">Nome Completo / Restaurante / Empresa</label><input required type="text" className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500" /></div>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">Email Profissional</label><input required type="email" className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500" /></div>
                    </div>
                    
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">Morada</label><input required type="text" className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500" placeholder="Rua, Número, Código Postal, Localidade" /></div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Capacidade de Produção Estimada (refeições / dia)</label>
                      <input type="number" required min="1" className="w-full sm:w-1/2 border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500" placeholder="Ex: 50" />
                    </div>

                    <div className="flex items-center mt-2 p-4 bg-orange-50 rounded-xl border border-orange-100">
                      <input type="checkbox" id="macros-checkbox" className="h-5 w-5 text-orange-600 rounded border-gray-300 focus:ring-orange-500 cursor-pointer" />
                      <label htmlFor="macros-checkbox" className="ml-3 block text-sm font-bold text-gray-800 cursor-pointer">
                        Temos capacidade de fazer refeições à medida (macros)
                      </label>
                    </div>
                  </div>
                )}

                <button type="submit" className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-black transition">Submeter Candidatura</button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ==========================================
  // 5. DASHBOARDS
  // ==========================================
  const DashboardRouter = () => {
    if (!currentUser) return <HomePage />;
    if (currentUser.role === 'ADMIN') return <AdminDashboard />;
    if (currentUser.role === 'PARTNER') return <PartnerDashboard />;
    if (currentUser.role === 'CLIENT') return <ClientDashboard />;
    return null;
  };

  // --- CLIENT DASHBOARD (REFATORADO COM TABS) ---
  const ClientDashboard = () => {
    const clientData = db.clients.find(c => c.userId === currentUser.id) || db.clients[0];
    const activeTab = clientTab;
    const setActiveTab = setClientTab;
    
    // Form States
    const [biometrics, setBiometrics] = useState({ age: clientData?.intake?.age || '', gender: clientData?.intake?.gender || '', weight: clientData?.intake?.weight || '', height: clientData?.intake?.height || '' });
    const [dietary, setDietary] = useState({ goal: clientData?.intake?.goal || 'Perder Peso', allergies: clientData?.intake?.allergies || [], otherAllergies: clientData?.intake?.otherAllergies || '', diseases: clientData?.intake?.diseases || [], otherDiseases: clientData?.intake?.otherDiseases || '' });
    const [subscription, setSubscription] = useState({ 
      planType: clientData?.planType || 'STANDARD', 
      deliveryMethod: clientData?.deliveryMethod || 'DELIVERY',
      schedule: clientData?.subscriptionSchedule || defaultSubscriptionSchedule
    });
    const [personal, setPersonal] = useState({ firstName: currentUser?.firstName || '', lastName: currentUser?.lastName || '', phone: currentUser?.phone || '', deliveryStreet: clientData?.deliveryAddress?.street || '', deliveryDoor: clientData?.deliveryAddress?.door || '', deliveryFloor: clientData?.deliveryAddress?.floor || '', deliveryDistrict: clientData?.deliveryAddress?.district || '', deliveryZipCode: clientData?.deliveryAddress?.zipCode || '', deliveryCity: clientData?.deliveryAddress?.city || '' });
    const [billing, setBilling] = useState({ nif: clientData?.billing?.nif || '', address: clientData?.billing?.address || '', name: clientData?.billing?.name || `${currentUser?.firstName} ${currentUser?.lastName}` });

    // Estado para o plano de refeições e consultas
    const [selectedDay, setSelectedDay] = useState('Segunda');
    const [newProgress, setNewProgress] = useState({ date: new Date().toISOString().split('T')[0], weight: '', waist: '' });

    const myConsultations = db.consultations?.filter(c => c.clientId === clientData.id).sort((a,b) => new Date(a.date) - new Date(b.date)) || [];

    if (!clientData) return <div className="p-8">Perfil não encontrado.</div>;

    const handleSaveGeneral = (section) => {
      let updatedClients = [...db.clients];
      let updatedUsers = [...db.users];

      if (section === 'BIOMETRICS') {
        updatedClients = updatedClients.map(c => c.id === clientData.id ? { ...c, intake: { ...c.intake, age: biometrics.age, gender: biometrics.gender, weight: biometrics.weight, height: biometrics.height } } : c);
      } else if (section === 'DIETARY') {
        updatedClients = updatedClients.map(c => c.id === clientData.id ? { ...c, intake: { ...c.intake, goal: dietary.goal, allergies: dietary.allergies, otherAllergies: dietary.otherAllergies, diseases: dietary.diseases, otherDiseases: dietary.otherDiseases } } : c);
      } else if (section === 'SUBSCRIPTION') {
        updatedClients = updatedClients.map(c => c.id === clientData.id ? { ...c, planType: subscription.planType, deliveryMethod: subscription.deliveryMethod, subscriptionSchedule: subscription.schedule } : c);
      } else if (section === 'PERSONAL') {
        updatedUsers = updatedUsers.map(u => u.id === currentUser.id ? { ...u, firstName: personal.firstName, lastName: personal.lastName, phone: personal.phone } : u);
        updatedClients = updatedClients.map(c => c.id === clientData.id ? { ...c, deliveryAddress: { street: personal.deliveryStreet, door: personal.deliveryDoor, floor: personal.deliveryFloor, district: personal.deliveryDistrict, zipCode: personal.deliveryZipCode, city: personal.deliveryCity } } : c);
        setCurrentUser({ ...currentUser, firstName: personal.firstName, lastName: personal.lastName, phone: personal.phone });
      } else if (section === 'BILLING') {
        updatedClients = updatedClients.map(c => c.id === clientData.id ? { ...c, billing: { nif: billing.nif, address: billing.address, name: billing.name } } : c);
      }

      updateDB({ users: updatedUsers, clients: updatedClients });
      alert('Dados guardados com sucesso!');
    };

    const handleAddProgress = (e) => {
      e.preventDefault();
      if (!newProgress.weight) return;

      const newEntry = {
        id: Date.now(),
        date: newProgress.date,
        weight: parseFloat(newProgress.weight),
        waist: newProgress.waist ? parseFloat(newProgress.waist) : null
      };

      const currentProgress = clientData.progress || [];
      const updatedClients = db.clients.map(c => 
        c.id === clientData.id ? { ...c, progress: [...currentProgress, newEntry] } : c
      );
      
      updateDB({ clients: updatedClients });
      setNewProgress({ date: new Date().toISOString().split('T')[0], weight: '', waist: '' });
    };

    const handleDeleteProgress = (progressId) => {
      const updatedClients = db.clients.map(c => 
        c.id === clientData.id ? { ...c, progress: c.progress.filter(p => p.id !== progressId) } : c
      );
      updateDB({ clients: updatedClients });
    };

    const handleDietaryCheckbox = (field, value) => {
      setDietary(prev => {
        const list = prev[field];
        return { ...prev, [field]: list.includes(value) ? list.filter(i => i !== value) : [...list, value] };
      });
    };

    const toggleShareProgress = () => {
      const newStatus = !clientData.shareProgress;
      const updatedClients = db.clients.map(c => 
        c.id === clientData.id ? { ...c, shareProgress: newStatus } : c
      );
      updateDB({ clients: updatedClients });
    };

    const handleApprovePlan = () => {
      if (!clientData.nutritionalPlan) return;
      const updatedClients = db.clients.map(c => 
        c.id === clientData.id ? { ...c, nutritionalPlan: { ...c.nutritionalPlan, isPlanApproved: true } } : c
      );
      updateDB({ clients: updatedClients });
      alert('Plano aprovado com sucesso! A cozinha foi notificada para iniciar a preparação.');
    };

    const handleScheduleChange = (day, meal, isChecked) => {
      setSubscription(prev => ({
        ...prev,
        schedule: {
          ...prev.schedule,
          [day]: {
            ...prev.schedule[day],
            [meal]: isChecked
          }
        }
      }));
    };

    // Preços Simulados Dinâmicos
    const calculateTotal = () => {
      let weeklyMealsCost = 0;
      if (subscription.schedule) {
        WEEK_DAYS.forEach(day => {
          if (subscription.schedule[day].breakfast) weeklyMealsCost += 3.5;
          if (subscription.schedule[day].lunch) weeklyMealsCost += 7.5;
          if (subscription.schedule[day].snack) weeklyMealsCost += 2.5;
          if (subscription.schedule[day].dinner) weeklyMealsCost += 7.5;
        });
      }
      const monthlyMealsCost = weeklyMealsCost * 4; // 4 semanas por mês
      const basePlanCost = subscription.planType === 'PREMIUM' ? 49.99 : 0; // Taxa de acompanhamento do Nutricionista
      const deliveryCost = subscription.deliveryMethod === 'DELIVERY' ? 29.99 : 0;
      return (monthlyMealsCost + basePlanCost + deliveryCost).toFixed(2);
    };
    
    const totalMes = calculateTotal();

    const TABS = [
      { id: 'OVERVIEW', label: 'Visão Geral', icon: <Activity className="w-4 h-4 mr-2" /> },
      ...(clientData.planType === 'PREMIUM' ? [{ id: 'MEAL_PLAN', label: 'O Meu Plano', icon: <FileText className="w-4 h-4 mr-2" /> }] : []),
      ...(clientData.planType === 'PREMIUM' ? [{ id: 'CONSULTATIONS', label: 'Consultas', icon: <Calendar className="w-4 h-4 mr-2" /> }] : []),
      { id: 'SUBSCRIPTION', label: 'Subscrição', icon: <ShoppingBag className="w-4 h-4 mr-2" /> },
      { id: 'DIETARY', label: 'Alimentação', icon: <Apple className="w-4 h-4 mr-2" /> },
      { id: 'BIOMETRICS', label: 'Medidas Base', icon: <Scale className="w-4 h-4 mr-2" /> },
      { id: 'PROGRESS', label: 'O Meu Progresso', icon: <TrendingUp className="w-4 h-4 mr-2" /> },
      { id: 'BILLING', label: 'Faturação', icon: <Receipt className="w-4 h-4 mr-2" /> },
      { id: 'PERSONAL', label: 'Dados & Moradas', icon: <User className="w-4 h-4 mr-2" /> }
    ];

    return (
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Menu Lateral */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-20">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 truncate">{currentUser.firstName} {currentUser.lastName}</h3>
              <p className="text-sm text-gray-500 truncate">{currentUser.email}</p>
            </div>
            <nav className="flex flex-col p-2 space-y-1">
              {TABS.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === tab.id ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                  {tab.icon} {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1">
          {activeTab === 'OVERVIEW' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-6">Estado do Serviço</h2>
              <div className="mb-6">
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${clientData.status === 'ACTIVE' || clientData.status === 'IN_PROGRESS' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {clientData.status === 'LEAD' ? 'Em Análise' : clientData.status === 'PENDING_MATCH' ? 'A aguardar Matching' : 'Ativo / Em Progresso'}
                </span>
              </div>
              <p className="text-gray-600 mb-6">O seu plano atual é o <strong>{clientData.planType}</strong> com <strong>{clientData.deliveryMethod === 'DELIVERY' ? 'Entrega em Casa' : 'Recolha na Cozinha'}</strong>.</p>
              
              {(clientData.status === 'ACTIVE' || clientData.status === 'IN_PROGRESS') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                     <h4 className="font-bold text-gray-900 flex items-center mb-3"><Heart className="h-5 w-5 mr-2 text-green-500"/> Nutricionista Atribuído</h4>
                     <p className="text-sm text-gray-600 mb-3">João Nutri (Especialista em Perda de Peso)</p>
                     <button className="text-sm text-green-600 font-bold flex items-center hover:underline"><Phone className="h-4 w-4 mr-1"/> Contactar via WhatsApp</button>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                     <h4 className="font-bold text-gray-900 flex items-center mb-3"><FileText className="h-5 w-5 mr-2 text-orange-500"/> Cozinha Atribuída</h4>
                     <p className="text-sm text-gray-600 mb-3">Healthy Kitchen LX</p>
                     <p className="text-xs text-gray-500">A preparar as suas refeições semanais.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'MEAL_PLAN' && clientData.planType === 'PREMIUM' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-6">O Meu Plano Alimentar</h2>
              
              {!clientData.nutritionalPlan ? (
                <div className="bg-gray-50 rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-500">
                  <FileText className="h-10 w-10 mx-auto text-gray-300 mb-3" />
                  <p className="text-lg">O seu nutricionista ainda está a desenhar o seu plano.</p>
                  <p className="text-sm mt-1">Assim que estiver concluído, aparecerá aqui para a sua aprovação.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  
                  {/* Approval Banner */}
                  {!clientData.nutritionalPlan.isPlanApproved ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
                      <div>
                        <h4 className="font-bold text-yellow-900 text-lg flex items-center"><ClipboardList className="w-5 h-5 mr-2"/> Validação Necessária</h4>
                        <p className="text-yellow-800 text-sm mt-1">Reveja o plano sugerido pelo seu nutricionista. Se estiver de acordo, aprove para que a cozinha receba indicação para avançar.</p>
                      </div>
                      <button onClick={handleApprovePlan} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-lg transition shadow-sm whitespace-nowrap">
                        Aprovar Plano para a Cozinha
                      </button>
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex items-center shadow-sm">
                      <div className="bg-green-500 rounded-full p-1.5 mr-4 flex-shrink-0">
                        <Check className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-green-900 text-lg">Plano Aprovado e Em Vigor</h4>
                        <p className="text-green-800 text-sm mt-0.5">A cozinha e o nutricionista estão sincronizados. As suas refeições seguirão estas orientações.</p>
                      </div>
                    </div>
                  )}

                  {/* Plan Content */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                        {WEEK_DAYS.map(day => (
                          <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${selectedDay === day ? 'bg-green-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                      {clientData.nutritionalPlan.calories && (
                         <div className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm text-center flex-shrink-0">
                           Meta: {clientData.nutritionalPlan.calories} kcal
                         </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {['breakfast', 'lunch', 'snack', 'dinner'].map(meal => (
                        <div key={meal} className="bg-gray-50 border border-gray-100 p-5 rounded-2xl">
                          <h5 className="font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2 text-sm uppercase tracking-wider">
                            {meal === 'breakfast' ? 'Pequeno-Almoço' : meal === 'snack' ? 'Lanches' : meal === 'lunch' ? 'Almoço' : 'Jantar'}
                          </h5>
                          <div className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                            {clientData.nutritionalPlan.days[selectedDay]?.[meal] || 'Sem prescrição específica.'}
                          </div>
                        </div>
                      ))}
                    </div>

                    {clientData.nutritionalPlan.notes && (
                      <div className="mt-6 bg-blue-50 border border-blue-100 p-5 rounded-2xl">
                        <h5 className="font-bold text-blue-900 mb-2 flex items-center text-sm uppercase tracking-wider">
                          <FileText className="w-4 h-4 mr-2"/> Notas do Nutricionista
                        </h5>
                        <div className="whitespace-pre-wrap text-sm text-blue-800">
                          {clientData.nutritionalPlan.notes}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              )}
            </div>
          )}

          {activeTab === 'CONSULTATIONS' && clientData.planType === 'PREMIUM' && (
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-2">As Minhas Consultas</h2>
                <p className="text-gray-500 text-sm mb-6">Acompanhe os seus próximos agendamentos e reveja as notas partilhadas pelo seu nutricionista.</p>

                {myConsultations.length === 0 ? (
                  <div className="bg-gray-50 rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
                    <Calendar className="h-10 w-10 mx-auto text-gray-300 mb-3" />
                    <p>Ainda não tem consultas agendadas.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {myConsultations.map(cons => (
                      <div key={cons.id} className={`border rounded-2xl p-6 shadow-sm ${cons.status === 'COMPLETED' ? 'bg-gray-50 border-gray-200' : 'bg-white border-green-200'}`}>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                          <div className="flex items-center">
                            <div className={`p-3 rounded-xl mr-4 ${cons.status === 'COMPLETED' ? 'bg-gray-200 text-gray-500' : 'bg-green-100 text-green-700'}`}>
                              <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-lg">{new Date(cons.date).toLocaleDateString('pt-PT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                              <p className="text-gray-500 flex items-center mt-1"><Clock className="w-4 h-4 mr-1"/> {cons.time} {cons.status === 'COMPLETED' ? '(Realizada)' : '(Agendada)'}</p>
                            </div>
                          </div>
                          {cons.status === 'SCHEDULED' && (
                            <button className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center hover:bg-green-100 transition">
                              <Video className="w-4 h-4 mr-2"/> Aceder à Videochamada
                            </button>
                          )}
                        </div>

                        {cons.sharedNotes && (
                          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mt-4">
                            <h5 className="font-bold text-blue-900 text-sm flex items-center mb-2"><Eye className="w-4 h-4 mr-2"/> Notas do Nutricionista (Pós-Consulta)</h5>
                            <p className="text-blue-800 text-sm whitespace-pre-wrap leading-relaxed">{cons.sharedNotes}</p>
                          </div>
                        )}
                        {!cons.sharedNotes && cons.status === 'COMPLETED' && (
                          <p className="text-sm text-gray-400 italic">O nutricionista não deixou notas partilhadas para esta consulta.</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'SUBSCRIPTION' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-6">A Minha Subscrição</h2>
              
              {clientData.deliveryAddress?.district && !db.settings.availableDistricts?.includes(clientData.deliveryAddress?.district) && (
                <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-start text-orange-800">
                  <MapPin className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold">Distrito Indisponível ({clientData.deliveryAddress?.district})</h4>
                    <p className="text-sm mt-1">De momento, ainda não fazemos entregas na sua área. Pode configurar a sua subscrição na mesma, ela ficará em lista de espera e avisaremos assim que a nossa rede chegar até si!</p>
                  </div>
                </div>
              )}

              <div className="space-y-8">
                {/* Escolha do Plano */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-4">1. Tipo de Plano Base</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div onClick={() => setSubscription({...subscription, planType: 'STANDARD'})} className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${subscription.planType === 'STANDARD' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-gray-900 text-lg">Standard</h4>
                        <span className="text-lg font-bold text-green-700">0€<span className="text-sm text-gray-500 font-normal">/mês (taxa base)</span></span>
                      </div>
                      <p className="text-sm text-gray-600">Acesso à rede de cozinhas. Paga apenas as refeições que selecionar no calendário abaixo.</p>
                    </div>
                    <div onClick={() => setSubscription({...subscription, planType: 'PREMIUM'})} className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${subscription.planType === 'PREMIUM' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                       <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-gray-900 text-lg">Premium</h4>
                        <span className="text-lg font-bold text-green-700">49.99€<span className="text-sm text-gray-500 font-normal">/mês (taxa base)</span></span>
                      </div>
                      <p className="text-sm text-gray-600">Inclui acompanhamento por nutricionista e plano 100% à medida. Acresce o valor das refeições.</p>
                    </div>
                  </div>
                </div>

                {/* Método de Entrega */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-4">2. Método de Receção</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div onClick={() => setSubscription({...subscription, deliveryMethod: 'PICKUP'})} className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${subscription.deliveryMethod === 'PICKUP' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                      <ShoppingBag className={`h-8 w-8 mr-4 ${subscription.deliveryMethod === 'PICKUP' ? 'text-green-600' : 'text-gray-400'}`} />
                      <div>
                        <h4 className="font-bold text-gray-900">Recolha na Cozinha</h4>
                        <p className="text-sm text-gray-500">Grátis</p>
                      </div>
                    </div>
                    <div onClick={() => setSubscription({...subscription, deliveryMethod: 'DELIVERY'})} className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${subscription.deliveryMethod === 'DELIVERY' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                      <Truck className={`h-8 w-8 mr-4 ${subscription.deliveryMethod === 'DELIVERY' ? 'text-green-600' : 'text-gray-400'}`} />
                      <div>
                        <h4 className="font-bold text-gray-900">Entrega ao Domicílio</h4>
                        <p className="text-sm text-gray-500">+29.99€ / mês</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Personalização das Refeições */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-4">3. Calendário de Refeições</h3>
                  <p className="text-sm text-gray-500 mb-4">Selecione para que dias e momentos pretende receber marmitas. O valor será somado à taxa base do seu plano.</p>
                  <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-bold text-gray-700">Dia da Semana</th>
                          <th className="px-4 py-3 text-center font-bold text-gray-700">P. Almoço <span className="block text-xs font-normal text-gray-400">+3.50€/dia</span></th>
                          <th className="px-4 py-3 text-center font-bold text-gray-700">Almoço <span className="block text-xs font-normal text-gray-400">+7.50€/dia</span></th>
                          <th className="px-4 py-3 text-center font-bold text-gray-700">Lanche <span className="block text-xs font-normal text-gray-400">+2.50€/dia</span></th>
                          <th className="px-4 py-3 text-center font-bold text-gray-700">Jantar <span className="block text-xs font-normal text-gray-400">+7.50€/dia</span></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 bg-white">
                        {WEEK_DAYS.map(day => (
                          <tr key={day} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 font-medium text-gray-900">{day}</td>
                            {['breakfast', 'lunch', 'snack', 'dinner'].map(meal => (
                              <td key={meal} className="px-4 py-3 text-center">
                                <label className="inline-flex items-center cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                                    checked={subscription.schedule?.[day]?.[meal] || false}
                                    onChange={(e) => handleScheduleChange(day, meal, e.target.checked)}
                                  />
                                </label>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Resumo */}
                <div className="bg-gray-900 text-white p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Valor Estimado (Base + Refeições)</p>
                    <p className="text-3xl font-bold">{totalMes}€ <span className="text-sm font-normal">/ mês</span></p>
                  </div>
                  <button onClick={() => handleSaveGeneral('SUBSCRIPTION')} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors w-full md:w-auto shadow-md">
                    Guardar e Atualizar Subscrição
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'DIETARY' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-6">Preferências Alimentares</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Objetivo Principal</label>
                  <select className="block w-full max-w-sm border border-gray-300 rounded-md py-2 px-3 focus:ring-green-500 focus:border-green-500" value={dietary.goal} onChange={e => setDietary({...dietary, goal: e.target.value})}>
                    <option>Perder Peso</option><option>Manter</option><option>Ganhar Massa Muscular</option><option>Performance Desportiva</option>
                  </select>
                </div>

                <hr className="border-gray-100" />
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Alergias ou Intolerâncias</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                    {ALLERGY_OPTIONS.map(opt => (
                      <label key={opt} className="flex items-center text-sm text-gray-700 cursor-pointer">
                        <input type="checkbox" className="mr-2 h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500" checked={dietary.allergies.includes(opt)} onChange={() => handleDietaryCheckbox('allergies', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                  <input type="text" placeholder="Outras alergias ou alimentos que detesta (Opcional)..." className="mt-2 block w-full border border-gray-300 rounded-md py-2 px-3" value={dietary.otherAllergies} onChange={e => setDietary({...dietary, otherAllergies: e.target.value})} />
                </div>

                <hr className="border-gray-100" />

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Doenças ou Condições Clínicas</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                    {DISEASE_OPTIONS.map(opt => (
                      <label key={opt} className="flex items-center text-sm text-gray-700 cursor-pointer">
                        <input type="checkbox" className="mr-2 h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500" checked={dietary.diseases.includes(opt)} onChange={() => handleDietaryCheckbox('diseases', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                  <input type="text" placeholder="Outras condições (Opcional)..." className="mt-2 block w-full border border-gray-300 rounded-md py-2 px-3" value={dietary.otherDiseases} onChange={e => setDietary({...dietary, otherDiseases: e.target.value})} />
                </div>

                <div className="flex justify-end pt-4">
                  <button onClick={() => handleSaveGeneral('DIETARY')} className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700">Guardar Alimentação</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'BIOMETRICS' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-2">Dados Biométricos Iniciais</h2>
              <p className="text-gray-500 text-sm mb-6">Esta é a sua base. Se pretende registar a sua evolução ao longo do tempo, use o separador "O Meu Progresso".</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Idade</label>
                  <input type="number" className="block w-full border border-gray-300 rounded-md py-2 px-3" value={biometrics.age} onChange={e => setBiometrics({...biometrics, age: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Género</label>
                  <select className="block w-full border border-gray-300 rounded-md py-2 px-3" value={biometrics.gender} onChange={e => setBiometrics({...biometrics, gender: e.target.value})}>
                    <option value="">Selecione...</option><option>Feminino</option><option>Masculino</option><option>Outro</option><option>Prefiro não dizer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Peso Inicial (kg)</label>
                  <input type="number" step="0.1" placeholder="Ex: 70.5" className="block w-full border border-gray-300 rounded-md py-2 px-3" value={biometrics.weight} onChange={e => setBiometrics({...biometrics, weight: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Altura (cm)</label>
                  <input type="number" placeholder="Ex: 175" className="block w-full border border-gray-300 rounded-md py-2 px-3" value={biometrics.height} onChange={e => setBiometrics({...biometrics, height: e.target.value})} />
                </div>
              </div>

              <div className="flex justify-start pt-8">
                <button onClick={() => handleSaveGeneral('BIOMETRICS')} className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700">Guardar Medidas Iniciais</button>
              </div>
            </div>
          )}

          {activeTab === 'PROGRESS' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-xl font-bold">O Meu Progresso</h2>
                
                {/* Interruptor de Partilha */}
                {(clientData.status === 'ACTIVE' || clientData.status === 'IN_PROGRESS') && clientData.planType === 'PREMIUM' && (
                  <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                    <div className="mr-3 text-sm">
                      <span className="block font-bold text-gray-800">Partilhar com Nutricionista</span>
                      <span className="text-gray-500 text-xs">Permite ao seu profissional ver este histórico.</span>
                    </div>
                    <button 
                      onClick={toggleShareProgress}
                      className={`w-12 h-6 rounded-full relative transition-colors duration-300 focus:outline-none ${clientData.shareProgress ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-300 ${clientData.shareProgress ? 'translate-x-7' : 'translate-x-1'}`}></div>
                    </button>
                  </div>
                )}
              </div>
              
              {/* Gráfico de Evolução */}
              <div className="mb-10">
                <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Evolução de Peso</h3>
                <ProgressChart data={clientData.progress} />
              </div>

              {/* Formulário para Adicionar */}
              <div className="bg-green-50 p-6 rounded-xl border border-green-100 mb-10">
                <h3 className="text-md font-bold text-green-900 mb-4">Adicionar novo registo</h3>
                <form onSubmit={handleAddProgress} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                    <input type="date" required className="block w-full border border-gray-300 rounded-md py-2 px-3" value={newProgress.date} onChange={e => setNewProgress({...newProgress, date: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
                    <input type="number" step="0.1" required placeholder="Ex: 82.5" className="block w-full border border-gray-300 rounded-md py-2 px-3" value={newProgress.weight} onChange={e => setNewProgress({...newProgress, weight: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cintura (cm) <span className="font-normal text-gray-400">Opcional</span></label>
                    <input type="number" step="0.1" placeholder="Ex: 90" className="block w-full border border-gray-300 rounded-md py-2 px-3" value={newProgress.waist} onChange={e => setNewProgress({...newProgress, waist: e.target.value})} />
                  </div>
                  <div>
                    <button type="submit" className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition">Registar</button>
                  </div>
                </form>
              </div>

              {/* Tabela Histórica */}
              {clientData.progress && clientData.progress.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Histórico de Medidas</h3>
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Data</th>
                          <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Peso</th>
                          <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Cintura</th>
                          <th className="px-6 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[...clientData.progress].sort((a, b) => new Date(b.date) - new Date(a.date)).map(p => (
                          <tr key={p.id}>
                            <td className="px-6 py-3 whitespace-nowrap font-medium text-gray-900">{new Date(p.date).toLocaleDateString('pt-PT')}</td>
                            <td className="px-6 py-3 whitespace-nowrap">{p.weight} kg</td>
                            <td className="px-6 py-3 whitespace-nowrap text-gray-500">{p.waist ? `${p.waist} cm` : '-'}</td>
                            <td className="px-6 py-3 whitespace-nowrap text-right">
                              <button onClick={() => handleDeleteProgress(p.id)} className="text-red-500 hover:text-red-700 transition">
                                <Trash2 className="h-4 w-4 inline" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'BILLING' && (
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-6">Métodos de Pagamento</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {clientData.paymentMethods?.map(pm => (
                    <div key={pm.id} className="border border-green-500 bg-green-50 rounded-xl p-5 flex items-center justify-between shadow-sm">
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-lg border border-gray-200 mr-4">
                           <CreditCard className="w-6 h-6 text-gray-700" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{pm.brand} terminando em {pm.last4}</p>
                          <p className="text-sm text-gray-500">Expira a {pm.expiry}</p>
                        </div>
                      </div>
                      {pm.isDefault && <span className="bg-green-200 text-green-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">Principal</span>}
                    </div>
                  ))}
                  <button className="border-2 border-dashed border-gray-300 rounded-xl p-5 flex flex-col items-center justify-center text-gray-500 hover:border-green-500 hover:text-green-600 transition bg-gray-50 hover:bg-green-50 min-h-[100px]">
                    <Plus className="w-6 h-6 mb-2" />
                    <span className="font-bold">Adicionar Novo Cartão</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-6">Dados de Faturação</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nome na Fatura</label>
                    <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-green-500 focus:border-green-500" value={billing.name} onChange={e => setBilling({...billing, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">NIF</label>
                    <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-green-500 focus:border-green-500" value={billing.nif} onChange={e => setBilling({...billing, nif: e.target.value})} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Morada de Faturação</label>
                    <input type="text" placeholder="Rua, Código Postal, Cidade" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-green-500 focus:border-green-500" value={billing.address} onChange={e => setBilling({...billing, address: e.target.value})} />
                  </div>
                </div>
                <div className="flex justify-end mt-6 pt-6 border-t border-gray-100">
                  <button onClick={() => handleSaveGeneral('BILLING')} className="bg-gray-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-black transition shadow-sm">
                    Guardar Faturação
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-6">Histórico de Faturas</h2>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase tracking-wider">Documento</th>
                        <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase tracking-wider">Data</th>
                        <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase tracking-wider">Valor</th>
                        <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase tracking-wider">Estado</th>
                        <th className="px-6 py-3 text-right font-bold text-gray-700 uppercase tracking-wider">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {clientData.invoices && clientData.invoices.length > 0 ? clientData.invoices.map(inv => (
                        <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{inv.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">{new Date(inv.date).toLocaleDateString('pt-PT')}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-mono font-bold">{inv.amount}€</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${inv.status === 'Pago' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-yellow-100 text-yellow-800 border border-yellow-200'}`}>
                              {inv.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button className="text-gray-500 hover:text-green-600 flex items-center justify-end w-full font-bold transition-colors">
                              <Download className="w-4 h-4 mr-1.5" /> PDF
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500 italic">Ainda não existem faturas emitidas nesta conta.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'PERSONAL' && (
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-6">Contactos e Moradas</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="block text-sm font-medium text-gray-700">Nome</label><input required type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" value={personal.firstName} onChange={e => setPersonal({...personal, firstName: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium text-gray-700">Apelido</label><input required type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" value={personal.lastName} onChange={e => setPersonal({...personal, lastName: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium text-gray-700">Email (Não editável)</label><input disabled type="email" className="mt-1 block w-full border border-gray-200 bg-gray-50 text-gray-500 rounded-md py-2 px-3" value={currentUser.email} /></div>
                  <div><label className="block text-sm font-medium text-gray-700">Telemóvel</label><input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" value={personal.phone} onChange={e => setPersonal({...personal, phone: e.target.value})} /></div>
                </div>
                
                <hr className="border-gray-100" />
                <h4 className="font-bold text-gray-800">Morada de Entrega</h4>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                  <div className="md:col-span-4"><label className="block text-sm font-medium text-gray-700">Rua</label><input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" value={personal.deliveryStreet} onChange={e => setPersonal({...personal, deliveryStreet: e.target.value})} /></div>
                  <div className="md:col-span-1"><label className="block text-sm font-medium text-gray-700">Nº</label><input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" value={personal.deliveryDoor} onChange={e => setPersonal({...personal, deliveryDoor: e.target.value})} /></div>
                  <div className="md:col-span-1"><label className="block text-sm font-medium text-gray-700">Andar</label><input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" value={personal.deliveryFloor} onChange={e => setPersonal({...personal, deliveryFloor: e.target.value})} /></div>
                  <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">Código Postal</label><input type="text" placeholder="0000-000" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" value={personal.deliveryZipCode} onChange={e => setPersonal({...personal, deliveryZipCode: e.target.value})} /></div>
                  <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">Localidade</label><input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" value={personal.deliveryCity} onChange={e => setPersonal({...personal, deliveryCity: e.target.value})} /></div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Distrito</label>
                    <select required className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 bg-white" value={personal.deliveryDistrict} onChange={e => setPersonal({...personal, deliveryDistrict: e.target.value})}>
                      <option value="">Selecione...</option>
                      {ALL_DISTRICTS.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    {personal.deliveryDistrict && !db.settings.availableDistricts?.includes(personal.deliveryDistrict) && (
                      <p className="mt-2 text-xs text-orange-600 flex items-start">
                        <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                        Ainda não operamos neste distrito.
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-6 mt-6 border-t border-gray-100">
                  <button onClick={() => handleSaveGeneral('PERSONAL')} className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 shadow-sm transition">
                    Guardar Dados Pessoais
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    );
  };

  // --- PARTNER DASHBOARD ---
  const PartnerDashboard = () => {
    const partnerData = db.partners.find(p => p.userId === currentUser.id);
    const [activeTab, setActiveTab] = useState('OVERVIEW');
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedDay, setSelectedDay] = useState('Segunda');
    const [planData, setPlanData] = useState(defaultPlan);

    // Estado para Consultas
    const [isEditingConsultation, setIsEditingConsultation] = useState(false);
    const [consultationForm, setConsultationForm] = useState({ id: null, clientId: '', date: '', time: '', status: 'SCHEDULED', sharedNotes: '', privateNotes: '' });

    // Estado para novo prato da Ementa
    const [newDish, setNewDish] = useState({ name: '', description: '', category: 'Almoço/Jantar', kcal: '', prot: '', carb: '', fat: '' });

    // Prepara as especialidades existentes para o formulário
    const existingSpecialties = partnerData?.details?.specialties || [];
    const predefinedSpecs = existingSpecialties.filter(s => NUTRITION_SPECIALTIES.includes(s));
    const customSpecs = existingSpecialties.filter(s => !NUTRITION_SPECIALTIES.includes(s)).join(', ');

    // Prepara a capacidade existente ou assume o formato por defeito
    const initialCapacity = (partnerData?.details?.capacity && typeof partnerData.details.capacity === 'object') 
      ? partnerData.details.capacity 
      : defaultCapacity;

    const defaultDocs = partnerData?.type === 'NUTRITIONIST'
      ? { cedula: '', financas: '', seguro: '', identificacao: '' }
      : { haccp: '', financas: '', alvara: '', registo: '' };

    const [profileData, setProfileData] = useState({
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      phone: partnerData?.phone || '',
      nif: partnerData?.details?.nif || '',
      address: partnerData?.details?.address || '',
      experienceYears: partnerData?.details?.experienceYears || '',
      bio: partnerData?.details?.bio || '',
      selectedSpecialties: predefinedSpecs,
      otherSpecialties: customSpecs,
      businessName: partnerData?.details?.businessName || '',
      capacity: initialCapacity,
      documents: partnerData?.details?.documents || defaultDocs
    });

    if (!partnerData) return <div className="p-8">Perfil não encontrado.</div>;

    const myMatches = db.matchings.filter(m => partnerData.type === 'NUTRITIONIST' ? m.nutriId === partnerData.id : m.kitchenId === partnerData.id);
    const myClients = myMatches.map(m => {
      const client = db.clients.find(c => c.id === m.clientId);
      const user = db.users.find(u => u.id === client?.userId);
      return { match: m, client, user };
    }).filter(item => item.client && item.user);

    // Cálculos para o Dashboard e Agrupamento
    const premiumClients = myClients.filter(c => c.client.planType === 'PREMIUM');
    const standardClients = myClients.filter(c => c.client.planType === 'STANDARD');
    
    // Nova variável para aceder à rede de cozinhas e respetivos menus
    const activeKitchens = db.partners.filter(p => p.type === 'KITCHEN' && p.status === 'ACTIVE');

    // Consultas do Nutricionista
    const myConsultations = db.consultations?.filter(c => c.nutriId === partnerData.id).sort((a,b) => new Date(a.date) - new Date(b.date)) || [];

    const goalsCount = myClients.reduce((acc, curr) => {
      const goal = curr.client.intake.goal || 'Não definido';
      acc[goal] = (acc[goal] || 0) + 1;
      return acc;
    }, {});

    const handleSelectClient = (item) => {
      setSelectedClient(item);
      setSelectedDay('Segunda');
      
      // Compatibilidade com dados antigos / Criação de novo plano
      if (item.client.nutritionalPlan && item.client.nutritionalPlan.days) {
        setPlanData(item.client.nutritionalPlan);
      } else if (item.client.nutritionalPlan) {
        // Se ainda for o plano antigo plano espalmado, converte-o para a "Segunda"
        const legacy = item.client.nutritionalPlan;
        setPlanData({
          calories: legacy.calories || '',
          notes: legacy.notes || '',
          days: { ...defaultPlan.days, 'Segunda': { breakfast: legacy.breakfast || '', lunch: legacy.lunch || '', snack: legacy.snack || '', dinner: legacy.dinner || '' } }
        });
      } else {
        setPlanData(defaultPlan);
      }
    };

    const handleSavePlan = () => {
      if (!selectedClient) return;
      
      // Atualiza base de dados com a nova estrutura semanal
      const updatedPlan = { ...planData, isPlanApproved: false };
      
      const updatedClients = db.clients.map(c => 
        c.id === selectedClient.client.id ? { ...c, nutritionalPlan: updatedPlan } : c
      );
      
      updateDB({ clients: updatedClients });
      
      setSelectedClient({ ...selectedClient, client: { ...selectedClient.client, nutritionalPlan: updatedPlan } });
      alert('Plano alimentar guardado com sucesso! Foi enviado um pedido de aprovação para o cliente.');
    };

    const handleDownloadProductionPlan = () => {
      // 1. Cabeçalhos do Excel (CSV) atualizados com método de entrega
      let csvContent = "Dia da Semana;Cliente;Metodo Entrega;Refeicao;Detalhes do Prato;Notas Globais\n";
      
      let hasData = false;

      // 2. Iterar por cada dia da semana para agrupar logicamente
      WEEK_DAYS.forEach(day => {
        myClients.forEach(({ client, user }) => {
          // Apenas incluímos se o plano existir e estiver aprovado
          if (client.nutritionalPlan && client.nutritionalPlan.isPlanApproved && client.nutritionalPlan.days[day]) {
            const dayPlan = client.nutritionalPlan.days[day];
            const globalNotes = (client.nutritionalPlan.notes || '').replace(/\n/g, ' ').replace(/;/g, ',');
            const delivery = client.deliveryMethod === 'DELIVERY' ? 'Domicilio' : 'Recolha na Cozinha';
            
            // Mapear cada momento de refeição
            const meals = [
              { key: 'breakfast', label: 'Pequeno-Almoço' },
              { key: 'lunch', label: 'Almoço' },
              { key: 'snack', label: 'Lanche' },
              { key: 'dinner', label: 'Jantar' }
            ];

            meals.forEach(mealInfo => {
              const mealContent = dayPlan[mealInfo.key];
              if (mealContent && mealContent.trim() !== '') {
                hasData = true;
                // Limpar quebras de linha e pontos e vírgulas para não quebrar o CSV
                const cleanContent = mealContent.replace(/\n/g, ' | ').replace(/;/g, ',');
                const clientName = `${user.firstName} ${user.lastName}`;
                
                csvContent += `${day};${clientName};${delivery};${mealInfo.label};${cleanContent};${globalNotes}\n`;
              }
            });
          }
        });
      });

      if (!hasData) {
        alert("Ainda não existem refeições com planos aprovados pelos clientes para exportar.");
        return;
      }

      // 3. Criar e descarregar o ficheiro (com BOM para o Excel ler o UTF-8 corretamente)
      const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Lista_de_Producao_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const handleSaveConsultation = (e) => {
      e.preventDefault();
      if (!consultationForm.clientId || !consultationForm.date || !consultationForm.time) {
        alert('Por favor preencha o Cliente, a Data e a Hora da consulta.'); return;
      }
      
      let updatedConsultations = db.consultations || [];
      if (consultationForm.id) {
        updatedConsultations = updatedConsultations.map(c => c.id === consultationForm.id ? { ...consultationForm } : c);
      } else {
        updatedConsultations = [...updatedConsultations, { ...consultationForm, id: Date.now(), nutriId: partnerData.id }];
      }
      
      updateDB({ consultations: updatedConsultations });
      setIsEditingConsultation(false);
      alert('Consulta guardada com sucesso!');
    };

    const handleDeleteConsultation = (id) => {
      if(window.confirm('Tem a certeza que deseja apagar este agendamento?')) {
        updateDB({ consultations: db.consultations.filter(c => c.id !== id) });
      }
    };

    const handlePlanDayChange = (field, value) => {
      setPlanData(prev => ({
        ...prev,
        days: {
          ...prev.days,
          [selectedDay]: {
            ...prev.days[selectedDay],
            [field]: value
          }
        }
      }));
    };

    const handleCapacityChange = (day, meal, value) => {
      setProfileData(prev => ({
        ...prev,
        capacity: {
          ...prev.capacity,
          [day]: {
            ...prev.capacity[day],
            [meal]: value
          }
        }
      }));
    };

    const handleFileUpload = (docType, e) => {
      if (e.target.files && e.target.files[0]) {
        setProfileData(prev => ({
          ...prev,
          documents: { ...prev.documents, [docType]: e.target.files[0].name }
        }));
      }
    };

    const handleSaveProfile = (e) => {
      e.preventDefault();
      
      const updatedUsers = db.users.map(u => 
        u.id === currentUser.id ? { ...u, firstName: profileData.firstName, lastName: profileData.lastName } : u
      );
      
      const updatedPartners = db.partners.map(p => {
        if (p.id !== partnerData.id) return p;
        const updatedDetails = { ...p.details };
        
        updatedDetails.nif = profileData.nif;
        updatedDetails.address = profileData.address;

        if (p.type === 'NUTRITIONIST') {
          let finalSpecs = [...profileData.selectedSpecialties];
          if (profileData.otherSpecialties.trim()) {
            finalSpecs.push(profileData.otherSpecialties.trim());
          }
          updatedDetails.specialties = finalSpecs;
          updatedDetails.experienceYears = profileData.experienceYears;
          updatedDetails.bio = profileData.bio;
        } else {
          updatedDetails.businessName = profileData.businessName;
          updatedDetails.capacity = profileData.capacity;
          updatedDetails.documents = profileData.documents;
        }
        return { ...p, phone: profileData.phone, details: updatedDetails };
      });

      updateDB({ users: updatedUsers, partners: updatedPartners });
      setCurrentUser({ ...currentUser, firstName: profileData.firstName, lastName: profileData.lastName });
      alert('O seu perfil foi atualizado com sucesso!');
    };

    const handleProfileSpecialtyChange = (spec) => {
      setProfileData(prev => {
        const list = prev.selectedSpecialties;
        return { 
          ...prev, 
          selectedSpecialties: list.includes(spec) ? list.filter(s => s !== spec) : [...list, spec] 
        };
      });
    };

    const handleAddDish = (e) => {
      e.preventDefault();
      if (!newDish.name) return;

      const newDishItem = { id: Date.now(), ...newDish };
      const updatedPartners = db.partners.map(p => {
        if (p.id === partnerData.id) {
          return { ...p, details: { ...p.details, menu: [...(p.details.menu || []), newDishItem] } };
        }
        return p;
      });
      
      updateDB({ partners: updatedPartners });
      setNewDish({ name: '', description: '', category: 'Almoço/Jantar', kcal: '', prot: '', carb: '', fat: '' });
    };

    const handleMenuBulkUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Simulação do tempo de processamento de um Excel
      setTimeout(() => {
        const newDishes = [
          { id: Date.now() + 1, name: 'Bacalhau à Brás Saudável (Importado)', description: 'Receita tradicional adaptada com batata doce palha e ovos.', category: 'Almoço/Jantar', kcal: 420, prot: 32, carb: 35, fat: 16 },
          { id: Date.now() + 2, name: 'Panquecas de Aveia (Importado)', description: 'Panquecas ricas em proteína com calda de frutos vermelhos.', category: 'Pequeno-Almoço', kcal: 310, prot: 20, carb: 40, fat: 8 }
        ];

        const updatedPartners = db.partners.map(p => {
          if (p.id === partnerData.id) {
            return { ...p, details: { ...p.details, menu: [...(p.details.menu || []), ...newDishes] } };
          }
          return p;
        });
        
        updateDB({ partners: updatedPartners });
        alert(`Ficheiro "${file.name}" processado com sucesso! Foram importados 2 pratos de exemplo.`);
      }, 500);
      
      e.target.value = ''; // Limpa o input para permitir uploads repetidos do mesmo ficheiro
    };

    const handleDeleteDish = (id) => {
      const updatedPartners = db.partners.map(p => {
        if (p.id === partnerData.id) {
          return { ...p, details: { ...p.details, menu: (p.details.menu || []).filter(d => d.id !== id) } };
        }
        return p;
      });
      updateDB({ partners: updatedPartners });
    };

    const TABS = [
      { id: 'OVERVIEW', label: 'Visão Geral', icon: <Activity className="w-4 h-4 mr-2" /> },
      ...(partnerData.status === 'ACTIVE' ? [{ id: 'CLIENTS', label: 'Os Meus Clientes', icon: <Users className="w-4 h-4 mr-2" /> }] : []),
      ...(partnerData.status === 'ACTIVE' && partnerData.type === 'NUTRITIONIST' ? [{ id: 'CONSULTATIONS', label: 'Agenda & Consultas', icon: <Calendar className="w-4 h-4 mr-2" /> }] : []),
      ...(partnerData.status === 'ACTIVE' && partnerData.type === 'NUTRITIONIST' ? [{ id: 'KITCHENS', label: 'Rede de Cozinhas', icon: <ChefHat className="w-4 h-4 mr-2" /> }] : []),
      ...(partnerData.status === 'ACTIVE' && partnerData.type === 'KITCHEN' ? [{ id: 'MENU', label: 'Ementa', icon: <Utensils className="w-4 h-4 mr-2" /> }] : []),
      ...(partnerData.status === 'ACTIVE' && partnerData.type === 'KITCHEN' ? [{ id: 'CAPACITY', label: 'Produção', icon: <ClipboardList className="w-4 h-4 mr-2" /> }] : []),
      ...(partnerData.status === 'ACTIVE' ? [{ id: 'DOCS', label: 'Documentação', icon: <FileCheck className="w-4 h-4 mr-2" /> }] : []),
      { id: 'PROFILE', label: 'Editar Perfil', icon: <Settings className="w-4 h-4 mr-2" /> }
    ];

    // Calcula os dados da tabela de produção para visualização
    const productionRows = WEEK_DAYS.flatMap(day => {
      let rows = [];
      myClients.forEach(({ client, user }) => {
        if (client.nutritionalPlan?.isPlanApproved && client.nutritionalPlan.days[day]) {
          const dPlan = client.nutritionalPlan.days[day];
          const mealLabels = { breakfast: 'P. Almoço', lunch: 'Almoço', snack: 'Lanche', dinner: 'Jantar' };
          ['breakfast', 'lunch', 'snack', 'dinner'].forEach(m => {
            if (dPlan[m] && dPlan[m].trim()) {
              rows.push({
                id: `${day}-${client.id}-${m}`,
                day,
                clientName: `${user.firstName} ${user.lastName}`,
                delivery: client.deliveryMethod === 'DELIVERY' ? 'Domicílio' : 'Recolha',
                mealType: mealLabels[m],
                content: dPlan[m]
              });
            }
          });
        }
      });
      return rows;
    });

    return (
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Menu Lateral */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-20">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 truncate">
                {partnerData.type === 'KITCHEN' && profileData.businessName ? profileData.businessName : `${currentUser.firstName} ${currentUser.lastName}`}
              </h3>
              <p className="text-sm text-gray-500 truncate">{partnerData.type === 'NUTRITIONIST' ? 'Nutricionista' : 'Cozinha'}</p>
            </div>
            <nav className="flex flex-col p-2 space-y-1">
              {TABS.map(tab => (
                <button 
                  key={tab.id} 
                  onClick={() => { setActiveTab(tab.id); setSelectedClient(null); }} 
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === tab.id ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1">
          
          {activeTab === 'OVERVIEW' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Portal do Parceiro</h2>
              {partnerData.status !== 'ACTIVE' ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold mb-4">Estado da Candidatura</h3>
                  {partnerData.status === 'APPLIED' && (
                    <div className="flex items-center p-4 bg-yellow-50 text-yellow-800 rounded-lg">
                      <ClipboardList className="h-6 w-6 mr-3" />
                      <div><p className="font-bold">Em análise técnica</p><p className="text-sm mt-1">Estamos a verificar a documentação submetida.</p></div>
                    </div>
                  )}
                  {partnerData.status === 'PRE_APPROVED' && (
                    <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-start">
                        <Calendar className="h-8 w-8 text-blue-600 mr-4 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-blue-900 text-lg">Parabéns! O seu perfil foi pré-aprovado.</h4>
                          <p className="text-blue-800 mt-2 mb-4">O próximo passo é uma breve conversa para alinhar detalhes de logística.</p>
                          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow-sm flex items-center"><Calendar className="h-4 w-4 mr-2" /> Agendar via Calendly</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex items-center p-4 bg-green-50 text-green-800 rounded-lg mb-8 border border-green-100">
                    <ShieldCheck className="h-6 w-6 mr-3 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-bold">Conta Ativa e Certificada</p>
                      <p className="text-sm mt-1">O seu perfil está visível e a sua área de trabalho está totalmente operacional.</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">A Minha Carteira</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Clients Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-center">
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Clientes</h4>
                      <div className="flex items-end mt-2">
                        <span className="text-4xl font-extrabold text-gray-900">{myClients.length}</span>
                        <Users className="h-6 w-6 text-gray-300 ml-auto mb-1" />
                      </div>
                    </div>
                    
                    {/* Goals Distribution Cards */}
                    {Object.entries(goalsCount).map(([goal, count]) => (
                      <div key={goal} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-t-4 border-t-green-500 flex flex-col justify-center">
                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider line-clamp-1" title={goal}>{goal}</h4>
                        <div className="flex items-end mt-2">
                          <span className="text-4xl font-extrabold text-green-600">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'CLIENTS' && partnerData.status === 'ACTIVE' && (
            <div>
              {!selectedClient ? (
                // --- VISTA MESTRE (GRELHA DE CLIENTES) ---
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Os Meus Clientes</h2>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-bold">{myClients.length} Atribuídos</span>
                  </div>
                  
                  {myClients.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-dashed border-gray-300 p-12 text-center text-gray-500">
                      <Users className="h-10 w-10 mx-auto text-gray-300 mb-3" />
                      Não tem clientes atribuídos de momento.
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {/* Premium Clients Group */}
                      {premiumClients.length > 0 && (
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <Sparkles className="h-5 w-5 text-green-500 mr-2" />
                            Plano Premium ({premiumClients.length})
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {premiumClients.map((item) => (
                              <div 
                                key={item.client.id} 
                                onClick={() => handleSelectClient(item)}
                                className="bg-white rounded-xl shadow-sm border border-green-200 p-6 cursor-pointer hover:border-green-500 hover:shadow-md transition group"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-700 transition-colors">{item.user.firstName} {item.user.lastName}</h3>
                                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-green-500 transition-colors" />
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-1 mb-4"><span className="font-medium text-gray-900">Objetivo:</span> {item.client.intake.goal}</p>
                                <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-auto">
                                  <span className="inline-block px-3 py-1 bg-green-50 text-xs rounded-full text-green-700 font-bold">{item.client.planType}</span>
                                  <span className="text-xs text-gray-400">Ver ficha</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Standard Clients Group */}
                      {standardClients.length > 0 && (
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center border-t border-gray-200 pt-8">
                            <User className="h-5 w-5 text-gray-400 mr-2" />
                            Plano Standard ({standardClients.length})
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {standardClients.map((item) => (
                              <div 
                                key={item.client.id} 
                                onClick={() => handleSelectClient(item)}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:border-gray-400 hover:shadow-md transition group"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-gray-700 transition-colors">{item.user.firstName} {item.user.lastName}</h3>
                                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-1 mb-4"><span className="font-medium text-gray-900">Objetivo:</span> {item.client.intake.goal}</p>
                                <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-auto">
                                  <span className="inline-block px-3 py-1 bg-gray-100 text-xs rounded-full text-gray-700 font-medium">{item.client.planType}</span>
                                  <span className="text-xs text-gray-400">Ver ficha</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                // --- VISTA DE DETALHE DO CLIENTE ---
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                    <button 
                      onClick={() => setSelectedClient(null)} 
                      className="text-gray-600 hover:text-green-600 font-medium flex items-center text-sm transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" /> Voltar à lista de clientes
                    </button>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Ficha de Cliente</span>
                  </div>

                  <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-1">{selectedClient.user.firstName} {selectedClient.user.lastName}</h2>
                      <p className="text-gray-500 flex items-center">
                        <Mail className="w-4 h-4 mr-1" /> {selectedClient.user.email} 
                        <span className="mx-2">•</span> 
                        <Phone className="w-4 h-4 mr-1" /> {selectedClient.user.phone || 'Sem telemóvel registado'}
                      </p>
                    </div>
                    <button className="bg-green-100 text-green-700 px-5 py-2.5 rounded-lg font-bold text-sm flex items-center hover:bg-green-200 transition-colors">
                      <Phone className="w-4 h-4 mr-2" /> Contactar Cliente
                    </button>
                  </div>

                  <div className="p-6 space-y-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center"><span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Idade</span><span className="text-xl font-bold text-gray-900">{selectedClient.client.intake.age || '-'}</span><span className="text-xs text-gray-500 ml-1">anos</span></div>
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center"><span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Género</span><span className="text-xl font-bold text-gray-900">{selectedClient.client.intake.gender || '-'}</span></div>
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center"><span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Peso Inicial</span><span className="text-xl font-bold text-gray-900">{selectedClient.client.intake.weight || '-'}</span><span className="text-xs text-gray-500 ml-1">kg</span></div>
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center"><span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Altura</span><span className="text-xl font-bold text-gray-900">{selectedClient.client.intake.height || '-'}</span><span className="text-xs text-gray-500 ml-1">cm</span></div>
                    </div>

                    <div className="bg-orange-50/50 p-6 rounded-xl border border-orange-100">
                      <h4 className="font-bold text-gray-900 flex items-center mb-4">
                        <Apple className="w-5 h-5 mr-2 text-orange-500" /> Informação Clínica e Alimentar
                      </h4>
                      <div className="space-y-4 text-sm">
                        <p className="flex flex-col sm:flex-row sm:items-center"><span className="text-gray-500 font-medium w-32">Objetivo Principal:</span> <span className="font-bold text-gray-900 text-base">{selectedClient.client.intake.goal}</span></p>
                        
                        <div className="flex flex-col sm:flex-row">
                          <span className="text-gray-500 font-medium w-32 shrink-0">Alergias: </span>
                          <span className="text-gray-900">
                            {selectedClient.client.intake.allergies.length > 0 ? selectedClient.client.intake.allergies.join(', ') : 'Nenhuma registada.'}
                            {selectedClient.client.intake.otherAllergies && ` (Outras: ${selectedClient.client.intake.otherAllergies})`}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row">
                          <span className="text-gray-500 font-medium w-32 shrink-0">Doenças: </span>
                          <span className="text-gray-900">
                            {selectedClient.client.intake.diseases.length > 0 ? selectedClient.client.intake.diseases.join(', ') : 'Nenhuma registada.'}
                            {selectedClient.client.intake.otherDiseases && ` (Outras: ${selectedClient.client.intake.otherDiseases})`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {partnerData.type === 'NUTRITIONIST' && (
                      <div className="bg-white border-2 border-green-500 shadow-md rounded-xl overflow-hidden">
                        <div className="bg-green-600 p-4 flex justify-between items-center text-white">
                          <div>
                            <h4 className="font-bold flex items-center text-lg">
                              <FileText className="w-5 h-5 mr-2"/> O Seu Plano Alimentar Semanal
                            </h4>
                            <p className="text-xs text-green-100 mt-1 opacity-90">Defina o plano dia-a-dia. A cozinha receberá as instruções organizadas.</p>
                          </div>
                        </div>
                        <div className="p-6 space-y-6">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Meta Calórica Diária (kcal)</label>
                            <input 
                              type="number" 
                              placeholder="Ex: 2000"
                              className="w-full sm:w-1/3 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                              value={planData.calories}
                              onChange={(e) => setPlanData({...planData, calories: e.target.value})}
                            />
                          </div>

                          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <div className="flex space-x-2 overflow-x-auto mb-6 pb-2 scrollbar-hide">
                              {WEEK_DAYS.map(day => (
                                <button
                                  key={day}
                                  onClick={(e) => { e.preventDefault(); setSelectedDay(day); }}
                                  className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${selectedDay === day ? 'bg-green-600 text-white shadow-sm' : 'bg-white text-green-700 hover:bg-green-50 border border-green-200'}`}
                                >
                                  {day}
                                </button>
                              ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Pequeno-Almoço</label>
                                <textarea 
                                  className="w-full border border-gray-300 rounded-lg p-3 min-h-[120px] focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm text-gray-800 resize-y" 
                                  placeholder="Indique alimentos e gramagens..."
                                  value={planData.days[selectedDay]?.breakfast || ''}
                                  onChange={(e) => handlePlanDayChange('breakfast', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Almoço</label>
                                <textarea 
                                  className="w-full border border-gray-300 rounded-lg p-3 min-h-[120px] focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm text-gray-800 resize-y" 
                                  placeholder="Indique alimentos e gramagens..."
                                  value={planData.days[selectedDay]?.lunch || ''}
                                  onChange={(e) => handlePlanDayChange('lunch', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Lanches / Snacks</label>
                                <textarea 
                                  className="w-full border border-gray-300 rounded-lg p-3 min-h-[120px] focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm text-gray-800 resize-y" 
                                  placeholder="Indique opções para os lanches..."
                                  value={planData.days[selectedDay]?.snack || ''}
                                  onChange={(e) => handlePlanDayChange('snack', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Jantar</label>
                                <textarea 
                                  className="w-full border border-gray-300 rounded-lg p-3 min-h-[120px] focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm text-gray-800 resize-y" 
                                  placeholder="Indique alimentos e gramagens..."
                                  value={planData.days[selectedDay]?.dinner || ''}
                                  onChange={(e) => handlePlanDayChange('dinner', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Notas Adicionais / Recomendações de Preparação</label>
                            <textarea 
                              className="w-full border border-gray-300 rounded-lg p-3 min-h-[80px] focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm text-gray-800 resize-y" 
                              placeholder="Ex: Utilizar pouco sal, substituir leite de vaca por vegetal, etc."
                              value={planData.notes}
                              onChange={(e) => setPlanData({...planData, notes: e.target.value})}
                            />
                          </div>

                          <div className="mt-4 flex justify-end border-t border-gray-100 pt-6">
                            <button onClick={handleSavePlan} className="bg-gray-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition shadow-sm">
                              Guardar Plano Alimentar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {partnerData.type === 'KITCHEN' && selectedClient.client.nutritionalPlan?.days && (
                      <div className="bg-white border-2 border-orange-200 shadow-sm rounded-xl overflow-hidden">
                        <div className="bg-orange-50 p-4 border-b border-orange-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h4 className="font-bold text-orange-900 flex items-center text-lg">
                              <ChefHat className="w-5 h-5 mr-2"/> Menus do Nutricionista
                            </h4>
                            <p className="text-xs text-orange-700 mt-1">Siga rigorosamente estas indicações para a preparação das marmitas diárias.</p>
                          </div>
                          <div className="flex items-center gap-3">
                            {!selectedClient.client.nutritionalPlan.isPlanApproved && (
                              <span className="bg-yellow-100 text-yellow-800 text-[10px] px-3 py-1 rounded-full font-bold border border-yellow-200 uppercase tracking-wider text-center flex-shrink-0">
                                Aguarda<br/>Aprovação
                              </span>
                            )}
                            {selectedClient.client.nutritionalPlan.calories && (
                              <div className="bg-orange-600 text-white font-bold py-1 px-4 rounded-lg shadow-sm text-center flex-shrink-0">
                                {selectedClient.client.nutritionalPlan.calories} <span className="block text-[10px] font-normal opacity-80 uppercase">kcal/dia</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="p-6">
                           <div className="flex space-x-2 overflow-x-auto mb-6 pb-2 scrollbar-hide">
                              {WEEK_DAYS.map(day => (
                                <button
                                  key={day}
                                  onClick={(e) => { e.preventDefault(); setSelectedDay(day); }}
                                  className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${selectedDay === day ? 'bg-orange-500 text-white shadow-sm' : 'bg-white text-orange-700 hover:bg-orange-50 border border-orange-200'}`}
                                >
                                  {day}
                                </button>
                              ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {selectedClient.client.nutritionalPlan.days[selectedDay]?.breakfast && (
                                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                                  <h5 className="font-bold text-gray-900 mb-2 border-b border-gray-200 pb-2 text-sm uppercase tracking-wider">Pequeno-Almoço</h5>
                                  <div className="whitespace-pre-wrap text-sm text-gray-700">{selectedClient.client.nutritionalPlan.days[selectedDay].breakfast}</div>
                                </div>
                              )}
                              
                              {selectedClient.client.nutritionalPlan.days[selectedDay]?.lunch && (
                                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                                  <h5 className="font-bold text-gray-900 mb-2 border-b border-gray-200 pb-2 text-sm uppercase tracking-wider">Almoço</h5>
                                  <div className="whitespace-pre-wrap text-sm text-gray-700">{selectedClient.client.nutritionalPlan.days[selectedDay].lunch}</div>
                                </div>
                              )}
                              
                              {selectedClient.client.nutritionalPlan.days[selectedDay]?.snack && (
                                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                                  <h5 className="font-bold text-gray-900 mb-2 border-b border-gray-200 pb-2 text-sm uppercase tracking-wider">Lanches</h5>
                                  <div className="whitespace-pre-wrap text-sm text-gray-700">{selectedClient.client.nutritionalPlan.days[selectedDay].snack}</div>
                                </div>
                              )}

                              {selectedClient.client.nutritionalPlan.days[selectedDay]?.dinner && (
                                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                                  <h5 className="font-bold text-gray-900 mb-2 border-b border-gray-200 pb-2 text-sm uppercase tracking-wider">Jantar</h5>
                                  <div className="whitespace-pre-wrap text-sm text-gray-700">{selectedClient.client.nutritionalPlan.days[selectedDay].dinner}</div>
                                </div>
                              )}
                              
                              {selectedClient.client.nutritionalPlan.notes && (
                                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 md:col-span-2 mt-2">
                                  <h5 className="font-bold text-blue-900 mb-2 flex items-center text-sm uppercase tracking-wider">
                                    <FileText className="w-4 h-4 mr-1"/> Notas e Recomendações Globais
                                  </h5>
                                  <div className="whitespace-pre-wrap text-sm text-blue-800">{selectedClient.client.nutritionalPlan.notes}</div>
                                </div>
                              )}
                            </div>
                        </div>
                      </div>
                    )}

                    {partnerData.type === 'NUTRITIONIST' && (
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h4 className="font-bold text-gray-900 mb-6 flex items-center text-lg">
                          <TrendingUp className="w-5 h-5 mr-2 text-blue-500"/> Evolução do Cliente
                        </h4>
                        
                        {selectedClient.client.shareProgress ? (
                           <ProgressChart data={selectedClient.client.progress} />
                        ) : (
                          <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <Scale className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                            <p className="text-gray-500 text-lg">O cliente ainda não ativou a partilha de progresso.</p>
                            <p className="text-sm text-gray-400 mt-1">Peça-lhe para o fazer no separador "O Meu Progresso" da área pessoal.</p>
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'CONSULTATIONS' && partnerData.type === 'NUTRITIONIST' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Agenda e Consultas</h2>
                  <p className="text-gray-500">Faça a gestão dos seus agendamentos e registe as notas de evolução clínica.</p>
                </div>
                {!isEditingConsultation && (
                  <button 
                    onClick={() => { setConsultationForm({ id: null, clientId: '', date: '', time: '', status: 'SCHEDULED', sharedNotes: '', privateNotes: '' }); setIsEditingConsultation(true); }} 
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition shadow-md flex items-center whitespace-nowrap"
                  >
                    <Plus className="w-5 h-5 mr-2"/> Agendar Consulta
                  </button>
                )}
              </div>

              {isEditingConsultation ? (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
                  <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-bold flex items-center"><Calendar className="w-6 h-6 mr-2 text-green-600"/> {consultationForm.id ? 'Editar Consulta' : 'Nova Consulta'}</h3>
                    <button onClick={() => setIsEditingConsultation(false)} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6"/></button>
                  </div>

                  <form onSubmit={handleSaveConsultation} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Cliente</label>
                        <select required className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none bg-white" value={consultationForm.clientId} onChange={e => setConsultationForm({...consultationForm, clientId: Number(e.target.value)})}>
                          <option value="">Selecione um cliente...</option>
                          {myClients.map(c => <option key={c.client.id} value={c.client.id}>{c.user.firstName} {c.user.lastName}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Data</label>
                        <input type="date" required className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none" value={consultationForm.date} onChange={e => setConsultationForm({...consultationForm, date: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Hora</label>
                        <input type="time" required className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none" value={consultationForm.time} onChange={e => setConsultationForm({...consultationForm, time: e.target.value})} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center"><Lock className="w-4 h-4 mr-2 text-gray-500"/> Notas Privadas</label>
                        <p className="text-xs text-gray-500 mb-4">Apenas visíveis para si. Ideal para registo clínico, raciocínio nutricional e lembretes para a próxima consulta.</p>
                        <textarea 
                          className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-gray-500 outline-none min-h-[150px] resize-y text-sm bg-white" 
                          placeholder="Registo clínico interno..."
                          value={consultationForm.privateNotes}
                          onChange={e => setConsultationForm({...consultationForm, privateNotes: e.target.value})}
                        />
                      </div>
                      
                      <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                        <label className="block text-sm font-bold text-green-900 mb-2 flex items-center"><Eye className="w-4 h-4 mr-2 text-green-600"/> Notas Partilhadas</label>
                        <p className="text-xs text-green-700 mb-4">Visíveis para o cliente na app. Útil para reforço positivo, resumo da consulta e pequenas tarefas.</p>
                        <textarea 
                          className="w-full border border-green-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none min-h-[150px] resize-y text-sm bg-white" 
                          placeholder="Resumo, tarefas e motivação para o cliente..."
                          value={consultationForm.sharedNotes}
                          onChange={e => setConsultationForm({...consultationForm, sharedNotes: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <label className="text-sm font-bold text-gray-700">Estado da Consulta:</label>
                        <select className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-500 outline-none font-bold bg-white" value={consultationForm.status} onChange={e => setConsultationForm({...consultationForm, status: e.target.value})}>
                          <option value="SCHEDULED">Agendada</option>
                          <option value="COMPLETED">Realizada</option>
                          <option value="CANCELLED">Cancelada</option>
                        </select>
                      </div>
                      <button type="submit" className="bg-gray-900 text-white font-bold py-3 px-10 rounded-xl shadow-lg hover:bg-black transition">Guardar Consulta</button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                  {myConsultations.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                      <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                      <p className="text-lg">Não existem consultas agendadas.</p>
                      <button onClick={() => setIsEditingConsultation(true)} className="mt-4 text-green-600 font-bold hover:underline">Agende a primeira consulta</button>
                    </div>
                  ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Data & Hora</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Cliente</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Estado</th>
                          <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {myConsultations.map(cons => {
                          const clientInfo = myClients.find(c => c.client.id === cons.clientId);
                          return (
                            <tr key={cons.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-bold text-gray-900">{new Date(cons.date).toLocaleDateString('pt-PT')}</div>
                                <div className="text-sm text-gray-500 flex items-center mt-1"><Clock className="w-3 h-3 mr-1"/> {cons.time}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-medium text-gray-900">{clientInfo?.user.firstName} {clientInfo?.user.lastName}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${cons.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' : cons.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                  {cons.status === 'SCHEDULED' ? 'AGENDADA' : cons.status === 'COMPLETED' ? 'REALIZADA' : 'CANCELADA'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {cons.status === 'SCHEDULED' && (
                                  <button className="text-green-700 bg-green-50 hover:bg-green-100 mr-4 px-3 py-1.5 rounded-lg font-bold inline-flex items-center transition-colors">
                                    <Video className="w-4 h-4 mr-1.5"/> Videochamada
                                  </button>
                                )}
                                <button onClick={() => { setConsultationForm(cons); setIsEditingConsultation(true); }} className="text-indigo-600 hover:text-indigo-900 mr-4 font-bold">Editar / Notas</button>
                                <button onClick={() => handleDeleteConsultation(cons.id)} className="text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4 inline"/></button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'KITCHENS' && partnerData.type === 'NUTRITIONIST' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Rede de Cozinhas Parceiras</h2>
                <p className="text-gray-500">Consulte as ementas pré-definidas pelas cozinhas para facilitar a prescrição dos seus planos alimentares.</p>
              </div>
              
              <div className="space-y-8">
                {activeKitchens.map(kitchen => {
                  const kitchenUser = db.users.find(u => u.id === kitchen.userId);
                  const menu = kitchen.details.menu || [];
                  return (
                    <div key={kitchen.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                      <div className="bg-gray-50 p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 flex items-center">
                            <ChefHat className="w-5 h-5 mr-2 text-orange-500"/> 
                            {kitchen.details.businessName || kitchenUser?.firstName}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            <MapPin className="w-4 h-4 inline mr-1"/>{kitchen.city} • Contacto: {kitchen.phone}
                          </p>
                        </div>
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-bold uppercase whitespace-nowrap">
                          {menu.length} Pratos
                        </span>
                      </div>
                      
                      <div className="p-6">
                        {menu.length === 0 ? (
                          <p className="text-gray-400 italic text-center py-4">Esta cozinha ainda não adicionou pratos à sua ementa base.</p>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {menu.map(dish => (
                              <div key={dish.id} className="border border-gray-100 p-4 rounded-xl hover:border-orange-200 hover:shadow-sm transition">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-bold text-gray-900">{dish.name}</h4>
                                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded font-medium">{dish.category}</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">{dish.description}</p>
                                {(dish.kcal || dish.prot || dish.carb || dish.fat) && (
                                  <div className="flex flex-wrap gap-3 text-xs bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                                    {dish.kcal && <span className="font-mono"><b>{dish.kcal}</b> kcal</span>}
                                    {dish.prot && <span className="font-mono"><b>{dish.prot}</b>g Prot</span>}
                                    {dish.carb && <span className="font-mono"><b>{dish.carb}</b>g Hid</span>}
                                    {dish.fat && <span className="font-mono"><b>{dish.fat}</b>g Lip</span>}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'MENU' && partnerData.type === 'KITCHEN' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">A Minha Ementa</h2>
              
              {/* Importação em Massa (Excel) */}
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-1 flex items-center">
                    <FileSpreadsheet className="w-5 h-5 mr-2" /> Importação em Massa (Excel/CSV)
                  </h3>
                  <p className="text-sm text-blue-700">Tem muitos pratos? Descarregue o nosso <button className="underline font-bold hover:text-blue-900">template base</button>, preencha e importe tudo de uma vez.</p>
                </div>
                <label className="cursor-pointer bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-blue-700 transition flex items-center whitespace-nowrap shadow-sm">
                  <UploadCloud className="w-5 h-5 mr-2" />
                  Carregar Ficheiro
                  <input 
                    type="file" 
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                    className="hidden" 
                    onChange={handleMenuBulkUpload} 
                  />
                </label>
              </div>

              {/* Formulário para Adicionar Prato */}
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 mb-8">
                <h3 className="text-lg font-bold text-orange-900 mb-4 flex items-center">
                  <ChefHat className="w-5 h-5 mr-2" /> Adicionar Prato Manualmente
                </h3>
                <form onSubmit={handleAddDish} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Prato</label>
                      <input type="text" required placeholder="Ex: Salmão Grelhado com Legumes" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-orange-500 focus:border-orange-500" value={newDish.name} onChange={e => setNewDish({...newDish, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                      <select required className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-orange-500 focus:border-orange-500" value={newDish.category} onChange={e => setNewDish({...newDish, category: e.target.value})}>
                        <option>Pequeno-Almoço</option>
                        <option>Almoço/Jantar</option>
                        <option>Lanche</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição dos Ingredientes</label>
                    <textarea required placeholder="Ex: Lombo de salmão grelhado, acompanhado com courgete e cenoura..." className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-orange-500 focus:border-orange-500 resize-y min-h-[80px]" value={newDish.description} onChange={e => setNewDish({...newDish, description: e.target.value})} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Macronutrientes Estimados (Opcional)</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="flex bg-white border border-gray-300 rounded-md overflow-hidden">
                          <span className="bg-gray-100 px-3 py-2 text-sm text-gray-500 border-r border-gray-300">Kcal</span>
                          <input type="number" className="w-full py-2 px-2 text-sm focus:outline-none" value={newDish.kcal} onChange={e => setNewDish({...newDish, kcal: e.target.value})} />
                        </div>
                      </div>
                      <div>
                        <div className="flex bg-white border border-gray-300 rounded-md overflow-hidden">
                          <span className="bg-gray-100 px-3 py-2 text-sm text-gray-500 border-r border-gray-300">Prot (g)</span>
                          <input type="number" className="w-full py-2 px-2 text-sm focus:outline-none" value={newDish.prot} onChange={e => setNewDish({...newDish, prot: e.target.value})} />
                        </div>
                      </div>
                      <div>
                        <div className="flex bg-white border border-gray-300 rounded-md overflow-hidden">
                          <span className="bg-gray-100 px-3 py-2 text-sm text-gray-500 border-r border-gray-300">Hidr (g)</span>
                          <input type="number" className="w-full py-2 px-2 text-sm focus:outline-none" value={newDish.carb} onChange={e => setNewDish({...newDish, carb: e.target.value})} />
                        </div>
                      </div>
                      <div>
                        <div className="flex bg-white border border-gray-300 rounded-md overflow-hidden">
                          <span className="bg-gray-100 px-3 py-2 text-sm text-gray-500 border-r border-gray-300">Lip (g)</span>
                          <input type="number" className="w-full py-2 px-2 text-sm focus:outline-none" value={newDish.fat} onChange={e => setNewDish({...newDish, fat: e.target.value})} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-2">
                    <button type="submit" className="bg-orange-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-700 transition">Adicionar Prato</button>
                  </div>
                </form>
              </div>

              {/* Lista de Pratos */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Pratos Guardados ({(partnerData.details.menu || []).length})</h3>
                {(!partnerData.details.menu || partnerData.details.menu.length === 0) ? (
                  <div className="bg-white rounded-xl shadow-sm border border-dashed border-gray-300 p-12 text-center text-gray-500">
                    <Utensils className="h-10 w-10 mx-auto text-gray-300 mb-3" />
                    Ainda não adicionou nenhum prato à sua ementa.
                  </div>
                ) : (
                  <div className="space-y-8">
                    {['Pequeno-Almoço', 'Almoço/Jantar', 'Lanche'].map(category => {
                      const categoryDishes = partnerData.details.menu.filter(d => d.category === category);
                      if (categoryDishes.length === 0) return null;
                      
                      return (
                        <div key={category}>
                          <h4 className="text-md font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2 flex items-center">
                            {category} <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{categoryDishes.length}</span>
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {categoryDishes.map(dish => (
                              <div key={dish.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                                <div className="p-5 flex-1">
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-lg text-gray-900 pr-4">{dish.name}</h4>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{dish.description}</p>
                                  
                                  {(dish.kcal || dish.prot || dish.carb || dish.fat) && (
                                    <div className="grid grid-cols-4 gap-2 mt-auto">
                                      {dish.kcal && <div className="bg-gray-50 rounded p-1.5 text-center"><span className="block text-[10px] text-gray-500 uppercase">Kcal</span><span className="font-bold text-sm text-gray-800">{dish.kcal}</span></div>}
                                      {dish.prot && <div className="bg-gray-50 rounded p-1.5 text-center"><span className="block text-[10px] text-gray-500 uppercase">Prot</span><span className="font-bold text-sm text-gray-800">{dish.prot}g</span></div>}
                                      {dish.carb && <div className="bg-gray-50 rounded p-1.5 text-center"><span className="block text-[10px] text-gray-500 uppercase">Carb</span><span className="font-bold text-sm text-gray-800">{dish.carb}g</span></div>}
                                      {dish.fat && <div className="bg-gray-50 rounded p-1.5 text-center"><span className="block text-[10px] text-gray-500 uppercase">Lip</span><span className="font-bold text-sm text-gray-800">{dish.fat}g</span></div>}
                                    </div>
                                  )}
                                </div>
                                <div className="bg-gray-50 border-t border-gray-100 p-3 flex justify-end">
                                  <button onClick={() => handleDeleteDish(dish.id)} className="text-red-500 hover:text-red-700 text-sm flex items-center font-medium transition-colors">
                                    <Trash2 className="w-4 h-4 mr-1" /> Remover
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'CAPACITY' && partnerData.type === 'KITCHEN' && (
            <div className="space-y-8">
              {/* Secção 1: Visualizador de Produção e Exportação */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-5xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      <ClipboardList className="w-6 h-6 mr-2 text-blue-600" /> 
                      Plano de Produção Semanal
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Refeições validadas pelos clientes prontas a preparar. Exporte para Excel para imprimir a lista de preparação e compras.</p>
                  </div>
                  <button 
                    onClick={handleDownloadProductionPlan} 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center transition shadow-md whitespace-nowrap"
                  >
                    <FileSpreadsheet className="w-5 h-5 mr-2" />
                    Exportar Lista (Excel)
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold text-gray-700">Dia</th>
                        <th className="px-4 py-3 text-left font-bold text-gray-700">Cliente</th>
                        <th className="px-4 py-3 text-center font-bold text-gray-700">Entrega</th>
                        <th className="px-4 py-3 text-center font-bold text-gray-700">Refeição</th>
                        <th className="px-4 py-3 text-left font-bold text-gray-700">Detalhes de Preparação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {productionRows.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-4 py-12 text-center text-gray-500">
                            <ClipboardList className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                            Ainda não existem refeições aprovadas para preparação.
                          </td>
                        </tr>
                      ) : (
                        productionRows.map(row => (
                          <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-4 font-bold text-gray-900 whitespace-nowrap">{row.day}</td>
                            <td className="px-4 py-4 text-gray-800 font-medium whitespace-nowrap">{row.clientName}</td>
                            <td className="px-4 py-4 text-center">
                              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${row.delivery === 'Domicílio' ? 'bg-purple-100 text-purple-800' : 'bg-gray-200 text-gray-800'}`}>
                                {row.delivery}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                                {row.mealType}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-gray-600 whitespace-pre-wrap font-mono text-xs">{row.content}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Secção 2: Capacidade de Produção Máxima */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-5xl">
                <h2 className="text-xl font-bold mb-4">Capacidade de Produção Máxima</h2>
                <p className="text-sm text-gray-500 mb-6">Defina o limite de refeições diárias que a sua cozinha consegue preparar com qualidade para a nossa plataforma.</p>
                
                <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold text-gray-700 whitespace-nowrap">Dia da Semana</th>
                        <th className="px-4 py-3 text-center font-bold text-gray-700 whitespace-nowrap">Pequeno-Almoço</th>
                        <th className="px-4 py-3 text-center font-bold text-gray-700 whitespace-nowrap">Almoço</th>
                        <th className="px-4 py-3 text-center font-bold text-gray-700 whitespace-nowrap">Lanche</th>
                        <th className="px-4 py-3 text-center font-bold text-gray-700 whitespace-nowrap">Jantar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {WEEK_DAYS.map(day => (
                        <tr key={day} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-900">{day}</td>
                          <td className="px-4 py-2">
                            <input type="number" min="0" placeholder="0" className="w-20 md:w-full text-center border border-gray-300 rounded-md py-1.5 focus:ring-orange-500 focus:border-orange-500" value={profileData.capacity[day].breakfast} onChange={e => handleCapacityChange(day, 'breakfast', e.target.value)} />
                          </td>
                          <td className="px-4 py-2">
                            <input type="number" min="0" placeholder="0" className="w-20 md:w-full text-center border border-gray-300 rounded-md py-1.5 focus:ring-orange-500 focus:border-orange-500" value={profileData.capacity[day].lunch} onChange={e => handleCapacityChange(day, 'lunch', e.target.value)} />
                          </td>
                          <td className="px-4 py-2">
                            <input type="number" min="0" placeholder="0" className="w-20 md:w-full text-center border border-gray-300 rounded-md py-1.5 focus:ring-orange-500 focus:border-orange-500" value={profileData.capacity[day].snack} onChange={e => handleCapacityChange(day, 'snack', e.target.value)} />
                          </td>
                          <td className="px-4 py-2">
                            <input type="number" min="0" placeholder="0" className="w-20 md:w-full text-center border border-gray-300 rounded-md py-1.5 focus:ring-orange-500 focus:border-orange-500" value={profileData.capacity[day].dinner} onChange={e => handleCapacityChange(day, 'dinner', e.target.value)} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t border-gray-100">
                  <button onClick={handleSaveProfile} className="bg-gray-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors shadow-sm">
                    Guardar Capacidade
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'DOCS' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-3xl">
              <h2 className="text-xl font-bold mb-6">Documentação Legal e Certificações</h2>
              <form onSubmit={handleSaveProfile}>
                <p className="text-sm text-gray-500 mb-6">Para garantir a segurança e qualidade da nossa rede, necessitamos de validar a seguinte documentação. Formatos aceites: PDF, JPG, PNG.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {partnerData.type === 'NUTRITIONIST' ? (
                    <>
                      {/* Cédula Profissional */}
                      <div className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between bg-white shadow-sm">
                        <div>
                          <h5 className="font-bold text-gray-800 text-sm">Cédula Profissional</h5>
                          <p className="text-xs text-gray-500 mt-1">Ordem dos Nutricionistas</p>
                        </div>
                        <div className="mt-4">
                          {profileData.documents.cedula ? (
                            <div className="flex items-center text-sm text-green-700 bg-green-50 p-2.5 rounded-lg border border-green-100">
                              <FileCheck className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="truncate">{profileData.documents.cedula}</span>
                            </div>
                          ) : (
                            <label className="cursor-pointer flex items-center justify-center w-full bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-300 rounded-lg p-2.5 text-sm text-gray-600 transition-colors">
                              <UploadCloud className="w-4 h-4 mr-2" />
                              Anexar Ficheiro
                              <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => handleFileUpload('cedula', e)} />
                            </label>
                          )}
                        </div>
                      </div>

                      {/* Finanças */}
                      <div className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between bg-white shadow-sm">
                        <div>
                          <h5 className="font-bold text-gray-800 text-sm">Início de Atividade</h5>
                          <p className="text-xs text-gray-500 mt-1">Comprovativo das Finanças (AT)</p>
                        </div>
                        <div className="mt-4">
                          {profileData.documents.financas ? (
                            <div className="flex items-center text-sm text-green-700 bg-green-50 p-2.5 rounded-lg border border-green-100">
                              <FileCheck className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="truncate">{profileData.documents.financas}</span>
                            </div>
                          ) : (
                            <label className="cursor-pointer flex items-center justify-center w-full bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-300 rounded-lg p-2.5 text-sm text-gray-600 transition-colors">
                              <UploadCloud className="w-4 h-4 mr-2" />
                              Anexar Ficheiro
                              <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => handleFileUpload('financas', e)} />
                            </label>
                          )}
                        </div>
                      </div>

                      {/* Seguro Responsabilidade Civil */}
                      <div className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between bg-white shadow-sm">
                        <div>
                          <h5 className="font-bold text-gray-800 text-sm">Seguro de Responsabilidade</h5>
                          <p className="text-xs text-gray-500 mt-1">Apólice de Seguro Civil Profissional</p>
                        </div>
                        <div className="mt-4">
                          {profileData.documents.seguro ? (
                            <div className="flex items-center text-sm text-green-700 bg-green-50 p-2.5 rounded-lg border border-green-100">
                              <FileCheck className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="truncate">{profileData.documents.seguro}</span>
                            </div>
                          ) : (
                            <label className="cursor-pointer flex items-center justify-center w-full bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-300 rounded-lg p-2.5 text-sm text-gray-600 transition-colors">
                              <UploadCloud className="w-4 h-4 mr-2" />
                              Anexar Ficheiro
                              <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => handleFileUpload('seguro', e)} />
                            </label>
                          )}
                        </div>
                      </div>

                      {/* Documento de Identificação */}
                      <div className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between bg-white shadow-sm">
                        <div>
                          <h5 className="font-bold text-gray-800 text-sm">Identificação</h5>
                          <p className="text-xs text-gray-500 mt-1">Cópia do CC ou Passaporte</p>
                        </div>
                        <div className="mt-4">
                          {profileData.documents.identificacao ? (
                            <div className="flex items-center text-sm text-green-700 bg-green-50 p-2.5 rounded-lg border border-green-100">
                              <FileCheck className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="truncate">{profileData.documents.identificacao}</span>
                            </div>
                          ) : (
                            <label className="cursor-pointer flex items-center justify-center w-full bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-300 rounded-lg p-2.5 text-sm text-gray-600 transition-colors">
                              <UploadCloud className="w-4 h-4 mr-2" />
                              Anexar Ficheiro
                              <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => handleFileUpload('identificacao', e)} />
                            </label>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* HACCP */}
                      <div className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between bg-white shadow-sm">
                        <div>
                          <h5 className="font-bold text-gray-800 text-sm">Certificado HACCP</h5>
                          <p className="text-xs text-gray-500 mt-1">Higiene e Segurança Alimentar</p>
                        </div>
                        <div className="mt-4">
                          {profileData.documents.haccp ? (
                            <div className="flex items-center text-sm text-green-700 bg-green-50 p-2.5 rounded-lg border border-green-100">
                              <FileCheck className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="truncate">{profileData.documents.haccp}</span>
                            </div>
                          ) : (
                            <label className="cursor-pointer flex items-center justify-center w-full bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-300 rounded-lg p-2.5 text-sm text-gray-600 transition-colors">
                              <UploadCloud className="w-4 h-4 mr-2" />
                              Anexar Ficheiro
                              <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => handleFileUpload('haccp', e)} />
                            </label>
                          )}
                        </div>
                      </div>

                      {/* Finanças */}
                      <div className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between bg-white shadow-sm">
                        <div>
                          <h5 className="font-bold text-gray-800 text-sm">Início de Atividade</h5>
                          <p className="text-xs text-gray-500 mt-1">Comprovativo das Finanças (AT)</p>
                        </div>
                        <div className="mt-4">
                          {profileData.documents.financas ? (
                            <div className="flex items-center text-sm text-green-700 bg-green-50 p-2.5 rounded-lg border border-green-100">
                              <FileCheck className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="truncate">{profileData.documents.financas}</span>
                            </div>
                          ) : (
                            <label className="cursor-pointer flex items-center justify-center w-full bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-300 rounded-lg p-2.5 text-sm text-gray-600 transition-colors">
                              <UploadCloud className="w-4 h-4 mr-2" />
                              Anexar Ficheiro
                              <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => handleFileUpload('financas', e)} />
                            </label>
                          )}
                        </div>
                      </div>

                      {/* Alvará */}
                      <div className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between bg-white shadow-sm">
                        <div>
                          <h5 className="font-bold text-gray-800 text-sm">Alvará de Utilização</h5>
                          <p className="text-xs text-gray-500 mt-1">Licença para Restauração / Bebidas</p>
                        </div>
                        <div className="mt-4">
                          {profileData.documents.alvara ? (
                            <div className="flex items-center text-sm text-green-700 bg-green-50 p-2.5 rounded-lg border border-green-100">
                              <FileCheck className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="truncate">{profileData.documents.alvara}</span>
                            </div>
                          ) : (
                            <label className="cursor-pointer flex items-center justify-center w-full bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-300 rounded-lg p-2.5 text-sm text-gray-600 transition-colors">
                              <UploadCloud className="w-4 h-4 mr-2" />
                              Anexar Ficheiro
                              <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => handleFileUpload('alvara', e)} />
                            </label>
                          )}
                        </div>
                      </div>

                      {/* Registo Comercial */}
                      <div className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between bg-white shadow-sm">
                        <div>
                          <h5 className="font-bold text-gray-800 text-sm">Certidão Permanente</h5>
                          <p className="text-xs text-gray-500 mt-1">Registo Comercial da Empresa</p>
                        </div>
                        <div className="mt-4">
                          {profileData.documents.registo ? (
                            <div className="flex items-center text-sm text-green-700 bg-green-50 p-2.5 rounded-lg border border-green-100">
                              <FileCheck className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="truncate">{profileData.documents.registo}</span>
                            </div>
                          ) : (
                            <label className="cursor-pointer flex items-center justify-center w-full bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-300 rounded-lg p-2.5 text-sm text-gray-600 transition-colors">
                              <UploadCloud className="w-4 h-4 mr-2" />
                              Anexar Ficheiro
                              <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => handleFileUpload('registo', e)} />
                            </label>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-100 mt-8">
                  <button type="submit" className="bg-gray-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors shadow-sm">
                    Guardar Documentos
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'PROFILE' && (
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-3xl">
              <h2 className="text-xl font-bold mb-6">Configuração de Perfil</h2>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="block text-sm font-medium text-gray-700">Nome</label><input required type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" value={profileData.firstName} onChange={e => setProfileData({...profileData, firstName: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium text-gray-700">Apelido</label><input required type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" value={profileData.lastName} onChange={e => setProfileData({...profileData, lastName: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium text-gray-700">Telemóvel</label><input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" value={profileData.phone} onChange={e => setProfileData({...profileData, phone: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium text-gray-700">Email (Não editável)</label><input disabled type="email" className="mt-1 block w-full border border-gray-200 bg-gray-50 text-gray-500 rounded-md py-2 px-3" value={currentUser.email} /></div>
                </div>
                
                <hr className="border-gray-100" />
                
                <h4 className="font-bold text-gray-800">Dados Fiscais e Morada</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div><label className="block text-sm font-medium text-gray-700">NIF</label><input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" value={profileData.nif} onChange={e => setProfileData({...profileData, nif: e.target.value})} /></div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Morada ({partnerData.type === 'NUTRITIONIST' ? 'Consultório / Sede' : 'Restaurante / Sede'})
                    </label>
                    <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" value={profileData.address} onChange={e => setProfileData({...profileData, address: e.target.value})} />
                  </div>
                </div>

                <hr className="border-gray-100" />
                
                {partnerData.type === 'NUTRITIONIST' ? (
                  <>
                    <h4 className="font-bold text-gray-800">Dados Profissionais</h4>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Anos de Experiência</label>
                          <input type="number" min="0" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" value={profileData.experienceYears} onChange={e => setProfileData({...profileData, experienceYears: e.target.value})} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Especialidades</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                          {NUTRITION_SPECIALTIES.map(spec => (
                            <label key={spec} className="flex items-center text-sm text-gray-700 cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="mr-2 h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500" 
                                checked={profileData.selectedSpecialties.includes(spec)} 
                                onChange={() => handleProfileSpecialtyChange(spec)} 
                              />
                              {spec}
                            </label>
                          ))}
                        </div>
                        <input 
                          type="text" 
                          placeholder="Outras especialidades (separadas por vírgula)..." 
                          className="mt-2 block w-full border border-gray-300 rounded-md py-2 px-3 text-sm" 
                          value={profileData.otherSpecialties} 
                          onChange={e => setProfileData({...profileData, otherSpecialties: e.target.value})} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Breve Biografia / Apresentação</label>
                        <textarea className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 resize-y min-h-[100px]" placeholder="Fale um pouco sobre a sua abordagem e percurso..." value={profileData.bio} onChange={e => setProfileData({...profileData, bio: e.target.value})}></textarea>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h4 className="font-bold text-gray-800">Dados do Estabelecimento</h4>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Nome Comercial da Cozinha / Restaurante</label>
                        <input type="text" className="mt-1 block w-full md:w-1/2 border border-gray-300 rounded-md py-2 px-3" value={profileData.businessName} onChange={e => setProfileData({...profileData, businessName: e.target.value})} />
                      </div>
                    </div>
                  </>
                )}

                <div className="flex justify-end pt-6 border-t border-gray-100">
                  <button type="submit" className="bg-gray-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors shadow-sm">
                    Guardar Perfil
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    );
  };

  // --- ADMIN DASHBOARD ---
  const AdminDashboard = () => {
    const activeTab = adminTab;
    const setActiveTab = setAdminTab;
    const partnerFilter = adminPartnerFilter;
    const setPartnerFilter = setAdminPartnerFilter;
    
    // Novo estado para controlar a ficha aberta
    const [selectedPartner, setSelectedPartner] = useState(null);

    const stats = {
      pendingPartners: db.partners.filter(p => p.status === 'APPLIED' || p.status === 'PRE_APPROVED').length,
      pendingClients: db.clients.filter(c => c.status === 'LEAD').length,
      pendingMatches: db.clients.filter(c => c.status === 'PENDING_MATCH').length,
      activeNutris: db.partners.filter(p => p.type === 'NUTRITIONIST' && p.status === 'ACTIVE').length,
      activeKitchens: db.partners.filter(p => p.type === 'KITCHEN' && p.status === 'ACTIVE').length,
    };

    const togglePayments = () => updateDB({ settings: { ...db.settings, paymentsEnabled: !db.settings.paymentsEnabled } });
    const toggleDistrict = (district) => {
      const current = db.settings.availableDistricts || [];
      const updated = current.includes(district) ? current.filter(d => d !== district) : [...current, district];
      updateDB({ settings: { ...db.settings, availableDistricts: updated } });
    };
    
    const updatePartnerStatus = (partnerId, newStatus) => {
      updateDB({ partners: db.partners.map(p => p.id === partnerId ? { ...p, status: newStatus } : p) });
      if (selectedPartner && selectedPartner.id === partnerId) {
        setSelectedPartner(prev => ({...prev, status: newStatus}));
      }
    };
    
    const updateClientStatus = (clientId, newStatus) => updateDB({ clients: db.clients.map(c => c.id === clientId ? { ...c, status: newStatus } : c) });
    const assignMatch = (clientId, nutriId, kitchenId) => {
      updateClientStatus(clientId, 'IN_PROGRESS');
      updateDB({ matchings: [...db.matchings, { id: Date.now(), clientId, nutriId, kitchenId, status: 'IN_PROGRESS' }] });
      alert('Matching gravado e email (mock) enviado aos intervenientes!');
    };

    return (
      <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
        <div className="w-full md:w-64 bg-gray-900 text-white flex-shrink-0">
          <div className="p-6"><h2 className="text-xl font-bold text-green-400">Backoffice</h2><p className="text-xs text-gray-400 mt-1">LisboaMealMatch MVP</p></div>
          <nav className="space-y-1 px-3">
            <button onClick={()=>{setActiveTab('OVERVIEW'); setSelectedPartner(null);}} className={`w-full text-left px-3 py-2 rounded-md ${activeTab==='OVERVIEW'?'bg-gray-800 text-white':'text-gray-300 hover:bg-gray-800'}`}>Visão Geral</button>
            <button onClick={()=>{setActiveTab('PARTNERS'); setSelectedPartner(null);}} className={`w-full text-left px-3 py-2 rounded-md flex justify-between ${activeTab==='PARTNERS'?'bg-gray-800 text-white':'text-gray-300 hover:bg-gray-800'}`}>
              Parceiros {stats.pendingPartners > 0 && <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">{stats.pendingPartners}</span>}
            </button>
            <button onClick={()=>{setActiveTab('CLIENTS'); setSelectedPartner(null);}} className={`w-full text-left px-3 py-2 rounded-md flex justify-between ${activeTab==='CLIENTS'?'bg-gray-800 text-white':'text-gray-300 hover:bg-gray-800'}`}>
              Clientes {stats.pendingClients > 0 && <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">{stats.pendingClients}</span>}
            </button>
            <button onClick={()=>{setActiveTab('MATCHING'); setSelectedPartner(null);}} className={`w-full text-left px-3 py-2 rounded-md flex justify-between ${activeTab==='MATCHING'?'bg-gray-800 text-white':'text-gray-300 hover:bg-gray-800'}`}>
              Matching {stats.pendingMatches > 0 && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{stats.pendingMatches}</span>}
            </button>
            <button onClick={()=>{setActiveTab('SETTINGS'); setSelectedPartner(null);}} className={`w-full text-left px-3 py-2 rounded-md ${activeTab==='SETTINGS'?'bg-gray-800 text-white':'text-gray-300 hover:bg-gray-800'}`}>Configurações</button>
            <div className="mt-8 px-3 py-4 border-t border-gray-800">
              <div className="flex items-center justify-between"><span className="text-sm text-gray-400">Pagamentos (Stripe)</span><button onClick={togglePayments} className={`w-10 h-5 rounded-full relative transition-colors ${db.settings.paymentsEnabled ? 'bg-green-500' : 'bg-gray-600'}`}><div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-transform ${db.settings.paymentsEnabled ? 'left-6' : 'left-1'}`}></div></button></div>
            </div>
          </nav>
        </div>
        <div className="flex-1 p-6 lg:p-10 overflow-auto">
          {activeTab === 'OVERVIEW' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Visão Geral da Operação</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"><p className="text-sm text-gray-500 font-medium">Novos Leads</p><p className="text-3xl font-bold text-gray-900 mt-2">{stats.pendingClients}</p></div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"><p className="text-sm text-gray-500 font-medium">Matches Pendentes</p><p className="text-3xl font-bold text-red-600 mt-2">{stats.pendingMatches}</p></div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"><p className="text-sm text-gray-500 font-medium">Parceiros p/ Validar</p><p className="text-3xl font-bold text-orange-600 mt-2">{stats.pendingPartners}</p></div>
              </div>
            </div>
          )}
          {activeTab === 'PARTNERS' && (
            <div>
              {!selectedPartner ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestão de Parceiros</h2>
                  
                  {/* Resumo Numérico */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Nutricionistas Ativos</p>
                        <p className="text-4xl font-extrabold text-green-600 mt-1">{stats.activeNutris}</p>
                      </div>
                      <Apple className="h-10 w-10 text-green-100" />
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Cozinhas Ativas</p>
                        <p className="text-4xl font-extrabold text-orange-600 mt-1">{stats.activeKitchens}</p>
                      </div>
                      <ChefHat className="h-10 w-10 text-orange-100" />
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Aguardam Validação</p>
                        <p className="text-4xl font-extrabold text-yellow-600 mt-1">{stats.pendingPartners}</p>
                      </div>
                      <ClipboardList className="h-10 w-10 text-yellow-100" />
                    </div>
                  </div>

                  <div className="mb-4 flex space-x-2">
                    {['ALL', 'NUTRITIONIST', 'KITCHEN'].map(filter => (
                      <button key={filter} onClick={() => setPartnerFilter(filter)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${partnerFilter === filter ? 'bg-gray-900 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>{filter === 'ALL' ? 'Todos' : filter === 'NUTRITIONIST' ? 'Nutricionistas' : 'Cozinhas'}</button>
                    ))}
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clientes</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {db.partners.filter(p => partnerFilter === 'ALL' || p.type === partnerFilter).map(p => {
                          const user = db.users.find(u => u.id === p.userId);
                          // Calcular o número de clientes atribuídos a este parceiro
                          const clientsCount = db.matchings.filter(m => p.type === 'NUTRITIONIST' ? m.nutriId === p.id : m.kitchenId === p.id).length;
                          
                          return (
                            <tr key={p.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={(e) => { if(e.target.tagName !== 'BUTTON' && e.target.tagName !== 'svg' && e.target.closest('button') === null) setSelectedPartner(p); }}>
                              <td className="px-6 py-4 whitespace-nowrap"><div className="font-medium text-gray-900">{user?.firstName} {user?.lastName}</div><div className="text-sm text-gray-500">{user?.email}</div></td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.type}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{clientsCount}</td>
                              <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${p.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : p.status === 'PRE_APPROVED' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>{p.status}</span></td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {p.status === 'APPLIED' && <button onClick={()=>updatePartnerStatus(p.id, 'PRE_APPROVED')} className="text-blue-600 hover:text-blue-900 mr-3 font-bold">Pré-Aprovar</button>}
                                {p.status === 'PRE_APPROVED' && <button onClick={()=>updatePartnerStatus(p.id, 'ACTIVE')} className="text-green-600 hover:text-green-900 font-bold">Ativar</button>}
                                <button onClick={()=>setSelectedPartner(p)} className="text-gray-500 hover:text-gray-900 ml-4 flex items-center inline-flex"><Settings className="w-4 h-4 mr-1"/> Ver</button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 p-6 border-b border-gray-200 flex justify-between items-center">
                    <button onClick={() => setSelectedPartner(null)} className="flex items-center text-gray-500 hover:text-green-600 font-bold"><ArrowLeft className="w-5 h-5 mr-2"/> Voltar à Lista</button>
                    <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${selectedPartner.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : selectedPartner.status === 'PRE_APPROVED' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>ESTADO: {selectedPartner.status}</span>
                  </div>
                  
                  {(() => {
                    const user = db.users.find(u => u.id === selectedPartner.userId);
                    
                    // Calcular clientes ativos atribuídos a este parceiro
                    const partnerMatches = db.matchings.filter(m => 
                      selectedPartner.type === 'NUTRITIONIST' ? m.nutriId === selectedPartner.id : m.kitchenId === selectedPartner.id
                    );
                    const activeClientsCount = partnerMatches.length;

                    return (
                      <div className="p-8 space-y-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-gray-100">
                          <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                              {selectedPartner.type === 'KITCHEN' && selectedPartner.details?.businessName ? selectedPartner.details.businessName : `${user?.firstName} ${user?.lastName}`}
                            </h2>
                            <p className="text-gray-500 text-lg flex items-center">
                              <Mail className="w-5 h-5 mr-2"/> {user?.email} 
                              <span className="mx-3">•</span> 
                              <Phone className="w-5 h-5 mr-2"/> {selectedPartner.phone || 'S/ Telemóvel'}
                            </p>
                          </div>
                          <div className="flex space-x-3">
                            {selectedPartner.status === 'APPLIED' && <button onClick={()=>updatePartnerStatus(selectedPartner.id, 'PRE_APPROVED')} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">Pré-Aprovar</button>}
                            {selectedPartner.status === 'PRE_APPROVED' && <button onClick={()=>updatePartnerStatus(selectedPartner.id, 'ACTIVE')} className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">Ativar Conta</button>}
                            {selectedPartner.status === 'ACTIVE' && <button onClick={()=>updatePartnerStatus(selectedPartner.id, 'SUSPENDED')} className="bg-red-50 text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-red-100 transition border border-red-100">Suspender</button>}
                            {selectedPartner.status === 'SUSPENDED' && <button onClick={()=>updatePartnerStatus(selectedPartner.id, 'ACTIVE')} className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">Reativar</button>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div>
                            <h4 className="font-bold text-gray-800 mb-6 text-xl flex items-center"><User className="w-5 h-5 mr-2 text-gray-400"/> Detalhes do Negócio</h4>
                            <ul className="space-y-4 text-base">
                              <li className="flex"><span className="text-gray-500 w-32 shrink-0">Tipo:</span> <b className="text-gray-900">{selectedPartner.type}</b></li>
                              <li className="flex"><span className="text-gray-500 w-32 shrink-0">NIF:</span> <b className="text-gray-900">{selectedPartner.details?.nif || 'Não definido'}</b></li>
                              <li className="flex"><span className="text-gray-500 w-32 shrink-0">Morada:</span> <b className="text-gray-900">{selectedPartner.details?.address || 'Não definida'}</b></li>
                              <li className="flex"><span className="text-gray-500 w-32 shrink-0">Cidade Base:</span> <b className="text-gray-900">{selectedPartner.city || 'Lisboa'}</b></li>
                              <li className="flex"><span className="text-gray-500 w-32 shrink-0">Clientes Ativos:</span> <b className="text-green-600 font-extrabold">{activeClientsCount}</b></li>
                              
                              {selectedPartner.type === 'NUTRITIONIST' && (
                                <>
                                  <li className="flex"><span className="text-gray-500 w-32 shrink-0">Experiência:</span> <b className="text-gray-900">{selectedPartner.details?.experienceYears ? `${selectedPartner.details.experienceYears} anos` : 'Não definido'}</b></li>
                                  <li className="flex"><span className="text-gray-500 w-32 shrink-0">Especialidades:</span> <b className="text-gray-900">{selectedPartner.details?.specialties?.join(', ') || 'Não definidas'}</b></li>
                                </>
                              )}
                              
                              {selectedPartner.type === 'KITCHEN' && (
                                <>
                                  <li className="flex"><span className="text-gray-500 w-32 shrink-0">Personalização:</span> <b className="text-gray-900">{selectedPartner.details?.canDoMacros ? 'Faz refeições à medida (macros)' : 'Apenas ementa fixa'}</b></li>
                                  <li className="flex"><span className="text-gray-500 w-32 shrink-0">Ementa:</span> <b className="text-gray-900">{selectedPartner.details?.menu?.length || 0} pratos registados</b></li>
                                </>
                              )}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-bold text-gray-800 mb-6 text-xl flex items-center"><FileCheck className="w-5 h-5 mr-2 text-green-500"/> Documentação Submetida</h4>
                            {selectedPartner.details?.documents ? (
                              <ul className="space-y-4">
                                {Object.entries(selectedPartner.details.documents).map(([key, value]) => (
                                  <li key={key} className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <span className="capitalize font-bold text-gray-700">{key.replace('identificacao', 'Identificação')}</span>
                                    {value ? (
                                      <span className="flex items-center text-green-700 font-bold text-sm bg-green-100 px-3 py-1 rounded-full"><Check className="w-4 h-4 mr-1"/> Validado</span>
                                    ) : (
                                      <span className="text-red-500 text-xs uppercase font-bold bg-red-50 px-3 py-1 rounded-full border border-red-100">Pendente</span>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className="bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300 text-center">
                                <p className="text-gray-500 italic">Nenhum documento submetido.</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {selectedPartner.type === 'KITCHEN' && selectedPartner.details?.capacity && (
                          <div className="pt-6 border-t border-gray-100">
                            <h4 className="font-bold text-gray-800 mb-6 text-xl flex items-center"><ClipboardList className="w-5 h-5 mr-2 text-blue-500"/> Capacidade de Produção Diária Registada</h4>
                            <div className="overflow-x-auto rounded-xl border border-gray-200">
                              <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50">
                                  <tr><th className="px-6 py-4 text-left font-bold text-gray-700 uppercase tracking-wider">Dia da Semana</th><th className="px-6 py-4 text-center font-bold text-gray-700 uppercase tracking-wider">Pequeno-Almoço</th><th className="px-6 py-4 text-center font-bold text-gray-700 uppercase tracking-wider">Almoço</th><th className="px-6 py-4 text-center font-bold text-gray-700 uppercase tracking-wider">Lanche</th><th className="px-6 py-4 text-center font-bold text-gray-700 uppercase tracking-wider">Jantar</th></tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white">
                                  {WEEK_DAYS.map(day => (
                                    <tr key={day} className="hover:bg-gray-50 transition-colors">
                                      <td className="px-6 py-4 font-bold text-gray-900">{day}</td>
                                      {['breakfast', 'lunch', 'snack', 'dinner'].map(meal => (
                                        <td key={meal} className="px-6 py-4 text-center">
                                          <span className="inline-block bg-blue-50 text-blue-800 font-mono font-bold px-3 py-1 rounded-lg border border-blue-100">
                                            {selectedPartner.details.capacity[day]?.[meal] || 0}
                                          </span>
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {selectedPartner.type === 'KITCHEN' && (
                          <div className="pt-6 border-t border-gray-100">
                            <h4 className="font-bold text-gray-800 mb-6 text-xl flex items-center"><Utensils className="w-5 h-5 mr-2 text-orange-500"/> Ementa Registada</h4>
                            {(!selectedPartner.details?.menu || selectedPartner.details.menu.length === 0) ? (
                              <div className="bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300 text-center">
                                <p className="text-gray-500 italic">Nenhum prato adicionado à ementa.</p>
                              </div>
                            ) : (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {selectedPartner.details.menu.map(dish => (
                                  <div key={dish.id} className="border border-gray-100 p-5 rounded-xl hover:shadow-sm transition bg-gray-50">
                                    <div className="flex justify-between items-start mb-2">
                                      <h5 className="font-bold text-gray-900 pr-2">{dish.name}</h5>
                                      <span className="bg-white border border-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded font-medium whitespace-nowrap">{dish.category}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">{dish.description}</p>
                                    {(dish.kcal || dish.prot || dish.carb || dish.fat) && (
                                      <div className="flex flex-wrap gap-3 text-xs bg-white p-2.5 rounded-lg border border-gray-100">
                                        {dish.kcal && <span><b>{dish.kcal}</b> kcal</span>}
                                        {dish.prot && <span><b>{dish.prot}</b>g Prot</span>}
                                        {dish.carb && <span><b>{dish.carb}</b>g Hid</span>}
                                        {dish.fat && <span><b>{dish.fat}</b>g Lip</span>}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}
          {activeTab === 'CLIENTS' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pipeline de Clientes</h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plano / Obj.</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th></tr></thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {db.clients.map(c => {
                      const user = db.users.find(u => u.id === c.userId);
                      return (
                        <tr key={c.id}>
                          <td className="px-6 py-4 whitespace-nowrap"><div className="font-medium text-gray-900">{user?.firstName} {user?.lastName}</div><div className="text-sm text-gray-500">{c.deliveryMethod}</div></td>
                          <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900 font-bold">{c.planType}</div><div className="text-sm text-gray-500">{c.intake?.goal}</div></td>
                          <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{c.status}</span></td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">{c.status === 'LEAD' && <button onClick={()=>updateClientStatus(c.id, 'PENDING_MATCH')} className="text-indigo-600 hover:text-indigo-900">Validar & Avançar</button>}{c.status === 'PENDING_MATCH' && <button onClick={()=>setActiveTab('MATCHING')} className="text-red-600 hover:text-red-900">Ir p/ Matching</button>}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === 'MATCHING' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Mesa de Matching (Manual)</h2>
              <div className="space-y-6">
                {db.clients.filter(c => c.status === 'PENDING_MATCH').map(c => {
                  const user = db.users.find(u => u.id === c.userId);
                  const activeNutris = db.partners.filter(p => p.type === 'NUTRITIONIST' && p.status === 'ACTIVE');
                  const activeKitchens = db.partners.filter(p => p.type === 'KITCHEN' && p.status === 'ACTIVE');
                  
                  return (
                    <div key={c.id} className="bg-white p-6 rounded-xl shadow-sm border border-red-200">
                      <div className="flex justify-between items-start mb-4">
                        <div><h3 className="font-bold text-lg text-gray-900">{user?.firstName} {user?.lastName}</h3><p className="text-sm text-gray-600">Plano: <strong>{c.planType}</strong> | Obj: {c.intake.goal} | {c.city}</p></div>
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-bold uppercase">Ação Necessária</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Nutricionista {c.planType === 'PREMIUM' && <span className="text-red-500">*</span>}</label><select className="block w-full border border-gray-300 rounded-md py-2 px-3"><option value="">-- Selecionar --</option>{activeNutris.map(n => <option key={n.id} value={n.id}>{db.users.find(u=>u.id===n.userId)?.firstName} ({n.details.specialties[0]})</option>)}</select></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Cozinha</label><select className="block w-full border border-gray-300 rounded-md py-2 px-3"><option value="">-- Selecionar --</option>{activeKitchens.map(k => <option key={k.id} value={k.id}>{k.details.businessName}</option>)}</select></div>
                      </div>
                      <div className="flex justify-end"><button onClick={() => assignMatch(c.id, 1, 3)} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Confirmar Atribuição</button></div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {activeTab === 'SETTINGS' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Configurações</h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Distritos de Operação</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {ALL_DISTRICTS.map(d => (
                    <label key={d} className="flex items-center space-x-3 cursor-pointer group">
                      <input type="checkbox" className="h-4 w-4 rounded text-green-600 border-gray-300" checked={db.settings.availableDistricts?.includes(d)} onChange={() => toggleDistrict(d)} />
                      <span className={`text-sm ${db.settings.availableDistricts?.includes(d) ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>{d}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ==========================================
  // RENDER MAIN APP
  // ==========================================
  return (
    <div className="min-h-screen font-sans text-gray-900 bg-white flex flex-col">
      <Navbar
        currentUser={currentUser}
        logout={logout}
        setCurrentRoute={setCurrentRoute}
        setPartnerApplyType={setPartnerApplyType}
        setPartnerApplySubmitted={setPartnerApplySubmitted}
        setPreSelectedPlan={setPreSelectedPlan}
      />
      <main className="flex-1">
        {currentRoute === 'HOME' && <HomePage />}
        {currentRoute === 'ABOUT_US' && <AboutUsPage />}
        {currentRoute === 'LOGIN' && <LoginPage />}
        {currentRoute === 'REGISTER_CLIENT' && <RegisterClientPage />}
        {currentRoute === 'REGISTRATION_SUCCESS' && (
          <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden text-center py-12 px-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6"><Check className="h-8 w-8 text-green-600" /></div>
              <h3 className="text-3xl font-bold text-gray-900">Registo criado com sucesso!</h3>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => setCurrentRoute('DASHBOARD')} className="flex-1 bg-green-600 text-white py-4 px-6 rounded-lg font-bold hover:bg-green-700">Ir para a minha Área</button>
                <button onClick={() => setCurrentRoute('HOME')} className="flex-1 bg-gray-200 text-gray-800 py-4 px-6 rounded-lg font-bold hover:bg-gray-300">Voltar à página inicial</button>
              </div>
            </div>
          </div>
        )}
        {currentRoute === 'APPLY_PARTNER' && <ApplyPartnerPage />}
        {currentRoute === 'DASHBOARD' && <DashboardRouter />}
      </main>
      
      {currentRoute !== 'DASHBOARD' && <Footer />}
    </div>
  );
}