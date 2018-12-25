let songs = [
    {
		name:"Believer",
		src: "believer",
		artist: "Imagine Dragons"
    },
    {
		name:"Chahun Main Ya Na",
		src: "chahun_main_ya_na",
		artist: "Arijit Singh"
	},
	{
		name:"Happier",
		src: "happier",
		artist: "Ed Sheeran"
	},	
	{
		name:"Laudy Daudy",
		src:"laudy",
		artist:"Prntz"
	},
	{
		name:"Mai Tera Boyfriend",
		src:"mai_tera_boyfriend",
		artist:"Arijit Singh"
	},
	{
		name:"Perfect",
		src:"perfect",
		artist:"Ed Sheeran"
	},
	{
		name:"Sanam Re",
		src:"sanam",
		artist:"Arijit Singh and Mithoon"
	},
	{
		name:"Taki Taki",
		src:"taki",
		artist:"DJ Snake, Slena Gomez, Ozuna and Cardi B"
	},    
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
        name: "Let Me Love You",
        src: "lmg",
        artist: "Justin Bieber and DJ Snake"
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
let audio, randomIndex;
function backgroundMusic() {
    if(audio!==undefined){
        document.body.removeChild(audio);
    }
    randomIndex = Math.floor(Math.random() * (songs.length - 1));
    audio = document.createElement('audio');
    audio.src = songs[randomIndex].src + '.mp3';
    audio.autoplay = 'autoplay';
    audio.loop = 'loop';
    document.querySelector('header h1').textContent = songs[randomIndex].name;
    document.body.append(audio);

    let singerP = document.querySelector('#singer');
    singerP.textContent = "Song by " + songs[randomIndex].artist;

    let headerColors = [
        'rgba(255,0,0,0.7)',
        'rgb(128,128,0)',
        'rgba(0,255,0,0.7)',
        'rgb(0,255,255)',
        'rgba(0,0,255,0.7)',
        'rgb(255,0,255)'
    ];
    header = document.querySelector('header');
    header.style.backgroundColor = headerColors[Math.floor(Math.random() * headerColors.length - 1)];
}

backgroundMusic();
