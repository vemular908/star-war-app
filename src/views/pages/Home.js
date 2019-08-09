import React, {Component} from "react";
import {Link, Redirect} from 'react-router-dom';
import axios from "axios";

import Login from "./Login";
import Search from "./Search";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            login: false
        };
    }

    componentDidMount() {
        if(localStorage.getItem('swAuthKey')){
            this.setState({login: true});
        } else {
            this.setState({login: false});
        }
        this.getAllTeams();
    }

    getAllTeams() {
        const url = './data.json';
        axios.get(url).then(res => {
            if (res.status && res.status === 200) {
                this.setState({teams: res.data.teams});
            }

        }).catch(e => {
        });
    }

    render() {
        if(!localStorage.getItem('swAuthKey') || localStorage.getItem('swAuthKey')==''){
            return <Redirect to='/login'/>;
        }
        const teamsList = this.state.teams.map((team,index) => (
            <div className="col-lg-4 col-md-6" key={index}>
                <Link to={'/team/view/'+team.id}>
                    <div className="ourservice-item transition">
                        <h4>{team.name}</h4>
                        <p>{team.fullName}</p>
                        <p>No Of Rosters: {team.roster.length}</p>
                    </div>
                </Link>
            </div>
        ));
        return (<React.Fragment>
                    <Search/>
                </React.Fragment>);
    }
}

export default Home;
