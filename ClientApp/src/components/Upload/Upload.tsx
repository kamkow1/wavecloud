import React from "react";
import UserStore from "../../stores/UserStore";
import UploadForm from './UploadForm';
import './Upload.scss';

export default class Upload extends React.Component<{ store: UserStore }> {
    render() {
        return (
            <div className="upload-form-wrapper">
                <h3>upload your track</h3>
                <UploadForm store={this.props.store} />
            </div>
        );
    }
}