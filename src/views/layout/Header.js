import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logout:false
        };
    }

    logout() {
        this.setState({logout: true},()=>{
            localStorage.removeItem('swAuthKey');
        });
        window.location.href = '#/login';
    }

  render() {
      if(localStorage.getItem('swAuthKey')){
          var SwLogin = true;
      } else {
          var SwLogin = false;
      }


    return (
            <div className="header ">
                <nav className="navbar navbar-expand-lg navbar-light menu">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-item nav-link active" href={"/"}>Star Wars Directory<span className="sr-only">(current)</span></a>
                        </div>
                    </div>
                    {SwLogin ? (
                        <button class="btn btn-success" onClick={this.logout.bind(this)}>Logout</button>
                    ):('')}

                </nav>
            </div>
    );
  }
}

export default Header;
