import React, {Component} from 'react';
import { Link } from "react-router-dom";
import Question from '../Question/Question';

class Round extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAnswers:false
        };

        this.getQuestionList = this.getQuestionList.bind(this);
        this.getAnswerList = this.getAnswerList.bind(this);
    }

    getQuestionList() {
        const questions = this.props.roundData[this.props.match.params.roundId].questions;

        return questions.map((question, i) => {
            return (
                <li><Link to={`/question/${this.props.match.params.roundId}/${i}`}>Question {i+1}</Link></li>
            )
        });
    }

    getAnswerList() {
        const questions = this.props.roundData[this.props.match.params.roundId].questions;
        return questions.map((question, i) => {
            return (
                <li>{question.answer}</li>
            )
        });
    }

    toggleAnswers(){
        this.setState({
            showAnswers:!this.state.showAnswers
        })
    }

    render() { console.log(this.props);
         const questionList = this.getQuestionList();
         const answerList = this.getAnswerList();
         const answerClass = this.state.showAnswers ? "show" : "";

         return (
            <section className={"round"}>
                <h1>{this.props.roundData[this.props.match.params.roundId].name}</h1>
                <ul className="questions">{questionList}</ul>
                <ul className={`answers ${answerClass}`}>
                    {answerList}
                </ul>
                <section className={`controls`}>
                    <ul>
                        <li>
                            <Link to="/">Back</Link>
                        </li>
                        <li>
                            <a onClick={() => this.toggleAnswers()}>Toggle answers</a>
                        </li>
                    </ul>
                </section>

            </section>
         )
    }
}

export default Round;