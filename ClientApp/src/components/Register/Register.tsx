import React from "react";
import UserStore from "../../stores/UserStore";
import RegisterForm from "./RegisterForm";
import './Register.scss';

export default class Register extends React.Component<{ store: UserStore }> {
    render () {
        return (
            <div className="login-form-wrapper">
                <RegisterForm store={this.props.store} />
            </div>
        );
    }
}