
var score = 0;
        var score_text;
        var win_text;
        var missile_timeout =10;
        var check=false;
        var missilesKilled = 0;
        var enemiesKilled = 0;
        var victory = false;
		var Mario =  {};
        Mario.prototype = {
			function create() {
			
			game.stage.backgroundColor = '#5c94fc';

			map = game.add.tilemap('level');
			map.addTilesetImage('tileset', 'tiles');
			map.setCollisionBetween(198, 298, true, 'solid');

			map.createLayer('background');

			layer = map.createLayer('solid');
			layer.resizeWorld();

			coins = game.add.group();
			coins.enableBody = true;
			map.createFromTiles(278, null, 'coin', 'stuff', coins);
			coins.callAll('animations.add', 'animations', 'spin',
					[ 0, 0, 1, 2 ], 3, true);
			coins.callAll('animations.play', 'animations', 'spin');
            missiles = game.add.group();
            missiles.enableBody = true;
            map.createFromTiles(42,null,'missile','stuff',missiles);
            missiles.setAll('body.velocity.x',-100);
            missile_barrage();
			goombas = game.add.group();
			goombas.enableBody = true;
			map.createFromTiles(410, null, 'goomba', 'stuff', goombas);
			goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
					2, true);
			goombas.callAll('animations.play', 'animations', 'walk');
			goombas.setAll('body.bounce.x', 1);
			goombas.setAll('body.velocity.x', -20);
			goombas.setAll('body.gravity.y', 500);
			music = game.add.audio('theme');
            jump_sound = game.add.audio('jump');
            death_sound = game.add.audio('death');
            coin_sound = game.add.audio('coin');
            stomp_sound = game.add.audio('stomp');
            missileKill_sound = game.add.audio('missileKill');
            incoming_sound = game.add.audio('incoming');
            victory_sound = game.add.audio('victory');
            music.volume = 0.3;
            death_sound.volume = 1.6;
            jump_sound.volume = 0.2;
            stomp_sound.volume = 1;
            incoming_sound.volume = 0.5;
			music.loopFull();
			player = game.add.sprite(16, game.world.height - 48, 'mario');
			game.physics.arcade.enable(player);
			player.body.gravity.y = 370;
			player.body.collideWorldBounds = true;
			player.animations.add('walkRight', [ 1, 2, 3 ], 10, true);
			player.animations.add('walkLeft', [ 0, 4, 4 ], 10, true);
			player.goesRight = true;
            var style = {font: "Bold Arial",fontSize: '10px',fill:"#fff"};
            score_text = game.add.text(0,0,"Score: "+score,style);
            win_text = game.add.text(0,0,"",style);
            win_text.fixedToCamera = true;
			game.camera.follow(player);
            score_text.fixedToCamera=true;
            lives=game.add.group();
            lives_text = game.add.text(165,4,'Lives: ',{font: "Bold 16px serif",fill:"white"});
            lives_text.fixedToCamera = true;
            warning = game.add.sprite(120,0,'warning');
            warning.scale.setTo(0.5,0.5);
            warning.visible = false;
            warning.fixedToCamera = true;
            for(var i=0;i<3;i++){
                var life = lives.create(193+(20*i),0,'hp_image');
                life.scale.setTo(0.4,0.4);
                life.fixedToCamera = true;
            }
            win = game.add.sprite(0,0,'win');
            win.scale.setTo(0.33,0.45);
            win.animations.add('dealWithIt',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,24,24,24],8,false);
            win.visible = false;
            win.fixedToCamera = true;
			cursors = game.input.keyboard.createCursorKeys();
		}
        
        function missile_barrage(){
            game.time.events.add(Phaser.Timer.SECOND*this.missile_timeout, function() {
                if(player.x<1687&&victory==false){
                   map.createFromTiles(109,null,'missile','stuff',missiles);
                    missiles.setAll('body.velocity.x',-100);
                    missiles.enableBody = true;
                    incoming_sound.play();
                    this.missile_timeout+=6;
                    this.warning.visible = true;
                    game.time.events.add(Phaser.Timer.SECOND*7, function(){this.warning.visible = false;});
                }
				this.missile_barrage(); 
            });
        }

		function update() {
			game.physics.arcade.collide(player, layer);
			game.physics.arcade.collide(goombas, layer);
			game.physics.arcade.overlap(player, goombas, goombaOverlap);
			game.physics.arcade.overlap(player, coins, coinOverlap);
            game.physics.arcade.overlap(player, missiles, goombaOverlap);
            score_text.text = 'Score '+score+"\nCoins left: "+coins.countLiving();
            if(player.x>1990 && player.y>150){
                player.position.x=16;
                player.position.y=game.world.height - 48;
            }
            if (coins.countLiving()==0){
                score_text.text = 'Score: '+(score+1000)+"\nYou have aqcuired all coins\n(Bonus 1000 points)!";
                if(check==false){
                    music.stop();
                    victory_sound.play();
                    game.time.events.add(Phaser.Timer.SECOND*2,function(){
                        win_text.text = '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tVICTORY!\nScore: '+(score+1000)+'\nNukes Destroyed: '+missilesKilled+'\nEnemies Killed: '+enemiesKilled+'\nDied '+(3-lives.countLiving())+' times';
                        player.body.enable = false;
                        game.world.bringToTop(win);
                        win.visible = true;
                        win.animations.play('dealWithIt');
                        game.world.bringToTop(win_text);
                        victory = true;
                    });
                }
                check=true;
                
            }
			if (player.body.enable) {
				player.body.velocity.x = 0;
				if (cursors.left.isDown) {
					player.body.velocity.x = -90;
					player.animations.play('walkLeft');
					player.goesRight = false;
				} else if (cursors.right.isDown) {
					player.body.velocity.x = 90;
					player.animations.play('walkRight');
					player.goesRight = true;
				} else {
					player.animations.stop();
					if (player.goesRight)
						player.frame = 1;
					else
						player.frame = 0;
				}

				if (cursors.up.isDown && player.body.onFloor()) {
					player.body.velocity.y = -190;
                    jump_sound.play();
					player.animations.stop();
				}

				if (player.body.velocity.y != 0) {
					if (player.goesRight)
						player.frame = 5;
					else
						player.frame = 12;
				}
			}
		}

		function coinOverlap(player, coin) {
            coin_sound.play();
			coin.kill();
            score+=10;
		}
      

		function goombaOverlap(player, goomba) {
			if (player.body.touching.down) {
				goomba.animations.stop();
				goomba.frame = 2;
				goomba.body.enable = false;
				player.body.velocity.y = -80;
                if(goombas.children.indexOf(goomba)>-1){
                    stomp_sound.play();
                    game.time.events.add(Phaser.Timer.SECOND, function() {
					goomba.kill();
                    enemiesKilled++;
				    });
                }else{
                    missileKill_sound.play();
                    score+=50;
                    goomba.kill();
                    missilesKilled++;
                }				
                score+=50;
			} else {
                player.body.enable = false;
				player.frame = 7;
                death_sound.play();
				player.animations.stop();
                live = lives.getFirstAlive();
                if(live){
                    live.kill();
                }
                if(lives.countLiving()<1){
                    music.stop();
                    game.time.events.add(Phaser.Timer.SECOND * 2, function() {
					game.paused = true;
				    });
                }else{
                    player.position.x=16;
                    player.position.y=game.world.height - 48;
                    player.frame=0;
                    player.body.enable = true;
                    score = 0;
                    coins.callAll('revive');
                    missiles.callAll('kill');
                    goombas.callAll('kill');
                    goombas = game.add.group();
                    goombas.enableBody = true;
                    map.createFromTiles(410, null, 'goomba', 'stuff', goombas);
                    goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],2, true);
                    goombas.callAll('animations.play', 'animations', 'walk');
                    goombas.setAll('body.bounce.x', 1);
                    goombas.setAll('body.velocity.x', -20);
                    goombas.setAll('body.gravity.y', 500);
                    missiles = game.add.group();
                    missiles.enableBody = true;
                    map.createFromTiles(42,null,'missile','stuff',missiles);
                    missiles.setAll('body.velocity.x', -100);
                }
                    
                
            }
                    
                
				
        }
};
		

		
		