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
// const CARD_VALUE_WAR_MAP

const computerCardSlot = document.querySelector(".computer-card-slot")
const playerCardSlot = document.querySelector(".player-card-slot")              //these pull the info from or push to the HTML 
const computerWarWinner = document.querySelector("computer-war-winner")
const playerWarWinner = document.querySelector(".player-war-winner")
const computerDeckElement = document.querySelector(".computer-deck")
const playerDeckElement = document.querySelector(".player-deck")  
const text = document.querySelector('.text')


let playerDeck, computerDeck, inRound, stop                         //this allows playerdeck and computerDeck etc to be global or attached to the code below? 


document.addEventListener("click", () => {
    if (stop) {                                                 //all of these pieces were put together seperately. we started with startGame 
        startGame()                                                 //wrote the functions for that then went back and added stop etc and then added the 
        return                                                      //functions for that, etc.. this allowed me to connect all the dots between html.css.multiple js files. 
    }                                                               //this is the code to play the game war and deck.js allows for a deck to be created. 
                                                                    //deck.js should be able to be used as a template for other card games.
    if (inRound) {
        cleanBeforeRound()                                      //THIS SECTION (LINES 39-50) IS THE CLICK ON THE WEB BROWSER THAT WILL FLIP THE CARDS, THIS MAKES THE WHOLE THING RUN
    } else  {
        flipCards()
    }                                                 //this section is being created to have a function that will be created below in the function area to make this listener work                                                            //
})


startGame()
function startGame() {
    const deck = new Deck()
    deck.shuffle()

    const deckMidpoint = Math.ceil(deck.numberOfCards / 2)              //using .ceil avoids rounding errors
    playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))            //player deck and computer deck are being grabbed from HTML as key words
    computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))
    playerWarWinner = new Deck(deck.cards.(deckMidpoint, deck.numberOfCards))  
    inRound = false     
    stop = false        //stops the game when there is a winner

    cleanBeforeRound()
}

function cleanBeforeRound() {                                           //(isRoundWinner function on line 121 along with line 77)
    inRound = false                                                     //this section allows for the action to appear in a browser 
    computerCardSlot.innerHTML = ""
    playerCardSlot.innerHTML = ""
    // warCardSlot.innerHTML = ""
    text.innerText = ""                                                 

    updateDeckCount()
}

function flipCards() {
    inRound = true

    const playerCard = playerDeck.pop()
    const computerCard = computerDeck.pop()
    // const playerWarWinner = playerDeck.pop() 
    // const computerWarWinner = computerDeck.pop()                                      
                                                                     
                                                                   
    playerCardSlot.appendChild(playerCard.getHTML())                
    computerCardSlot.appendChild(computerCard.getHTML()) 
    playerWarWinner.appendChild(playerCard.getHTML())
    computerWarWinner.appendChild(computerCard.getHTML())         
                                                                    
    updateDeckCount()                                             
    if (isRoundWinner(playerCard, computerCard)) {                  
        text.innerText = "Win"                                      
        playerDeck.push(playerCard)                                 
        playerDeck.push(computerCard)                              
    } else if (isRoundWinner(computerCard, playerCard)) {       
        text.innerText = "Lose"
        computerDeck.push(playerCard)                               
        computerDeck.push(computerCard)                             
    } else if (isRoundWinner(playerWarWinner, computerWarWinner)){       
        text.innerText = "War"
        computerDeck.push(playerCard === computerCard)
        playerDeck.push(computerCard === playerCard)
    } else {
        playerWarWinner.push(playerCard)
        computerWarWinner.push(computerCard)
    }


        // playerDeck.push(playerCard)
        // computerDeck.push(computerCard) 
        
    }



    if (isGameOver(playerDeck)) {
        text.innerText = "You Lose!!"
        stop = true
    } else if (isGameOver(computerDeck)) {
        text.innerText = "You Win!!"                
        stop = true
    }



function updateDeckCount() {                                                    //****updateDeckCount this function allows for the text that states winner/looser
    computerDeckElement.innerText = computerDeck.numberOfCards                  //this numberOfCards is in the deck.js file to make this pretty code run
    playerDeckElement.innerText = playerDeck.numberOfCards
}

function isRoundWinner(cardOne, cardTwo) {                         //this will determine who is the winner depending on the value of the card 
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]        //cardOne cardTwo are attached to the inRoundWinner loops, then follow the lines up and over to the deck.js file when other code needs to be explained
}       
        

function isGameOver(deck) {
    return deck.numberOfCards === 0
}