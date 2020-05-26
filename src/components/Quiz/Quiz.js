import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import RoundList from '../Round/RoundList';
import Round from "../Round/Round";
import Question from '../Question/Question';
import TeamList from '../Team/TeamList';
import quiz from "../../data/quiz";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Quiz extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        const { cookies } = props;
        this.state = {
            teams: cookies.get("quizData") || []
        };

        this.handleTeamEntry = this.handleTeamEntry.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({newTeam: event.target.value});
    }

    handleTeamEntry(event) {
        event.preventDefault();
        const { cookies } = this.props;
        let newTeams = this.state.teams;
        newTeams.push({name: this.state.newTeam, score:0});
        this.setState({
            teams : newTeams
        });
        cookies.set('quizData', this.state.teams, { path:'/'});
        this.addTeam.reset();
    }

    render() {
        return (
            <section className="quiz">
                <Router>
                    <Switch>
                        <Route path="/question/:roundId/:questionId" render={(props) => <Question {...props} round={props.match.params.roundId} questionCount={quiz.rounds[props.match.params.roundId].questions.length} question={quiz.rounds[props.match.params.roundId].questions[props.match.params.questionId]}/>}/>
                        <Route path="/round/:roundId" render={(props) => <Round {...props} roundData={quiz.rounds}/>}/>
                        <Route path="/team/add/">
                            <section className="addTeam">
                                <form onSubmit={this.handleTeamEntry} ref={(el) => this.addTeam = el}>
                                    <input type={"text"} name={"name"} placeholder={"Team Name"} onChange={this.handleChange} />
                                    <input type={"submit"} value="Add"/>
                                </form>
                                <section className={`controls`}>
                                    <ul>
                                        <li>
                                            <Link to="/">Back</Link>
                                        </li>
                                    </ul>
                                </section>
                            </section>
                        </Route>
                        <Route path="/team/scores" render={() => <TeamList teamData={this.state.teams}/>} />

                        <Route path="/">
                            <RoundList roundData={quiz.rounds}/>
                        </Route>
                    </Switch>
                </Router>
            </section>
        )
    }
}

export default withCookies(Quiz);