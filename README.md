# Tomhas - Cluiche Focal as Gaeilge

An Irish language word puzzle game inspired by [Waffle](https://wafflegame.net/). Built with React.

## How to Play

Six Irish words are hidden in a waffle-shaped grid -- three horizontal and three vertical, intersecting at shared letters. The letters are scrambled. Your job is to swap tiles to unscramble all six words.

- **Drag** a tile onto another to swap them, or **tap** two tiles in sequence
- 🟩 **Green** = correct letter, correct position
- 🟨 **Yellow** = letter belongs in this word but is in the wrong spot
- ⬛ **Grey** = letter does not belong in this word
- Vowels with a fada (accent) are **different letters**: a ≠ á, e ≠ é, etc.
- Four-letter words are padded with a blank tile (max 2 per puzzle)
- The **"Is fearr"** number shows the mathematically optimal minimum swaps
- Earn medals: 🥉 Bronze (2 words), 🥈 Silver (4 words), 🥇 Gold (all 6)
- Use 💡 hints if you get stuck (3 per game)

All words sourced from [teanglann.ie](https://www.teanglann.ie/).

## Development

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

Push to `main` and the GitHub Action will build and deploy automatically. Make sure to:

1. Go to **Settings > Pages** in your repo
2. Set Source to **GitHub Actions**

The game will be live at `https://yourusername.github.io/tomhas/`

## Expanding the Word Bank

The puzzle generator needs words that share letters at specific intersection points (positions 0, 2, 4). To add more puzzles:

1. Download a larger Irish word list (e.g. [michmech/irish-word-frequency](https://github.com/michmech/irish-word-frequency))
2. Filter to 4-5 letter words
3. Run the puzzle finder script to discover valid combinations
4. Add them to the `PUZZLES` array in `src/Tomhas.jsx`

## Credits

- Word data: [teanglann.ie](https://www.teanglann.ie/) and [focloir.ie](https://www.focloir.ie/)
- Inspired by [Waffle](https://wafflegame.net/) and [Foclach](https://foclach.web.app/)
- Built with [React](https://react.dev/) + [Vite](https://vitejs.dev/)
