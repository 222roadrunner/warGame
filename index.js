class Deck {
    constructor() {
        this.deck = [];
        this.suit = ["Spades 🗡️", "Hearts 💛", "Diamonds 💎", "Clubs 🍀"];
        this.rank = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
        this.value =[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    }
    newDeck(){
        for (let k = 0; k < this.suit.length; k++) {
            for (let i = 0; i < this.rank.length; i++) {
                let card = {name: `${this.rank[i]} of ${this.suit[k]}`, value: i+1};
                this.deck.push(card);
            }
        }
    }
    shuffleDeck(){
        for (let i = this.deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i+1);
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
}

class Game {
    constructor(){
        this.playerOne = {
            name: "Player One", //placeholder value makes viewGameRecords clean
            dealer: "",
            hand: [],
            score: 0,
            wins: 0,
        };
        this.playerTwo = {
            name: "Player Two",
            dealer: "",
            hand: [],
            score: 0,
            wins: 0,
        };
    }
    start(){
        this.playerOne.name = prompt("Enter a name for Player One");
        this.playerTwo.name = prompt("Enter a name for Player Two");
        let selection = this.showMainMenu();
        while (selection !=0) {
            switch (selection) {
                case '1':
                    this.startNewGame();
                    break;
                case '2':
                    this.viewGameRecords();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenu();
        }
        alert("Thanks for playing!");
    }
    showMainMenu(){
        return prompt(`
            ---------------------
            1: Start New Game
            2: View Game Records
            0: Quit Game
            ---------------------`);
    }
    startNewGame(){
        this.playerOne.hand = []; // clears hand so a second game can be played without retaining the previous game's hand
        this.playerTwo.hand = [];
        /* let chooseDealer = () => {
            if ((Math.random() < 0.5 ? true : false) == true) {
                this.playerOne.dealer = true;
                this.playerTwo.dealer = false;
            } else {
                this.playerOne.dealer = false;
                this.playerTwo.dealer = true;
            }
        } 
        console.log(chooseDealer()); */
        let deck = new Deck()
        deck.newDeck()
        deck.shuffleDeck()
        while (deck.deck.length !== 0) { //abandoning dealer logic, unnecessary for a game as simple as this
            this.playerOne.hand.push(deck.deck.shift())
            this.playerTwo.hand.push(deck.deck.shift())
            
        }
        alert ("Let the game begin!")
        console.log(this.playerOne.hand);
        console.log(this.playerTwo.hand);
        let i = 1;
        while (this.playerTwo.hand.length > 0) {
            if (this.playerOne.hand[0].value > this.playerTwo.hand[0].value) {
                this.playerOne.score += 1;
                alert (`
                    Turn ${i}:
                    ${this.playerOne.name}: ${this.playerOne.hand[0].name}
                    ${this.playerTwo.name}: ${this.playerTwo.hand[0].name}
                    Point to ${this.playerOne.name}!
                    The score is ${this.playerOne.name}: ${this.playerOne.score}, ${this.playerTwo.name}: ${this.playerTwo.score}
                    `)
                i+= 1;
                this.playerOne.hand.shift()
                this.playerTwo.hand.shift()    
            } else if (this.playerTwo.hand[0].value > this.playerOne.hand[0].value) {
                this.playerTwo.score += 1;
                alert (`
                    Turn ${i}:
                    ${this.playerOne.name}: ${this.playerOne.hand[0].name}
                    ${this.playerTwo.name}: ${this.playerTwo.hand[0].name}
                    Point to ${this.playerTwo.name}!
                    The score is ${this.playerOne.name}: ${this.playerOne.score}, ${this.playerTwo.name}: ${this.playerTwo.score}
                    `)
                i+= 1;
                this.playerOne.hand.shift()
                this.playerTwo.hand.shift()
            } else {
                alert (`
                    Turn ${i}:
                    ${this.playerOne.name}: ${this.playerOne.hand[0].name}
                    ${this.playerTwo.name}: ${this.playerTwo.hand[0].name}
                    It's a draw, no points awarded!
                    The score is ${this.playerOne.name}: ${this.playerOne.score}, ${this.playerTwo.name}: ${this.playerTwo.score}
                    `)
                i+= 1;
                this.playerOne.hand.shift()
                this.playerTwo.hand.shift()
            }
        }
        if (this.playerOne.score > this.playerTwo.score) {
            this.playerOne.wins += 1
            alert (`${this.playerOne.name} is the winner!`)
        } else if (this.playerOne.score < this.playerTwo.score) {
            this.playerTwo.wins += 1
            alert (`${this.playerTwo.name} is the winner!`)
        } else {
            alert ("It's a draw, no winner!")
        }
    } 
    viewGameRecords(){
        alert (`
            ${this.playerOne.name}: ${this.playerOne.wins} wins
            ${this.playerTwo.name}: ${this.playerTwo.wins} wins
            `)
    }
}
let game = new Game();
game.start();