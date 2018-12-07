let canvas, ctx, playrs, playrsCP, ball;
let currntPlayr = 0;
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
            console.log(canvas.h);
            console.log(this.h);
            console.log(this.steps);
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
        get speedX() {
            let rand = Math.random() * 2.3;
            while (rand < 1.7) {
                rand = Math.random() * 2.3;
            }
            console.log(rand);
            return rand;
        },
        get speedY() {
            let rand = Math.random() * 1.2;
            while (rand < 0.8) {
                rand = Math.random() * 2.3
            }
            console.log(rand);
            return rand;
        },
        get x() {
            return (canvas.w / 2) + this.stepsX;
        },
        get y() {
            return (canvas.h / 2) + this.stepsY;
        }
    }

    playrs.forEach(playr => {
        drawRect(playr)
    });
    drawCir(ball);
    canvas.dom.addEventListener('keypress', function (evt) {
        move(evt, playrs[currntPlayr]);
    });

}

function drawRect(playr) {
    ctx.save();
    console.log(playr.color);
    console.log(playr.x + " " + playr.y + " " + playr.w + " " + playr.h);
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