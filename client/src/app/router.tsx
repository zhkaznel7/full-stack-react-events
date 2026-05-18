import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "./router/root-layout";
import { RootRedirect } from "./router/root-redirect";
import { GuestRoute } from "./router/guest-route";
import { ProtectedRoute } from "./router/protected-route";

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {index: true, element: <RootRedirect/>},
            {
                element: <GuestRoute/>,
                children: [
                    { path: 'login', element: <h1>Login</h1>},
                    { path: 'register', element: <h1>register</h1>}

                ]
            },
            {
                element: <ProtectedRoute />, 
                children: [
                    { path: 'events', element: <h1>events</h1>},
                    { path: 'events/my', element: <h1>events/my</h1>},
                    { path: 'events/new', element: <h1>events/new</h1>},
                    { path: 'events/:id', element: <h1>events:id</h1>},
                    { path: 'events/:id/edit', element: <h1>events/:id/edit</h1>}

                ]
            },
            {
                path: "*", element: <Navigate to="/" replace />
            }
        ]
    }
])