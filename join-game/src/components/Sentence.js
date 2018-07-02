import React from 'react';
import './Sentence.css';


const sentence = ( props ) => {
	var index = props.sentence.indexOf(props.correct); 
	var index2 = index + props.correct.length;

	var s1 = props.sentence.slice(0, index);
	var s2 = props.sentence.slice(index2, props.sentence.length);
	
	return (
		<div className="Sentence">
			<div className="firstPart"><h3>{s1}</h3></div><form onSubmit={props.handlesubmit} className="enter">
						<input
						type="text"
						name="name"
						value={props.value}
						onChange={props.handlechange}
						placeholder={props.placeholder} /></form>
			<div className="secondPart"><h3>{s2}</h3></div>

		</div>
		)
};

export default sentence;