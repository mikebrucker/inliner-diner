import React, { Component } from "react";
import "./App.scss";
import juice from "juice";
import Popover from "./components/Popover";

// juice is a module to inline CSS in HTML emails
// returns a new text string of the inlined email
// https://github.com/Automattic/juice

// example
// juice("email-text-string", {
//     option1: true,
//     option2: false
// });

class App extends Component {
	state = {
		beforeInlineText: "",
		fixedTextForInlining: "",
		afterInlineText: "",
		removeStyleTags: false,
		preserveImportant: true,
		xmlMode: true,
		displayInfoMouseOver: false,
		displayInfoClick: false,
		linksToAdd: ""
	};

	juiceIt = emailText => {
		// inlines email
		return juice(emailText.fixedTextForInlining, {
			removeStyleTags: emailText.removeStyleTags,
			preserveImportant: emailText.preserveImportant,
			xmlMode: emailText.xmlMode
		});
	};

	fixEmptyAttributes = emailText => {
		// replaces empty href="" with href="#"
		// replaces empty alt="" with alt="EmptyAltTag"
		let fixedEmailText = emailText.replace(/href=""/, 'href="#"');
		fixedEmailText = fixedEmailText.replace(/href=''/, 'href="#"');
		fixedEmailText = fixedEmailText.replace(/alt=""/, 'alt="EmptyAltTag"');
		return fixedEmailText.replace(/alt=''/, 'alt="EmptyAltTag"');
	};

	removeClosingMetaTags = emailText => {
		if (emailText.includes("</img>")) {
			return "Please fix Email\n\n</img> tag created by inliner. This happens because an <img> tag is not closed with />";
		} else if (this.state.xmlMode) {
			// xmlMode adds closing tags to all tags which is necessary but not for meta tag
			// this removes that
			// eslint-disable-next-line
			return emailText.replace(/\<\/meta\>/g, "");
		}
	};

	inlineThisEmail = () => {
		this.setState(
			{
				afterInlineText: ""
			},
			() => {
				let juicedHtml = "";
				// fix empty attributes before juicing
				let emailFixedAttributes = this.fixEmptyAttributes(
					this.state.beforeInlineText
				);

				this.setState(
					{
						fixedTextForInlining: emailFixedAttributes
					},
					() => {
						// juice the attribute-fixed-email then remove closing meta tags
						juicedHtml = this.removeClosingMetaTags(this.juiceIt(this.state));
					}
				);
				// timeout of 100ms for noticeable change of afterInlineText
				setTimeout(() => {
					this.setState({
						afterInlineText: juicedHtml
					});
				}, 100);
			}
		);
	};

