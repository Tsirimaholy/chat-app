import React, {FC, useEffect} from 'react';
import {usePathname, useRouter} from "next/navigation";
import {HOME_ROUTE, LOGIN, ROOT_ROUTE} from "@/constant/routes";
import {useStore} from "@/store/root-store";


interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({children}) => {
    const {push} = useRouter();
    const currentPath = usePathname();
    const {user} = useStore();

    useEffect(() => {
        const isAuthenticated = !!(user?.id && user.token);
        if (!isAuthenticated) {
            push(LOGIN);
            return;
        }
        if (isAuthenticated) {
            // Do not show login page anymore if already authenticated
            if (currentPath == LOGIN || currentPath == ROOT_ROUTE) push(HOME_ROUTE);
        }
    }, [currentPath, push, user])

    return (
        <>
            {children}
        </>
    );
};

export default ProtectedRoute;