import React, {Component} from "react";
import axios from "axios";
import {
    Container, Col, Input,Row,InputGroup,InputGroupAddon,ListGroup,ListGroupItem,Progress, Button, Modal, ModalHeader,ModalFooter,ModalBody,Table
} from 'reactstrap';

class SwSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planets: [],
            highestPopulation: 0,
            planetDetails: '',
            showModal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        localStorage.setItem("swAuthKey", Date.now());
        if(localStorage.getItem('swAuthKey')){
            this.setState({login: true});
        } else {
            this.setState({login: false});
        }
    }

    viewPlace(e) {
        e.preventDefault();
        const inputKey = e.target.dataset.keyindex;
        if(inputKey) {
            this.setState({
                showModal: true
            });

            const url = 'https://swapi.co/api/planets/?search='+inputKey;
            axios.get(url).then(res => {
                if(res.status === 200 && res.data.count ===1){
                    this.setState({planetDetails: res.data.results[0]});
                }
            }).catch(e => {
            });
        } else {
            this.setState({
                showModal: false
            });
        }
    }

    searchPlaces(e) {
        e.preventDefault();
        if(e.target.value) {

            var swName = e.target.name;
            var searchKeyword = e.target.value;
            this.setState({
                [swName]: e.target.value
            });

            const url = 'https://swapi.co/api/planets/?search='+searchKeyword;
            axios.get(url).then(res => {

                if(res.status === 200){
                        this.setState({planets: res.data.results});
                        var tmpPopulation = 0;
                        var maxEle = res.data.results.map(function(obj){
                            if (obj.population > tmpPopulation && obj.population !== 'unknown') return obj.population;
                        });

                       var highestPopulation = Math.max.apply(Math, maxEle);

                       this.setState({highestPopulation: highestPopulation})
                }
            }).catch(e => {
            });
        } else {
            this.setState({planets: []});
        }
    }

    toggle() {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }));
    }

    render() {
        const planetsList = this.state.planets.map((planet,index) => (
            planet.name !== 'unknown' && planet.population !== 'unknown'? (
                <ListGroupItem key={index} data-keyindex={planet.name} onClick={this.viewPlace.bind(this)}>
                    {planet.name}
                    <Progress value={planet.population} max={this.state.highestPopulation}>{planet.population}</Progress>
                </ListGroupItem>
                ) : ('')
        ));

        return (<React.Fragment>
            <Container>
                <Row>
                    <Col></Col>
                </Row>
                <Row>
                    <Col xs="6" sm="4"></Col>
                    <Col xs="6" sm="4">
                        <InputGroup>
                            <Input
                                type="text"
                                name="searchKeyword"
                                placeholder={"Enter Your Keyword"}
                                onChange={this.searchPlaces.bind(this)}
                            />
                            <InputGroupAddon addonType="append">
                                <Button color="secondary">Search</Button>
                            </InputGroupAddon>
                        </InputGroup>

                    </Col>
                    <Col sm="4"></Col>
                </Row>
                </Container>
            <br/>
                <Container>
                <Row>
                    <Col>
                        <ListGroup>
                            {planetsList}
                        </ListGroup>
                    </Col>
                    <Modal isOpen={this.state.showModal} toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                        <ModalBody>
                            <Table>
                                <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>{this.state.planetDetails.name}</td>
                                </tr>
                                <tr>
                                    <td>Diameter</td>
                                    <td>{this.state.planetDetails.diameter}</td>
                                </tr>
                                <tr>
                                    <td>Population</td>
                                    <td>{this.state.planetDetails.population}</td>
                                </tr>
                                <tr>
                                    <td>Climate</td>
                                    <td>{this.state.planetDetails.climate}</td>
                                </tr>
                                <tr>
                                    <td>Gravity</td>
                                    <td>{this.state.planetDetails.gravity}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </Row>
            </Container>
        </React.Fragment>);
    }
}

export default SwSearch;
