import { useEffect, useState } from 'react';
import Head from 'next/head';
import { loadDB } from '../lib/db';

function MainMap({ currentPosition, gpsTrack }) {
    const [isBrowser, setIsBrowser] = useState(false);
    const [gpsState, setGpsState] = useState([]);

    useEffect(() => {
        setIsBrowser(true);
        const db = loadDB();
        db.firestore().collection("gpsTracks")
      .limit(50)
      .onSnapshot(snapshot => {
        let newState = {
          posts: []
        };

        snapshot.forEach(function(doc) {
          newState.posts.push({
            id: doc.id,
            post: doc.data()
          });
        });
        setGpsState([newState]);

        })
      },[]);
    
    

    if (!isBrowser) {
        return null;
    }
    const MainMap = require('react-leaflet').Map;
    const TileLayer = require('react-leaflet').TileLayer;
    const Polyline = require('react-leaflet').Polyline;

    const {track} = gpsState.length > 0 && gpsState[0].posts[0].post;

    return (
        <div>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                />
            </Head>
            <MainMap center={ currentPosition } zoom={ 13 } >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                { gpsTrack && <Polyline color="red" positions={ track } /> }
            </MainMap>
        </div>
    )
}

export default MainMap;