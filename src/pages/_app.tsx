import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from "@chakra-ui/provider";
import "font-awesome/css/font-awesome.min.css"
import theme from "@/theme/theme";
import {ColorModeScript} from "@chakra-ui/react";
import {useAuthStore} from "@/store/auth-store";
import api from "@/services/api";
import {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {LOGIN, PROFILE_ROUTE, ROOT_ROUTE} from "@/constant/routes";


export default function App({Component, pageProps}: AppProps) {
    const {push} = useRouter();
    const currentPath = usePathname();

    const {setUpJWT, user}= useAuthStore();
    useEffect(() => {
        const jwtRequestInterceptor = setUpJWT(user.token);
        return ()=>{
            api.interceptors.request.eject(jwtRequestInterceptor);
        }
    }, [setUpJWT, user.token])


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
    }, [currentPath, push, user?.id, user.token])

    return (
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
                <Component {...pageProps} />
        </ChakraProvider>
    )
}
