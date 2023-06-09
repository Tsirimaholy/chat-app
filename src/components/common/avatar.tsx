import React from "react";
import {Avatar as CHAvatar, AvatarBadge, AvatarProps as CHAvatarProps} from "@chakra-ui/react";


type AvatarProps = CHAvatarProps & {
    badgeIsVisible?: boolean
};
const Avatar = (props: AvatarProps) => {
    const {badgeIsVisible=false} = props;
    return (
        <CHAvatar
            {...props}
            size={"md"}
            src={"/assets/icon/user-avatar.png"}
            colorScheme={"blackAlpha"}
            color={"white"}>
            {badgeIsVisible && <AvatarBadge borderColor='papayawhip' bg='tomato' boxSize='0.8em' />}
        </CHAvatar>
    )
}

export default Avatar;