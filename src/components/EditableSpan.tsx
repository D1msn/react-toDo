import React, {ChangeEvent, useState} from 'react';


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
			? <input
				value={title}
				onChange={onChangeTitle}
				autoFocus
				onBlur={offEditMode}
				style={{display: "inline-flex"}}/>

			: <span onDoubleClick={onEditMode}>{title}</span>
	)
};

export default EditableSpan;
