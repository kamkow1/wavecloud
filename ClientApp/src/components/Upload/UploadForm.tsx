import React, {ChangeEvent} from "react";
import UserStore from "../../stores/UserStore";
import './UploadForm.scss';
import axios from "axios";

export default class UploadForm extends React.Component<{ store: UserStore }, { title: string, file: File }> {
    constructor(props: { store: UserStore }) {
        super(props);
        
        this.state = {
            title: '',
            file: {} as File
        };
    }
    
    handleSubmit = () => {
        const formData = new FormData();
        formData.append('file',  this.state.file, this.state.file?.name);
        
        axios.post(`/api/track/upload?fileName=${this.state.title}&userId=${this.props.store.user.id}`, formData,
            {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem("TOKEN")
                }
            });
    }
    
    handleFileChange = (e: ChangeEvent) => {
        this.setState({...this.state, file: (e.target as HTMLInputElement).files![0] as File});
        console.log(this.state);
    }
    
    render () {
        return (
            <div className="form-wrapper">
                <div className="form-group">
                    <label className="control-label" htmlFor="title">track title</label>
                    <input className="form-control" id="title" placeholder="track title" 
                        onChange={(e: ChangeEvent) => this.setState({...this.state, title: (e.target as HTMLInputElement).value})}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="title">audio file</label>
                    <input className="form-control" id="title" type="file" 
                        onChange={this.handleFileChange} 
                    />
                </div>
                
                <button className="btn btn-primary" onClick={this.handleSubmit}>
                    upload
                </button>
            </div>
        );
    }
}