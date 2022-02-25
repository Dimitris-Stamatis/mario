var loadState = {
	preload: function(){
		//  We need this because the assets are on github pages
        //  Remove the next 2 lines if running locally
        this.load.baseURL = 'https://Dimitris-Stamatis.github.io/pacman/';
        this.load.crossOrigin = 'anonymous';
		
		var loadingLabel = game.add.image(game.world.centerX - (353/2*0.7),20,'loadingLogo');
        loadingLabel.scale.setTo(0.7);
		var loadingBar = this.add.sprite(game.world.centerX - (288/2),400,'loadingBar');
        this.load.setPreloadSprite(loadingBar);
		this.load.spritesheet('tiles', 'assets/tileset.png', 16,16);
        this.load.image('hp_image','assets/hp.png');
        this.load.image('missile','assets/missile.png');
        this.load.image('warning','assets/nuke.png');
		this.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
		this.load.spritesheet('mario', 'assets/trump.png', 15, 17);
		this.load.spritesheet('coin', 'assets/dollar.png', 16, 16);
        this.load.spritesheet('win','assets/win.png',800,532.8)
		this.load.audio('theme','audio/trump_theme2.ogg');
        this.load.audio('jump','audio/jump.wav');
        this.load.audio('coin','audio/trump_coin.ogg');
        this.load.audio('death','audio/death_trump.ogg');
        this.load.audio('stomp','audio/stomp_trump.ogg');
        this.load.audio('missileKill','audio/missile_kill.ogg');
        this.load.audio('incoming','audio/nukes.ogg');
        this.load.audio('victory','audio/victory.ogg');
		this.load.tilemap('level', 'assets/super_mario_map.json', null,Phaser.Tilemap.TILED_JSON);
        this.load.image('menu','assets/menuFinal.jpg');
        this.load.audio('menu','audio/menu.ogg');
	},
	
	create: function(){
		game.state.start('menu');	
	},
};
