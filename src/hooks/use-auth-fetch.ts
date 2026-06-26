import { AUTH } from "@/consts/api-url";
import { useAuthStore } from "@/stores/auth-store";
import { fetcher } from "@/libs/api-client";
import { toaster } from "@/libs/toast";
import type { ApiResponseType, SingleResponse } from "@/types/api-response-type";
import useSWRMutation from 'swr/mutation'
import { useNavigate } from '@tanstack/react-router'
import { ROLE } from "@/enums/roles-enum";

interface LoginData {
    user: {
        role: ROLE;
        [key: string]: any;
    };
    token: string;
}

export const useLogin = () => {
    const navigate = useNavigate()
    const { login } = useAuthStore.getState()

    return useSWRMutation(AUTH.LOGIN, fetcher.post, {
        onError: (err) => {
            console.error("Login failed:", err)
            toaster(err.response.data.error, 'error')
        }, onSuccess: (data: SingleResponse<LoginData>) => {
            login(data, false)
            console.log({data})
            toaster(data?.message || 'Berhasil masuk', 'success')
            if (data.data?.user.role === ROLE.TEACHER) navigate({ to: '/guru' })
            else navigate({ to: '/siswa' })
        }
    })
}

export const useRegister = () => {
    const navigate = useNavigate()

    return useSWRMutation(AUTH.REGISTER, fetcher.post, {
        onError: (err) => {
            console.error("Register failed:", err)
            toaster(err.response.data.error, 'error')
        }, onSuccess: (data: ApiResponseType) => {
            toaster(data?.message || 'Berhasil daftar', 'success', 15000)
            navigate({ to: '/login' })
        }
    })
}

export const useLogout = () => {
    const navigate = useNavigate()
    const { logout } = useAuthStore.getState()

    return useSWRMutation(AUTH.LOGOUT, fetcher.post, {
        onError: (err) => {
            console.error("Logout failed:", err)
            toaster(err.response.data.error, 'error')
            navigate({ to: '/' })
        }, onSuccess: (data: ApiResponseType) => {
            logout()
            toaster(data?.message || 'Berhasil keluar', 'success')
            navigate({ to: '/' })
        }
    })
}