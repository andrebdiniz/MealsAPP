// 1. MOCK DATABASE & SEED DATA
// ==========================================
export const ALL_DISTRICTS = [
  'Aveiro', 'Beja', 'Braga', 'Bragança', 'Castelo Branco', 'Coimbra',
  'Évora', 'Faro', 'Guarda', 'Leiria', 'Lisboa', 'Portalegre', 'Porto',
  'Santarém', 'Setúbal', 'Viana do Castelo', 'Vila Real', 'Viseu',
  'Região Autónoma dos Açores', 'Região Autónoma da Madeira'
];

export const ALLERGY_OPTIONS = ['Leite / Lactose', 'Glúten', 'Frutos de Casca Rija', 'Amendoim', 'Ovos', 'Soja', 'Marisco / Peixes'];
export const DISEASE_OPTIONS = ['Celíaco', 'Diabetes Tipo 1', 'Diabetes Tipo 2', 'Hipertensão', 'Colesterol Elevado', 'Síndrome do Intestino Irritável (SII)'];

export const NUTRITION_SPECIALTIES = ['Perda de Peso', 'Ganho de Massa Muscular', 'Nutrição Desportiva', 'Nutrição Clínica', 'Saúde Digestiva', 'Vegetarianismo / Veganismo', 'Saúde da Mulher'];

export const WEEK_DAYS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
export const defaultDayPlan = { breakfast: '', lunch: '', snack: '', dinner: '' };
export const defaultPlan = { 
  calories: '', 
  notes: '', 
  days: WEEK_DAYS.reduce((acc, day) => ({ ...acc, [day]: { ...defaultDayPlan } }), {}) 
};

// Nova estrutura por defeito para a capacidade de produção da Cozinha
export const defaultCapacity = WEEK_DAYS.reduce((acc, day) => ({ 
  ...acc, 
  [day]: { breakfast: '', lunch: '', snack: '', dinner: '' } 
}), {});

// Nova estrutura para o calendário de subscrição padrão do cliente
export const defaultSubscriptionSchedule = WEEK_DAYS.reduce((acc, day) => ({ 
  ...acc, 
  [day]: { breakfast: false, lunch: true, snack: false, dinner: true } 
}), {});

