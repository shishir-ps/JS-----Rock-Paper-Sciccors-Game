//weight until dom is loaded then use the selectors
document.addEventListener('DOMContentLoaded', () => {

    //mainbody selector
    const main_page = document.querySelector("body");

    //main container of home page ---- all elements
    const homePage =document.querySelector(".container");

    //rule button and cross
    const ruleBtn = document.querySelector(".ruleBtn");
    const ruleX = document.querySelector(".cross");
    const ruleContainer = document.querySelector(".ruleContainer");
    
    //next button when you win
    const nxtBtn = document.querySelector(".nxt");
    const nxtBtnContainer = document.querySelector(".nxtBtnContainer");

    //page when next is clicked
    const winPage = document.querySelector(".winPageContainer");
   
    //slection button ang main game area
    const gameArea = document.querySelector(".gameArea");
    const playBtns = document.querySelectorAll(".playBtn");
    
    //game started area
    const gameOn = document.querySelector(".gameOn");

    //play again button
    const playAgainBtn = document.querySelectorAll(".playAgainBtn");
    const playAgainBtnContainer = document.querySelectorAll(".playAgainBtnContainer");
    
    //selection button for rock papae scissor
    const playerChoiceContainer = document.querySelector(".playerChoiceContainer");
    const pcChoiceContainer = document.querySelector(".pcChoiceContainer");

    //win lose message
    const centerMsg = document.querySelector(".mainmsg");
    
    //scores selectors
    const playerScoreContainer = document.querySelector("#humanScore")
    const pcScoreContainer = document.querySelector("#pcScore")
    
    //array to scoose ramdomply
    const choices = ["rock", "paper", "scissors"];

    let playerChoose ='';
    let pcChoose ='';
    
    //lose win tie message divs
    const winMsg = `<span class="resultMsg">YOU WIN</span> <br> AGAINST PC <br>`;
    const loseMsg = `<span class="resultMsg">YOU LOSE</span> <br> AGAINST PC <br>`;
    const tieMsg =`<span class="resultMsg">TIE UP</span> <br><br>`;
        
    //creating score objects if objects not found 
    if (!localStorage.getItem('playerScore')) {
        localStorage.setItem('playerScore', 0); 
        }

    if (!localStorage.getItem('pcScore')) {
            localStorage.setItem('pcScore', 0); 
        }
    //fetching scores from local storage ..... 
    let playerScore = parseInt(localStorage.getItem('playerScore'));
    let pcScore = parseInt(localStorage.getItem('pcScore'));
    
    //updating scores initially before staring game
    playerScoreContainer.textContent=playerScore;
    pcScoreContainer.textContent=pcScore;
    
    //main game logic ----win-lose-tie msg div fuction .... for returnign created divs
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
    
    //return div with human chosen button
    const choosenHand= function(hand) {
        return (`<div class="palyerChoice ">
                        <div class="pickMsg"> YOU PICKED </div>
                        <button class="playBtn ${hand} " id="${hand}">
                            <img src="./images/${hand}.svg" alt="${hand}" />
                        </button>
                    </div>`)
    };
    //return div with human chosen button
    const choosenHandpc= function(hand) {
        return (`<div class="palyerChoice ">
                        <div class="pickMsg"> PC PICKED </div>
                        <button class="playBtn ${hand} " id="${hand}">
                            <img src="./images/${hand}.svg" alt="${hand}" />
                        </button>
                    </div>`)
    };
    
    
    
    //main playing buttons
    playBtns.forEach(playBtns => {

            playBtns.addEventListener('click',()=>{

                //random selection of pc choice
                pcChoose=choices[Math.floor(Math.random()*3)];

                playerChoose = playBtns.id; 

                let result = centerWinMsgDecider(playerChoose, pcChoose);

                //removing game arean and showing gameOn area after section
                gameArea.classList.add('hidden');
                gameOn.classList.remove('hidden');

                //showing what player choose
                playerChoiceContainer.innerHTML = choosenHand(playerChoose);
                
                //shoiwng what pc choose after a bit delay
                setTimeout(() => {
                pcChoiceContainer.innerHTML = choosenHandpc(pcChoose);
                 
                }, 1000);
                
                //showing result msg after a bit delay
                setTimeout(() => {

                    centerMsg.innerHTML = result;

                    //adding play again button
                    playAgainBtnContainer.forEach((btn)=>{
                        btn.classList.remove('hidden');
                    });

                    if(result===winMsg){
                        //showing next button if won
                        nxtBtnContainer.classList.remove('hidden');
                        
                        //updating human score
                        playerScore += 1;
                        localStorage.setItem('playerScore', playerScore);
                        playerScoreContainer.textContent=playerScore;

                        //showing cocentric shadow on human selected button if win
                        playerChoiceContainer.classList.add('winnerShadow');

                    }
                    if(result===loseMsg){

                        //updating human score
                        pcScore += 1;
                        localStorage.setItem('pcScore', pcScore);
                        pcScoreContainer.textContent=pcScore;

                        //showing cocentric shadow on pc seclted button if pc win
                        pcChoiceContainer.classList.add('winnerShadow');

                    }
                    }, 1500);
            });
        });

        //rule button fuctionality
        ruleBtn.addEventListener('click', () => {
            console.log('rule button clicked');
            main_page.classList.add('dull_background');
            ruleContainer.classList.add('show_rules');
        });

        //rules close button
        ruleX.addEventListener('click', () => {
            console.log('X button clicked');
            main_page.classList.toggle('dull_background');
            ruleContainer.classList.toggle('show_rules');
        });

        //next button
        nxtBtn.addEventListener('click', () => {
            console.log("next button clicked");
            winPage.classList.remove('hidden');
            homePage.classList.add('hidden');
            nxtBtnContainer.classList.add('hidden');
        });

        //playagain button fuctionality
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
                pcChoiceContainer.classList.remove('winnerShadow');
                playerChoiceContainer.classList.remove('winnerShadow');
                
            });
        })
});
