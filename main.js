import kaboom from "kaboom"


const k = kaboom()
k.loadSprite("bean", "sprites/player.png")
k.loadSprite("back","sprites/background.png")


setBackground(141, 183, 255)
//add Gravety
setGravity(1000)
const FLOOR_HEIGHT = 48;

scene("game",()=>{
	//adding a player
	const player = k.add([
		pos(80,40),
		sprite("bean"),
		area(),
		body(),
		"player",
	]);

	//add player jump
	onKeyPress("space",()=>{
		if (player.isGrounded()) {
			player.jump()
		}
	});

	//add platform
	const flor = k.add([
		rect(width(),FLOOR_HEIGHT),
		outline(4),
		pos(0,height()- 48),
		area(),
		body({isStatic : true}),

	]);

	//add enemy
	function spawnEnemy() {
		const enemy = k.add([
			rect(48,rand(32,96)),
			area(),
			outline(4),
			pos(width(),height() - FLOOR_HEIGHT),
			anchor("botleft"),
			color(225,225,180),
			move(LEFT,240),
			timer(),
			"enemy"
		]);
		wait(rand(3,2),spawnEnemy);
	}
	spawnEnemy();


	//add losing
	onCollide("player","enemy",(bullet,enemy) =>{
		go("lose",score);
	})

	//add score
	let score = 0;
	const scorlab = add([
		text(score),
		pos(24,24),
	]);
	onUpdate(()=>{
		score++;
		scorlab.text = Math.floor(score/50);
	})

	//losing secen
	scene("lose",(score)=>{
		const player = k.add([
			pos(80,40),
			sprite("bean"),
			area(),
			body(),
			"player",
		]);

		add([
			text(Math.floor(score/50)),
			pos(width() / 2, height() / 2 + 108),
			scale(3),
			anchor("center"),
		]);

		onKeyPress("space",()=>go("game"));
	})
	k.onClick(() => k.addKaboom(k.mousePos()))
})

go("game");