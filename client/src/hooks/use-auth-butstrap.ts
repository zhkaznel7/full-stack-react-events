import { ensureAuthBootstraped } from "@/app/auth-bootsrap";
import { use } from "react";
import { useAuthStore } from "@/stores/auth-store";

export function useAuthBootstrap(){
    use(ensureAuthBootstraped())
    return useAuthStore(state => state.user)  // ← useAuthStore болу керек!
}