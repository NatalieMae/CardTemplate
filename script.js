const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
}                                                                   //this allows for each card to have a numeric value so the code knows who wins the hand

const DIV_computerDeck = document.querySelector(".computer-deck")
const DIV_computerCardSlot = document.querySelector(".computer-card-slot")
const DIV_computerWarWinner = document.querySelector(".computer-war-winner")
const DIV_playerWarWinner = document.querySelector(".player-war-winner")
const DIV_text = document.querySelector('.text')
const DIV_playerDeck = document.querySelector(".player-deck")  
const DIV_playerCardSlot = document.querySelector(".player-card-slot")   
// const DIV_playerWarWinner = document.querySelector(".player-war-winner")

let playerDeck = [0]
let computerDeck = [0] 
let isRoundOver = false; 
let gameOver = false;                         //this allows playerdeck and computerDeck etc to be global or attached to the code below? 

function startGame() {
    resetData();
    clearHtmlTextContent();
    dealCards();
    renderDeckCount();
}  

function resetData() {
    playerDeck = [];
    computerDeck = [];
    gameOver = [];
    isRoundOver = false;
}

function clearHtmlTextContent() {
    DIV_computerCardSlot.innerHTML = "";
    DIV_playerCardSlot.innerHTML = "";
    DIV_text.innerHTML = "";
}

function dealCards() {
    const deck = new Deck();
    deck.shuffle();
    const deckMidpoint = Math.ceil(deck.numberOfCards / 2)            
    playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))           
    computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))
}


function renderDeckCount() {                                           //(isRoundWinner function on line 121 along with line 77)                                        //this section allows for the action to appear in a browser 
    DIV_computerDeck.innerText = computerDeck.numberofCards;
    DIV_playerDeck.innerText = playerDeck.numberOfCards;                                             
}


function flipCards() {
    isRoundOver = true

    let playerCard = playerDeck.pop()
    let computerCard = computerDeck.pop()
    // const playerWarWinner = playerDeck.pop() 
    // const computerWarWinner = computerDeck.pop()                                      
                                                                     
                                                                   
    DIV_playerCardSlot.appendChild(playerCard.getHTML());                
    DIV_computerCardSlot.appendChild(computerCard.getHTML()); 
    DIV_playerWarWinner.appendChild(playerCard.getHTML());
    DIV_computerWarWinner.appendChild(computerCard.getHTML());         
                                                                    
    renderDeckCount();                                             
    if (isRoundWinner(DIV_playerCard, DIV_computerDeck)) {                  
        DIV_text.innerText = "Win"                                      
        playerDeck.push(playerCard)                                 
        playerDeck.push(computerCard)                              
    } else if (isRoundWinner(computerCard, playerCard)) {       
        DIV_text.innerText = "Lose"
        computerDeck.push(playerCard)                               
        computerDeck.push(computerCard)                             
    } else if (isRoundWinner(playerWarWinner, computerWarWinner)){       
        DIV_text.innerText = "War"
        computerDeck.push(playerCard === computerCard)
        playerDeck.push(computerCard === playerCard)
    } else {
        DIV_text.innerText = "Finish Them!"
        DIV_playerWarWinner.push(computerCard)
        DIV_computerWarWinner.push(playerCard)
    }
}

    function isRoundWinner(cardOne, cardTwo) {    
        return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
    } 


    function isGameOver(deck) {
        if (isGameOver(playerDeck)) {
        DIV_text.innerText = "You Lose!!"
       gameOver = true
    } else if (isGameOver(computerDeck)) {
        DIV_text.innerText = "You Win!!"                
        gameOver = true
    }
    return deck.numberOfCards === 0;
    }

    startGame();
    

    document.addEventListener("click", () => {
        if (gameOver) {                                                 //all of these pieces were put together seperately. we started with startGame 
            startGame()                                                 //wrote the functions for that then went back and added stop etc and then added the 
            return                                                      //functions for that, etc.. this allowed me to connect all the dots between html.css.multiple js files. 
        }                                                               //this is the code to play the game war and deck.js allows for a deck to be created. 
                                                                        //deck.js should be able to be used as a template for other card games.
        if (isRoundOver) {
            clearHtmlTextContent();
            renderDeckCount();                                      //THIS SECTION (LINES 39-50) IS THE CLICK ON THE WEB BROWSER THAT WILL FLIP THE CARDS, THIS MAKES THE WHOLE THING RUN
        } else  {
            flipCards();
        }                                                 //this section is being created to have a function that will be created below in the function area to make this listener work                                                            //
    })







// function updateDeckCount() {                                                    //****updateDeckCount this function allows for the text that states winner/looser
//     computerDeckElement.innerText = computerDeck.numberOfCards                  //this numberOfCards is in the deck.js file to make this pretty code run
//     playerDeckElement.innerText = playerDeck.numberOfCards
// }
                   
        

