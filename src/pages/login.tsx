import React, {FormEvent, useContext, useState} from 'react';
import styles from "@/styles/Login.module.css";
import {CircularProgress} from "@chakra-ui/react";
import {AUTH_INFOS} from "@/constant/storage";
import {delay} from "@/utils/timing";
import {Inter} from "next/font/google";
import {AuthInfos} from "@/models/Auth";
import {useStore} from "@/store/root-store"
import {UserContext} from "@/context/protected-route";

const inter = Inter({subsets: ['latin']})


function Login() {
    const [authInfos, setAuthInfos] = useState<AuthInfos>(null);
    const [loading, setIsLoading] = useState(false);
    const {updateAuthInfos} = useStore();
    const userContext = useContext(UserContext);

    async function handleSubmit(e: FormEvent) {
        setIsLoading(true)
        e.preventDefault();

        localStorage.setItem(AUTH_INFOS, JSON.stringify(authInfos));
        updateAuthInfos({...authInfos})
        await delay(2000)
        setIsLoading(false)
        if (userContext?.updateUserInfos) {
            userContext?.updateUserInfos({...authInfos});
        }
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
                    {loading && <CircularProgress value={30} color='orange' thickness='12px' isIndeterminate={true}
                                                  position={"absolute"}/>}
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