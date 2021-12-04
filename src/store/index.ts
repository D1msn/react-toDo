import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./reducers/tasks-reducer";
import {todolistReducer} from "./reducers/todolist-reducer";


const rootReducer = combineReducers({
	toDoLists: todolistReducer,
	tasks: tasksReducer
})

export const store = createStore(rootReducer)

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
