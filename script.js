let players = [document.getElementById('player-0'),
document.getElementById('player-0')];
let ball = document.getElementById('ball');
currentPlayer = 0;
document.addEventListener('keypress', move);

function move(evt) {
    console.log(evt);
    players[currentPlayer].style.top = parseInt(players[currentPlayer].style.top);

    if (evt.key == "ArrowUp") {
        console.log('arrowup')
        if (players[currentPlayer].style.top > 0)
            players[currentPlayer].style.top+=5;
        if (players[currentPlayer].style.top < 0)
            players[currentPlayer].style.top = 0;
    }
    if (evt.key == "ArrowDown") {
        if (players[currentPlayer].style.top > 0)
            players[currentPlayer].style.top+=5;
        if (players[currentPlayer].style.top < 0)
            players[currentPlayer].style.top = 0;
    }
}