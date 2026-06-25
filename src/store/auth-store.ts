import { DISABILITY } from "@/enums/disability-enum";
import { ROLE } from "@/enums/roles-enum";
import { getToken, removeToken, setToken } from "@/libs/token-handler";
import { create } from "zustand";

type AuthState = {
    firstRender: boolean;
    setFirstRender: (value: boolean) => void;
    isAuthenticated: boolean;
    role: ROLE | null;
    user: any;
    login: (data: any, isValidate?: boolean) => void;
    logout: () => void;
    disability: DISABILITY[] | null;
    hasDisability: (disability: DISABILITY | DISABILITY[]) => boolean;
}

const formatDisability = (data?: null | { [key: string]: boolean }) => {
    if (!data) return null
    return Object.entries(data).filter(([key, value]) => value === true && Object.values(DISABILITY).includes(key as DISABILITY)).map(([key]) => (key)) as DISABILITY[] | null
}

export const useAuthStore = create<AuthState>((set, get) => ({
    firstRender: true,
    setFirstRender: (value: boolean) => set({ firstRender: value }),
    isAuthenticated: false,
    role: null,
    user: null,
    disability: null,
    login: (data: any, isValidate: boolean = true) => {
        if (isValidate) set({ isAuthenticated: true, role: data.data.role, user: data.data, disability: formatDisability(data.data.accessibility) })
        else set({ isAuthenticated: true, role: data.user.role, user: data.user, disability: formatDisability(data.user.accessibility) })
        setToken(isValidate ? getToken() : data.token)
    },
    logout: () => {
        set({ isAuthenticated: false, role: null, user: null, disability: null })
        removeToken()
    },
    hasDisability: (disability: DISABILITY | DISABILITY[]) => {
        if (Array.isArray(disability)) return get().disability?.some((d) => disability.includes(d)) || false
        return get().disability?.includes(disability) || false
    }
}))