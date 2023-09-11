# Blackjack Game

A simplified version of Blackjack using React and [Deck of Cards API](https://deckofcardsapi.com/).

## Run the project

1. Clone repo.
2. `npm install`
3. `npm start`
4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Outline

Functionality:

- initial draw
    - shuffle first
    - 2 each
- draw one for player
- stand (game over = true)
- determine winner/game over
    - every time scores updated
    - ace? try 1 first, add ten when total < 11

States:

- player/computer hand (array)
- player/computer score
- game over

UI:

- player/computer hand in columns
- score for each
- img for cards (last card top)
- display winner when game over