import { renderSearchMusic, renderSongs } from "./ui.js";


const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'c0b6898532msh330e85b90496181p1d3720jsnc7b28dc873b4',
        'x-rapidapi-host': 'shazam.p.rapidapi.com'
    }
};

const optionsTop = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'c0b6898532msh330e85b90496181p1d3720jsnc7b28dc873b4',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com'
    }
}


export class API {
    constructor() //constructor, sadece 1 kere calisir
    {
        this.songs = [];
    }


    async searchMusic(query) {
        try {
            const res = await fetch(
                `https://shazam.p.rapidapi.com/search?term=${query}=&locale=tr-TR&limit=5`,
                options
            );
            const data = await res.json();
            let newData = data.tracks.hits;
            newData = newData.map((song) => ({ ...song.track }));
            this.songs = newData;

            renderSearchMusic(this.songs);
        } catch (err) {
            console.log(err);
        }
    }

    async topPopular() {
        const url =
            "https://spotify23.p.rapidapi.com/recommendations/?limit=20&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry";
        try {

            const response = await fetch(url, optionsTop);
            const result = await response.json();
            this.songs = result.tracks;
            renderSongs(this.songs);
        } catch (error) {
            console.log(error);
        }
    }
}


