import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";

export type TaskType = {
	id: number
	title: string
	isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
	const tasks: Array<TaskType> = [
		{id: 1, title: "HTML", isDone: true},
		{id: 2, title: "Css", isDone: true},
		{id: 3, title: "React", isDone: false},
	]

	const [taskList, setTaskList] = useState<Array<TaskType>>(tasks);
	const [filter, setFilter] = useState<FilterValuesType>("all");

	const remove_task = (taskId: number) => {
		setTaskList(taskList.filter(task => task.id !== taskId))
	}

	const createTask = (obj:TaskType) => {
		let newTaskList = [...taskList, obj]
		setTaskList(newTaskList)
	}

	const changeFilter = (value: FilterValuesType) => {
		setFilter(value);
	}

	let tasksForRender = taskList;
	if (filter === "active") {
		tasksForRender = taskList.filter(item => item.isDone === false)
	}
	if (filter === "completed") {
		tasksForRender = taskList.filter(item => item.isDone === true)
	}


	return (
		<div className="App">
			<TodoList
				title={"My Tasks!"}
				tasks={tasksForRender}
				remove_task={remove_task}
				changeFilter={changeFilter}
				createTask={createTask}

			/>
		</div>
	);
}

export default App;
