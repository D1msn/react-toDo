import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";


type PropsTypes = {
	title: string
	setNewTitle: (title: string) => void
}

const EditableSpan: React.FC<PropsTypes> = (props) => {
	const [editMod, setEditMod] = React.useState<boolean>(false)
	const [title, setTitle] = useState<string>(props.title);

	const onEditMode = () => setEditMod(true);

	const offEditMode = () => {
		setEditMod(false)
		if (title) {
			props.setNewTitle(title)

		}
	};

	const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}


	return (
		editMod
			? <TextField
				id="standard-textarea"
				label=""
				placeholder=""
				multiline
				value={title}
				onChange={onChangeTitle}
				autoFocus
				onBlur={offEditMode}
				style={{ marginBottom: 10, width: "calc(100% - 65px)" }}
			/>

			: <p onDoubleClick={onEditMode}>{title}</p>
	)
};

export default EditableSpan;
