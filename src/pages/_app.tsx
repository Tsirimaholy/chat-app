import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from "@chakra-ui/provider";
import ProtectedRoute from "@/context/protected-route";
import "font-awesome/css/font-awesome.min.css"
import theme from "@/theme/theme";
import {ColorModeScript} from "@chakra-ui/react";


export default function App({Component, pageProps}: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
            <ProtectedRoute>
                <Component {...pageProps} />
            </ProtectedRoute>
        </ChakraProvider>
    )
}
