import React, {forwardRef} from "react";
import {InputGroup, InputRightElement} from "@chakra-ui/input";
import {Box, IconButton, Input} from "@chakra-ui/react";

type MessageFieldProps = {
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement> | undefined) => Promise<void>,
    onClick: () => Promise<void>
};
type Ref = HTMLInputElement;
export const MessageField = forwardRef<Ref, MessageFieldProps>((props, ref) => {
    return <InputGroup size="md" pos={"sticky"} bottom={0} left={0} right={0} marginTop={"3em"}>
        <Input
            pr="4.5rem"
            type={"show"}
            ref={ref}
            onKeyDown={props.onKeyDown}
        />
        <Box>
            <InputRightElement width="4.5rem"
                               onClick={props.onClick}>
                <IconButton h="1.75rem" size="sm" icon={<span className={"fa fa-send"}/>}
                            aria-label={"send button"}
                />
            </InputRightElement>
        </Box>

    </InputGroup>;
})

MessageField.displayName="MessageField";
