import { useEffect, useState } from 'react';
import Head from 'next/head';
import { loadDB } from '../lib/db';
import { reduceTrack } from '../utils/helpers';

const db = loadDB();
function MainMap({ currentPosition, gpsTrack }) {
    const [isBrowser, setIsBrowser] = useState(false);
    const [gpsTrackState, setTrackState] = useState([]);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    if (!isBrowser) {
        return null;
    }

    const MainMap = require('react-leaflet').Map;
    const TileLayer = require('react-leaflet').TileLayer;
    const Polyline = require('react-leaflet').Polyline;

    const { track } = gpsTrackState?.[0]?.posts?.[0]?.post || {};
    const centerMap = [currentPosition.lat, currentPosition.lon];
    const newTrack = track && reduceTrack(track);
    const activeTrack = [];

    return (
        <div>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                />
            </Head>
            <MainMap center={ centerMap[0] != undefined && centerMap } zoom={ 13 } >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                { activeTrack && <Polyline color="red" positions={ activeTrack } /> }
            </MainMap>

        </div>
    )
}

export default MainMap;