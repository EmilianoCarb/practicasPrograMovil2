import { ArtistResource } from "./types/artist";

const API_KEY = process.env.EXPO_PUBLIC_LASTFM_API_KEY;
const URL = `${process.env.EXPO_PUBLIC_LASTFM_API_URL}?method=geo.gettopartists&country=spain&api_key=${API_KEY}&format=json`;


function getMusicData() {
  return fetch(`${URL}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
.then(response => response.json())
.then(data => data.topartists.artist)
.then(artists => artists.map((artist: ArtistResource) => {
  return {
    id: artist.mbid,
    name: artist.name,
    image: artist.image[0]['#text']
  }
}))
}

export {getMusicData}