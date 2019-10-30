import React from "react";
import "./Textarea.scss";

function Textarea({ name, placeholder, value, onChange, id }) {
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

export default Textarea;
