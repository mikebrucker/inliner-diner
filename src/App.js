import React, { Component } from "react";
import "./App.scss";
import juice from "juice";
import Header from "./components/Header";
import Textarea from "./components/Textarea";
import InlinerCheckboxes from "./components/InlinerCheckboxes";

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
		let returnText = emailText;
		if (returnText.includes("</img>")) {
			return "Please fix Email\n\n</img> tag created by inliner. This happens because an <img> tag is not closed with />";
		} else if (this.state.xmlMode) {
			// xmlMode adds closing tags to all tags which is necessary but not for meta tag
			// xmlMode does not affect <br /> tags so this fixes that also
			returnText = returnText.replace(/<br>/g, "<br/>");
			returnText = returnText.replace(/<br >/g, "<br/>");
			returnText = returnText.replace(/< br>/g, "<br/>");
			returnText = returnText.replace(/< br >/g, "<br/>");
			// this removes that
			// eslint-disable-next-line
			returnText = returnText.replace(/\<\/meta\>/g, "");
		}
		return returnText;
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
		const displayPopoverBgColor = this.state.displayInfoClick
			? "#eeeeee"
			: "#a4c93f";
		const displayPopoverBordColor = this.state.displayInfoClick
			? "#a4c93f"
			: "#eeeeee";

		return (
			<main className="App">
				<Header
					onMouseOver={this.showInfoMouseOver}
					onMouseOut={this.hideInfoMouseOver}
					onClick={this.infoClick}
					visibility={displayPopoverVisibility}
					opacity={displayPopoverOpacity}
					bgColor={displayPopoverBgColor}
					bordColor={displayPopoverBordColor}
				/>
				<Textarea
					name="beforeInlineText"
					placeholder="Paste HTML in need of inline styles"
					value={this.state.beforeInlineText}
					onChange={this.handleTextAreaChange}
				/>

				<button onClick={this.inlineThisEmail}>INLINE THIS HTML</button>
				<button onClick={this.addLinks}>ADD LINKS</button>

				<div className="middleContainer">
					<InlinerCheckboxes
						onChange={this.handleCheckboxChange}
						removeStyleTags={this.state.removeStyleTags}
						preserveImportant={this.state.preserveImportant}
						xmlMode={this.state.xmlMode}
					/>
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
				<Textarea
					name="afterInlineText"
					placeholder="Inlined HTML will be placed here"
					value={this.state.afterInlineText}
					onChange={this.handleTextAreaChange}
				/>
			</main>
		);
	}
}

export default App;
