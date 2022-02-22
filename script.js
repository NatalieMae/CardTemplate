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
}                                                                   //this allows for each card to have a numeric value so the code knows who wins the hand


const computerCardSlot = document.querySelector(".computer-card-slot")
const playerCardSlot = document.querySelector(".player-card-slot")              //these pull the info from or push to the HTML 
const computerPlayerWar = document.querySelector(".computer-player-war")
const playerComputerWar = document.querySelector(".player-computer-war")
const computerWarWinner = document.querySelector("computer-war-winner")
const playerWarWinner = document.querySelector(".player-war-winner")
const computerDeckElement = document.querySelector(".computer-deck")
const playerDeckElement = document.querySelector(".player-deck")
const text = document.querySelector('.text')


let playerDeck, computerDeck, playerWarDeck, computerWarDeck, inRound, stop                         //this allows playerdeck and computerDeck etc to be global or attached to the code below? 


document.addEventListener("click", () => {
    if (stop) {                                                 //all of these pieces were put together seperately. we started with startGame 
        startGame()                                                 //wrote the functions for that then went back and added stop etc and then added the 
        return                                                      //functions for that, etc.. this allowed me to connect all the dots between html.css.multiple js files. 
    }                                                               //this is the code to play the game war and deck.js allows for a deck to be created. 
                                                                    //deck.js should be able to be used as a template for other card games.
    if (inRound) {
        cleanBeforeRound()                                      //THIS SECTION (LINES 39-50) IS THE CLICK ON THE WEB BROWSER THAT WILL FLIP THE CARDS, THIS MAKES THE WHOLE THING RUN
    } else {
        flipCards()                                                 //this section is being created to have a function that will be created below in the function area to make this listener work
    }                                                               //
})


startGame()
function startGame() {
    const deck = new Deck()
    deck.shuffle()

    const deckMidpoint = Math.ceil(deck.numberOfCards / 2)              //using .ceil avoids rounding errors
    playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))            //player deck and computer deck are being grabbed from HTML as key words
    computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))
    warDeck = new Deck(deck.cards.slice())    //THIS IS UNFINISHED TEXT I BELIEVE I NEED TO ADD MORE HERE BUT I CAN'T THINK RIGHT NOW
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
    const warCard = warDeck.pop()                                       
                                                                     
                                                                   
    playerCardSlot.appendChild(playerCard.getHTML())                
    computerCardSlot.appendChild(computerCard.getHTML()) 
    // warCardSlot.appendChild(warCard.getHTML())           
                                                                    
    updateDeckCount()                                               
    if (isRoundWinner(playerCard, computerCard, warCard)) {                  
        text.innerText = "Win"                                      
        playerDeck.push(playerCard)                                 
        playerDeck.push(computerCard)                              
    } else if (isRoundWinner(computerCard, playerCard, warCard)) {       
        text.innerText = "Lose"
        computerDeck.push(playerCard)                               
        computerDeck.push(computerCard)                             
    } else if(isRoundWinner(computerCard, playerCard, warCard)) {          
        text.innerText = "Draw"
        playerDeck.push(playerCard)
        computerDeck.push(computerCard) 
        // warDeck.push(playerCard === computerCard)    
    }                                                                               //can not add the second else if statement to this due to it stopping a draw from happening 
    //  } else if (isRoundWinner(computerCard, playerCard, warCard)){              //when I tried to play the game 2.21.22
    //     text.innerText = "War!"                                                 //line 95 was the end of the if/else loops I added an additional else statement and I believe that is 
    //     playerDeck.push(playerCard)                                             //where I am having problems. ok Im done messing around lol oh and my cards are messed up now...
    //     computerDeck.push(computerCard) 
    // }

                    
        if (isGameOver(playerDeck)) {
        text.innerText = "You Lose!!"
        stop = true
    } else if (isGameOver(computerDeck)) {
        text.innerText = "You Win!!"                //CREATE A WARDECK?? MAYBE
        stop = true
    }
}


function updateDeckCount() {                                                    //****updateDeckCount this function allows for the text that states winner/looser
    computerDeckElement.innerText = computerDeck.numberOfCards                  //this numberOfCards is in the deck.js file to make this pretty code run
    playerDeckElement.innerText = playerDeck.numberOfCards
}

function isRoundWinner(cardOne, cardTwo, cardThree) {                         //this will determine who is the winner depending on the value of the card 
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]        //cardOne cardTwo are attached to the inRoundWinner loops, then follow the lines up and over to the deck.js file when other code needs to be explained
        return CARD_VALUE_MAP[cardThree.value]
    }       
        

function isGameOver(deck) {
    return deck.numberOfCards === 0
}