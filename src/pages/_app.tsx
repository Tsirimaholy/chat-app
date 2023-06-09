import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from "@chakra-ui/provider";
import ProtectedRoute from "@/context/protected-route";
import "font-awesome/css/font-awesome.min.css"
import theme from "@/theme/theme";
import {ColorModeScript} from "@chakra-ui/react";
import {useAuthStore} from "@/store/auth-store";
import api from "@/services/api";
import {useEffect} from "react";


export default function App({Component, pageProps}: AppProps) {
    const {setUpJWT, user}= useAuthStore();
    useEffect(() => {
        const jwtRequestInterceptor = setUpJWT(user.token);
        return ()=>{
            api.interceptors.request.eject(jwtRequestInterceptor);
        }
    }, [setUpJWT, user.token])



    return (
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
            <ProtectedRoute>
                <Component {...pageProps} />
            </ProtectedRoute>
        </ChakraProvider>
    )
}
