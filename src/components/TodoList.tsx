import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "../App";
import {v1} from "uuid";

type PropsType = {
	id: string
	filter: FilterValuesType
	title: string
	tasks: Array<TaskType>
	removeTask: (taskID: string, todoListID: string) => void
	createTask: (title: string, todoListID: string) => void
	changeFilter: (value: FilterValuesType , todoListID: string) => void
	changeTaskStatus: (idTask: string, isDone: boolean , todoListID: string) => void
	removeTodoList: (todoListID: string) => void
}

function TodoList(props: PropsType) {
	const [inputValue, setInputValue] = useState<string>("");
	const [error, setError] = useState<boolean>(false);

	const removeTask = (taskId: string) => {
		props.removeTask(taskId, props.id)
	}

	const taskList = props.tasks.map(task => {
		const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
			props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
		}
		return (
			<li key={task.id} className={task.isDone ? "completedTask" : ""}>
				<input
					type="checkbox"
					onChange={changeTaskStatus}
					checked={task.isDone}/>
				<span>{task.title}</span>
				<button onClick={() => {
					removeTask(task.id)
				}}>X
				</button>
			</li>
		)
	})

	const setTitle = () => {
		props.createTask(inputValue, props.id)
	};

	const inputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.currentTarget.value);
		setError(false)
	}

	const EnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && inputValue) {
			setTitle();
		}
	}

	const filterAll = () => props.changeFilter("all", props.id)
	const filterActive = () => props.changeFilter("active", props.id)
	const filterCompleted = () => props.changeFilter("completed", props.id)


	return (
		<div className={"todolist"}>
			<h3>{props.title} <button onClick={()=> props.removeTodoList(props.id)}>X</button></h3>
			<div>
				<input
					className={error ? "error" : ""}
					value={inputValue}
					onKeyDown={EnterHandler}
					onChange={inputValueHandler}
					placeholder={"Введите название:"}/>
				{inputValue.length > 0 && <button onClick={setTitle}>+</button>}
				{error && <div className="errorText">Field is required</div>}
			</div>
			<ul>
				{taskList}
			</ul>
			<div>
				<button
					className={props.filter === "all" ? "activeButton" : ""}
					onClick={filterAll}>All
				</button>
				<button
					className={props.filter === "active" ? "activeButton" : ""}
					onClick={filterActive}>Active
				</button>
				<button
					className={props.filter === "completed" ? "activeButton" : ""}
					onClick={filterCompleted}>Completed
				</button>
			</div>
		</div>
	);
}

export default TodoList;
