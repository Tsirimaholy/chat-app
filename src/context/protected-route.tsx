import React, {FC, useEffect} from 'react';
import {usePathname, useRouter} from "next/navigation";
import {HOME_ROUTE, LOGIN, PROFILE_ROUTE, ROOT_ROUTE} from "@/constant/routes";
import {useAuthStore} from "@/store/auth-store";
import api from "@/services/api";


interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({children}) => {


    return (
        <>
            {children}
        </>
    );
};

export default ProtectedRoute;