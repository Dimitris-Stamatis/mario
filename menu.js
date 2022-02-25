var menuState = {
	create: function(){
		menu = game.add.sprite(0,0,'menu');
        menu.scale.setTo(0.3);
        menu_sound = game.add.audio('menu');
        menu_sound.play();
        key = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        key.onDown.addOnce(this.actionOnPush,this);
        //button = game.add.button(115,430,'button',this.actionOnClick,this,2,1,0);
		//button.scale.setTo(0.7);
	},
	
	actionOnPush:function(){
        menu_sound.stop();
		game.state.start('play');
	},
};