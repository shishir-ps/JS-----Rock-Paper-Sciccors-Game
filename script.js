document.addEventListener('DOMContentLoaded', () => {
    const ruleBtn = document.querySelector(".ruleBtn");
    const ruleX = document.querySelector(".cross");
    const ruleContainer = document.querySelector(".ruleContainer");
    const main_page = document.querySelector("body");
    const nxtBtn = document.querySelector(".nxt");
    const nxtBtnContainer = document.querySelector(".nxtBtnContainer");
    const winPage = document.querySelector(".winPageContainer");
    const homePage =document.querySelector(".container");
    const playBtns = document.querySelectorAll(".playBtn");
    const gameArea = document.querySelector(".gameArea");
    const gameOn = document.querySelector(".gameOn");
    const playAgainBtn = document.querySelectorAll(".playAgainBtn");
    const playAgainBtnContainer = document.querySelectorAll(".playAgainBtnContainer");
    


    const playerChoiceContainer = document.querySelector(".playerChoiceContainer");
    const pcChoiceContainer = document.querySelector(".pcChoiceContainer");
    const centerMsg = document.querySelector(".mainmsg");

    const playerScoreContainer = document.querySelector("#humanScore")
    const pcScoreContainer = document.querySelector("#pcScore")
    

    const choices = ["rock", "paper", "scissors"];
    let playerChoose ='';
    let pcChoose ='';
    
    const winMsg = `<span class="resultMsg">YOU WIN</span> <br> AGAINST PC <br>`;
    const loseMsg = `<span class="resultMsg">YOU LOSE</span> <br> AGAINST PC <br>`;
    const tieMsg =`<span class="resultMsg">TIE UP</span> <br><br>`;
        
    
    if (!localStorage.getItem('playerScore')) {
        localStorage.setItem('playerScore', 0); 
        }

    if (!localStorage.getItem('pcScore')) {
            localStorage.setItem('pcScore', 0); 
        }

    let playerScore = parseInt(localStorage.getItem('playerScore'));
    let pcScore = parseInt(localStorage.getItem('pcScore'));

    playerScoreContainer.textContent=playerScore;
    pcScoreContainer.textContent=pcScore;

    
    const choosenHand= function(hand) {
        return (`<div class="palyerChoice">
                        
                        <button class="playBtn ${hand}" id="${hand}">
                            <img src="./images/${hand}.svg" alt="${hand}" />
                        </button>
                    </div>`)
    };
    const centerWinMsgDecider = function(youPlayed, pcPlayed) {
        if (youPlayed === pcPlayed) {
            return tieMsg; // If both played the same, it's a tie
        }
    
        switch (youPlayed) {
            case "rock":
                return (pcPlayed === "scissors") ? winMsg : loseMsg;
    
            case "scissors":
                return (pcPlayed === "paper") ? winMsg : loseMsg;
    
            case "paper":
                return (pcPlayed === "rock") ? winMsg : loseMsg; 
        }
    };
    
    

    playBtns.forEach(playBtns => {
            playBtns.addEventListener('click',()=>{
                
                pcChoose=choices[Math.floor(Math.random()*3)];
                playerChoose = playBtns.id
                let result = centerWinMsgDecider(playerChoose, pcChoose);
                console.log(playerChoose + pcChoose);    
                gameArea.classList.add('hidden');
                gameOn.classList.remove('hidden');
                playerChoiceContainer.innerHTML = choosenHand(playerChoose);
                setTimeout(() => {
                pcChoiceContainer.innerHTML = choosenHand(pcChoose);
                    
                    
                    

                }, 1000);
                
                setTimeout(() => {
                    centerMsg.innerHTML = result;
                    playAgainBtnContainer.forEach((btn)=>{
                        btn.classList.remove('hidden');
                    });
                    if(result===winMsg){
                        nxtBtnContainer.classList.remove('hidden');
                        playerScore += 1;
                        localStorage.setItem('playerScore', playerScore);
                        playerScoreContainer.textContent=playerScore;
                    }
                    if(result===loseMsg){
                        pcScore += 1;
                        localStorage.setItem('pcScore', pcScore);
                        pcScoreContainer.textContent=pcScore;
                    }
                    
                    }, 1500);
                    
            });
            
        });


        ruleBtn.addEventListener('click', () => {
            console.log('rule button clicked');
            main_page.classList.add('dull_background');
            ruleContainer.classList.add('show_rules');

        });

        ruleX.addEventListener('click', () => {
            console.log('X button clicked');
            main_page.classList.toggle('dull_background');
            ruleContainer.classList.toggle('show_rules');
        });

  
        
        nxtBtn.addEventListener('click', () => {
            console.log("next button clicked");
            winPage.classList.remove('hidden');
            homePage.classList.add('hidden');
            nxtBtnContainer.classList.add('hidden');
        });
        playAgainBtn.forEach((buttton)=>{
            buttton.addEventListener('click', ()=>{
                console.log("next clickkkkkk");
                winPage.classList.add('hidden');
                homePage.classList.remove('hidden');
                gameOn.classList.add('hidden');
                gameArea.classList.remove('hidden');
                pcChoiceContainer.innerHTML = '';
                centerMsg.innerHTML='';
                nxtBtnContainer.classList.add('hidden');
                playAgainBtnContainer.forEach((btn)=>{
                    btn.classList.add('hidden');
                });
                
            });
        })
    
});
