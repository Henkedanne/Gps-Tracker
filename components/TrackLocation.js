import { useState } from 'react';
import { addTrackData } from '../utils/addData';
import { loadDB } from '../lib/db';

let intervalID;
let gpsTrack = [];
const db = loadDB();

function TrackLocation({ pos, saveGpsTrack }) {
    const [buttonState, setButtonState] = useState(true)
    const handleClick = () => {
        if (!buttonState) {
            clearInterval(intervalID);
            setButtonState(!buttonState);
        } else {
            startTrack(pos)
            setButtonState(!buttonState);
        }

    }

    const handleSaveClick = () => {
        saveGpsTrack(gpsTrack);
        addTrackData(db, gpsTrack);
        gpsTrack = [];
    }

    const startTrack = (pos) => {
        intervalID = setInterval(() => {
            gpsTrack.push(pos);
            console.log(gpsTrack)
            console.log(intervalID)
        }, 1000)
    }

    return (
        <div>
            <button onClick={ () => { handleClick() } }>
                { buttonState ? 'Start Tracking' : ' Stop Tracking' }
            </button>

            { gpsTrack.length > 0 && <button onClick={ () => { handleSaveClick() } }>
                Save Track
            </button> }

        </div>

    )
}

export default TrackLocation;