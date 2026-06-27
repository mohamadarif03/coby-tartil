import { DISABILITY } from "@/enums/disability-enum";
import { ROLE } from "@/enums/roles-enum";
import { getToken, removeToken, setToken } from "@/libs/token-handler";
import type { SingleResponse } from "@/types/api-response-type";
import { create } from "zustand";

type AuthState = {
    firstRender: boolean;
    setFirstRender: (value: boolean) => void;
    isAuthenticated: boolean;
    role: ROLE | null;
    user: any;
    login: (data: SingleResponse<any>, isValidate?: boolean) => void;
    logout: () => void;
    disability: DISABILITY | null;
    hasDisability: (disability: DISABILITY | DISABILITY[]) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    firstRender: true,
    setFirstRender: (value: boolean) => set({ firstRender: value }),
    isAuthenticated: false,
    role: null,
    user: null,
    disability: null,
    login: (data: SingleResponse<any>, isValidate: boolean = true) => {
        if (isValidate) {
            // For validate (/auth/me): payload is directly in data.data
            const payload = data?.data
            set({ isAuthenticated: true, role: payload?.role, user: payload, disability: payload?.disability_type })
            // Sync user condition from backend to localStorage
            localStorage.setItem('cobytartil_user_condition', payload?.disability_type ?? '');
        } else {
            // For login: the data field contains { user, token }
            const payload = data?.data?.user
            set({ isAuthenticated: true, role: payload?.role, user: payload, disability: payload?.disability_type })
            setToken(data?.data?.access_token || '')
            // Sync user condition from backend to localStorage
            localStorage.setItem('cobytartil_user_condition', payload?.disability_type ?? '');
        }
    },
    logout: () => {
        set({ isAuthenticated: false, role: null, user: null, disability: null })
        removeToken()
    },
    hasDisability: (disability: DISABILITY | DISABILITY[]) => {
        if (!get().disability) return false
        if (Array.isArray(disability)) return disability?.includes(get().disability as DISABILITY) || false
        return get().disability === disability || false
    }
}))