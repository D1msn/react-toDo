import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";

export enum TasksActions {
	REMOVE_TASK_LIST = "REMOVE-TASK-LIST",
	ADD_TASK_LIST = "ADD-TASK-LIST",
	REMOVE_TASK = "REMOVE-TASK",
	CREATE_TASK = "CREATE-TASK",
	CHANGE_TASK_STATUS = "CHANGE-TASK-STATUS",
	CHANGE_TASK_TITLE = "CHANGE-TASK-TITLE"
}


export const tasksReducer = (taskList: TasksStateType, action: TasksActionsTypes): TasksStateType => {
	switch (action.type) {

		case TasksActions.REMOVE_TASK_LIST:
			delete taskList[action.payLoad.idTaskList]
			return taskList

		case TasksActions.ADD_TASK_LIST:
			return {...taskList, [action.payLoad.idTaskList]: []}

		case TasksActions.CREATE_TASK:
			let newTaskList: TaskType = {
				id: v1(),
				title: action.payLoad.title,
				isDone: false
			}
			return  {...taskList, [action.payLoad.todoListID]: [newTaskList, ...taskList[action.payLoad.todoListID]]}
		case TasksActions.REMOVE_TASK:
			return {...taskList, [action.payLoad.todoListID]: taskList[action.payLoad.todoListID].filter(task => task.id !== action.payLoad.taskID)}
		case TasksActions.CHANGE_TASK_STATUS:
			return { ...taskList, [action.payLoad.todoListID]: taskList[action.payLoad.todoListID].map(t => t.id === action.payLoad.taskID ? {...t, isDone: action.payLoad.isDone} : t)}
		case TasksActions.CHANGE_TASK_TITLE:
			return {...taskList, [action.payLoad.todoListID]: taskList[action.payLoad.todoListID].map(t => t.id === action.payLoad.taskID ? {...t, title: action.payLoad.title} : t)}

		default: return taskList
	}
}

type TasksActionsTypes = AddTaskListActionType |
						RemoveTaskActionType |
						CreateTaskActionType |
						ChangeTaskStatusActionType |
						ChangeTaskTitleActionType |
						RemoveTaskListActionType

type RemoveTaskListActionType = ReturnType<typeof RemoveTaskListAC>
type AddTaskListActionType = ReturnType<typeof AddTaskListAC>
type RemoveTaskActionType = ReturnType<typeof RemoveTaskAC>
type CreateTaskActionType = ReturnType<typeof CreateTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof ChangeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof ChangeTaskTitleAC>


export const RemoveTaskListAC = (idTaskList: string) => {
	return {
		type: TasksActions.REMOVE_TASK_LIST,
		payLoad: {
			idTaskList
		}
	} as const
}

export const AddTaskListAC = (idTaskList: string) => {
	return {
		type: TasksActions.ADD_TASK_LIST,
		payLoad: {
			idTaskList
		}
	} as const
}

export const RemoveTaskAC = (taskID: string, todoListID: string) => {
	return {
		type: TasksActions.REMOVE_TASK,
		payLoad: {
			taskID, todoListID
		}
	} as const
}

export const CreateTaskAC = (title: string, todoListID: string) => {
	return {
		type: TasksActions.CREATE_TASK,
		payLoad: {
			title, todoListID
		}
	} as const
}

export const ChangeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string) => {
	return {
		type: TasksActions.CHANGE_TASK_STATUS,
		payLoad: {
			taskID, isDone, todoListID
		}
	} as const
}

export const ChangeTaskTitleAC = (taskID: string, title: string, todoListID: string) => {
	return {
		type: TasksActions.CHANGE_TASK_TITLE,
		payLoad: {
			taskID, title, todoListID
		}
	} as const
}
