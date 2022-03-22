import React, { Component } from 'react';
import UserStore from "../stores/UserStore";
import {Navigate} from "react-router";

export class Home extends Component<{ store: UserStore }> {
    static displayName = Home.name;
  
    render () {
        if (!sessionStorage.getItem('TOKEN')) return <Navigate to="/login" />;
        return (
            <div>
               
            </div>
        );
    }
}
