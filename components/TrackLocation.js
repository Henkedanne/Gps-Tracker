import { useState } from 'react';
import {addTrackData} from '../utils/addData';
import { loadDB } from '../lib/db';

let intervalID;
const gpsTrack = [];
const db = loadDB();
 
function TrackLocation({ pos, saveGpsTrack }) {
    const [buttonState, setButtonState] = useState(true)
    const handleClick = () => {
        if (!buttonState) {
            console.log('stop')
            console.log(intervalID)
            clearInterval(intervalID);
            console.log(gpsTrack)
            saveGpsTrack(gpsTrack)

            addTrackData(db, gpsTrack);

            setButtonState(!buttonState);
        } else {
            console.log('start')
            startTrack(pos)
            setButtonState(!buttonState);
        }

    }
    const startTrack = (pos) => {
        intervalID = setInterval(() => {
            gpsTrack.push(pos);
            console.log(gpsTrack)
            console.log(intervalID)
        }, 1000)
    }

    return (
        <button onClick={ () => { handleClick() } }>
            { buttonState ? 'Start Tracking' : ' Stop Tracking' }
        </button>

    )
}

export default TrackLocation;