let songs = [
    {
        name: "Melody",
        src: "m"
    },
    {
        name: "Enna Sona",
        src: "es"
    },
    {
        name: "Despacito",
        src: "D"
    },

    {
        name: "Let her Go",
        src: "lhg"
    },
    {
        name: "Shape of You",
        src: 'soy'
    },
    {
        name: "I Took A Pill In Ibiza",
        src: "pill"
    },
];

randomIndex=Math.floor(Math.random()*(songs.length-1));
audio=document.createElement('audio');
audio.src=songs[randomIndex].src +'.mp3';
audio.autoplay='autoplay';
audio.loop='loop';
document.querySelector('header h1').textContent=songs[randomIndex].name;
document.body.append(audio);
