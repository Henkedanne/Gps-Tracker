import TrackLocation from '../components/TrackLocation';
import MainMap from '../components/MainMap';
import { useState, useEffect } from 'react';

function Index() {
    const [currentPosition, setCurrentPosition] = useState(["", ""])
    const [gpsTrack, setGpsTrack] = useState(null)
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.watchPosition((pos) => {
                setCurrentPosition([
                    pos.coords.latitude, pos.coords.longitude
                ])
            })
        }
    }, [])
    const saveGpsTrack = (gpsTrack) => {
        console.log('saveGpsTrack', gpsTrack)
        setGpsTrack(gpsTrack);
    }

    return (
        <div>
            <MainMap currentPosition={ currentPosition } gpsTrack={ gpsTrack } />
            <TrackLocation pos={ currentPosition } saveGpsTrack={ saveGpsTrack } />
        </div>
    )
}

export default Index;