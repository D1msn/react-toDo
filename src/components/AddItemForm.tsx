import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBoxOutlined} from "@material-ui/icons";


type PropsType = {
	addItem: (title: string) => void
}

const AddItemForm = (props: PropsType) => {

	const [inputValue, setInputValue] = useState<string>("");
	const [error, setError] = useState<boolean>(false);


	const setTitle = () => {
		const trimInputValue = inputValue.trim()
		if (trimInputValue) {
			props.addItem(trimInputValue)
			setInputValue("")
		} else{
			setError(true)
		}
	};

	const inputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.currentTarget.value);
		console.log("Ввод данных");
		setError(false);
	}

	const EnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && inputValue) {
			setTitle();
		}
	}

	return (
		<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
			<TextField
				className={error ? "error" : ""}
				value={inputValue}
				onKeyDown={EnterHandler}
				onChange={inputValueHandler}
				label="Введите название:"
				style={{ marginBottom: 10, width: "calc(100% - 65px)" }}
				error={error}
			/>
			<IconButton onClick={setTitle} color={"primary"} style={{ padding: 5 }}>
				<AddBoxOutlined/>
			</IconButton>
		</div>
	);
}

export default AddItemForm;
