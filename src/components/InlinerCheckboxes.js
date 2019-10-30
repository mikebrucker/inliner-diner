import React from "react";
import "./InlinerCheckboxes.scss";

function InlinerCheckboxes({
	onChange,
	removeStyleTags,
	preserveImportant,
	xmlMode
}) {
	return (
		<div className="InlinerCheckboxes">
			<label className="checkbox">
				<input
					type="checkbox"
					name="removeStyleTags"
					onChange={onChange}
					checked={removeStyleTags}
				/>
				Remove <code>&lt;style&gt;</code> tag from head
			</label>

			<label className="checkbox">
				<input
					type="checkbox"
					name="preserveImportant"
					onChange={onChange}
					checked={preserveImportant}
				/>
				Preserve <code>!important</code> tags
			</label>

			<label className="checkbox">
				<input
					type="checkbox"
					name="xmlMode"
					onChange={onChange}
					checked={xmlMode}
				/>
				<code>XML/XHTML</code> mode - necessary for mso/Outlook
				<div>
					<sup>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Also removes unnecessary closing{" "}
						<code>&lt;/meta&gt;</code> tags
					</sup>
				</div>
			</label>
		</div>
	);
}

export default InlinerCheckboxes;
