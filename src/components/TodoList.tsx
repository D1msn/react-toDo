import React, {useState} from 'react';
import {FilterValuesType, TaskType} from "../App";

type PropsType = {
	title: string
	tasks: Array<TaskType>
	remove_task: (taskId: number) => void
	add_task?: (task: TaskType) => void
	createTask: (obj: TaskType) => void
	changeFilter: (value: FilterValuesType) => void
}

function TodoList(props: PropsType) {
	const taskList = props.tasks.map(task => {
		return (
			<li key={task.id}>
				<input type="checkbox" checked={task.isDone}/>
				<span>{task.title}</span>
				<button onClick={() => {
					props.remove_task(task.id)
				}}>X
				</button>
			</li>
		)
	})

	const [inputValue, setInputValue] = useState<string>("");

	const createObj = () => {
		const obj = {id: props.tasks.length + inputValue.length, title: inputValue, isDone: false}
		props.createTask(obj);
	}





	return (
		<div className={"todolist"}>
			<h3>{props.title}</h3>
			<div>
				<input onChange={(e) => setInputValue(e.target.value)}/>
				<button onClick={createObj}>+</button>
			</div>
			<ul>
				{taskList}
			</ul>
			<div>
				<button
					onClick={() => {
						props.changeFilter("all")
					}}>
					All
				</button>
				<button onClick={() => {
					props.changeFilter("active")
				}}>Active
				</button>
				<button onClick={() => {
					props.changeFilter("completed")
				}}>Completed
				</button>
			</div>
		</div>
	);
}

export default TodoList;