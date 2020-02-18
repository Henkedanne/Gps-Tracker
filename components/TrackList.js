import firebase from 'firebase/app';
import 'firebase/firestore';

function TrackList({ tracks }) {
    console.log('tracks', tracks)
    const trackslist = tracks?.posts;
    console.log(trackslist, 'trackslist')

    const handleClick = (id) => {
        console.log('id', id)
    }

    return (
        <div>
            List of tracks
            <ul>
                { trackslist.map((track) => {
                    return (
                        <li className="list" onClick={ () => { handleClick(track.id) } }>
                            { track.id }
                        </li>
                    )
                }) }
            </ul>
        </div>
    )
}

export default TrackList;