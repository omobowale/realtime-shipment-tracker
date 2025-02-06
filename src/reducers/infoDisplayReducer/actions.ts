import { REMOVE_MESSAGE_INFO, SET_MESSAGE_INFO } from "./types";

// Define the payload type for setMessageInfo action
interface SetMessageInfoPayload {
  message: string;
  isError: boolean;
}

// Define the action type for each action
interface SetMessageInfoAction {
  type: typeof SET_MESSAGE_INFO;
  payload: SetMessageInfoPayload;
}

interface RemoveMessageInfoAction {
  type: typeof REMOVE_MESSAGE_INFO;
}

// Action creator for setting message info
export const setMessageInfo = ({
  message,
  isError,
}: SetMessageInfoPayload): SetMessageInfoAction => {
  return {
    type: SET_MESSAGE_INFO,
    payload: { message, isError },
  };
};

// Action creator for removing message info
export const removeMessageInfo = (): RemoveMessageInfoAction => {
  return {
    type: REMOVE_MESSAGE_INFO,
  };
};
