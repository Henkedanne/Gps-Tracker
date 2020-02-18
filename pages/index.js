import TrackLocation from '../components/TrackLocation';
import MainMap from '../components/MainMap';
import { useState, useEffect } from 'react';
import { loadDB } from '../lib/db';
import TrackList from '../components/TrackList';

function Index({ tracks }) {
    const [currentPosition, setCurrentPosition] = useState({})
    const [gpsTrack, setGpsTrack] = useState(null)
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.watchPosition((pos) => {
                setCurrentPosition({
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude
                })
            })
        }
    }, [])

    const saveGpsTrack = (gpsTrack) => {
        console.log('saveGpsTrack', gpsTrack)
        setGpsTrack(gpsTrack);
    }

    console.log(currentPosition);
    console.log(tracks, 'tracks from index')
    return (
        <div>
            <MainMap currentPosition={ currentPosition } gpsTrack={ gpsTrack } />
            <TrackLocation pos={ currentPosition } saveGpsTrack={ saveGpsTrack } />
            <TrackList tracks={ tracks } />
        </div>
    )
}

Index.getInitialProps = async () => {
    return loadDB().firestore().collection("gpsTracks")
        .get()
        .then((snapshot) => {
            let data = {
                posts: []
            };
            snapshot.forEach(function (doc) {
                data.posts.push({
                    id: doc.id,
                    post: doc.data()
                });
            });
            return { tracks: data }
        });
}

export default Index;