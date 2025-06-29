let playerHistory = { rock: 0, paper: 0, scissors: 0 };

function getMostFrequentMove() {
  return Object.entries(playerHistory).sort((a, b) => b[1] - a[1])[0][0];
}

function pickSmartMove() {
  const most = getMostFrequentMove();
  if (most === 'rock') return 'paper';
  if (most === 'paper') return 'scissors';
  if (most === 'scissors') return 'rock';
}

let score =JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    ties:0,
    looses: 0
  };  ;
   



  updateScoreElement();
  /*
  if(!score ){
    score={
      wins:0,
      ties:0,
      looses: 0
    };
  } */
  
    function playGame(playerMove) {
      document.querySelector('.js-result').innerHTML = '3...';
      setTimeout(() => {
        document.querySelector('.js-result').innerHTML = '2...';
        setTimeout(() => {
          document.querySelector('.js-result').innerHTML = '1...';
          setTimeout(() => {
            playerHistory[playerMove]++;
            const computerMove = pickSmartMove();
            let result = '';
    
            if (playerMove === 'scissors') {
              if (computerMove === 'rock') result = 'You lose.';
              else if (computerMove === 'paper') result = 'You win.';
              else result = 'Tie.';
            } else if (playerMove === 'paper') {
              if (computerMove === 'rock') result = 'You win.';
              else if (computerMove === 'paper') result = 'Tie.';
              else result = 'You lose.';
            } else if (playerMove === 'rock') {
              if (computerMove === 'rock') result = 'Tie.';
              else if (computerMove === 'paper') result = 'You lose.';
              else result = 'You win.';
            }
    
            if (result === 'You win.') {
              score.wins += 1; 
            } else if (result === 'You lose.') {
              score.looses += 1;
            } else {
              score.ties += 1; 
            }
    
            localStorage.setItem('score', JSON.stringify(score));
            updateScoreElement();
            updateMatchHistory(result, playerMove, computerMove);
    
            document.querySelector('.js-result').innerHTML = result;
            document.querySelector('.js-moves').innerHTML = `You 
              <img src="${playerMove}-emoji.png" class="move-icon">
              <img src="${computerMove}-emoji.png" class="move-icon">
              Computer`;
          }, 1000);
        }, 1000);
      }, 1000);
    }
    


  function updateScoreElement(){
    document.querySelector('.js-score')
   .innerHTML=` wins: ${score.wins}. looses: ${score.looses}. ties:${score.ties}`;
  }
   
  function pickComputerMove(){



    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = 'scissors';
    }
    return computerMove;


  }

  function updateMatchHistory(result, playerMove, computerMove) {
    const historyDiv = document.querySelector('.match-history');
    const newEntry = document.createElement('p');
    newEntry.innerHTML = `You: <img src="${playerMove}-emoji.png" class="move-icon">
      Computer: <img src="${computerMove}-emoji.png" class="move-icon"> — <strong>${result}</strong>`;
    historyDiv.prepend(newEntry);
  }
  
  function clearMatchHistory() {
    const historyDiv = document.querySelector('.match-history');
    historyDiv.innerHTML = '';
  }
  
  