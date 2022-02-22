// function insert() {

// // let img = document.createElement('img');
// //     img.src = "./images/2016doorcounty-lighthouse.jpg";
// //     let src = document.getElementById('div');
// //     src.appendChild(img);
// // }
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
}                                                                   //this allows for each card to have a numberic value so the code knows who wins the hand


const computerCardSlot = document.querySelector(".computer-card-slot")
const playerCardSlot = document.querySelector(".player-card-slot")
const computerPlayerWar = document.querySelector(".computer-player-war")
const playerComputerWar = document.querySelector(".player-computer-war")
const computerWarWinner = document.querySelector("computer-war-winner")
const playerWarWinner = document.querySelector("player-war-winner")
const computerDeckElement = document.querySelector(".computer-deck")
const playerDeckElement = document.querySelector(".player-deck")
const text = document.querySelector('.text')


let playerDeck, computerDeck, inRound, stop                         //this allows playerdeck and comptuerdeck etc to be global 


document.addEventListener("click", () => {
    if (stop) {
        startGame()
        return
    }

    if (inRound) {
        cleanBeforeRound()
    } else {
        flipCards()                                                 //this section is being created to have a function 
    }                                                               //that will be created below in the function area to make this listener work
})


startGame()
function startGame() {
    const deck = new Deck()
    deck.shuffle()

    const deckMidpoint = Math.ceil(deck.numberOfCards / 2)              //using .ceil avoids rounding errors
    playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))            //player deck and computer deck are being grabbed from HTML as key words
    computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))
    inRound = false     
    stop = false        //stops the game when there is a winner

    cleanBeforeRound()
}

function cleanBeforeRound() {
    inRound = false
    computerCardSlot.innerHTML = ""
    playerCardSlot.innerHTML = ""
    text.innerText = ""                                                 //this section allows the cards to be "cleaned up when the game is done"

    updateDeckCount()
}

function flipCards() {
    inRound = true

    const playerCard = playerDeck.pop()
    const computerCard = computerDeck.pop()
                                                                     //I want the draw part of the game to actually start the war part. 
                                                                    //I would need to add an additional else loop for when there is a draw
    playerCardSlot.appendChild(playerCard.getHTML())                //that draw has to allow for an additional two cards per player to be drawn.
    computerCardSlot.appendChild(computerCard.getHTML())            //and in order. so first cards are a draw second cards are face down thrid cards face up who ever wins face up gets all the cards from the hand. 
                                                                    // the face down cards are the "bonus/reward" for winning the "war" ie hand 
    updateDeckCount()                                               //****updateDeckCount SO A FUNCTION THAT IS BEING PULLED AT THE BOTTOM THAT IS CONNECTED TO THE updateDeckCount IN THE FUNCTION FOR START GAME. */
    if (isRoundWinner(playerCard, computerCard)) {                  //**** IT ALL TECHNICALLY MATCHES UP AND DOESN'T HAVE TO BE WRITTEN IN COMPLETION RIGHT AWAY. YOU MAY ADD TO THE FUNCTION THROUGHOUT THE  */
        text.innerText = "Win"                                      //*** CODING PROCESS. THIS CODE WAS WRITTEN GOING BACK AND FORTH BETWEEN ALL FILES AND MATCHING THE FUNCTIONS UP ON ONE JS WITH ANOTHER AND ADJUSTING  */
        playerDeck.push(playerCard)                                 //**THE HTML AS WE WENT ALONG.   TO FOLLOW THE PATTERN START AT THE BOTTOM AND WORK YOUR WAY UP TO SEE HOW THE CODE IS WRITTEN/
        playerDeck.push(computerCard)
    } else if (isRoundWinner(computerCard, playerCard)) {       
        text.innerText = "Lose"
        computerDeck.push(playerCard)                               //I should be able to add an additional 4spots for my cards to create the war part of war. 
        computerDeck.push(computerCard)                             //I beleive I added the correct information to the HTML and to my js files but I believe I need to add more 
    } else if(isRoundWinner(computerCard, playerCard)) {           //equations of some sort to get the cards to line up and pull more without the cards going back into the pile too soon.
        text.innerText = "Draw"
        playerDeck.push(playerCard)
        computerDeck.push(computerCard)                         //can not add the second else if statement to this due to it stopping a draw from happening 
    } else (isRoundWinner(computerCard, playerCard)) {                //when I tried to play the game 2.21.22
        text.innerText = "War!"
        playerDeck.push(playerCard)
        computerDeck.push(computerCard)
                        //I believe I need to add another combination of code here as well as possibly adding another const for the player(pop)
                        //or maybe I need to add War to the if statement below line 107. Since it is going to be a win'/lose of some sort.
                    
                    
        if (isGameOver(playerDeck)) {
        text.innerText = "You Lose!!"
        stop = true
    } else if (isGameOver(computerDeck)) {
        text.innerText = "You Win!!"
        stop = true
    }
}

function updateDeckCount() {                                                    //****updateDeckCount this function allows for the text that states winner/looser
    computerDeckElement.innerText = computerDeck.numberOfCards                  //this numberOfCards is in the deck.js file to make this pretty code run
    playerDeckElement.innerText = playerDeck.numberOfCards
}

function isRoundWinner(cardOne, cardTwo) {
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]        //this will determine who is the winner depending on the value of the card 
}

function isGameOver(deck) {
    return deck.numberOfCards === 0
}