import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAnswer:false
        };

        this.toggleAnswer = this.toggleAnswer.bind(this);
    }

    toggleAnswer(){
        this.setState({
            showAnswer:!this.state.showAnswer
        })
    }

    render() { console.log(this.props)

        const questionNumber = parseInt(this.props.match.params.questionId) + 1;
        const nextQuestion = this.props.questionCount > questionNumber ? <li><Link to={`/question/${this.props.match.params.roundId}/${questionNumber}`}>Next Question</Link></li> : ""
        const answerClass = this.state.showAnswer ? "show" : "";
        return (

            <section className="question">
                <h1>Question {questionNumber}</h1>
                <h2 className={"question"} dangerouslySetInnerHTML={{__html: this.props.question.question}} />
                <p className={`answer ${answerClass}`}>{this.props.question.answer}</p>
                <section className={"controls"}>
                    <ul>
                        <li><Link to={`/round/${this.props.match.params.roundId}`}>Back</Link></li>
                        <li><a onClick={() => this.toggleAnswer()}>Toggle answer</a></li>
                        {nextQuestion}
                    </ul>
                </section>
            </section>
        )
    }
}

export default Question;