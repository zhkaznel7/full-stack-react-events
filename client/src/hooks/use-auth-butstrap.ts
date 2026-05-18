import { ensureAuthBootstraped } from "@/app/auth-bootsrap";
import { use, useActionState } from "react";

export function useAuthBootstrap(){
    use(ensureAuthBootstraped())
    return useActionState(state => state.user)
}