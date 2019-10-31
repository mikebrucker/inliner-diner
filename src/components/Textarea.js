import React from "react";
import "./Textarea.scss";

export default function Textarea({ name, placeholder, value, onChange, id }) {
	const textareaId = id ? id : "";

	return (
		<div className="Textarea">
			<textarea
				onChange={onChange}
				value={value}
				placeholder={placeholder}
				name={name}
				id={textareaId}
			/>
		</div>
	);
}
