export const reduceTrack = (track) => {
    return track.reduce((acc, cur) => {
        acc.push([cur.lat, cur.lon])
        return acc;
    }, [])
}