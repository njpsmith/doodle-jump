import Game from './core/Game.js';

const canvas = document.getElementById('game');
canvas.width = 400;
canvas.height = 600;

const game = new Game(canvas);
game.start();
