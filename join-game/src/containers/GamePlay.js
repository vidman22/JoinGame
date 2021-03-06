import React, { Component } from 'react';
import Sentence from '../components/Sentence';

import './GamePlay.css';

import Grammar from '../Grammar.json';

import io from 'socket.io-client';

const GrammarTest = Grammar.Grammar;


const socket = io("http://grammify.xyz");

let index = 0;
export default class GamePlay extends Component {

	constructor(props) {
		super(props);

		this.state = {
			
			gameSentences:[],
			activeSentence:'',
			answer:'',
			error:''
		}
	}

	UNSAFE_componentWillMount() {
	
		let gameSentences = this.props.sentences;
		gameSentences = this.shuffle(gameSentences);
		

		const activeSentence = gameSentences[0];

	
		this.setState({
			gameSentences,
			activeSentence
		});
	};

	componentWillReceiveProps(newProps) {
		if (newProps.sentences !== this.props.sentences) {
			const activeSentence = newProps.sentences[0];
			index = 0;
			this.setState({
				gameSentences: newProps.sentences,
				activeSentence,
				answer: ''
			});
		}
	}

	componentDidMount() {
		this.initSocket();
	};

	initSocket() {
		
	}
	
	shuffle(array) {
		let currentIndex = array.length, temporaryValue, randomIndex;

		while (0 !== currentIndex) {

			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	} 
	


	handleSubmit = (e) => {
		e.preventDefault();
		let answer = this.state.answer;
		answer = answer.toLowerCase().trim();

		
		if (answer === this.state.activeSentence.a ||answer === this.state.activeSentence.c || answer === this.state.activeSentence.d ||answer === this.state.activeSentence.e ||answer === this.state.activeSentence.f)  {
			

			socket.emit('SUCCESS', this.props.room, this.props.name);

			this.setState({
				correct:'Correct!'
			});

			setTimeout(this.correct.bind(this), 333);
			
		} else {
			socket.emit('FAILURE', this.props.room);
			this.setState({
				error:'wrong answer!'
			});
			setTimeout(this.wrongAnswer.bind(this), 1000);
			
		}
		

	}

	correct() {

		if (index < this.state.gameSentences.length - 1 ) {
				index++;
				const activeSentence = this.state.gameSentences[index];

				this.setState({
					activeSentence,
					answer:'',
					correct:''
				});
			} else {
				socket.emit('COMPLETED', this.props.room);
				this.setState({
					correct:'',
				
				})
			}
	}

	wrongAnswer() {
		const gameSentences = [...this.state.gameSentences];

		const wrongSentence = gameSentences[index];

		gameSentences.push(wrongSentence);
		this.setState({
			gameSentences
		});

		index++;
		const activeSentence = this.state.gameSentences[index];

		this.setState({
			activeSentence,
			answer:'',
			error:''
		});
	}

	handleChange = (e) => {

		this.setState({ answer: e.target.value });
	}

	render() {

		const sentence = this.state.activeSentence;
		
		return (
			<div className="GamePlay">
			  <div className="GameHeader">
				<h2>{GrammarTest[this.props.game].name}</h2>
			  </div>
			  			
			  		<div className="completed">{this.props.winner ? this.props.winner : null}</div>
					<Sentence 
						sentence={sentence.sentence}
						correct={sentence.a}
						placeholder={sentence.b}
						value={this.state.answer}
						handlesubmit={this.handleSubmit}
						handlechange={this.handleChange}
					/>
					<div className="error">{this.state.error ? this.state.error : null}</div>
					<div className="correct">{this.state.correct ? this.state.correct: null}</div>
					
			</div>
			)
	}

}