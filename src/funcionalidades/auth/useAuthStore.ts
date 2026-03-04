import { create } from 'zustand';

interface AuthState {
    userName: string | null;
    userAvatar: string | null;
    login: (name: string, avatar?: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    userName: null, // estado no autenticado predeterminado
    userAvatar: null,
    login: (name, avatar) => set({
        userName: name,
        userAvatar: avatar || `https://api.dicebear.com/7.x/notionists/png?seed=${name}&backgroundColor=f3f4f6`
    }),
    logout: () => set({ userName: null, userAvatar: null }),
}));
