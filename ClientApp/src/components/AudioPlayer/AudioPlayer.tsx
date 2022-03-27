import React from "react";
import TrackModel from "../../models/track.model";
import AudioSpectrum from 'react-audio-spectrum2';
import { Collapse } from "reactstrap";
import './AudioPlayer.scss';

export default class AudioPlayer extends React.Component<
{ track: TrackModel }, 
{ playAudio: boolean, audio: HTMLAudioElement, }> {
    constructor(props: { track: TrackModel }) {
        super(props);
        
        this.state = {
            playAudio: false,
            audio: new Audio()
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
        this.setState({...this.state, playAudio: !this.state.playAudio});
        
        if (!this.state.playAudio) {
            this.state.audio.src = `/api/track/download?trackId=${trackId}`;
            await this.state.audio.play();

        } else {
            this.state.audio.pause();
        }
    }
    
    render () {
        if (this.state.playAudio) {
            return (
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70"
                            fill="currentColor" className="bi bi-pause-fill" viewBox="0 0 16 16"
                            onClick={() => this.toggleAudio(this.props.track.id!)}>
                        <path
                            d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                    </svg>

                    <div className="track-date">posted: {this.getDate(this.props.track.uploadDate as Date)}</div>
                    <div className="track-title">{this.props.track.trackName}</div>

                    <div className="waveform">
                        <AudioSpectrum 
                            audioEle={this.state.audio}
                            id="audio-id"
                            width={1260}
                            height={300}
                            audioId={undefined}
                            capColor={"#c75634"}
                            capHeight={5}
                            meterWidth={10}
                            meterCount={300}
                            gap={5}
                            meterColor={[
                                {stop: 0, color: '#50a6ab'},
                                {stop: 0.5, color: '#40c3c9'},
                                {stop: 1, color: '#50a6ab'}
                            ]}
                            />
                    </div>
                </div>
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