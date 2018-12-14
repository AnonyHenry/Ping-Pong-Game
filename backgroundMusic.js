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

randomIndex = Math.floor(Math.random() * (songs.length - 1));
audio = document.createElement('audio');
audio.src = songs[randomIndex].src + '.mp3';
audio.autoplay = 'autoplay';
audio.loop = 'loop';
document.querySelector('header h1').textContent = songs[randomIndex].name;
document.body.append(audio);

let singerP = document.querySelector('#singer');
singerP.textContent = "Music by " + songs[randomIndex].artist;

let headerColors = [
    'rgba(255,0,0,0.7)',
    'rgb(255,255,0)',
    'rgba(0,255,0,0.7)',
    'rgb(0,255,255)',
    'rgba(0,0,255,0.7)',
    'rgb(255,0,255)'
];
header=document.querySelector('header');
header.style.backgroundColor=headerColors[Math.floor(Math.random()* headerColors.length-1)];