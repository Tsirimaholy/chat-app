import React, {useState} from 'react';
import {useStore} from "@/store/root-store";
import {Avatar, Badge, Box, Text} from "@chakra-ui/react";
import styles from "@/styles/Chat.module.css";
import {Icon} from "@chakra-ui/icons";


function Chat() {
    const {user, logout} = useStore()
    const [menuToggle, setMenuToggle] = useState(false);
    const toggle = () => {
        setMenuToggle(prevState => !prevState)
    }
    const handleLogout = () => {
        toggle();
        logout()
    }


    return (
        <main>
            <nav className={styles.main_nav}>
                <div className={".right__nav"}>

                </div>
                <div>
                    <div className={styles.avatar_wrapper}
                         onClick={toggle}
                         onBlur={toggle}
                    >
                        <Avatar size={"2xs"} name={`${user.username}`} src={"/assets/icon/user-avatar.png"}
                                width={35}
                                height={35}
                                colorScheme={"blackAlpha"}
                                color={"white"}
                        />
                        <Text color={"white"} as="b">{`@${user.username}`}</Text>
                        {menuToggle && <div className={styles.menu}>
                            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                                <Badge borderRadius='full' px='2' colorScheme='teal' onClick={handleLogout}>
                                    <span className={"fa fa-lock"}/> Log Out
                                </Badge>
                            </Box>
                        </div>}

                    </div>
                </div>
            </nav>
        </main>);
}

export default Chat;