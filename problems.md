

** Stretch: I have the basic code for the game and the deck prepared so a version of war can be played. I need to apply the war part of the game to this script and the additional CSS that I would like to add if I have time. Also, I need to add additional code to make the "bonus cards" turn over on their own once the third card is pulled during a "War" round. 






// the face down cards are the "bonus/reward" for winning the "war" ie hand 

//****updateDeckCount SO A FUNCTION THAT IS BEING PULLED AT THE BOTTOM THAT IS CONNECTED TO THE updateDeckCount IN THE FUNCTION FOR START GAME. */

//**** IT ALL TECHNICALLY MATCHES UP AND DOESN'T HAVE TO BE WRITTEN IN COMPLETION RIGHT AWAY. YOU MAY ADD TO THE FUNCTION THROUGHOUT THE  */

//*** CODING PROCESS. THIS CODE WAS WRITTEN GOING BACK AND FORTH BETWEEN ALL FILES AND MATCHING THE FUNCTIONS UP ON ONE JS WITH ANOTHER AND ADJUSTING  */                                                   
 //line 95 was the end of the if/else loops I added an additional else statement and I believe that is 
                                    
//CSS note: 
    //THIS SECTION (LINES 39-50) IS THE CLICK ON THE WEB BROWSER THAT WILL FLIP THE CARDS, THIS MAKES THE WHOLE THING RUN
//Example CSS save in a template:

*, *::after, *::before {
    box-sizing: border-box;     /* do for all elements global makes it easier to style the elements*/
}

body {
    background-color: green;
    margin: 0;                  /*  */
    display: grid;              /* 5 section layout  */
    grid-template-columns: repeat(2, 4rem);     /* */
    grid-template-rows: 7rem 2rem 7rem;
    gap: .5rem;              /* */
    cursor: pointer;                 /*anywhere you click on the screen turns a card */
    justify-content: center;         /* */
    padding-top: 1rem;       /* */
}   

.deck {
    height: 100%;            /* fills to 100% of the body margin/gird etc from above*/
    width: 100%;            
    border: 1px solid black;
    display: block;
    
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    border-radius: .5rem;
    color: white;
    user-select: none;      /* this makes it so the user can not select the text just the card*/
}

.computer-deck {
    background-color: green;
}

.player-deck {
    background-color: blue;
   
}

.text {
    grid-column: span 2;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    position: relative;
    height: 100% ;
    width: 100%;
    border: 3px solid black;
    border-radius: .5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
}

.card.red {
    color: red;
}

.card.black {
    color: black;
}

.card::before,
.card::after {
    position: absolute;
    content: attr(data-value); /* this goes back to the HTML data-value div */
    font-size: 1rem;
    }

.card::before {
    top: .5rem;
    left: .5rem;
}

.card::after {
    bottom: .5rem; 
    right: .5rem;
    transform: rotate(180deg);  /*this allows the bottom heart and number to flip upside down */
}