export const initialDB = {
  users: [
    { id: 1, firstName: 'Admin', lastName: 'Principal', email: 'admin@lisboafit.pt', role: 'ADMIN', password: '123' },
    { id: 2, firstName: 'João', lastName: 'Nutri', email: 'joao@nutri.pt', role: 'PARTNER', password: '123' },
    { id: 3, firstName: 'Ana', lastName: 'Silva', email: 'ana@nutri.pt', role: 'PARTNER', password: '123' },
    { id: 4, firstName: 'Healthy Kitchen', lastName: 'LX', email: 'geral@healthykitchen.pt', role: 'PARTNER', password: '123' },
    { id: 5, firstName: 'Carlos', lastName: 'Cliente', email: 'carlos@email.com', role: 'CLIENT', password: '123' },
    { id: 6, firstName: 'Maria', lastName: 'Cliente', email: 'maria@email.com', role: 'CLIENT', password: '123' },
    { id: 7, firstName: 'Pedro', lastName: 'Premium', email: 'pedro@email.com', role: 'CLIENT', password: '123' },
    { id: 8, firstName: 'Sofia', lastName: 'Standard', email: 'sofia@email.com', role: 'CLIENT', password: '123' },
    { id: 9, firstName: 'Tiago', lastName: 'Teste', email: 'tiago@email.com', role: 'CLIENT', password: '123' }
  ],
  partners: [
    { id: 1, userId: 2, type: 'NUTRITIONIST', status: 'ACTIVE', phone: '912345678', city: 'Lisboa', details: { specialties: ['Perda de Peso', 'Nutrição Desportiva'], mode: 'Ambos' } },
    { id: 2, userId: 3, type: 'NUTRITIONIST', status: 'PRE_APPROVED', phone: '912345679', city: 'Lisboa', details: { specialties: ['Vegetarianismo / Veganismo', 'Saúde Digestiva'], mode: 'Online' } },
    { id: 3, userId: 4, type: 'KITCHEN', status: 'ACTIVE', phone: '912345680', city: 'Lisboa', details: { businessName: 'Healthy Kitchen LX', capacity: { ...defaultCapacity, 'Segunda': { breakfast: 20, lunch: 100, snack: 20, dinner: 80 }, 'Terça': { breakfast: 20, lunch: 100, snack: 20, dinner: 80 } }, canDoMacros: true, delivery: true, menu: [{ id: 1, name: 'Frango com Batata Doce', description: 'Peito de frango grelhado com puré de batata doce e brócolos a vapor.', category: 'Almoço/Jantar', kcal: 450, prot: 40, carb: 45, fat: 12 }] } }
  ],
  clients: [
    { id: 1, userId: 5, status: 'LEAD', planType: 'STANDARD', deliveryMethod: 'DELIVERY', city: 'Lisboa', intake: { goal: 'Perder Peso', gender: 'Masculino', age: 34, weight: 85, height: 180, allergies: [], otherAllergies: '', diseases: [], otherDiseases: '' }, progress: [{ id: 1, date: '2025-11-01', weight: 88, waist: 95 }, { id: 2, date: '2025-12-01', weight: 86.5, waist: 93 }, { id: 3, date: '2026-01-01', weight: 85.2, waist: 91 }, { id: 4, date: '2026-02-15', weight: 84.0, waist: 89 }], shareProgress: false, nutritionalPlan: null },
    { id: 2, userId: 6, status: 'PENDING_MATCH', planType: 'PREMIUM', deliveryMethod: 'PICKUP', city: 'Lisboa', intake: { goal: 'Ganhar Massa', gender: 'Feminino', age: 28, weight: 60, height: 165, allergies: ['Glúten'], otherAllergies: '', diseases: [], otherDiseases: '' }, progress: [], shareProgress: false, nutritionalPlan: null },
    { id: 3, userId: 7, status: 'IN_PROGRESS', planType: 'PREMIUM', deliveryMethod: 'DELIVERY', city: 'Lisboa', intake: { goal: 'Performance', gender: 'Masculino', age: 25, weight: 75, height: 175, allergies: [], otherAllergies: '', diseases: [], otherDiseases: '' }, progress: [{ id: 1, date: '2025-12-10', weight: 77, waist: 85 }, { id: 2, date: '2026-01-20', weight: 76.1, waist: 84 }, { id: 3, date: '2026-02-18', weight: 75.0, waist: 82 }], shareProgress: true, nutritionalPlan: { isPlanApproved: false, calories: '2500', notes: 'Beber 2.5L de água por dia.', days: { ...defaultPlan.days, 'Segunda': { breakfast: '- 2 Ovos mexidos\n- 50g Aveia com bebida vegetal', lunch: '- 150g Peito de Frango\n- 100g Arroz Basmati\n- Salada mista', snack: '- 1 Iogurte Proteico\n- 1 Peça de fruta', dinner: '- 150g Pescada Cozida\n- Brócolos e Cenoura' }, 'Terça': { breakfast: '- Panquecas de Aveia', lunch: '- 150g Salmão\n- Batata Doce', snack: '- Frutos Secos', dinner: '- Bife de Peru\n- Salada' } } }, invoices: [{ id: 'FT 2026/01', date: '2026-01-01', amount: 249.99, status: 'Pago' }, { id: 'FT 2026/02', date: '2026-02-01', amount: 249.99, status: 'Pendente' }], paymentMethods: [{ id: 1, brand: 'Visa', last4: '4242', expiry: '12/28', isDefault: true }] },
    { id: 4, userId: 8, status: 'ACTIVE', planType: 'STANDARD', deliveryMethod: 'PICKUP', city: 'Lisboa', intake: { goal: 'Manter', gender: 'Feminino', age: 40, weight: 65, height: 160, allergies: [], otherAllergies: '', diseases: ['Hipertensão'], otherDiseases: '' }, progress: [], shareProgress: false, nutritionalPlan: null },
    { id: 5, userId: 9, status: 'LEAD', planType: 'STANDARD', deliveryMethod: 'DELIVERY', city: 'Lisboa', intake: { goal: 'Perder Peso', gender: 'Masculino', age: 29, weight: 90, height: 178, allergies: [], otherAllergies: '', diseases: [], otherDiseases: '' }, progress: [], shareProgress: false, nutritionalPlan: null }
  ],
  matchings: [
    { id: 1, clientId: 3, nutriId: 1, kitchenId: 3, status: 'IN_PROGRESS' },
    { id: 2, clientId: 4, nutriId: 1, kitchenId: null, status: 'COMPLETED' }
  ],
  consultations: [
    { id: 1, clientId: 3, nutriId: 1, date: '2026-02-25', time: '10:00', status: 'SCHEDULED', sharedNotes: 'Trazer últimas análises clínicas para a consulta.', privateNotes: 'Cliente tem tido alguma dificuldade com a ingestão de água. Focar neste ponto.' }
  ],
  settings: {
    paymentsEnabled: false,
    availableDistricts: ['Lisboa']
  }
};

// ==========================================
// INTEGRAÇÃO DE INTELIGÊNCIA ARTIFICIAL (GEMINI)
