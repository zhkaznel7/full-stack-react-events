import { AuthScreenLayout } from "../components/auth-screen-layout";
import { LoginForm } from "../components/login-form.tsx";

export function AuthLoginPage() {
    return (
        <AuthScreenLayout>
            <LoginForm />
        </AuthScreenLayout>
    )
}