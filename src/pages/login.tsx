import React, {FormEvent, useState} from 'react';
import styles from "@/styles/Home.module.css";
import {CircularProgress} from "@chakra-ui/react";
import {useRouter} from "next/navigation";
import {AUTH_INFOS} from "@/constant/storage";
import {delay} from "@/utils/timing";
import {CHAT} from "@/constant/routes";
import {Inter} from "next/font/google";


const inter = Inter({subsets: ['latin']})
type AuthInfos = {
    username: string;
    password: string;
}

function Login() {
    const [authInfos, setAuthInfos] = useState<AuthInfos>(null);
    const [loading, setIsLoading] = useState(false);
    const {push} = useRouter();

    async function handleSubmit(e: FormEvent) {
        setIsLoading(true)
        e.preventDefault();
        localStorage.setItem(AUTH_INFOS, JSON.stringify(authInfos));
        await delay(5000)
        setIsLoading(false)
        push(CHAT);
    }

    function handleInputChange<T>(originalFlatObj: T, attribute: keyof T) {
        return (event) => setAuthInfos({
            ...originalFlatObj,
            [attribute]: event.target.value
        });
    }

    return (
        <main className={`${styles.main} ${inter.className}`}>
            <form className={styles.wrapper}>
                {loading && <CircularProgress value={30} color='orange' thickness='12px' isIndeterminate={true} position={"absolute"}/>}
                <label>
                    <input type={"text"} name={"username"}
                           className={`${styles.wrapper__input}`}
                           onChange={handleInputChange<AuthInfos>(authInfos, "username")}
                           placeholder={"Username or Email"}
                    />
                </label>
                <label>
                    <input type={"password"} name={"password"}
                           className={`${styles.wrapper__input}`}
                           onChange={handleInputChange(authInfos, "password")}
                           placeholder={"Password"}
                    />
                </label>
                <input type={"submit"} value={"Sign Up"} className={styles.submit} onClick={handleSubmit}/>
            </form>
        </main>
    );
}

export default Login;