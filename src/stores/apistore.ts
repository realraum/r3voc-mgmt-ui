import { create } from 'zustand';

import type { ApiUser } from '@/api';
import { apiFetchUser, apiLogin, apiLogout } from '@/api';

export interface ApiStoreState {
    user: ApiUser | null;
}

export interface ApiStoreActions {
    login: (username: string, password: string) => ReturnType<typeof apiLogin>;
    logout: () => ReturnType<typeof apiLogout>;
    fetchUser: () => ReturnType<typeof apiFetchUser>;
}

export type ApiStore = ApiStoreState & ApiStoreActions;

export const useApiStore = create<ApiStore>(set => ({
    user: null,
    login: async (username: string, password: string) => {
        const response = await apiLogin(username, password);

        if (response.success) {
            set({ user: response.data });
        }

        return response;
    },
    logout: async () => {
        const response = await apiLogout();
        if (response) {
            set({ user: null });
        }

        return response;
    },
    fetchUser: async () => {
        const response = await apiFetchUser();

        if (response.success) {
            set({ user: response.data });
        }

        return response;
    },
}));
