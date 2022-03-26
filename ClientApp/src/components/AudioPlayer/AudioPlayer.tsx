import React from "react";
import axios from "axios";
import TrackModel from "../../models/track.model";
import {Spinner} from "reactstrap";

export default class AudioPlayer extends React.Component<{ track: TrackModel }, { playAudio: boolean }> {
    constructor(props: { track: TrackModel }) {
        super(props);
        
        this.state = {
            playAudio: false
        };
    }

    getDate = (date: Date): string => {
        let parsedDate = new Date(date);
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];


        return `${parsedDate.getDate()} ${monthNames[parsedDate.getMonth()]} ${parsedDate.getFullYear()}`;
    }

    toggleAudio = async (trackId: number) => {
        console.log(this.state.playAudio)
        this.setState({...this.state, playAudio: !this.state.playAudio});
        let audio = new Audio(`/api/track/download?trackId=${trackId}`);

        if (this.state.playAudio) {
            await audio.play();
        } else {
            await audio.pause();
        }
    }
    
    render () {
        if (this.state.playAudio) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70"
                     fill="currentColor" className="bi bi-pause-fill" viewBox="0 0 16 16"
                     onClick={() => this.toggleAudio(this.props.track.id!)}>
                    <path
                        d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                </svg>
            )
        }
        else {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70"
                     fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16"
                     onClick={() => this.toggleAudio(this.props.track.id!)}>
                    <path
                        d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                </svg>
            )   
        }
    }
}