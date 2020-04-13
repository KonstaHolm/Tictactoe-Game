export default class Intro extends Phaser.Scene {
	constructor() {
		super({
			key: 'Intro'
		});
	}
	preload() {
		this.load.audio('intro_music', ['/assets/audio/01-opening.ogg']);
		this.load.image('background', '/assets/sprites/titlescreen/background.png');
		this.load.image('bgbox', '/assets/sprites/titlescreen/bgbox.png');
		this.load.image('title', '/assets/sprites/titlescreen/title.png');
		this.load.image('tictactoe', '/assets/sprites/titlescreen/tictactoetitle.png');
		this.load.image('startbutton', '/assets/sprites/titlescreen/startbutton.png');
		this.load.image('championships', '/assets/sprites/titlescreen/championshipstitle.png');


		var progress = this.add.graphics();
		const self = this;
		this.load.on('progress', function(value) {
			progress.clear();
			progress.fillStyle(0x42f456, 1);
			progress.fillRect(0, 300, 800 * value, 20);
		});

		this.load.on('complete', function() {
			progress.destroy();
		});
	}
	create() {

		/*==========================================
		= Audio
		============================================
		*/
		this.intro_music = this.sound.add('intro_music', {
			mute: false,
			volume: 0.2,
			loop: true
		});
		this.intro_music.play();

		/*==========================================
		= Position GameObjects
		============================================
		*/

		this.background = this.add.image(0, 0, 'background').setOrigin(0,0);
		this.bgbox = this.add.image(0, 0, 'bgbox').setOrigin(0, 0).setAlpha(0);
	
		this.title = this.add.image(this.game.config.width / 2, 110, 'title').setAlpha(0);
		this.championships = this.add.image(this.game.config.width / 2, 200, 'championships').setAlpha(0);
		this.tictactoe = this.add.image(this.game.config.width / 2, 220, 'tictactoe').setAlpha(0);
		this.startbutton = this.add.image(this.game.config.width / 2, 270, 'startbutton').setAlpha(0);

		/*==========================================
		= Animate GameObjects
		============================================
		*/

		this.bgboxTween = this.tweens.timeline({
			targets: this.bgbox,
			ease: 'Linear',
			loop: 0,
			tweens: [
				{
					alpha: 0.5,
					ease: 'Linear',
					duration: 2000,
					delay: 1000,
					repeat: 0
				}
			]
		});

		this.titleTween = this.tweens.timeline({
			targets: this.title,
			ease: 'Linear',
			loop: 0,
			tweens: [
				{
					y: 100,
					alpha: 1,
					ease: 'Linear',
					duration: 1000,
					delay: 0,
					repeat: 0,
				},
				{
					y: 110,
					alpha: 1,
					ease: 'Linear',
					duration: 600,
					delay: 0,
					repeat: -1,
					yoyo: true
				}
			]
		});

		this.ChampionshipTween = this.tweens.timeline({
			targets: this.championships,
			ease: 'Linear',
			loop: 0,
			tweens: [
				{
					y: 170,
					alpha: 1,
					ease: 'Linear',
					duration: 600,
					delay: 1000,
					repeat: 0
				}
			]
		});

		this.tictactoeTween = this.tweens.timeline({
			targets: this.tictactoe,
			ease: 'Linear',
			loop: 0,
			tweens: [
				{
					y: 200,
					alpha: 1,
					ease: 'Linear',
					duration: 600,
					delay: 1300,
					repeat: 0
				}
			]
		});

		this.startbuttonTween = this.tweens.timeline({
			targets: this.startbutton,
			ease: 'Linear',
			loop: 0,
			tweens: [
				{
					y: 240,
					alpha: 1,
					ease: 'Linear',
					duration: 500,
					delay: 1600,
					repeat: 0
				}
			]
		});

		/*==========================================
		= Actions
		============================================
		*/
		this.keys = this.input.keyboard.addKeys('ENTER,SPACE');

		this.startbutton.setInteractive().on('pointerdown', () => {
			this.intro_music.stop();
			this.scene.start('Level1');
		});

	}
	update(delta) {
		if(this.keys.SPACE.isDown || this.keys.ENTER.isDown){
			this.scene.start('Level1');
		}
	}
}
