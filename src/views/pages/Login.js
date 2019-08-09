import React, {Component} from "react";
import { Redirect } from 'react-router-dom'
import axios from "axios";
import {
    Container, Col, Form,FormGroup, Label, Input,Row,Button,Alert
} from 'reactstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password: '',
            errorMessage: '',
            login: false
        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSwChange = this.handleSwChange.bind(this);
    }

    componentDidMount() {
    }

    handleSwChange(e) {
        e.preventDefault();
        var swName = e.target.name;
        this.setState({
            [swName]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if(!this.state.password || !this.state.username){
            this.setState({errorMessage: 'Please enter username and password'})
        } else {
            this.setState({errorMessage: ''})
            const url = 'https://swapi.co/api/people/?search='+this.state.username;
            axios.get(url).then(res => {
                if(res.status == 200 && res.data.count == 1){
                    if(res.data.results[0].birth_year == this.state.password){
                        console.log('test');
                        localStorage.setItem('swAuthKey', Date.now());
                        this.setState({login: true});
                    } else {
                        this.setState({errorMessage: 'Invalid Login details'})
                    }
                } else {
                    this.setState({errorMessage: 'Invalid Login details'})
                }
            }).catch(e => {
            });
        }

    }

    render() {
        if(localStorage.getItem('swAuthKey') && localStorage.getItem('swAuthKey')!=''){
            return <Redirect to='/'/>;
        }
        return (<React.Fragment>
            <Container>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <h2>Sign In</h2>
                        {this.state.errorMessage ? (
                            <Alert color="warning">
                                {this.state.errorMessage}
                            </Alert>
                        ):('')}

                        <Form className="form" onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label>Username</Label>
                                    <Input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        onChange={this.handleSwChange.bind(this)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        onChange={this.handleSwChange.bind(this)}
                                        placeholder="********"
                                    />
                                </FormGroup>
                            <Button>Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>);
    }
}

export default Login;
