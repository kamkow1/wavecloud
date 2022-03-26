import React, { Component } from 'react';
import UserStore from "../stores/UserStore";
import {Navigate} from "react-router";
import axios from "axios";
import TrackModel from "../models/track.model";
import './Home.scss';

export class Home extends Component<{ store: UserStore }, { tracks: TrackModel[] }> {
    constructor(props: { store: UserStore }) {
        super(props);
        
        this.state = {
            tracks: []
        };
    }
    
    static displayName = Home.name;
    
    async componentDidMount() {
        let response = await axios.get('/api/track/all', {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem("TOKEN")
            }
        });
        
        this.setState({...this.state, tracks: response.data});
    }
    
    getDate = (date: Date): string => {
        let parsedDate = new Date(date);
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        
        
        return `${parsedDate.getDate()} ${monthNames[parsedDate.getMonth()]} ${parsedDate.getFullYear()}`;
    }

    render () {
        if (!sessionStorage.getItem('TOKEN')) return <Navigate to="/login" />;
        return (
            
            <div className="tracks-wrapper">
                {this.state.tracks.map(track => {
                    return (
                        <div className="tracks-container" key={track.id}>
                            <div className="track">
                                <div className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor"
                                         className="bi bi-music-note-beamed" viewBox="0 0 16 16">
                                        <path
                                            d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
                                        <path fillRule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
                                        <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"/>
                                    </svg>
                                </div>
                                <div className="track-date">posted: {this.getDate(track.uploadDate as Date)}</div>
                                <div className="track-title">{track.trackName}</div>
                            </div>
                            <hr className="separator" />
                        </div>
                    );
                })}
            </div>
        );
    }
}
