import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {instanceOf} from "prop-types";
import { withCookies, Cookies } from 'react-cookie';

class TeamList extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        const { cookies } = props;
        this.state = {
            newScores:cookies.get("quizData") || [],
            originalScores:cookies.get("quizData") || [],
        }

        this.handleScoreUpdate = this.handleScoreUpdate.bind(this);
        this.handleTeamChange = this.handleTeamChange.bind(this);
    }

    // handleTeamChange(event) {console.log("old data:", this.state);
    //     event.preventDefault();
//         const originalScores = this.state.originalScores.slice();
//         let tempScores = [];
//         tempScores = this.state.originalScores.slice(); console.log("tempScores: ", tempScores);
//         const teamName = event.target.getAttribute('data-team'); console.log(teamName);
//         const originalScore = event.target.getAttribute('data-score');
//         const newScore = Number(originalScore) + Number(event.target.value);
// console.log(newScore);
//         const isCorrectTeam = (element) => element.name == teamName;
//         const teamIndex = tempScores.findIndex(isCorrectTeam);
//         console.log("teamIndex:", teamIndex);
//         tempScores.splice(teamIndex, 1);
//
//         console.log("tempScores before: ", tempScores);
//
//         tempScores.push({
//             name:teamName,
//             score: newScore
//         });
//
//         console.log("tempScores after: ", tempScores);
//
//         this.setState({newScores: tempScores});
//         console.log("new data:", this.state);

    // }

    handleTeamChange = (event, i) => { console.log(event);
        const teamName = event.target.getAttribute('data-team');
        const originalScore = event.target.getAttribute('data-score');
        const newScore = Number(originalScore) + Number(event.target.value); console.log(newScore);

        this.setState(state => {

            const newScores = state.newScores.map((item, j) => {
                if (j===i) { console.log('found: ', j); console.log('found: ', i);
                console.log("updating: ",teamName + " : " + newScore);
                    return {name:teamName, score:newScore}
                } else {
                    console.log("leaving: ", item);
                    return item;
                }
            });
            return {
                newScores,
            }
        });

        console.log("new state: ", this.state);
    };

    handleScoreUpdate(event) {
        event.preventDefault();
        const { cookies } = this.props;
        this.setState({originalScores: this.state.newScores});
        console.log("updated scores: ", this.state.originalScores);
        cookies.set('quizData', this.state.newScores, { path:'/'});
        this.scoreUpdate.reset();
    }

    render() { console.log("initial state:", this.state);
        let teamList = this.state.originalScores;
        teamList.sort((a, b) => (a.score < b.score) ? 1 : -1);
        return (
            <section>
                <form onSubmit={this.handleScoreUpdate} ref={(el) => this.scoreUpdate = el}>
                    <table>
                        <thead>
                        <tr>
                            <th>Team Name</th>
                            <th>Score</th>
                            <th>Score From Last Round</th>
                        </tr>
                        </thead>
                        <tbody>
                        {teamList.map((team, i) => {
                            return <tr key={i}>
                                <td>{team.name}</td>
                                <td>{team.score}</td>
                                <td><input key={i} type="text" data-score={team.score} data-team={team.name} name={"newScore"} onChange={(event) => this.handleTeamChange(event, i)} ref={node => (this.inputNode = node)}/></td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                    <input type="submit" value="Update"/>
                </form>
                <section className={"controls"}>
                    <ul>
                        <li><Link to={"/"}>Back</Link></li>
                    </ul>
                </section>
            </section>

        )
    }
}

export default withCookies(TeamList);