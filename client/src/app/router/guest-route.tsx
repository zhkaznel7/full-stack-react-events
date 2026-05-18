import { useAuthBootstrap } from "@/hooks/use-auth-butstrap";

export function GuestRoute(){
    const user = useAuthBootstrap();
    if (user){
        return <Navigate to="/events" replace/> 
    }
    return <Outlet />
}