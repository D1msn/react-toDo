import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "../App";
import AddItemForm from './AddItemForm';
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Paper} from "@material-ui/core";
import {HighlightOff} from "@material-ui/icons";

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
			<ListItem key={task.id} className={task.isDone ? "completedTask" : ""} style={{ padding: 0 }}>
				<Checkbox
					size={"small"}
					color={"primary"}
					onChange={changeTaskStatus}
					checked={task.isDone} />

				<EditableSpan title={task.title} setNewTitle={changeTitle}/>
				<IconButton aria-label="share" onClick={() => {removeTask(task.id)}} >
					<HighlightOff style={{ width: "20px", height: "20px" }} color={"secondary"}/>
				</IconButton>
			</ListItem>
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
		<Paper className={"todolist"} variant="elevation" elevation={5}>
				<span style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
					<EditableSpan title={props.title} setNewTitle={changeTodolistTitle}/>
					<IconButton aria-label="share" onClick={() => props.removeTodoList(props.id)}>
						<HighlightOff style={{width: "20px", height: "20px"}}  color={"secondary"}/>
					</IconButton>
				</span>
			<AddItemForm addItem={addTask}/>
			<List disablePadding={true}>
				{taskList}
			</List>
				<ButtonGroup variant="text" color="primary" size={"small"} fullWidth>
					<Button
						variant={props.filter === "all" ? "contained" : "text"}
						onClick={filterAll}>All
					</Button>
					<Button
						variant={props.filter === "active" ? "contained" : "text"}
						onClick={filterActive}>Active
					</Button>
					<Button
						variant={props.filter === "completed" ? "contained" : "text"}
						onClick={filterCompleted}>Completed
					</Button>
				</ButtonGroup>
		</Paper>
	);
}

export default TodoList;
