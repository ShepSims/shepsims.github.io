// ===================================================
// Sprites
// ===================================================


//Define the Hero constructor function
function Hero(game, x, y) {
    
    // create new hero sprite
    Phaser.Sprite.call(this, game, x, y, 'hero');
    
    // put hero over bricks
    this.anchor.set(0.5, 0.5);
    
    // interaction physics
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
    
    // hero animations
    this.animations.add('stop', [0]);
    this.animations.add('run', [1, 2], 8, true); // 8fps looped
    this.animations.add('jump', [3]);
    this.animations.add('fall', [4]);
};

// inherit from Phaser.Sprite
Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

// define hero movement
Hero.prototype.move = function (direction) {
    SPEED = 200;
    this.body.velocity.x = direction * SPEED;
    
    // flip character if moving left
    if (this.body.velocity.x < 0) {
        this.scale.x = -1;
    }
    else if (this.body.velocity.x > 0) {
        this.scale.x = 1;
    }
}

// define jumping characteristics
Hero.prototype.canJump = true;
Hero.prototype.jump = function () {
    const FIRST_JUMP_SPEED = 600;
    const BUMP = 300;
    
    let firstJump = this.body.touching.down;

    if (firstJump) {
        this.body.velocity.y = -JUMP_SPEED;
    }

    return true;
};

Hero.prototype.bounce = function () {
    const BOUNCE_SPEED = 200;
    this.body.velocity.y = -BOUNCE_SPEED;
};

// get Hero animation 
Hero.prototype._getAnimationName = function () {
    let name = 'stop'; // default animation

    // jumping
    if (this.body.velocity.y < 0) {
        name = 'jump';
    }
    // note that body velocity y is actually > 0 when on a platform, it is just being blocked by platform
    else if (this.body.velocity.y >= 0 && !this.body.touching.down) {
        name = 'fall';
    }
    else if (this.body.velocity.x !== 0 && this.body.touching.down) {
        name = 'run';
    }

    return name;
};

Hero.prototype.update = function () {
    // update sprite animation, if it needs changing
    let animationName = this._getAnimationName();
    if (this.animations.name !== animationName) {
        this.animations.play(animationName);
    }
};

// =============
// Spider
// =============

function Spider(game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'spider');
    
    //anchor
    this.anchor.set(0.5);
    //animation
    this.animations.add('crawl', [0,1,2], 8, true);
    this.animations.add('die', [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3], 12);
    
    this.animations.play('crawl');
    
    // physic properties
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.velocity.x = Spider.SPEED;
}

Spider.SPEED = 100;

// inherit from Phaser.Sprite
Spider.prototype = Object.create(Phaser.Sprite.prototype);
Spider.prototype.constructor = Spider;

Spider.prototype.die = function () {
    this.body.enable = false;

    this.animations.play('die').onComplete.addOnce(function () {
        this.kill();
    }, this);
};

Spider.prototype.update = function () {
    // check against walls and reverse direction if necessary
    if (this.body.touching.right || this.body.blocked.right) {
        this.body.velocity.x = -Spider.SPEED; // turn left
    }
    else if (this.body.touching.left || this.body.blocked.left) {
        this.body.velocity.x = Spider.SPEED; // turn right
    }
};

function Fly(game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'fly');
    this.spawnx = x;
    this.spawny = y;
    this.moving = 'up';
    this.count = 0;
    
    //anchor
    this.anchor.set(1.5);
    //animation
    
    // physic properties
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.velocity.x = Fly.SPEED;
    this.body.velocity.y = -100;
}

Fly.SPEED = 200;

// inherit from Phaser.Sprite
Fly.prototype = Object.create(Phaser.Sprite.prototype);
Fly.prototype.constructor = Fly;

Fly.prototype.die = function () {
    this.body.enable = false;
    this.kill();
};

Fly.prototype.update = function () {
    if (this.moving == 'down' && this.count < 5){
        this.body.velocity.y += 10;
        this.count +=1;
    }
    else if (this.moving == 'up'){
        this.count+=1;
    }
    else{
        this.count = 0;
        if (this.moving == 'up') {
            this.moving = 'down';
        }
        else {
            this.moving = 'up';
        }
    }
    
    // check against walls and reverse direction if necessary
    if (this.body.touching.right || this.body.blocked.right) {
        this.body.velocity.x = -Fly.SPEED; // turn left
    }
    else if (this.body.touching.left || this.body.blocked.left) {
        this.body.velocity.x = Fly.SPEED; // turn right
    }
};




// ===================================================
// State
// ===================================================


State = {};

const LEVEL_COUNT = 3;

State.init = function (data) {

    this.keys = this.game.input.keyboard.addKeys({
        left: Phaser.KeyCode.LEFT,
        right: Phaser.KeyCode.RIGHT, 
        up: Phaser.KeyCode.UP
    });
    
    this.keys.up.onDown.add(function () {
        let didJump = this.hero.jump();
        if (didJump) {
            this.sfx.jump.play();
        }
    }, this);
    this.coinPickupCount = 0;
    this.hasKey = false;
    this.level = (data.level || 0) % LEVEL_COUNT;
};

