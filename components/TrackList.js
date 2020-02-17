import firebase from 'firebase/app';
import 'firebase/firestore';

function TrackList({ tracks }) {
    console.log('tracks', tracks)
    const trackslist = tracks?.posts;
    console.log(trackslist, 'trackslist')
    return (
        <div>
            List of tracks
            <ul>
                { trackslist.map((track) => {
                    return (
                        <li>
                            { track.id }
                        </li>
                    )
                }) }
            </ul>
        </div>
    )
}

export default TrackList;