import { Math } from "phaser";
import Mine from "./mine";

let playerUnitVectors = {
    left : Phaser.Math.Vector2.ZERO,
    up : Phaser.Math.Vector2.ZERO,
    right : Phaser.Math.Vector2.ZERO,
    down : Phaser.Math.Vector2.ZERO
}

export default class PlayerCar extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, name, frame, params, unitDirectionVector) {
        super(scene, x, y, name, frame);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        //this.lastMineTime = 0;
        this.abilities  = params.abilities || [];     
        this.unitDirectionVector = unitDirectionVector;   
        this.angle = this.unitDirectionVector.angle() * 360 / Phaser.Math.PI2;        
    }

    update() {
        const body = this.body;
        this.body.setVelocity(0);
        const speed = this.maxSpeed;
        const cursors = this.cursors;
        
        /*if (this.abilities.includes('mines'))
        {
            if (cursors.space.isDown && this.scene.time.now - this.lastMineTime > 1000) {
                this.lastMineTime = this.scene.time.now;
                this.scene.characterFactory.buildMine(this.body.x, this.body.y);
            }
        }*/
        //this.body.setAcceleration()        

        this.checkPlayerActions(cursors);

        /*if (cursors.left.isDown) {            
            body.velocity.x -= speed;
        } else if (cursors.right.isDown) {
            body.velocity.x += speed;
        }

        // Vertical movement
        if (cursors.up.isDown) {
            body.setVelocityY(-speed);
        } else if (cursors.down.isDown) {
            body.setVelocityY(speed);
        }*/
        // Normalize and scale the velocity so that player can't move faster along a diagonal
        body.velocity.normalize().scale(speed);
        //this.updateAnimation();
    };

    checkPlayerActions(cursors) {
        for (let currentVector in playerUnitVectors) {
            //console.log(playerUnitVectors);
            currentVector = Phaser.Math.Vector2.ZERO;
        }
        
        if (cursors.left.isDown) {
            console.log(playerUnitVectors);
            playerUnitVectors.left = Phaser.Math.Vector2.LEFT;    
            console.log(playerUnitVectors);
            cursors.left.isDown = false;
        }

        if (cursors.up.isDown) {
            console.log(playerUnitVectors);
            playerUnitVectors.up = Phaser.Math.Vector2.UP;
            console.log(playerUnitVectors);
            cursors.up.isDown = false;
        }

        if (cursors.right.isDown) {
            console.log(playerUnitVectors);            
        }

        if (cursors.right.isDown) {            
            playerUnitVectors.right = Phaser.Math.Vector2.RIGHT;
            console.log(playerUnitVectors);
            cursors.right.isDown = false;
            console.log(playerUnitVectors);
        }

        if (cursors.down.isDown) {
            console.log(playerUnitVectors);
            playerUnitVectors.down = Phaser.Math.Vector2.DOWN;
            console.log(playerUnitVectors);
            cursors.down.isDown = false;
        }                
    }

    /*updateAnimation() {
        const animations = this.animationSets.get('Walk');
        const animsController = this.anims;
        const x = this.body.velocity.x;
        const y = this.body.velocity.y;
        if (x!==0 || y !== 0 && this.footstepsMusic.isPaused)
        {
            this.footstepsMusic.resume();
        }
        if (x < 0) {
            animsController.play(animations[0], true);
        } else if (x > 0) {
            animsController.play(animations[1], true);
        } else if (y < 0) {
            animsController.play(animations[2], true);
        } else if (y > 0) {
            animsController.play(animations[3], true);
        } else {
            this.footstepsMusic.pause();
            const currentAnimation = animsController.currentAnim;
            if (currentAnimation) {
                const frame = currentAnimation.getLastFrame();
                this.setTexture(frame.textureKey, frame.textureFrame);
            }
        }
    }*/
}
