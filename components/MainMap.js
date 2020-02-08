import { useEffect, useState } from 'react';
import Head from 'next/head';

function MainMap({ currentPosition, gpsTrack }) {
    const [isBrowser, setIsBrowser] = useState(false);
    console.log(currentPosition)
    useEffect(() => {
        setIsBrowser(true);
    })
    if (!isBrowser) {
        return null;
    }

    const MainMap = require('react-leaflet').Map;
    const TileLayer = require('react-leaflet').TileLayer;
    const Polyline = require('react-leaflet').Polyline;


    return (
        <div>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                />
            </Head>
            <MainMap style={ { height: "500px" } } center={ currentPosition } zoom={ 13 } >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                { gpsTrack && <Polyline color="red" positions={ gpsTrack } /> }
            </MainMap>
        </div>
    )
}

export default MainMap;