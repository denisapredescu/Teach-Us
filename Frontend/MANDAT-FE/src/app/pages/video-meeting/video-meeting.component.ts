import { AfterViewInit, Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

declare var JitsiMeetExternalAPI: any;

@Component({
    selector: 'app-video-meeting',
    templateUrl: './video-meeting.component.html',
    styleUrls: ['./video-meeting.component.scss']
})
export class VideoMeetingComponent implements OnInit, AfterViewInit {
  domain: string = "meet.jit.si"; // For self hosted use your domain
    room: "vpaas-magic-cookie-4f36a486b2994a919657f431528c3daa/SampleAppJointMentionsReferWorldwide";
    options: any;
    api: any;
    user: any;

    isAudioMuted = false;
    isVideoMuted = false;

    constructor(
        private router: Router
    ) { }

    nume: string | null;

    ngOnInit(): void {
        this.nume = localStorage.getItem("Nume") !== null ? localStorage.getItem("Nume") : sessionStorage.getItem("Nume");
    
        var randomWords = require('random-words');
        this.room = randomWords({ exactly: 3, join: '-' }); // Set your room name
        this.user = {
            name: this.nume// Set your username
        }
        let text =  document.getElementsByTagName("text");
        text[0].innerHTML = this.nume !== null ? this.nume : '';
    }

    ngAfterViewInit(): void {
        this.options = {
            roomName: this.room,
            width: 1475,
            height: 650,
            configOverwrite: { prejoinPageEnabled: false },
            interfaceConfigOverwrite: {
                // overwrite interface properties
            },
            parentNode: document.querySelector('#jitsi-iframe'),
            userInfo: {
                displayName: this.user.name
            }
        }

        this.api = new JitsiMeetExternalAPI(this.domain, this.options);

         // Event handlers
        this.api.addEventListeners({
            readyToClose: this.handleClose,
            participantLeft: this.handleParticipantLeft,
            participantJoined: this.handleParticipantJoined,
            videoConferenceJoined: this.handleVideoConferenceJoined,
            videoConferenceLeft: this.handleVideoConferenceLeft,
            audioMuteStatusChanged: this.handleMuteStatus,
            videoMuteStatusChanged: this.handleVideoStatus
        });
    }

    handleClose = () => {
        console.log("handleClose");
    }

    handleParticipantLeft = async (participant: any) => {
        console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
        const data = await this.getParticipants();
    }

    handleParticipantJoined = async (participant: any) => {
        console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
        const data = await this.getParticipants();
    }

    handleVideoConferenceJoined = async (participant: any) => {
        console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
        const data = await this.getParticipants();
    }

    handleVideoConferenceLeft = () => {
        console.log("handleVideoConferenceLeft");
        this.router.navigate(['/thank-you']);
    }

    handleMuteStatus = (audio: any) => {
        console.log("handleMuteStatus", audio); // { muted: true }
    }

    handleVideoStatus = (video: any) => {
        console.log("handleVideoStatus", video); // { muted: true }
    }

    getParticipants() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.api.getParticipantsInfo()); // get all participants
            }, 500)
        });
    }
    
    executeCommand(command: string) {
        this.api.executeCommand(command);;
        if(command == 'hangup') {
            this.router.navigate(['/thank-you']);
            return;
        }

        if(command == 'toggleAudio') {
            this.isAudioMuted = !this.isAudioMuted;
        }

        if(command == 'toggleVideo') {
            this.isVideoMuted = !this.isVideoMuted;
        }
    }
}