	handleTextAreaChange = e => {
		// responsible for state change of textareas
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleCheckboxChange = e => {
		// responsible for state change of checkboxes
		this.setState({
			[e.target.name]: e.target.checked
		});
	};

	handleCopyText = e => {
		// highlights and copies text of the newly inlined email
		const textAreaEl = document.getElementById("afterInline");
		textAreaEl.select();
		document.execCommand("copy");
	};

	showInfoMouseOver = () => {
		this.setState({
			displayInfoMouseOver: true
		});
	};

	hideInfoMouseOver = () => {
		this.setState({
			displayInfoMouseOver: false
		});
	};

	infoClick = () => {
		this.setState({
			displayInfoClick: !this.state.displayInfoClick
		});
		const infoButton = document.getElementsByClassName("info")[0];
		infoButton.style.borderColor === "rgb(238, 238, 238)"
			? (infoButton.style.borderColor = "rgb(164, 201, 63)")
			: (infoButton.style.borderColor = "rgb(238, 238, 238)");
		infoButton.style.backgroundColor === "rgb(164, 201, 63)"
			? (infoButton.style.backgroundColor = "rgb(238, 238, 238)")
			: (infoButton.style.backgroundColor = "rgb(164, 201, 63)");
	};

	addLinks = () => {
		// copy links from excel tagging worksheet
		// make sure links are in proper order of email which might be slightly different than the numbered order of CTA1, CTA2, CTA3, etc.
		// double the btn links if they have an outlook counterpart
		const linksArray = [];

		let doc =
			linksArray.length > 0
				? this.state.beforeInlineText
				: "No Links Array Added.";

		for (var i = 0; i < linksArray.length; i++) {
			// make sure your hrefs match this, change if necessary
			doc = doc.replace(`href=""`, `href="${linksArray[i]}`);
		}

		this.setState({
			afterInlineText: doc
		});

		// let linksToAdd = this.state.linksToAdd.split("\n");
		// let doc =
		// 	linksToAdd.length > 0
		// 		? this.state.beforeInlineText
		// 		: "No Links Array Added.";

		// for (var i = 0; i < linksToAdd.length; i++) {
		// 	// make sure your hrefs match this, change if necessary
		// 	doc = doc.replace(`href=""`, `href="${linksToAdd[i]}`);
		// }

		// this.setState({
		// 	afterInlineText: doc
		// });
	};

	render() {
		const displayPopoverVisibility =
			this.state.displayInfoMouseOver || this.state.displayInfoClick
				? "visible"
				: "hidden";
		const displayPopoverOpacity =
			this.state.displayInfoMouseOver || this.state.displayInfoClick
				? "1"
				: "0";

		return (
			<main className="App">
				<header>
					<h1 className="App-title">Inliner Diner</h1>
				</header>
				<div>
					<h4 className="App-subtitle">
						Nothing's finer than being in your Inliner Diner
					</h4>
					<div
						onMouseOver={this.showInfoMouseOver}
						onMouseOut={this.hideInfoMouseOver}
						onClick={this.infoClick}
						className="info"
						style={{
							backgroundColor: "#a4c93f",
							borderColor: "#eeeeee"
						}}
					>
						!
					</div>
					<div
						id="info"
						style={{
							position: "relative",
							transition: "visibility .25s, opacity .25s",
							visibility: displayPopoverVisibility,
							opacity: displayPopoverOpacity
						}}
					>
						<Popover />
					</div>
				</div>

				<div className="textAreaContainer">
					<textarea
						onChange={this.handleTextAreaChange}
						value={this.state.beforeInlineText}
						placeholder="Paste HTML in need of inline styles"
						name="beforeInlineText"
						id="beforeInline"
					/>
				</div>

				<button onClick={this.inlineThisEmail}>INLINE THIS HTML</button>
				<button onClick={this.addLinks}>ADD LINKS</button>

				<div className="middleContainer">
					<div className="checkboxes">
						<label className="checkbox">
							<input
								type="checkbox"
								name="removeStyleTags"
								onChange={this.handleCheckboxChange}
								checked={this.state.removeStyleTags}
							/>
							Remove <code>&lt;style&gt;</code> tag from head
						</label>

						<label className="checkbox">
							<input
								type="checkbox"
								name="preserveImportant"
								onChange={this.handleCheckboxChange}
								checked={this.state.preserveImportant}
							/>
							Preserve <code>!important</code> tags
						</label>

						<label className="checkbox">
							<input
								type="checkbox"
								name="xmlMode"
								onChange={this.handleCheckboxChange}
								checked={this.state.xmlMode}
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
					{/* <div className="linkTextAreaContainer">
						<textarea
							placeholder="Links to be added"
							onChange={this.handleTextAreaChange}
							value={this.state.linksToAdd}
							type="text"
							name="linksToAdd"
						/>
					</div> */}
				</div>

				<button onClick={this.handleCopyText}>COPY INLINED HTML</button>

				<div id="afterInlineContainer" className="textAreaContainer">
					<textarea
						onChange={this.handleTextAreaChange}
						value={this.state.afterInlineText}
						placeholder="Inlined HTML will be placed here"
						name="afterInlineText"
						id="afterInline"
					/>
				</div>
			</main>
		);
	}
}

export default App;
