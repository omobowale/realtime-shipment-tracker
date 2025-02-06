import { useReducer } from "react";
import { setMessageInfo, removeMessageInfo } from "../reducers/infoDisplayReducer/actions";
import { infoDisplayReducer } from "../reducers/infoDisplayReducer";


// Define types for the state
interface MessageState {
    message: string;
    display: boolean;
    isError: boolean;
}

// Define types for the action payloads (if needed for clarity)
interface SetMessageInfoPayload {
    message: string;
    isError: boolean;
}

function useCustomInfoDisplay(
    message: string = "",
    isError: boolean = false,
    display: boolean = false
) {
    // Initial state type inference
    const initialState: MessageState = {
        message: message,
        display: message ? true : display,
        isError: isError,
    };

    const [messageState, messageDispatch] = useReducer(infoDisplayReducer, initialState);

    // Define the function to set info details
    const setInfoDetails = ({ message, isError }: SetMessageInfoPayload): void => {
        messageDispatch(setMessageInfo({ message, isError }));
    };

    // Define the function to close the snack bar
    const setCloseSnackBar = (): void => {
        messageDispatch(removeMessageInfo());
    };

    return {
        messageState,
        setCloseSnackBar,
        setInfoDetails,
    };
}

export default useCustomInfoDisplay;
