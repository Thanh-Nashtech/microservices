import { IndexPage } from "../pages/index.page";
import { LoginPage } from "../pages/login.page";

export const routers = [
    {
        path: '/',
        element: <IndexPage />
    },
    {
        path: '/login',
        element: <LoginPage />
    }
]
