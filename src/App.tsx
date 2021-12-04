import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import {
	AppBar,
	Button,
	Container,
	createTheme,
	Grid,
	IconButton,
	MuiThemeProvider,
	Toolbar,
	Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
	AddTodoListAC,
	ChangeTodoListFilterAC,
	ChangeTodoListTitleAC,
	removeTodoListAC
} from "./store/reducers/todolist-reducer";
import {
	AddTaskListAC,
	ChangeTaskStatusAC,
	ChangeTaskTitleAC,
	CreateTaskAC,
	RemoveTaskAC,
	RemoveTaskListAC
} from "./store/reducers/tasks-reducer";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {useAppDispatch} from "./hooks/useTypedDispatch";

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


	const todos = useTypedSelector(state => state.toDoLists)
	const taskList = useTypedSelector(state => state.tasks)
	const dispatch = useAppDispatch()

	const removeTodoList = (todoListID: string) => {
		dispatch(RemoveTaskListAC(todoListID))
		dispatch(removeTodoListAC(todoListID))
	}

	const addTodoList = (title: string) => {
		const idTaskList = v1()
		dispatch(AddTodoListAC(title, idTaskList))
		dispatch(AddTaskListAC(idTaskList))
	}

	const removeTask = (taskID: string, todoListID: string) => {
		dispatch(RemoveTaskAC(taskID, todoListID))
	}

	const createTask = (title: string, todoListID: string) => {
		dispatch(CreateTaskAC(title, todoListID))
	}

	const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
		dispatch(ChangeTaskStatusAC(taskID,isDone,todoListID))
	}

	const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
		dispatch(ChangeTaskTitleAC(taskID,title,todoListID))
	}

	const changeFilter = (filter: FilterValuesType, todoListID: string) => {
		dispatch(ChangeTodoListFilterAC(filter, todoListID))
	}

	const changeTodoListTitle = (title: string, todoListID: string) => {
		dispatch(ChangeTodoListTitleAC(title, todoListID))
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
