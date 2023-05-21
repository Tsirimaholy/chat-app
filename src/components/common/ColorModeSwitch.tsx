import React from 'react';
import {Switch, Text, useColorMode, VStack} from "@chakra-ui/react";

function ColorModeSwitch() {
    const {toggleColorMode, colorMode} = useColorMode();
    const isDarkMode = colorMode==="dark";

    return (
        <VStack>
            <Switch colorScheme={"cyan"} isChecked={isDarkMode} onChange={toggleColorMode}/>
            <Text as={"b"}>{isDarkMode ? 'Dark' : 'Light'} mode</Text>
        </VStack>
    );
}

export default ColorModeSwitch;