// load game assets here
State.preload = function () {
    
    // load level data
    this.game.load.json('level:0', 'data/level00.json');
    this.game.load.json('level:1', 'data/level01.json');
    this.game.load.json('level:2', 'data/level01.json');
    
    // load background image 
    this.game.load.image('background', 'images/background.png');
    
    // load images for platforms
    this.game.load.image('ground', 'images/ground.png');
    this.game.load.image('grass:8x1', 'images/grass_8x1.png');
    this.game.load.image('grass:6x1', 'images/grass_6x1.png');
    this.game.load.image('grass:4x1', 'images/grass_4x1.png');
    this.game.load.image('grass:2x1', 'images/grass_2x1.png');
    this.game.load.image('grass:1x1', 'images/grass_1x1.png');
    this.game.load.image('icon:coin', 'images/coin_icon.png');
    this.game.load.image('font:numbers', 'images/numbers.png');
    this.game.load.image('key', 'images/key.png');
    
    // load boundaries for non-hero sprites
    this.game.load.image('invisible-wall', 'images/invisible_wall.png');
    
    //load sprite images
    this.game.load.spritesheet('hero', 'images/hero.png', 36, 42);  
    this.game.load.spritesheet('coin', 'images/coin_animated.png', 22, 22);
    this.game.load.spritesheet('spider', 'images/spider.png', 42, 32);
    this.game.load.spritesheet('door', 'images/door.png', 42, 66);
    this.game.load.spritesheet('icon:key', 'images/key_icon.png', 34, 30);
    this.game.load.spritesheet('fly', 'images/fly.png', 25, 25);
    
    //load game audio
    this.game.load.audio('sfx:jump', 'audio/jump.wav');  
    this.game.load.audio('sfx:coin', 'audio/coin.wav');
    this.game.load.audio('sfx:stomp', 'audio/stomp.wav');
    this.game.load.audio('sfx:key', 'audio/key.wav');
    this.game.load.audio('sfx:door', 'audio/door.wav');
};

// create game entities and set up world 
State.create = function () {
    
    // create sound entities
    this.sfx = {
        jump: this.game.add.audio('sfx:jump'),
        coin: this.game.add.audio('sfx:coin'), 
        stomp: this.game.add.audio('sfx:stomp'),
        key: this.game.add.audio('sfx:key'),
        door: this.game.add.audio('sfx:door')
    };
    
    // add background image
    this.game.add.image(0, 0, 'background');
    
    // load level data
    this._loadLevel(this.game.cache.getJSON(`level:${this.level}`));
    
    //create HUD
    this._createHud();
};

State._createHud = function () {
    
    // create and add key icon 
    this.keyIcon = this.game.make.image(0, 19, 'icon:key');
    this.keyIcon.anchor.set(0, 0.5);
    
    // create numbers font 
    const NUMBERS_STR = '0123456789X ';
    this.coinFont = this.game.add.retroFont('font:numbers', 20, 26,
        NUMBERS_STR, 6);
    
    // create coin icon and count
    let coinIcon = this.game.make.image(this.keyIcon.width+7, 0, 'icon:coin');
    let coinScoreImg = this.game.make.image(coinIcon.x + coinIcon.width, coinIcon.height / 2, this.coinFont);
    coinScoreImg.anchor.set(0, 0.5);
    
    // add all components to HUD
    this.hud = this.game.add.group();
    this.hud.add(coinIcon);
    this.hud.add(coinScoreImg);
    this.hud.add(this.keyIcon);
    this.hud.position.set(10, 10);
};


State.update = function () {
    this._handleCollisions();
    this._handleInput();
    this.coinFont.text = `x${this.coinPickupCount}`;
    this.keyIcon.frame = this.hasKey ? 1 : 0;
};

// collision handling 
State._handleCollisions = function () {
    this.game.physics.arcade.collide(this.hero, this.platforms);
    this.game.physics.arcade.collide(this.spiders, this.platforms);
    this.game.physics.arcade.collide(this.spiders, this.spriteWalls);
    this.game.physics.arcade.collide(this.flies, this.spriteWalls);
    this.game.physics.arcade.collide(this.flies, this.platforms);
    this.game.physics.arcade.overlap(this.hero, this.coins, this._onHeroVsCoin, null, this);
    this.game.physics.arcade.overlap(this.hero, this.spiders, this._onHeroVsEnemy, null, this);
    this.game.physics.arcade.overlap(this.hero, this.flies, this._onHeroVsEnemy, null, this);
    this.game.physics.arcade.overlap(this.hero, this.key, this._onHeroVsKey, null, this);
    this.game.physics.arcade.overlap(this.hero, this.door, this._onHeroVsDoor,
        // filter if there is no key or the player is on air
        function (hero, door) {
            return this.hasKey && hero.body.touching.down;
        }, this);
};

