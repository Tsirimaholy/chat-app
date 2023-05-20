import React, {ChangeEvent, FormEvent, useState} from 'react';
import styles from "@/styles/Login.module.css";
import {CircularProgress} from "@chakra-ui/react";
import {Inter} from "next/font/google";
import {AuthUser} from "@/services/user-api";
import {useStore} from "@/store/root-store";
import {delay} from "@/utils/timing";

const inter = Inter({subsets: ['latin']})


function Login() {
    const [authInfos, setAuthInfos] = useState<AuthUser>(null);
    const [loading, setIsLoading] = useState(false);
    const {logIn} = useStore();

    const handleSubmit = async (e: FormEvent) => {
        setIsLoading(true)
        e.preventDefault();
        try {
            logIn({...authInfos});
        } catch (error) {
            console.log(e)
        }
        setIsLoading(false)
    };

    function handleInputChange<T>(originalFlatObj: T, attribute: keyof T) {
        return (event: ChangeEvent<HTMLInputElement>) => setAuthInfos({
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
                    <input type={"text"} name={"email"}
                           className={`${styles.wrapper__input}`}
                           onChange={handleInputChange<AuthUser>(authInfos, "email")}
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