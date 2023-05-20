import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from "@chakra-ui/provider";
import ProtectedRoute from "@/context/protected-route";
import "font-awesome/css/font-awesome.min.css"
import {useEffect} from "react";
import UserApi from "@/services/user-api";
import {useStore} from "@/store/root-store";


export default function App({Component, pageProps}: AppProps) {
    const {user: {token}} = useStore();
    useEffect(() => {
        (async () => {
            // Todo: is this the correct way?
            // We call it directly there
            await UserApi.setUpJWT(token);
        })()
    }, [])


    return (
        <ChakraProvider>
            <ProtectedRoute>
                <Component {...pageProps} />
            </ProtectedRoute>
        </ChakraProvider>
    )
}
