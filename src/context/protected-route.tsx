import React, {FC, useEffect} from 'react';
import {usePathname, useRouter} from "next/navigation";
import {HOME_ROUTE, LOGIN, PROFILE_ROUTE, ROOT_ROUTE} from "@/constant/routes";
import {useAuthStore} from "@/store/auth-store";
import api from "@/services/api";


interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({children}) => {
    const {push} = useRouter();
    const currentPath = usePathname();
    const {user, setUpUnauthorizedInterceptor} = useAuthStore();


    useEffect(() => {
        const isAuthenticated = !!(user?.id && user.token);
        if (!isAuthenticated) {
            push(LOGIN);
            return;
        }
        if (isAuthenticated) {
            // Do not show login page anymore if already authenticated
            if (currentPath == LOGIN || currentPath == ROOT_ROUTE) push(PROFILE_ROUTE);
        }
    }, [currentPath])

    return (
        <>
            {children}
        </>
    );
};

export default ProtectedRoute;