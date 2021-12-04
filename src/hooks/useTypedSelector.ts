import {RootStateType} from "../store";
import {TypedUseSelectorHook, useSelector} from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<RootStateType> = useSelector;
