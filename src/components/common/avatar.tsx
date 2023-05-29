import React from "react";
import {Avatar as CHAvatar, AvatarProps as CHAvatarProps} from "@chakra-ui/react";


type AvatarProps = CHAvatarProps & {};
const Avatar = (props: AvatarProps) => {
    return (
        <CHAvatar
            {...props}
            size={"md"}
            src={"/assets/icon/user-avatar.png"}
            colorScheme={"blackAlpha"}
            color={"white"}
        />
    )
}

export default Avatar;