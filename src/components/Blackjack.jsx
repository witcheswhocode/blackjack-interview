import React, { useState, useEffect } from 'react';

const Blackjack = () => {
    const [deckId, setDeckId] = useState(null);
    const [playerHand, setPlayerHand] = useState([]);
    const [computerHand, setComputerHand] = useState([]);

    useEffect(() => {
        // initialize the game by creating a new deck
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then((response) => response.json())
            .then((data) => {
                setDeckId(data.deck_id);
            });
    }, []);

    const initialDeal = () => {
        // draw two cards for the player and computer
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
            .then((response) => response.json())
            .then((data) => {
                const cards = data.cards;
                setPlayerHand([cards[0], cards[1]]);
                setComputerHand([cards[2], cards[3]]);
            });
    };
    const singleCardDraw = () => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then((response) => response.json())
            .then((data) => {
                const newCard = data.cards[0];
                setPlayerHand([...playerHand, newCard]);
            });
    };

    return (
        <div id="blackjack-board">
            <h1>Blackjack</h1>
            <button onClick={initialDeal}>Deal</button>
            <button onClick={singleCardDraw}>
                Draw Player Card
            </button>

            <div id='deal-panel'>
                <div>
                    <h2>Player's Hand</h2>
                    <div className="card-container player-hand">
                        {playerHand.map((card, index) => (
                            <img className="card" key={index} src={card.image} alt={card.code} />
                        ))}
                    </div>
                </div>
                <div>
                    <h2>Computer's Hand</h2>
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
