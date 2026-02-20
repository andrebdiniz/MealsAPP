import { useCallback } from 'react';

export default function useAuth({ db, setCurrentUser, setCurrentRoute, updateDB }) {
  const login = useCallback((email, password) => {
    const user = db.users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setCurrentRoute('DASHBOARD');
    } else {
      alert('Credenciais inválidas. (Use admin@lisboafit.pt / 123 para testar o admin)');
    }
  }, [db.users, setCurrentRoute, setCurrentUser]);

  const loginWithProvider = useCallback((provider) => {
    const email = `${provider}@email.com`;
    const idOffset = provider === 'apple' ? 1 : 0;
    let user = db.users.find(u => u.email === email);

    if (!user) {
      const id = Date.now() + idOffset;
      user = {
        id,
        firstName: 'Utilizador',
        lastName: provider === 'google' ? 'Google' : 'Apple',
        email,
        role: 'CLIENT',
        password: `mock_password_${provider}`
      };

      const newClient = {
        id,
        userId: user.id,
        status: 'LEAD',
        planType: 'STANDARD',
        deliveryMethod: 'DELIVERY',
        city: 'Lisboa',
        intake: { goal: 'Perder Peso', gender: 'Prefiro não dizer', age: 30, weight: '', height: '', allergies: [], otherAllergies: '', diseases: [], otherDiseases: '' }
      };

      updateDB({ users: [...db.users, user], clients: [...db.clients, newClient] });
    }

    setCurrentUser(user);
    setCurrentRoute('DASHBOARD');
  }, [db.clients, db.users, setCurrentRoute, setCurrentUser, updateDB]);

  const loginWithGoogle = useCallback(() => loginWithProvider('google'), [loginWithProvider]);
  const loginWithApple = useCallback(() => loginWithProvider('apple'), [loginWithProvider]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setCurrentRoute('HOME');
  }, [setCurrentRoute, setCurrentUser]);

  return { login, loginWithGoogle, loginWithApple, logout };
}
