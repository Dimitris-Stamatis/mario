var bootState = {
    
    
    preload:function(){
		this.load.image('loadingBar','assets/loadingBar.png');
        this.load.image('loadingLogo','assets/loadingLogo.jpg');
    },
    
	create:function(){
        this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.stage.backgroundColor = '#5c94fc';
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas)

		game.state.start('load');
	},
};