import { useAuthStore } from "@/stores/aurh-store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthFormCard } from "./auth-form-card";
import { FieldGroup } from "@/components/ui/field";

export function RegisterForm() {
    const navigate = useNavigate();
    const register = useAuthStore(s => s.register);
    const authError = useAuthStore(s => s.authError);
    const isAuthLoading = useAuthStore(s => s.isAutLoading); 
    const [clientError, setClientError] = useState<string | null>(null);
    const handleSubmit = () => void
    return(
        <div className="flex w-full max-w-sm flex-col gap-6">
            <AuthFormCard title="Регистрация">
                <form onSubmit={}>
                    <FieldGroup>
                        
                    </FieldGroup>
                </form>
            </AuthFormCard>
        </div>
    )

}