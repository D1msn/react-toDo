import {FilterValuesType, TodoListType} from "../../App";

const initialState: Array<TodoListType> = [
	{id: "334455", title: "What to learn", filter: 'all'},
	{id: "667788", title: "What to buy", filter: 'all'}
]

export enum todoListActions {
	REMOVE_TODOLIST = "REMOVE-TODOLIST",
	ADD_TODOLIST = "ADD-TODOLIST",
	CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE",
	CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER"
}

type AddTodoListAT = {
	type: todoListActions.ADD_TODOLIST
	title: string
	id: string
}

type RemoveTodoListAT = {
	type: todoListActions.REMOVE_TODOLIST
	id: string
}

export type ChangeTodoListTitleAT = {
	type: todoListActions.CHANGE_TODOLIST_TITLE
	title: string
	id: string
}
export type ChangeTodoListFilterAT = {
	type: todoListActions.CHANGE_TODOLIST_FILTER
	filter: FilterValuesType
	id: string
}

type ActionsTodoListTypes = AddTodoListAT | RemoveTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todolistReducer = (todoLists = initialState, action: ActionsTodoListTypes): Array<TodoListType> => {

	switch (action.type){
		case todoListActions.REMOVE_TODOLIST:
			return todoLists.filter(tl => tl.id !== action.id)

		case todoListActions.ADD_TODOLIST:
			return [...todoLists, {id: action.id , title: action.title, filter: 'all'}]

		case todoListActions.CHANGE_TODOLIST_TITLE:
			return todoLists.map(tl => tl.id === action.id ? { ...tl, title: action.title } : tl)

		case todoListActions.CHANGE_TODOLIST_FILTER:
			return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

		default:
			return todoLists
	}

}

export const removeTodoListAC = (id: string): RemoveTodoListAT  => ({type: todoListActions.REMOVE_TODOLIST, id})
export const AddTodoListAC = (title: string, id:string): AddTodoListAT  => ({type: todoListActions.ADD_TODOLIST, title, id})
export const ChangeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleAT  => ({type: todoListActions.CHANGE_TODOLIST_TITLE, title, id})
export const ChangeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodoListFilterAT  => ({type: todoListActions.CHANGE_TODOLIST_FILTER, filter, id})
