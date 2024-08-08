import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { IUser } from "../Api/UserApi.ts";

interface State {
  dailyRewardTimeLeft: string;
  earnedPoints: number;
  clickedPoints: number;
  clicks: { id: number; x: number; y: number }[];
  points: number;
  user: IUser | null;
  hasClaimedToday: boolean;
  currentSkin: number;
  level: number;
}

const initialState: State = {
  dailyRewardTimeLeft: "",
  earnedPoints: 0,
  clickedPoints: 0,
  clicks: [],
  points: 0,
  user: null,
  hasClaimedToday: false,
  currentSkin: 0,
  level: 1,
};

type Action =
  | { type: "SET_DAILY_REWARD_TIME_LEFT"; payload: string }
  | { type: "ADD_CLICKED_POINTS"; payload: number }
  | { type: "ADD_POINTS"; payload: number }
  | { type: "ADD_CLICK"; payload: { id: number; x: number; y: number } }
  | { type: "REMOVE_CLICK"; payload: number } // Новый тип действия для удаления клика
  | { type: "RESET_CLICKED_POINTS" }
  | { type: "SET_POINTS"; payload: number }
  | { type: "SET_USER"; payload: IUser }
  | { type: "SET_USER_LEVEL"; payload: number }
  | { type: "SET_SKIN_NUMBER"; payload: number }
  | {
      type: "HANDLE_CARD_CLICK";
      payload: {
        pointsToAdd: number;
        click: { id: number; x: number; y: number };
      };
    }
  | { type: "UPDATE_USER_DATA"; payload: Partial<IUser> };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DAILY_REWARD_TIME_LEFT":
      return { ...state, dailyRewardTimeLeft: action.payload };
    case "ADD_CLICKED_POINTS":
      return { ...state, clickedPoints: state.clickedPoints + action.payload };
    case "ADD_POINTS":
      return { ...state, points: state.points + action.payload };
    case "ADD_CLICK":
      return { ...state, clicks: [...state.clicks, action.payload] };
    case "RESET_CLICKED_POINTS":
      return { ...state, clickedPoints: 0 };
    case "SET_USER_LEVEL":
      return { ...state, level: action.payload };
    case "SET_POINTS":
      return { ...state, points: action.payload };
    case "REMOVE_CLICK":
      return {
        ...state,
        clicks: state.clicks.filter((click) => click.id !== action.payload),
      };

    case "SET_SKIN_NUMBER":
      return { ...state, currentSkin: action.payload };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "UPDATE_USER_DATA":
      return { ...state, user: { ...state.user, ...action.payload } as IUser };
    case "HANDLE_CARD_CLICK":
      return {
        ...state,
        clickedPoints: state.clickedPoints + action.payload.pointsToAdd,
        points: state.points + action.payload.pointsToAdd,
        clicks: [...state.clicks, action.payload.click],
      };
    default:
      return state;
  }
};

const AppStateContext = createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

interface AppStateProviderProps {
  children: ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};
