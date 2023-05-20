import React, {FC, useEffect} from 'react';
import {useRouter} from "next/navigation";
import {HOME_ROUTE, LOGIN} from "@/constant/routes";
import {useStore} from "@/store/root-store";


interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({children}) => {
    const {push} = useRouter();
    const {user} = useStore();

    useEffect(() => {
        user.id ? push(HOME_ROUTE) : push(LOGIN);
    }, [user])

    return (
        <>
            {children}
        </>
    );
};

export default ProtectedRoute;