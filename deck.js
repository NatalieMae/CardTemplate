const SUITS = ["♠", "♣", "♥", "♦"]      //Capitals refer to Global Constant Variable: Arrays 
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

class Deck {
    constructor(cards= freshDeck()) {       //Gives us a fresh deck of current cards instead of getting us a brand new deck of cards, basically stays with the same game instead of accidentally starting over. 
        this.cards = cards
    }

get numberOfCards() {
    return this.cards.length        //creating the getter (get it get/Grag/get something in the code to shorten the code) is allowing the for loop to be shortened and more specific
}

pop() {
    return this.cards.shift()       //shift allows the game to grab the top element (pf the array) vs the bottom element
}                                   // return the top card of deck. 

push(card) {
    this.cards.push(card)           //adds a card to the bottom of the deck 
}

shuffle() {
       for (let i = this.numberOfCards - 1; i > 0; i--) {     //loop needed otherwise shuffleing will not work properly 
                                                                //this allows the shuffle to go from the back of the list of cards to the front
        const newIndex = Math.floor(Math.random() * (i + 1))         //random index from current card sets FLOOR allows for integers
        const oldValue = this.cards[newIndex]                   //flip values oldvalue is current value newIndex is take card at i index goes into newIndex
        this.cards[newIndex] = this.cards[i]                //random index before current card on swap looping cards and swapping cards randomly every time
        this.cards[i] = oldValue
       }                         
    }
}

class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }

    get color() {
        return this.suit === '♣' || this.suit === '♠' ? 'black' : 'red'    
    }


getHTML() {
    const cardDiv = document.createElement('div')
    cardDiv.innerText = this.suit
    cardDiv.classList.add("card", this.color)
    cardDiv.dataset.value = `${this.value} ${this.suit}`
    return cardDiv
    }
}

function freshDeck() {                  // create Brand new Deck of cards loop through suits and values
    return SUITS.flatMap(suit => {      //flatMap condenses the array of cards adding the return statements 
        return VALUES.map(value => {        // allows for the arrays from both value and suits to be added and shuffled vs in order.
            return new Card(suit, value)
        })
    })
}