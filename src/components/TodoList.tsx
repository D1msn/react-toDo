import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "../App";
import {v1} from "uuid";
import AddItemForm from './AddItemForm';
import EditableSpan from "./EditableSpan";

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
	changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
	changeTodoListTitle: (title: string, todoListID: string) => void
}

function TodoList(props: PropsType) {

	const removeTask = (taskId: string) => {
		props.removeTask(taskId, props.id)
	}



	const taskList = props.tasks.map(task => {
		const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
			props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
		}
		const changeTitle = ( title:string ) => {
			props.changeTaskTitle (task.id , title, props.id)
		}
		return (
			<li key={task.id} className={task.isDone ? "completedTask" : ""}>
				<input
					type="checkbox"
					onChange={changeTaskStatus}
					checked={task.isDone}/>
				<EditableSpan title={task.title} setNewTitle={changeTitle}/>
				<button onClick={() => {
					removeTask(task.id)
				}}>X
				</button>
			</li>
		)
	})

	const addTask = (title: string) => props.createTask(title, props.id)



	const filterAll = () => props.changeFilter("all", props.id)
	const filterActive = () => props.changeFilter("active", props.id)
	const filterCompleted = () => props.changeFilter("completed", props.id)

	const changeTodolistTitle = ( title:string )=>{
		props.changeTodoListTitle(title, props.id)
	}


	return (
		<div className={"todolist"}>
			<h3><EditableSpan title={props.title} setNewTitle={changeTodolistTitle} /> <button onClick={()=> props.removeTodoList(props.id)}>X</button></h3>
			<AddItemForm addItem={addTask}/>
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
