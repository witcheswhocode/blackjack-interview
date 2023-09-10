import React, { useState, useEffect } from 'react';

const Blackjack = () => {
    const [deckId, setDeckId] = useState(null);

    useEffect(() => {
        // initialize the game by creating a new deck
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then((response) => response.json())
            .then((data) => {
                setDeckId(data.deck_id);
            });
    }, []);

    return (
        <div id="blackjack-board">
            <h1>Blackjack {deckId}</h1>
        </div>
    );
};

export default Blackjack;
