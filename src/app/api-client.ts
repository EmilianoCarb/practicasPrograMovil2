import { ArtistResource } from "./types/artist";

const API_KEY = '6ddfcb4d717e84e193588fee0478f9a6';
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=${API_KEY}&format=json`


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