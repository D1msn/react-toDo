import React, {useReducer} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import {
	createTheme,
	MuiThemeProvider,
	AppBar,
	IconButton,
	Typography,
	Button,
	Toolbar,
	Container, Grid
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
	AddTodoListAC,
	ChangeTodoListFilterAC,
	ChangeTodoListTitleAC,
	removeTodoListAC,
	todolistReducer
} from "./store/todolist-reducer";
import {
	AddTaskListAC,
	ChangeTaskStatusAC,
	ChangeTaskTitleAC,
	CreateTaskAC,
	RemoveTaskAC, RemoveTaskListAC,
	tasksReducer
} from "./store/tasks-reducer";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type TodoListType = {
	id: string
	title: string
	filter: FilterValuesType

}

export type TasksStateType = {
	[key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

	const theme = createTheme({
		palette: {
			primary: {
				main: "#2ca58c",
			},
			secondary: {
				main: '#b71818',

			},
		},
	});

	// const todoListID_1 = v1();
	// const todoListID_2 = v1();

	const todoLists: Array<TodoListType> = [
		{id: v1(), title: "What to learn", filter: 'all'},
		{id: v1(), title: "What to buy", filter: 'all'}
	]
	const tasks: TasksStateType = {

		[todoLists[0].id]: [{id: v1(), title: "1", isDone: false},
			{id: v1(), title: "2", isDone: false},
			{id: v1(), title: "3", isDone: true},
			{id: v1(), title: "4", isDone: true}
		],

		[todoLists[1].id]: [{id: v1(), title: "a", isDone: false},
			{id: v1(), title: "s", isDone: false},
			{id: v1(), title: "f", isDone: true},
			{id: v1(), title: "d", isDone: true}
		],
	}

	const [todos, todosDispatch] = useReducer(todolistReducer,todoLists)
	const [taskList, taskListDispatcher] = useReducer(tasksReducer, tasks);

	const addTodoList = (title: string) => {
		debugger
		const idTaskList = v1()
		todosDispatch(AddTodoListAC(title, idTaskList))
		taskListDispatcher(AddTaskListAC(idTaskList))
	}

	const removeTask = (taskID: string, todoListID: string) => {
		taskListDispatcher(RemoveTaskAC(taskID, todoListID))
	}

	const createTask = (title: string, todoListID: string) => {
		taskListDispatcher(CreateTaskAC(title, todoListID))
	}

	const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
		taskListDispatcher(ChangeTaskStatusAC(taskID,isDone,todoListID))
	}

	const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
		taskListDispatcher(ChangeTaskTitleAC(taskID,title,todoListID))
	}

	const changeFilter = (filter: FilterValuesType, todoListID: string) => {
		todosDispatch(ChangeTodoListFilterAC(filter, todoListID))
	}

	const changeTodoListTitle = (title: string, todoListID: string) => {
		todosDispatch(ChangeTodoListTitleAC(title, todoListID))
	}
	const removeTodoList = (todoListID: string) => {
		taskListDispatcher(RemoveTaskListAC(todoListID))
		todosDispatch(removeTodoListAC(todoListID))
	}

	const todoListsComponents = todos.map(tl => {

		let tasksForRender: TaskType[] = taskList[tl.id];
		if (tl.filter === "active") {
			tasksForRender = taskList[tl.id].filter(item => !item.isDone)
		}
		if (tl.filter === "completed") {
			tasksForRender = taskList[tl.id].filter(item => item.isDone)
		}

		return (
			<Grid container item xs={3}
				  key={tl.id}>
				<TodoList
					id={tl.id}
					filter={tl.filter}
					title={tl.title}
					tasks={tasksForRender}
					removeTask={removeTask}
					createTask={createTask}
					changeFilter={changeFilter}
					changeTaskStatus={changeTaskStatus}
					removeTodoList={removeTodoList}
					changeTaskTitle={changeTaskTitle}
					changeTodoListTitle={changeTodoListTitle}
				/>
			</Grid>
			)


	})


	return (
		<MuiThemeProvider theme={theme}>
			<div className="App">
				<AppBar position="sticky">
					<Toolbar style={{justifyContent: "space-between"}}>
						<IconButton edge="start" color="inherit" aria-label="menu">
							<Menu/>
						</IconButton>
						<Typography variant="h6">
							Todolists
						</Typography>
						<Button color="inherit" variant={"outlined"}>Login</Button>
					</Toolbar>
				</AppBar>
				<Container maxWidth={false} fixed>
					<Grid container style={{ margin: "20px 0" }}>
						<AddItemForm addItem={addTodoList}/>
					</Grid>
					<Grid container spacing={5} >
						{todoListsComponents}
					</Grid>
				</Container>
			</div>
		</MuiThemeProvider>

	)
		;
}

export default App;
