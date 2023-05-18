import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from "@chakra-ui/provider";
import ProtectedRoute from "@/context/protected-route";

export default function App({Component, pageProps}: AppProps) {
    return (
        <ChakraProvider>
            <ProtectedRoute>
                <Component {...pageProps} />
            </ProtectedRoute>
        </ChakraProvider>
    )
}
