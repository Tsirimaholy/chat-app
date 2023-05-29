import React from 'react';
import {
    Box,
    ButtonGroup,
    Editable as CHEditable,
    EditableInput,
    EditablePreview,
    IconButton,
    useEditableControls
} from "@chakra-ui/react";
import {CheckIcon, CloseIcon} from "@chakra-ui/icons";

function EditableWithControl(props: {defaultValue?: string, onSubmit: (nextValue: string)=>void}) {
    return (
        <CHEditable defaultValue={props.defaultValue} onSubmit={props.onSubmit}>
            <EditablePreview/>
            <EditableInput/>
           <EditableControl/>
        </CHEditable>
    );
}

function EditableControl() {
    const {isEditing, getEditButtonProps, getSubmitButtonProps, getCancelButtonProps} = useEditableControls();
    return (
        isEditing ? (
            <ButtonGroup>
                <IconButton icon={<CheckIcon/>}  aria-label={'submit button'} {...getSubmitButtonProps()} colorScheme={'green'}/>
                <IconButton icon={<CloseIcon/>}  aria-label={'cancel button'} {...getCancelButtonProps()} colorScheme={'red'}/>
            </ButtonGroup>
        ) : (
            <Box {...getEditButtonProps()} display={'inline'} ml={'2'}>
                <span className={"fa fa-pencil"} style={{cursor: "pointer"}}/>
            </Box>
        )
    )
}


export default EditableWithControl;