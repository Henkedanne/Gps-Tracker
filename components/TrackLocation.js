import { useState } from 'react';
import { addTrackData } from '../utils/addData';
import { loadDB } from '../lib/db';

let intervalID;
const gpsTrack = [];
const db = loadDB();

function TrackLocation({ pos, saveGpsTrack }) {
    const [buttonState, setButtonState] = useState(true)
    const handleClick = () => {
        if (!buttonState) {
            clearInterval(intervalID);
            saveGpsTrack(gpsTrack)

            addTrackData(db, gpsTrack);

            setButtonState(!buttonState);
        } else {
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