import React from "react";
import UserStore from "../../stores/UserStore";
import LoginForm from "./LoginForm";
import './Login.scss';

export default class Login extends React.Component<{ store: UserStore }> {
    render () {
        return (
            <div className="login-form-wrapper">
                <LoginForm store={this.props.store} />
            </div>
        );
    }
}