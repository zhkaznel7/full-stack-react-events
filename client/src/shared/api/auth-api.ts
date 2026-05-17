import { http } from "./http";
import type { AuthLoginRequest, AuthResponse, UserProfile } from "./types";

export const authApi = {
    async login(payload: AuthLoginRequest): Promise<AuthResponse> {
        const { data } = await http.post<AuthResponse>('/auth/login', payload);

        return data;
    },
    async register(payload: AuthLoginRequest): Promise<AuthResponse> {
        const { data } = await http.post<AuthResponse>('/auth/register', payload);

        return data;
    },
    async me(): Promise<UserProfile> {
        const { data } = await http.post<UserProfile>('/auth/me');

        return data;
    }  
}