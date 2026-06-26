import type { ObjectType } from "@/types/object-type"
import type { ApiResponseType } from "@/types/api-response-type"
import { fetcher } from "@/libs/api-client"
import { toaster } from "@/libs/toast"
import useSWR, { mutate } from "swr"
import useSWRMutation from "swr/mutation"

export const useQueryData = <T, M extends 'single' | 'multiple' = 'multiple'>(
    url: string,
    params?: ObjectType<any>
) => {
    const new_url = params ? [url, params] : url

    const fetcherWrapper = (keyData: string | [string, any]) => {
        if (Array.isArray(keyData)) {
            return fetcher.get(keyData[0], keyData[1])
        }
        return fetcher.get(keyData)
    }

    return useSWR<ApiResponseType<M, T>>(new_url, fetcherWrapper, {
        revalidateOnFocus: false,
        dedupingInterval: 30000
    })
}

export const useMutationAction = <T>(
    url: string,
    method: 'post' | 'put' | 'patch' | 'delete' | 'get',
    config?: {
        refreshKey?: string,
        onSuccess?: () => void,
        onError?: (err: any) => void,
    }
) => (useSWRMutation(
    url,
    fetcher[method],
    {
        onError: (err) => {
            const msg = err?.response?.data?.error || err?.response?.data?.message || 'Terjadi kesalahan'

            if (config?.onError) {
                config.onError(err)
            } else {
                toaster(msg, 'error')
            }
        },
        onSuccess: (data: ApiResponseType<'single', T>) => {
            toaster(data?.message || 'Berhasil', 'success')
            if (config?.refreshKey) mutate(
                (key) => {
                    if (Array.isArray(key) && key[0] === config.refreshKey) return true
                    if (key === config.refreshKey) return true
                    return false
                },
                undefined,
                { revalidate: true }
            )
            config?.onSuccess?.()
        }
    }
))