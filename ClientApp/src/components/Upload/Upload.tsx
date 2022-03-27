import React from "react";
import UserStore from "../../stores/UserStore";
import UploadForm from './UploadForm';
import './Upload.scss';
import { Navigate } from "react-router-dom";

export default class Upload extends React.Component<{ store: UserStore }> {
    render() {
        if (Object.keys(this.props.store.user).length === 0) return <Navigate to="/login" />

        return (
            <div className="upload-form-wrapper">
                <h3>upload your track</h3>
                <UploadForm store={this.props.store} />
            </div>
        );
    }
}