import React, { createContext, useReducer, useContext, ReactNode } from "react";

type State = {
  nickname: string;
};

type Action = { type: "SET_NICKNAME"; payload: string };

const initialState: State = {
  nickname: "",
};

const UserContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const userReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_NICKNAME":
      return { ...state, nickname: action.payload };
    default:
      return state;
  }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
