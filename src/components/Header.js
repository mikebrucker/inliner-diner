import React from "react";
import Popover from "./Popover";
import "./Header.scss";

export default function Header({
	onMouseOver,
	onMouseOut,
	onClick,
	visibility,
	opacity,
	bgColor,
	bordColor
}) {
	return (
		<header className="Header">
			<h1 className="Header-title">Inliner Diner</h1>
			<div>
				<h4 className="Header-subtitle">
					Nothing's finer than being in your Inliner Diner
				</h4>
				<div
					onMouseOver={onMouseOver}
					onMouseOut={onMouseOut}
					onClick={onClick}
					className="info"
					style={{
						backgroundColor: bgColor,
						borderColor: bordColor
					}}
				>
					!
				</div>
				<div
					id="info"
					style={{
						position: "relative",
						transition: "visibility .25s, opacity .25s",
						visibility: visibility,
						opacity: opacity
					}}
				>
					<Popover />
				</div>
			</div>
		</header>
	);
}
