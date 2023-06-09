import React, {useRef} from 'react';
import Layout from "@/pages/_layout";
import {Box, FormControl, FormLabel, Input, Stack, Text} from "@chakra-ui/react";

function Create() {
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null)
    const nameRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLInputElement>(null);

    return (
        <Layout>
            <Stack justifyContent={'center'} alignItems={'center'} width={"100%"}>
                <Text fontSize={'xl'} mb={'4'}>Create channel</Text>

                <Box>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input ref={nameRef} placeholder='channel name'/>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Type</FormLabel>
                        <Input ref={typeRef} placeholder='public or private' />
                    </FormControl>
                </Box>
            </Stack>

        </Layout>
    );
}

export default Create;