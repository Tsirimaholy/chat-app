import {Box, HStack, Text, VStack} from "@chakra-ui/react";
import Avatar from "@/components/common/avatar";
import {Channel} from "@/models/Channel";


export function ChannelHeader(props: { currentChannel?: Channel }) {
    const changeChannelName=(newName: string)=>{
        // Todo change channel name;
    }

    return (
        <HStack>
            <VStack w={"100%"} style={{textAlign: 'center'}}>
                <Avatar/>
                <Box>
                    <Text fontSize='2xl'>{props.currentChannel?.name}</Text>
                    <Text color={"gray"}>Start your discussion</Text>
                </Box>
            </VStack>
        </HStack>
    )
}