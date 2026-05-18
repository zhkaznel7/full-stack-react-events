import { getApiErrorMessage } from '@/lib/utils'
import { authApi } from '@/shared/api/auth-api'
import { getAuthToken, setAuthToken } from '@/shared/api/auth-token'
import type { AuthLoginRequest, UserPublic } from '@/shared/api/types'
import { create } from 'zustand'

type AuthState = {
    user: UserPublic | null
    bootstraped: boolean
    isAutLoading: boolean
    authError: string | null
    bootstrap: () => Promise<void>
    login: (payload: AuthLoginRequest) => Promise<void>
    register: (payload: AuthLoginRequest) => Promise<void>
    logout: () => void
    clearAuthError: () => void
    featchMe: () => Promise<void>
}

function profileToUser(profile:{
    id: string
    email: string
    name: string
}): UserPublic {
    return {id: profile.id, email: profile.email, name: profile.name}
}

export const useAuthStore = create<AuthState>((set, get) =>({
    user: null,
    bootstraped: false,
    isAutLoading: false,
    authError: null,
    bootstrap:async () =>{
        if (get().bootstraped){
            return
        }
        set({ isAutLoading: true, authError: null})
        try{
            if(!getAuthToken()) {
                set({user: null, bootstraped: true, isAutLoading: false})
                return
            }
            const profile = await authApi.me();
            set({
                user: profileToUser(profile),
                bootstraped: true,
                isAutLoading: false
            })
        } catch (error){
            setAuthToken(null)
            set({
                user: null,
                bootstraped: true,
                isAutLoading: false
            })
        }
        

    },
    login: async (payload) =>{
        set({isAutLoading: true, authError: null})

        try{
            const { token, user } = await authApi.login(payload)
            setAuthToken(token)
            set({ user, isAutLoading: false})
        } catch (error){
            set({
                isAutLoading: false,
                authError: getApiErrorMessage(error,'Не удалось войти')
            })
            throw error

        }
    },
    register: async (payload) =>{
        set({isAutLoading: true, authError: null})
        try{
            const { token, user } = await authApi.register(payload)
            setAuthToken(token)
            set({ user, isAutLoading: false})
        }catch (error){
            set({
                isAutLoading: false,
                authError: getApiErrorMessage(error,'Не удалось зарегистрироваться')
            })
            throw error

        }
    },
    logout: () =>{
        setAuthToken(null)
        set({user: null, authError: null})
    },
    clearAuthError: () =>{
        set({authError: null})
    },
    featchMe: async () =>{
        if (!getAuthToken()){
            set({ user: null})
            return
        } 
        try{
            const profile = await authApi.me()
            set({ user: profileToUser(profile)})
        } catch (error){
            setAuthToken(null);
            set({ user: null})
        }
    }
}))

