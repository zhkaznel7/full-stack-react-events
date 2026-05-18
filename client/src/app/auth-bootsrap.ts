import { useAuthStore } from "@/stores/aurh-store";

let bootstrapPromise: Promise<void> | null = null;
export function ensureAuthBootstraped(){
    if (!bootstrapPromise){
        bootstrapPromise = useAuthStore.getState().bootstrap()
    }
    return bootstrapPromise;
}