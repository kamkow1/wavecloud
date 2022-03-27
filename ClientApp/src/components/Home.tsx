import React, {Component} from 'react';
import UserStore from "../stores/UserStore";
import {Navigate} from "react-router";
import axios from "axios";
import TrackModel from "../models/track.model";
import './Home.scss';
import AudioPlayer from "./AudioPlayer/AudioPlayer";

export class Home extends Component<{ store: UserStore }, { tracks: TrackModel[], playAudio: boolean }> {
    constructor(props: { store: UserStore }) {
        super(props);
        
        this.state = {
            tracks: [],
            playAudio: false
        };
    }

    async componentDidMount() {
        if (Object.keys(this.props.store.user).length === 0) return;

        let response = await axios.get('/api/track/all', {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem("TOKEN")
            }
        });

        this.setState({...this.state, tracks: response.data});
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render () {
        if (Object.keys(this.props.store.user).length === 0) return <Navigate to="/login" />;
        return (
            
            <div className="main-container">
                <div className="tracks-wrapper">
                    {this.state.tracks.map(track => {
                        return (
                            <div className="tracks-container" key={track.id}>
                                <div className="track border-bottom">
                                    <div className="icon">
                                        <AudioPlayer track={track} />
                                    </div>

                                    <div className="name">
                                        <div>{track.trackName}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
