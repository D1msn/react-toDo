import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


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
	);
}

export default AddItemForm;
