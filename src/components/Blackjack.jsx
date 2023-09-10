import React, { useState, useEffect } from 'react';

const Blackjack = () => {
    const [deckId, setDeckId] = useState(null);
    const [playerHand, setPlayerHand] = useState([]);
    const [computerHand, setComputerHand] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        // initialize the game by creating a new deck
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then((response) => response.json())
            .then((data) => {
                setDeckId(data.deck_id);
            });
    }, []);

    useEffect(() => {
        // determines a winner and bust
        if (playerScore === 21) {
            setGameOver(true);
        } else if (playerScore > 21) {
            setGameOver(true);
        }
    }, [playerScore]);

    const initialDeal = () => {
        // draw two cards for the player and computer
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
            .then((response) => response.json())
            .then((data) => {
                const cards = data.cards;
                const playerInitialHand = [cards[0], cards[1]];
                const computerInitialHand = [cards[2], cards[3]];
                setGameOver(false);
                setPlayerHand(playerInitialHand);
                setComputerHand(computerInitialHand);
                calculateScores(playerInitialHand, computerInitialHand);
            });
    };

    const singleCardDraw = () => {
        if (!gameOver) {
            // draw one card for player
            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
                .then((response) => response.json())
                .then((data) => {
                    const newCard = data.cards[0];
                    const newPlayerHand = [...playerHand, newCard];
                    setPlayerHand(newPlayerHand);
                    calculateScores(newPlayerHand, computerHand);
                });
        }
    };

    const stand = () => {
        setGameOver(true);
    };

    const calculateScores = (playerHand, computerHand) => {
        setPlayerScore(calculateHandValue(playerHand));
        setComputerScore(calculateHandValue(computerHand));
    };

    const calculateHandValue = (hand) => {
        let value = 0;
        let hasAce = false;

        for (const card of hand) {
            if (card.value === 'A') {
                hasAce = true;
            }
            value += getValueOfCard(card.value);
        }

        // decides best value of Ace to use for each draw
        if (hasAce && value <= 11) { 
            value += 10;
        }
        
        return value;
    };

    const getValueOfCard = (cardValue) => {
        if (cardValue === 'ACE') return 1; // return 1 at first, decide if 10 is better in calculation
        if (['KING', 'QUEEN', 'JACK'].includes(cardValue)) return 10;
        return parseInt(cardValue, 10);
    };
    return (
        <div id="blackjack-board">
            <h1>Blackjack</h1>
            <p>Deal to start playing and draw single card to get closer to 21.</p>
            <button onClick={initialDeal}>Deal</button>
            <button onClick={singleCardDraw} disabled={gameOver}>
                Draw Single Card
            </button>
            <button onClick={stand} disabled={gameOver}>
                Stand
            </button>

            {gameOver && (
                <div id="winner">
                    {playerScore > 21 ? (
                        <p>Computer wins!</p>
                    ) : computerScore > 21 ? (
                        <p>✨ Player wins! ✨</p>
                    ) : playerScore > computerScore ? (
                        <p>✨ Player wins! ✨</p>
                    ) : computerScore > playerScore ? (
                        <p>Computer wins!</p>
                    ) : (
                        <p>It's a tie!</p>
                    )}
                </div>
            )}
            
            <div id='deal-panel'>
                <div>
                    <h2>Player's Hand</h2>
                    <p>Score: {playerScore}</p>
                    <div className="card-container player-hand">
                        {playerHand.map((card, index) => (
                            <img className="card" key={index} src={card.image} alt={card.code} />
                        ))}
                    </div>
                </div>
                <div>
                    <h2>Computer's Hand</h2>
                    <p>Score: {computerScore}</p>
                    <div className="card-container computer-hand">
                        {computerHand.map((card, index) => (
                            <img className="card" key={index} src={card.image} alt={card.code} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Blackjack;
