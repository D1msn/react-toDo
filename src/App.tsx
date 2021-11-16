import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type TodoListType = {
	id: string
	title: string
	filter: FilterValuesType

}

type TasksStateType = {
	[key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

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

	const [todos, setTodos] = useState<Array<TodoListType>>(todoLists)
	const [taskList, setTaskList] = useState(tasks);

	const addTodoList = (title: string) => {
		const idTaskList = v1()
		setTodos([...todos, {id: idTaskList, title: title, filter: 'all'}])
		setTaskList({...taskList, [idTaskList]: []})
	}


	const removeTask = (taskID: string, todoListID: string) => {
		taskList[todoListID] = taskList[todoListID].filter(task => task.id !== taskID)
		setTaskList({...taskList})
	}
	const createTask = (title: string, todoListID: string) => {
		let newTaskList: TaskType = {
			id: v1(),
			title: title,
			isDone: false
		}
		setTaskList({...taskList, [todoListID]: [newTaskList, ...taskList[todoListID]]})
	}
	const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
		setTaskList({
			...taskList,
			[todoListID]: taskList[todoListID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
		});
	}
	const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
		setTaskList({
			...taskList,
			[todoListID]: taskList[todoListID].map(t => t.id === taskID ? {...t, title} : t)
		});
	}

	const changeFilter = (filter: FilterValuesType, todoListID: string) => {
		setTodos(todos.map(tl => tl.id === todoListID ? {...tl, filter: filter} : tl))
	}

	const changeTodoListTitle = (title: string, todoListID: string) => {
		setTodos(todos.map(tl => tl.id === todoListID ? {...tl, title} : tl))
	}
	const removeTodoList = (todoListID: string) => {
		setTodos(todos.filter(tl => tl.id !== todoListID))
	}

	const todoListsComponents = todos.map(tl => {

		let tasksForRender: TaskType[] = taskList[tl.id];
		if (tl.filter === "active") {
			tasksForRender = taskList[tl.id].filter(item => !item.isDone)
		}
		if (tl.filter === "completed") {
			tasksForRender = taskList[tl.id].filter(item => item.isDone)
		}

		return <TodoList
				key={tl.id}
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
	})




	return (
		<div className="App">
			<AddItemForm addItem={addTodoList}/>
			{todoListsComponents}
		</div>
	);
}

export default App;
