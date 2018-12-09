let canvas, ctx, playrs, playrsCP, ball;
let currntPlayr = 0;
window.onload =function init() {
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
            color: '#bb7777',
            get x() {
                return 0;
            },
            steps: 0,
            __proto__: playrsCP
        },
        {
            color: '#7777bb',
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
            return (this.negateSpeedX) ? -1 : 1;
        },
        get speedY() {
            return (this.negateSpeedY) ? -1 : 1;
        },
        get x() {
            return (canvas.w / 2) + this.stepsX;
        },
        get y() {
            return (canvas.h / 2) + this.stepsY;
        },
        init: function () {
            this.stepsX = Math.random() * -1;
            this.stepsY = Math.random() * canvas.h - (ball.r * 2) - (canvas.h / 2) - ball.r;
            if (this.stepsX < 0) {
                this.negateSpeedX = true;
            }
            if (this.stepsY < 0) {
                this.negateSpeedY = true;
            }
        }
    }
    ball.init();
    playrs.forEach(playr => {
        drawRect(playr)
    });
    drawCir(ball);
    document.body.addEventListener('keypress', function (evt) {
        movePlayr(evt, playrs[currntPlayr]);
    });
    //Mobile Compatibility
    canvas.dom.addEventListener('click', function(evt){
        headerHeight=parseInt(getComputedStyle(document.querySelector('header')).height);
        if(evt.clientY-headerHeight < (canvas.h/2)){
            movePlayr(evt, playrs[currntPlayr], "UP");
            return 0;
        }
        movePlayr(evt, playrs[currntPlayr], "DOWN");

    });
    setTimeout(function(){
        setInterval(moveBall, 1000 / 60);
    }, 3000);
    


}

function movePlayr(evt, playr, dir) {
    let speed;
    if(dir=="UP" || dir=="DOWN") speed=15;
    else speed=playr.speed;

    if (evt.key === "ArrowUp" || dir==="UP") {
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
    if (evt.key === "ArrowDown" || dir==="DOWN") {
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
    if(ball===null){
        return 0;
    }
    ctx.clearRect(ball.x - ball.r, ball.y - ball.r, ball.r * 2, ball.r * 2);
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
    if (ball.x< 0-ball.r || ball.x>canvas.w+ball.r){
        ball=null;
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
    document.getElementById('GameOver').classList.remove('d-none');
}