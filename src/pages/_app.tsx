import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from "@chakra-ui/provider";
import ProtectedRoute from "@/context/protected-route";
import "font-awesome/css/font-awesome.min.css"
import {useEffect} from "react";
import UserApi from "@/services/user-api";
import {useAuthStore} from "@/store/auth-store";
import theme from "@/theme/theme";
import {ColorModeScript} from "@chakra-ui/react";


export default function App({Component, pageProps}: AppProps) {
    const {user: {token}} = useAuthStore();
    useEffect(() => {
        (async () => {
            // Todo: is this the correct way?
            // We call it directly there
            await UserApi.setUpJWT(token);
        })()
    }, [token])


    return (
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
            <ProtectedRoute>
                <Component {...pageProps} />
            </ProtectedRoute>
        </ChakraProvider>
    )
}
