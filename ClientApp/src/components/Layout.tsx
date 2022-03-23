import React, { Component } from 'react';
import {Container} from 'reactstrap';
import { NavMenu } from './NavMenu';
import UserStore from "../stores/UserStore";

export class Layout extends Component<{ store: UserStore }> {
    static displayName = Layout.name;
    
    render () {
        return (
            <div>
                <NavMenu store={this.props.store} />
                
                
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
