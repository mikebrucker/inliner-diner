import React from "react";
import "./Popover.scss";

function Popover() {
	return (
		<div className="Popover">
			<h2>How to use CSS Inliner</h2>
			<p>Place HTML email to be inlined in the top textarea.</p>
			<p>Choose your options.</p>
			<ol>
				<li>
					Remove style tag will remove the
					<code>&lt;style&gt;...CSS code...&lt;/style&gt;</code> from the head.
					Not recommended if you have media queries.
				</li>
				<li>
					Keep all <code>!important</code> flags or uncheck to remove them
				</li>
				<li>
					XML/XHTML mode is recommended as it keeps all closing tags with a{" "}
					<code>/&gt;</code>. Other wise a <code>&lt;br /&gt;</code> becomes a{" "}
					<code>&lt;br&gt;</code>. Closing <code>&lt;/meta&gt;</code> tags are
					automatically removed. If your code is missing a closing tag on an{" "}
					<code>&lt;img /&gt;</code> it will add a closing{" "}
					<code>&lt;/img&gt;</code> which is incorrect. Please correct your code
					and run the inliner again.
				</li>
			</ol>
			<p>
				Click the button <code>[INLINE THIS HTML]</code> and your inlined email
				will appear in the bottom textarea according to the options selected.
			</p>
			<p>
				Click the button <code>[COPY INLINED HTML]</code> to copy the bottom
				textarea's text to the clipboard. Paste in your code editor.
			</p>
		</div>
	);
}

export default Popover;
