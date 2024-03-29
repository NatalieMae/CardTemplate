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
const DIV_computerWarCard = document.querySelector(".computer-war-card")
const DIV_playerWarCard = document.querySelector(".player-war-card")
const DIV_text = document.querySelector('.text')
const DIV_playerDeck = document.querySelector(".player-deck")  
const DIV_playerCardSlot = document.querySelector(".player-card-slot")   


let playerDeck = [];
let computerDeck = [];
let playerWarCard = [];
let computerWarCard = [];
let isRoundOver = false; 
// let isGameOver = false;  
let gameOver = true;  
                    

function startGame() {
    resetData();
    clearHtmlTextContent();
    renderDeckCount();
    dealCards();
    flipCards();
    isRoundWinner();
    isGameOver();
}  

startGame();

function resetData() {
    playerDeck = [];
    computerDeck = [];
    isRoundOver = false;
    gameOver = false;
  
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


function renderDeckCount() {         
    isRoundOver = false;                                                                 
    DIV_computerDeck.innerText = computerDeck.numberofCards;
    DIV_playerDeck.innerText = playerDeck.numberOfCards;                                       
}


function flipCards() {
    isRoundOver = true

    let playerCard = playerDeck.pop()
    let computerCard = computerDeck.pop()
    // let playerWarCard = playerDeck.pop()
    // let computerWarCard = computerDeck.pop()                                     
                                                                     
                                                                   
    DIV_playerCardSlot.appendChild(playerCard.getHTML());                
    DIV_computerCardSlot.appendChild(computerCard.getHTML()); 
    // DIV_playerWarCard.appendChild(playerWarCard.getHTML());
    // DIV_computerWarCard.appendChild(computerWarCard.getHTML());   
    
    
                                                                    
    renderDeckCount()                                             
    if (isRoundWinner(playerCard, computerCard)) {                  
        DIV_text.innerText = "Win"                                      
        playerDeck.push(playerCard)                                 
        playerDeck.push(computerCard)                              
    } else if (isRoundWinner(computerCard, playerCard)) {       
        DIV_text.innerText = "Lose"
        computerDeck.push(playerCard)                               
        computerDeck.push(computerCard)                             
    } else if (isRoundWinner(playerWarCard, computerWarCard)){       
        DIV_text.innerText = "War"
        playerDeck.push(computerCard)
        computerDeck.push(playerCard)
    } else (isRoundOver(playerCard, computerCard)) 
        return "Finish Him!"
}


function isRoundWinner(cardOne, cardTwo) {    
            return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
        } 
    

function isGameOver() {
        if (gameOver(playerDeck)) {
        DIV_text.innerText = "You Lose!!"
       gameOver = true
    } else if (gameOver(computerDeck)) {
        DIV_text.innerText = "You Win!!"                
        gameOver = true
    }
        return deck.numberOfCards === 0;
    }


   
    

    document.addEventListener("click", () => {
        if (isGameOver) {                                                 
            startGame()                                                
            return                                                      
        }                                                               
                                                                        
        if (isRoundOver) {
            clearHtmlTextContent();
            renderDeckCount();                                      
        } else  {
            flipCards();
        }                                                 
    })