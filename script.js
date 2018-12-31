let canvas, ctx, playrs, playrsCP, ball;
let currntPlayr = 0;
let ballInterval;
let keyEvent, clickEvent;
let noMusic=false;
let songs = [
    {
        name: "Believer",
        src: "believer",
        artist: "Imagine Dragons"
    },
    {
        name: "Chahun Main Ya Na",
        src: "chahun_main_ya_na",
        artist: "Arijit Singh"
    },
    {
        name: "Happier",
        src: "happier",
        artist: "Ed Sheeran"
    },
    {
        name: "Laudy Daudy",
        src: "laudy",
        artist: "Prntz"
    },
    {
        name: "Mai Tera Boyfriend",
        src: "mai_tera_boyfriend",
        artist: "Arijit Singh"
    },
    {
        name: "Perfect",
        src: "perfect",
        artist: "Ed Sheeran"
    },
    {
        name: "Sanam Re",
        src: "sanam",
        artist: "Arijit Singh and Mithoon"
    },
    {
        name: "Taki Taki",
        src: "taki",
        artist: "DJ Snake, Slena Gomez, Ozuna and Cardi B"
    },
    {
        name: "Enna Sona",
        src: "es",
        artist: "Arijit Singh"
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
    {
        name: "Tujhme Rab Dikhta Hai",
        src:"rab",
        artist: "Roop Kumar Rathod"
    },
    {
        name: "Photograph",
        src:"photo",
        artist: "Ed Sheeran"
    },
    {
        name: "Magenta Riddim",
        src:"magenta",
        artist:"DJ Snake"
    },
    {
        name: "Love Yourself",
        src:"love_yourself",
        artist: "Justin Bieber"
    },
    {
        name: "Jashan E Bahara",
        src:"jashan",
        artist: "Javed Ali"
    },
    {
        name:"Dil Diyaan Gallan",
        src:"gallan",
        artist:"Atif Aslam"
    },
    {
        name:"Bom Diggy Diggy",
        src:"bom",
        artist:"Zack Knight, Jasmin Walia"
    }
];
let audio, randomIndex;
let playPauseBtn;
let gameOverDOM;
window.onload = function init() {
    canvas = {
        dom: document.getElementById('playGround'),
        get w() {
            return parseInt(getComputedStyle(this.dom).width);
        },
        get h() {
            return parseInt(getComputedStyle(this.dom).height);
        }
    }
    ctx = canvas.dom.getContext('2d');
    playrsCP = {
        get y() {
            return (canvas.h - this.h) / 2 + this.steps;
        },
        w: 27,
        h: 140,
        speed: 4
    };
    playrs = [
        {
            color: '#0d0',
            get x() {
                return 0;
            },
            steps: 0,
            __proto__: playrsCP
        },
        {
            color: '#00d',
            get x() {
                return canvas.w - this.w;
            },
            steps: 0,
            __proto__: playrsCP
        }
    ];
    ball = {
        color: 'red',
        r: 15,
        stepsX: 0,
        stepsY: 0,
        negateSpeedX: false,
        negateSpeedY: false,
        get speedX() {
            return (this.negateSpeedX) ? -1.75 : 1.75;
        },
        get speedY() {
            return (this.negateSpeedY) ? -1.75 : 1.75;
        },
        get x() {
            return (canvas.w / 2) + this.stepsX;
        },
        get y() {
            return (canvas.h / 2) + this.stepsY;
        },
        init: function () {
            while (true) {
                this.stepsX = Math.random() * -1;
                this.stepsY = Math.random() * canvas.h - (this.r * 2) - (canvas.h / 2) - this.r;
                if (this.stepsX < 0) {
                    this.negateSpeedX = true;
                }
                if (this.stepsY < 0) {
                    this.negateSpeedY = true;
                }
                //Temporary Ball outside canvas bug fix
                if (this.y >= this.r) {
                    break;
                }
            }
        }
    }
    ball.init();
    playrs.forEach(playr => {
        drawRect(playr)
    });
    drawCir(ball);

    keyEvent = function (evt) {
        movePlayr(evt, playrs[currntPlayr]);
    };

    playPauseBtn = document.querySelector("#playPauseBtn");
    gameOverDOM = document.querySelector("#GameOver");
    createSongsDatalist();
    document.body.addEventListener('keypress', keyEvent);
    //Mobile Compatibility
    clickEvent = function (evt) {
        screenTouchMovePlayrs(evt, playrs[currntPlayr]);
    }
    canvas.dom.addEventListener('click', clickEvent);
    setTimeout(function () {
        ballInterval = setInterval(moveBall, 1000 / 55);
    }, 4000);
    if(noMusic==false){
    backgroundMusic();
    }
}

function movePlayr(evt, playr, dir) {
    let speed;
    if (dir == "UP" || dir == "DOWN") speed = 17;
    else speed = playr.speed;
    if (evt.key === "ArrowUp" || dir === "UP") {
        ctx.clearRect(playr.x, playr.y, playr.w, playr.h);
        playr.steps -= speed;
        if (playr.y < 0) {
            while (true) {
                playr.steps++;
                if (playr.y === 0) {
                    break;
                }
            }
        }

        drawRect(playr);
    }
    if (evt.key === "ArrowDown" || dir === "DOWN") {
        ctx.clearRect(playr.x, playr.y, playr.w, playr.h);
        playr.steps += speed;
        if (playr.y > (canvas.h - playr.h)) {
            while (true) {
                playr.steps--;
                if (playr.y === (canvas.h - playr.h)) {
                    break;
                }
            }
        }

        drawRect(playr);
    }
}

function moveBall() {
    if (ball === null) {
        return 0;
    }
    ctx.fillStyle = 'white';
    ctx.arc(ball.x, ball.y, ball.r + 0.7, 0, Math.PI * 2);
    ctx.fill();
    ball.stepsX += ball.speedX;
    ball.stepsY += ball.speedY;

    //Checking if ball hit the area of player-0
    if (ball.stepsX < -(canvas.w / 2 - playrsCP.w - ball.r)) {
        if (ballIsHit()) {
            ball.stepsX = -(canvas.w / 2 - playrsCP.w - ball.r);
            currntPlayr = Number(!currntPlayr);
            //testCollision(ball, playrs[0]);
            ball.negateSpeedX = false;
        }
    }
    //Checking if ball hit the area of player-1
    if (ball.stepsX > (canvas.w / 2 - playrsCP.w - ball.r)) {
        if (ballIsHit()) {
            ball.stepsX = canvas.w / 2 - playrsCP.w - ball.r;
            //testCollision(ball, playrs[1]);
            currntPlayr = Number(!currntPlayr);
            ball.negateSpeedX = true;
        }
    }
    //Checking if Ball hit the bottom of canvas
    if (ball.stepsY > canvas.h / 2 - ball.r) {
        ball.stepsY = canvas.h / 2 - ball.r;
        ball.negateSpeedY = true;
    }
    //Checking if Ball hit the top of canvas
    if (ball.stepsY < -(canvas.h / 2) + ball.r) {
        ball.stepsY = -(canvas.h / 2) + ball.r;
        ball.negateSpeedY = false;
    }
    //Checking if Ball went Beyond the width of canvas in either direction
    if (ball.x < 0 - ball.r || ball.x > canvas.w + ball.r) {
        ball = null;
        gameOver();
        return 0;
    }
    drawCir(ball);


}
function ballIsHit() {
    if (ball.y > playrs[currntPlayr].y && ball.y < playrs[currntPlayr].y + playrs[currntPlayr].h) {
        return true;
    }
    return false;
}
function drawRect(playr) {
    ctx.save();
    ctx.fillStyle = playr.color;
    ctx.fillRect(playr.x, playr.y, playr.w, playr.h);
    ctx.restore();
}
function drawCir(ball) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = ball.color;
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}
function gameOver() {
    gameOverDOM.classList.remove('d-none');
    ctx.clearRect(0, 0, canvas.w, canvas.h);
    document.body.removeEventListener('keypress', keyEvent);
    canvas.dom.removeEventListener('click', clickEvent);

    ball = null;
    playrs = null;
    playrsCP = null;
    canvas = null;
    ctx = null;

    clearInterval(ballInterval);
}
function reset() {
    gameOverDOM.classList.add('d-none');
    currntPlayr = 0;
    noMusic=true;
    window.onload();
    noMusic=false;
}
function screenTouchMovePlayrs(evt, cP) {
    headerHeight = parseInt(getComputedStyle(document.querySelector('header')).height);
    if (evt.clientY - headerHeight < (canvas.h / 2)) {
        movePlayr(evt, cP, "UP");
        return 0;
    }
    movePlayr(evt, cP, "DOWN");
}