// input handling
State._handleInput = function () {
    if (this.keys.left.isDown) { // move hero left
        this.hero.move(-1);
    }
    else if (this.keys.right.isDown) { // move hero right
        this.hero.move(1);
    }
    else { // stop
        this.hero.move(0);
    }
};


// load level data
State._loadLevel = function (data) {
    
    // create all the groups/layers that we need
    this.bgDecoration = this.game.add.group();
    this.platforms = this.game.add.group();
    this.coins = this.game.add.group();
    this.spiders = this.game.add.group();
    this.spriteWalls = this.game.add.group();
    this.flies = this.game.add.group();
    
    // make sprite walls invisible
    this.spriteWalls.visible = false;
    
    // spawn platforms
    data.platforms.forEach(this._spawnPlatform, this);
    
    // spawn entities
    this._spawnCharacters({hero: data.hero, spiders: data.spiders, flies: data.flies});
    data.coins.forEach(this._spawnCoin, this);
    this._spawnDoor(data.door.x, data.door.y);
    this._spawnKey(data.key.x, data.key.y);
    
    // enable gravity
    const GRAVITY = 1200;
    this.game.physics.arcade.gravity.y = GRAVITY;
};

State._spawnDoor = function (x, y) {
    this.door = this.bgDecoration.create(x, y, 'door');
    this.door.anchor.setTo(0.5, 1);
    this.game.physics.enable(this.door);
    this.door.body.allowGravity = false;
};

State._spawnKey = function (x, y) {
    this.key = this.bgDecoration.create(x, y, 'key');
    this.key.anchor.set(0.5, 0.5);
    this.game.physics.enable(this.key);
    this.key.body.allowGravity = false;
    // animate up and down 
    this.key.y -= 3;
    this.game.add.tween(this.key)
        .to({y: this.key.y + 6}, 800, Phaser.Easing.Sinusoidal.InOut)
        .yoyo(true)
        .loop()
        .start();
};

State._spawnPlatform = function (platform) {
    let sprite = this.platforms.create(platform.x, platform.y, platform.image);

    this.game.physics.enable(sprite);

    sprite.body.allowGravity = false;
    sprite.body.immovable = true;
    
    this._spawnSpriteWall(platform.x, platform.y, 'left');
    this._spawnSpriteWall(platform.x + sprite.width, platform.y, 'right');
};

State._spawnCharacters = function (data) {
    
    // spawn hero
    this.hero = new Hero(this.game, data.hero.x, data.hero.y);
    this.game.add.existing(this.hero);
    
    //spawn spiders
    data.spiders.forEach(function (spider) {
        let sprite = new Spider(this.game, spider.x, spider.y);
        this.spiders.add(sprite);
    }, this);
    
    //spawn flies
    data.flies.forEach(function (fly) {
        let sprite = new Fly(this.game, fly.x, fly.y);
        this.flies.add(sprite);
    }, this);
};

State._spawnCoin = function (coin) {
    let sprite = this.coins.create(coin.x, coin.y, 'coin');
    sprite.anchor.set(0.5, 0.5);
    sprite.animations.add('rotate', [0, 1, 2, 1], 6, true); // 6fps, looped
    sprite.animations.play('rotate');
    this.game.physics.enable(sprite);
    sprite.body.allowGravity = false;
};

State._spawnSpriteWall = function (x, y, side) {
    let sprite = this.spriteWalls.create(x, y, 'invisible-wall');
    // anchor and y displacement
    sprite.anchor.set(side === 'left' ? 1 : 0, 1);

    // physic properties
    this.game.physics.enable(sprite);
    sprite.body.immovable = true;
    sprite.body.allowGravity = false;
};

State._onHeroVsCoin = function (hero, coin) {
    this.sfx.coin.play();
    coin.kill();
    this.coinPickupCount++;
};

State._onHeroVsEnemy = function (hero, enemy) {
    if (hero.body.velocity.y > 0) { // kill enemies when hero is falling
        hero.bounce();
        enemy.die();
        this.sfx.stomp.play();
    }
    else { // game over -> restart the game
        this.sfx.stomp.play();
        this.game.state.restart(true, false, { level: this.level });
    }
};

State._onHeroVsKey = function (hero, key) {
    this.sfx.key.play();
    key.kill();
    this.hasKey = true;
};

State._onHeroVsDoor = function (hero, door) {
    this.sfx.door.play();
    this.game.state.restart(true, false, { level: this.level + 1 });
    // TODO: go to the next level instead
};

// ==========================
// Entry Point for game
// ==========================

window.onload = function () {
    let game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');
    game.state.add('play', State);
    game.state.start('play', true, false, {level:0});
};