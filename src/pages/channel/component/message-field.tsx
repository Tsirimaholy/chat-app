import React, {forwardRef} from "react";
import {InputGroup, InputRightElement} from "@chakra-ui/input";
import {Box, Button, HStack, IconButton, Input, Textarea} from "@chakra-ui/react";
import {ChevronRightIcon} from "@chakra-ui/icons";

type MessageFieldProps = {
    onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement> | undefined) => Promise<void>,
    onClick: () => Promise<void>
};
type Ref = HTMLTextAreaElement;
export const MessageField = forwardRef<Ref, MessageFieldProps>((props, ref) => {
    return (
        <HStack pos={"sticky"}
                bottom={3}
                left={0}
                right={0}
                paddingInline={'2em'}
                marginTop={"3em"}
                justifyContent={'flex-start'}
                alignItems={'start'}>
            <Textarea
                      onKeyDown={(e) => {
                          props.onKeyDown && props.onKeyDown(e)
                      }}
                      ref={ref}
                      name={'message'}
                      required={true}
            />
            <Button rightIcon={<ChevronRightIcon/>} onClick={props.onClick}>
                Send message
            </Button>
        </HStack>
    )
})

MessageField.displayName = "MessageField";
