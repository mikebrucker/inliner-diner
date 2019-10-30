import React from "react";
import "./Textarea.scss";

function Textarea({ name, placeholder, value, onChange }) {
	return (
		<div className="Textarea">
			<textarea
				onChange={onChange}
				value={value}
				placeholder={placeholder}
				name={name}
			/>
		</div>
	);
}

export default Textarea;
