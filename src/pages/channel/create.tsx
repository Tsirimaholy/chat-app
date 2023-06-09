import React, {useEffect, useRef, useState} from 'react';
import Layout from "@/pages/_layout";
import {Box, FormControl, FormLabel, Input, Text, Select, Stack, Button} from "@chakra-ui/react";
import useUserStore from "@/store/user-store";
import {OtherUser} from "@/types/entities/Auth";
import {useChannelStore} from "@/store/channel-store";
import {Channel, ChannelType} from "@/types/entities/channel/Channel";
import axios from "axios";
import {CHANNEL} from "@/constant/routes";
import {useRouter} from "next/router";


function Create() {
    const {push} = useRouter();
    const nameRef = useRef<HTMLInputElement>(null);
    const {users, getAllUsers} = useUserStore()
    const {createChannel} = useChannelStore();
    const [isSavingChannel, setIsSavingChannel] = useState(false);
    const mappedUserWithSelectedStatus = users.map(user => ({...user, selected: false}))
    const [selectedUsers, setSelectedUsers] = useState([...mappedUserWithSelectedStatus]);
    const [type, setType] = useState<'public'|'private'>('public');

    useEffect(() => {
        (async () => {
            await getAllUsers();
        })()
    }, [getAllUsers])

    const selectUser = (selectedUser: OtherUser & { selected: boolean }) => {
        const users = [...selectedUsers];
        const index = users.findIndex(user => user.id === selectedUser.id);
        const modifiedUser = {...users[index]};
        modifiedUser.selected = !modifiedUser.selected
        users[index] = modifiedUser;
        setSelectedUsers(users);
    }

    function getMembersFromMappedUsers() {
        return selectedUsers.filter(value => value.selected)
            .map(value => {
                return value.id;
            });
    }

    async function handleSubmit(channel: {name?: string, type?: ChannelType}) {
        const {name="", type="public"} = channel;
        setIsSavingChannel(true)

        try {
            const createdChannel = await createChannel({id: 1, name, type, members: getMembersFromMappedUsers()});
            await push(CHANNEL + '/' + createdChannel.id)
        } catch (e) {
            console.info("caught on ui layer")
        }

        setIsSavingChannel(false);

    }
    return (
        <Layout>
            <Stack justifyContent={'center'} alignItems={'center'} width={"100%"}>
                <Text fontSize={'xl'} mb={'4'}>Create channel</Text>

                <Box>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input ref={nameRef} name='channelName' placeholder='channel name'/>
                    </FormControl>

                    <FormControl mt={4}>
                        <Stack spacing={3}>
                            <Text>Select members</Text>
                            <Select variant='filled' name={'users'}>
                                {selectedUsers.map(user => {
                                    return <>
                                        <option key={user.id}
                                                onClick={() => selectUser(user)}> {user.selected && '✅'} {user.name}</option>
                                    </>
                                })}
                            </Select>
                        </Stack>
                    </FormControl>
                    <FormControl mt={4}>
                        <Stack spacing={3}>
                            <Text>Type</Text>
                            <Select variant='filled' name={'type'} onChange={event => setType(event.target?.value as 'public'|'private')}>
                                <option value="public" defaultChecked={true}>Public</option>
                                <option value="private">Private</option>
                            </Select>
                        </Stack>
                    </FormControl>
                    <Button mt={'5'} colorScheme={'green'} name='createChannelButton' float={'right'} onClick={()=>handleSubmit({name: nameRef.current?.value, type})}>Create Channel</Button>
                </Box>
            </Stack>

        </Layout>
    );
}

export default Create;