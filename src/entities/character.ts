export class Character {

    public sprite: Phaser.Sprite;
    private cursors: Phaser.CursorKeys;

    private inAir: boolean = false;
    private doubleJumped: boolean = false;
    private inJumpMaxSpeed: number;

    private accSpeed: number = 20;
    private deAccSpeed: number = 60;
    private maxSpeed: number = 600;
    private jumpHeight: number = 600;

    constructor (
        public game: Phaser.Game,
        public physics: Phaser.Physics,
        public x: number,
        public y: number,
        public assetUrl: string
    ) {
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.sprite = this.game.add.sprite(20, 20, "runner");
        this.physics.arcade.enable(this.sprite);
        this.sprite.anchor.setTo(0.1, 0.1);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setSize(50, 50, 0, 0);
        this.sprite.body.velocity.x = 0;
        this.cursors.up.onDown.add( () => {this.jump()});

        this.sprite.animations.add('left', [0, 1, 2], 10, true);
        this.sprite.animations.add('flyleft', [0], 10, true);
        this.sprite.animations.add('standleft', [2], 10, true);
        this.sprite.animations.add('right', [3, 4, 5], 10, true);
        this.sprite.animations.add('flyright', [5], 10, true);
        this.sprite.animations.add('standright', [3], 10, true);

        this.sprite.play('flyright');
    }

    update() {
        if(this.sprite.body.onFloor() || this.sprite.body.onCeiling()){
            this.game.paused = true;
            this.game.add.text(100, 100, "You are dead!", {});
        }


        if(this.inAir && (this.sprite.body.touching.down || this.sprite.body.blocked.down)) {
            this.inAir = false;
            this.doubleJumped = false;
        }

        let speed = this.accSpeed;
        let maxSpeed  = this.maxSpeed;
        if(this.inAir){
            maxSpeed = this.inJumpMaxSpeed;
        }
        if (this.cursors.left.isDown){
            if(this.sprite.body.velocity.x > 0) speed = this.deAccSpeed;
            if(this.sprite.body.velocity.x > (maxSpeed * -1)){
                this.sprite.body.velocity.x -= speed;
            }
            if(this.inAir){
                this.sprite.play('flyleft');
            }
            else {
                this.sprite.play('left');
            }
        }
        else if (this.cursors.right.isDown){
            if(this.sprite.body.velocity.x < 0) speed = this.deAccSpeed;
            if(this.sprite.body.velocity.x < maxSpeed){
                this.sprite.body.velocity.x += speed;
            }
            if(this.inAir){
                this.sprite.play('flyright');
            }
            else {
                this.sprite.play('right');
            }
        }
        else {
            this.sprite.body.velocity.x -= (this.sprite.body.velocity.x * 0.05)
            if(this.sprite.body.velocity.x > 0 && this.sprite.body.velocity.x < 40){
                if(this.inAir){
                    this.sprite.play('flyright');
                }
                else{
                    this.sprite.play('standright');
                }
                this.sprite.body.velocity.x = 0;
            }
            else if(this.sprite.body.velocity.x < 0 && this.sprite.body.velocity.x >= -40){
                if(this.inAir){
                    this.sprite.play('flyleft');
                }
                else{
                    this.sprite.play('standleft');
                }
                this.sprite.body.velocity.x = 0;
            }
        }
    }

    jump() {
        this.inJumpMaxSpeed = Math.abs(this.sprite.body.velocity.x) + 50
        if(!this.inAir || !this.doubleJumped){
            if(this.inAir){
                this.doubleJumped = true;
            }
            this.inAir = true;
            this.sprite.body.velocity.y = -1 * this.jumpHeight;
        }
    }
}