//Music Part

function backgroundMusic(songIndex) {
    console.log('backgroundMusic')
    if (audio !== undefined) {
        document.body.removeChild(audio);
    }
    if (songIndex===undefined) randomIndex = Math.floor(Math.random() * (songs.length - 1));
    else randomIndex=songIndex;
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

    if (playPauseBtn.classList.contains('fa-play')) {
        playPauseBtn.classList.remove('fa-play');
        playPauseBtn.classList.add('fa-pause');
    }

}


function playPause() {
    console.log("PlayPause");
    if (playPauseBtn.classList.contains("fa-pause")) {
        playPauseBtn.classList.remove("fa-pause");
        audio.pause();
        playPauseBtn.classList.add("fa-play");
    } else {
        playPauseBtn.classList.remove("fa-play");
        audio.play();
        playPauseBtn.classList.add("fa-pause");
    }
}
 function createSongsDatalist(){
    let datalist=document.createElement('datalist');
    datalist.id="songsList";
    let option;
    let i=0;
    while(i<songs.length){
        option=document.createElement('option');
        option.value=songs[i].name;
        option.textContent=songs[i].name;
        datalist.append(option);
        i++;
    }
    gameOverDOM.append(datalist);
 }

 function songSelected(){
     let input=document.querySelector('#songSelectInput').value;
     console.log(input);
    
     songs.forEach(
         function(song, index){
            if(song.name===input){
                backgroundMusic(index);
            }
         }
     )
 }