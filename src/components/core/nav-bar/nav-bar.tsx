import {User} from "@/types/entities/Auth";
import React, {FC} from "react";
import styles from "./Navbar.module.css";
import {Avatar, Badge, Box, HStack, Text} from "@chakra-ui/react";
import ColorModeSwitch from "@/components/common/ColorModeSwitch";
import CHAvatar from "@/components/common/avatar";
import {useRouter} from "next/router";
import {PROFILE_ROUTE} from "@/constant/routes";


interface NavBarProps {
    onAvatarClicked: () => void;
    user?: User;
    menuToggle: boolean;
    onBadgeClicked: () => void;
}

export const NavBar: FC<NavBarProps> = ({menuToggle=false, onBadgeClicked, onAvatarClicked, user}) => {
    const {push} = useRouter();

    return (
        <HStack justifyContent={"space-between"} paddingInline={5} paddingBlock={1} mb={2} bg={"var(--primary-dark-color)"}>
            <Text as={"b"} fontSize={"larger"} onClick={()=>push(PROFILE_ROUTE)} cursor={'pointer'}>
                Sleek
            </Text>
            <HStack>
                {/*<ColorModeSwitch/>*/}
                <div className={styles.avatar_wrapper}
                     onClick={onAvatarClicked}
                     onBlur={onAvatarClicked}
                >
                    <CHAvatar  size={"2xs"} name={`${user?.name}`} src={"/assets/icon/user-avatar.png"}
                               width={35}
                               height={35}
                               colorScheme={"blackAlpha"}
                               color={"white"}/>
                    <Text as="b">{`@${user?.name||''}`}</Text>
                    {/*{menuToggle && <div className={styles.menu}>*/}
                    {/*    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">*/}
                    {/*        <Badge borderRadius="full" px="2" colorScheme="teal" onClick={onBadgeClicked}>*/}
                    {/*            <span className={"fa fa-lock"}/> Log Out*/}
                    {/*        </Badge>*/}
                    {/*    </Box>*/}
                    {/*</div>}*/}

                </div>
            </HStack>
        </HStack>);
};