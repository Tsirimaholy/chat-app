import React, {createContext, FC, useCallback, useEffect, useMemo, useState} from 'react';
import {useRouter} from "next/navigation";
import {HOME_ROUTE, LOGIN} from "@/constant/routes";
import {AuthInfos} from "@/models/Auth";

interface TUserContext {
    user: AuthInfos;
    updateUserInfos?: (newValue: AuthInfos) => void;
}

export const UserContext = createContext<TUserContext>({
        user: {username: "", password: ""},
        updateUserInfos: (user: AuthInfos) => {
            throw Error("Not implemented")
        }
    }
);

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const AUTH_INFOS_DEFAULT_VALUE = {username: "", password: ""};
const ProtectedRoute: FC<ProtectedRouteProps> = ({children}) => {
    const [user, setUser] = useState<AuthInfos>(AUTH_INFOS_DEFAULT_VALUE);
    const {push} = useRouter()

    const updateUserInfos = useCallback(function (newUser: TUserContext["user"]) {
        setUser({...newUser});
    }, [user]);

    const userContextValue = useMemo<TUserContext>(() => ({user, updateUserInfos}), [user]);

    useEffect(() => {
        if (user.username) {
            push(HOME_ROUTE);
        } else {
            push(LOGIN);
        }
    }, [user])

    return (
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    );
};

export default ProtectedRoute;