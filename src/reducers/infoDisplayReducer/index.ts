import { REMOVE_MESSAGE_INFO, SET_MESSAGE_INFO } from "./types";

// Define the state type for infoDisplayReducer
interface InfoDisplayState {
  message: string;
  isError: boolean;
  display: boolean;
}

// Define the payload type for the SET_MESSAGE_INFO action
interface SetMessageInfoPayload {
  message: string;
  isError: boolean;
}

// Define the action types
interface SetMessageInfoAction {
  type: typeof SET_MESSAGE_INFO;
  payload: SetMessageInfoPayload;
}

interface RemoveMessageInfoAction {
  type: typeof REMOVE_MESSAGE_INFO;
}

type InfoDisplayAction = SetMessageInfoAction | RemoveMessageInfoAction;

// Reducer function with types
export function infoDisplayReducer(
  state: InfoDisplayState,
  action: InfoDisplayAction
): InfoDisplayState {
  let newState: InfoDisplayState;

  switch (action.type) {
    case SET_MESSAGE_INFO:
      {
        const details = action.payload;
        newState = {
          ...state,
          message: details.message,
          isError: details.isError,
          display: true,
        };
        break;
      }
    case REMOVE_MESSAGE_INFO:
      newState = { ...state, message: "", isError: false, display: false };
      break;
    default:
      newState = { ...state };
      break;
  }

  return newState;
}
