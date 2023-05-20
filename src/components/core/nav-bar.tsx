import {AuthInfos, User} from "@/models/Auth";
import React, {FC} from "react";
import styles from "./Navbar.module.css";
import {Avatar, Badge, Box, Text} from "@chakra-ui/react";

interface NavBarProps {
    onClick: () => void;
    user: User;
    menuToggle: boolean;
    onBadgeClicked: () => void;
}

export const NavBar: FC<NavBarProps> = ({menuToggle=false, onBadgeClicked, onClick, user}) => {
    return (
        <nav className={styles.main_nav}>
            <div className={".right__nav"}>

            </div>
            <div>
                <div className={styles.avatar_wrapper}
                     onClick={onClick}
                     onBlur={onClick}
                >
                    <Avatar size={"2xs"} name={`${user.name}`} src={"/assets/icon/user-avatar.png"}
                            width={35}
                            height={35}
                            colorScheme={"blackAlpha"}
                            color={"white"}
                    />
                    <Text color={"white"} as="b">{`@${user.name}`}</Text>
                    {menuToggle && <div className={styles.menu}>
                        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                            <Badge borderRadius="full" px="2" colorScheme="teal" onClick={onBadgeClicked}>
                                <span className={"fa fa-lock"}/> Log Out
                            </Badge>
                        </Box>
                    </div>}

                </div>
            </div>
        </nav>);
};