import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Round from './Round';

const RoundList = props => {
    return (
        <div>
        <section className="roundList">
            <ul>
                {props.roundData.map((round, i) => {
                    if (i < 5) {
                        return <li><Link to={`/round/${i}`}>{round.name}</Link></li>
                    }
                })}
            </ul>
            <ul>
                {props.roundData.map((round, i) => {
                    if (i >= 5) {
                        return <li><Link to={`/round/${i}`}>{round.name}</Link></li>
                    }
                })}
            </ul>
        </section>
            <section className={`controls`}>
                <ul>
                    <li>
                        <Link to="/team/add/">Add Team</Link>
                    </li>
                    <li>
                        <Link to="/team/scores/">Show Scores</Link>
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default RoundList;