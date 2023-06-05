import React, {useState} from 'react';
import {
    ButtonGroup,
    Editable ,
    EditableInput,
    EditablePreview,
    IconButton,
    Input,
    Tooltip,
    useColorModeValue,
    useEditableControls
} from "@chakra-ui/react";
import {CheckIcon, CloseIcon} from "@chakra-ui/icons";

type EditableWithControlProps = {
    defaultValue: string;
    onSubmit: (nextValue: string)=>void;
}


function EditableControls() {
    const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps
    } = useEditableControls();

    return isEditing ? (
        <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
            <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
            <IconButton
                icon={<CloseIcon boxSize={3} />}
                {...getCancelButtonProps()}
            />
        </ButtonGroup>
    ) : null;
}

function EditableWithControl({defaultValue, onSubmit}: EditableWithControlProps) {
    const [value, setValue]=useState(defaultValue);
    return (
        <Editable
            isPreviewFocusable={true}
            selectAllOnFocus={false}
            onSubmit={onSubmit}
            onChange={(nextValue: string)=>setValue(nextValue)}
            value={value}
        >
            <Tooltip label="Click to edit" shouldWrapChildren={true}>
                <EditablePreview
                    py={2}
                    px={4}
                    _hover={{
                        background: useColorModeValue("gray.100", "gray.700")
                    }}
                />
            </Tooltip>
            <Input py={2} px={4} as={EditableInput} />
            <EditableControls />
        </Editable>
    );
}


export default EditableWithControl;