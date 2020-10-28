/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastRoll, lastRoll2, winningScore;

init();
function init(){
    gamePlaying = true;
    scores = [0, 0];
    roundScore = 0;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
    document.querySelector('#score-0').textContent = scores[0];
    document.querySelector('#score-1').textContent = scores[1];
    document.querySelector('#current-0').textContent = roundScore;
    document.querySelector('#current-1').textContent = roundScore;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    activePlayer = 0;
    winningScore = 100;
    document.getElementById('winning-score').value = winningScore;
}
    

document.querySelector('.btn-roll').addEventListener('click', function () {
if(gamePlaying){
    let dice = Math.floor((Math.random() * 6) + 1);
    let dice2 = Math.floor((Math.random() * 6) + 1);
    if((dice === 6 && lastRoll === 6) || (dice2 === 6 && lastRoll2 === 6))
    scores[activePlayer] = 0;

    lastRoll = dice;
    lastRoll2 = dice2;
    document.querySelector('.dice').style.display = 'block';
    document.querySelector('.dice-2').style.display = 'block';
    // document.querySelector('.dice').style.cssText = 
    // 'animation:shake 0.82s; transform:translate3d(0,0,0);';
    document.querySelector('.dice').src = 'dice-'+dice+'.png';
    document.querySelector('.dice-2').src = 'dice-'+dice2+'.png';
    (dice === 1 || dice2 === 1)  ? roundScore = 0 : roundScore += (dice + dice2);
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
    roundScore === 0 ? activePlayer === 1 ? activePlayer = 0 : activePlayer = 1 : null;
    document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
}});
document.querySelector('.btn-hold').addEventListener('click', function () {
    if(gamePlaying){
        winningScore = document.getElementById('winning-score').value;
        scores[activePlayer] += roundScore;
        if(scores[activePlayer] >= winningScore){
            document.getElementById('name-'+activePlayer).textContent = 'WINNER!'
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice-2').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            gamePlaying = false;
        } else {
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            roundScore = 0;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
            activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
            document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
        }
}});
document.querySelector('.btn-new').addEventListener('click', init);


 























