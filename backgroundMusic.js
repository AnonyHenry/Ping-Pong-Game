let songs = [
    {
        name: "Melody",
        src: "m",
        artist: "John Becker"
    },
    {
        name: "Enna Sona",
        src: "es",
        artist: "Arijit Singh"
    },
    {
        name: "Despacito",
        src: "D",
        artist: "Luis Fonsi"
    },

    {
        name: "Let her Go",
        src: "lhg",
        artist: "Passenger"
    },
    {
        name: "Shape of You",
        src: 'soy',
        artist: "Ed Sheeran"
    },
    {
        name: "I Took A Pill In Ibiza",
        src: "pill",
        artist: 'Mike Posner'
    },
];

randomIndex=Math.floor(Math.random()*(songs.length-1));
audio=document.createElement('audio');
audio.src=songs[randomIndex].src +'.mp3';
audio.autoplay='autoplay';
audio.loop='loop';
document.querySelector('header h1').textContent=songs[randomIndex].name;
document.body.append(audio);

let singerP=document.querySelector('#singer');
singerP.textContent="Song by "+songs[randomIndex].artist;