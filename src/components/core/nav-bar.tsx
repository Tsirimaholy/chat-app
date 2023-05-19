import {AuthInfos} from "@/models/Auth";
import React, {FC} from "react";
import styles from "./Navbar.module.css";
import {Avatar, Badge, Box, Text} from "@chakra-ui/react";

interface NavBarProps {
    onClick: () => void;
    user: AuthInfos;
    menuToggle: boolean;
    onBadgeClicked: () => void;
}

export const NavBar: FC<NavBarProps> = (props) => {
    return (
        <nav className={styles.main_nav}>
            <div className={".right__nav"}>

            </div>
            <div>
                <div className={styles.avatar_wrapper}
                     onClick={props.onClick}
                     onBlur={props.onClick}
                >
                    <Avatar size={"2xs"} name={`${props.user.username}`} src={"/assets/icon/user-avatar.png"}
                            width={35}
                            height={35}
                            colorScheme={"blackAlpha"}
                            color={"white"}
                    />
                    <Text color={"white"} as="b">{`@${props.user.username}`}</Text>
                    {props.menuToggle && <div className={styles.menu}>
                        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                            <Badge borderRadius="full" px="2" colorScheme="teal" onClick={props.onBadgeClicked}>
                                <span className={"fa fa-lock"}/> Log Out
                            </Badge>
                        </Box>
                    </div>}

                </div>
            </div>
        </nav>);
};