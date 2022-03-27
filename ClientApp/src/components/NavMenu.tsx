import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import UserStore from "../stores/UserStore";
import {observer} from "mobx-react";

@observer
export class NavMenu extends Component<{ store: UserStore }, 
{ collapsed: boolean, showOptions: boolean }> {
  static displayName = NavMenu.name;

  constructor (props: any) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      showOptions: false
    };
  }


  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  toggleOptionsOn = () => {
    this.setState({
      ...this.state, 
      showOptions: false
    })
  }

  toggleOptionsOff = () => {
    this.setState({
      ...this.state,
      showOptions: true
    });
  }

  signOut = () => {
    this.props.store.resetUser();
    sessionStorage.clear();

    window.location.href = '/';
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-dark border-bottom box-shadow mb-3 bg-dark" dark>
          <Container>
            <NavbarBrand tag={Link} to="/">wavecloud</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse nav-list-wrapper" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-light" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-light" to="/login">Login</NavLink>
                </NavItem>
                {Object.keys(this.props.store.user).length !== 0 &&
                    <NavItem>
                      <NavLink tag={Link} className="text-light" to="/profile"
                        onMouseEnter={this.toggleOptionsOn}
                        onMouseLeave={this.toggleOptionsOff}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                             className="bi bi-person-circle user-icon" viewBox="0 0 16 16">
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                          <path fillRule="evenodd"
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                        {this.props.store.user.username}

                        <Collapse isOpen={!this.state.showOptions}>
                          <div className="options-menu">
                            <ul className="list-group bg-dark">
                              <li className="menu-item border-bottom"
                                onClick={this.signOut}>
                                sign out
                              </li>
                            </ul>
                          </div>
                        </Collapse>
                      </NavLink>
                    </NavItem>
                }
                <NavItem>
                  <NavLink tag={Link} className="text-light" to="/upload">
                    Upload
                  </NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
