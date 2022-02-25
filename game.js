var game = new Phaser.Game(256, 240, Phaser.AUTO);

game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('menu',menuState);
game.state.add('play',Mario);
game.state.add('win',winState);
game.state.add('defeat',defeatState);
game.state.start('boot');