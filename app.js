/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
    var scores, roundScore, activePlayer, gamePlaying, rolledSix, scoreLimit = 100;
    init();
    

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {

    
    // random number.
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    // var dice = 6;
    console.log('Die 1 = '+ dice);
    console.log('Die 2 = '+ dice2);

    // Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    dice2DOM = document.querySelector('.dice2');
    dice2DOM.style.display = 'block';
    dice2DOM.src = 'dice-' + dice2 + '.png';

    // record if a player has rolled a 6
    // if the next roll is 6 then change everything to 0
    // if the next roll is not 6 then add the score and 


    //Update the round score IF the rolled number was NOT a 1
    if (dice !== 1 && dice2 !== 1) {
        // Add score
        roundScore += dice + dice2;
        
        // if the dice rolls 6 store in var
        if ((dice === 6 || dice2 === 6 ) && rolledSix === false){
            // store the rolled value into a variable
            rolledSix = true;
            // if a 6 has been rolled on previous throw then reset scores and toggle player
        } else if ((dice === 6 || dice2 === 6) && rolledSix === true){
            roundScore = 0;
            scores[activePlayer] = 0;
            // Update the UI
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            togglePlayer()
            document.querySelector('.dice').style.display = 'none';
            
        } else {
            rolledSix = false;
        }

        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
    } else {
        
        // sets the active player
        togglePlayer();
        

        

    }

}
});

// Change Limit Button
document.querySelector('.btn-setScoreLimit').addEventListener('click', function(){
    var newLimit = document.querySelector('.inputWinningScore').value;
    console.log(newLimit);
    if (newLimit){
        scoreLimit = newLimit;
        init();
    } else {
        scoreLimit = 100;
    }

});

// hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
    // Add current score to global score.
    scores[activePlayer] += roundScore;
    // Update the UI
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    // Check if player has won the game
    if (scores[activePlayer] >= scoreLimit) {
        document.getElementById('name-' + activePlayer).textContent = 'Winner!!!!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.dice').style.display = 'none';
        gamePlaying = false;

    } else {
        
        // sets the active player
        togglePlayer();
        resetCurrentScores();
    }
}
});

// game initialisation
function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    rolledSix = false;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    // removes the winner style
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// resets the Current Scores to 0.
function resetCurrentScores(){
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // Reset the roundscore for the next player.
    roundScore = 0;
}

// Toggles the active player.
function togglePlayer(){
    // clears the dice pictures
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    roundScore = 0;
    rolledSix = false;
}

document.querySelector('.btn-new').addEventListener('click', init);
