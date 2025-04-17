import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email: string, password: string) => {
    try {
      const response = await fetch('https://api.peppypresence.com/api/employee/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status !== 200) {
        throw new Error('Something went wrong');
      }

      const { data } = await response.json();
      
      set({ 
        isAuthenticated: true, 
        user: {
          id: data.id,
          name: data.name,
          email: data.email
        }
      });
      
      return true;
    } catch (error) {
      return false;
    }
  },
  logout: () => set({ isAuthenticated: false, user: null }),
}));