import { Math } from "phaser";
import Mine from "./mine";

export default class PlayerCar extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, name, frame, params, unitDirectionVector) {
        super(scene, x, y, name, frame);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        //this.lastMineTime = 0;       
        this.vectorLeft = new Phaser.Math.Vector2(0, 0);        
        this.vectorUp = new Phaser.Math.Vector2(0, 0);                       
        this.vectorRight =  new Phaser.Math.Vector2(0, 0);        
        this.vectorDown = new Phaser.Math.Vector2(0, 0);        
        
        this.abilities  = params.abilities || [];     
        this.unitDirectionVector = unitDirectionVector;   
        this.angle = this.unitDirectionVector.angle() * 360 / Phaser.Math.PI2;      
        //this.scene.input.keyboard.on('rightdown', this.playerUnitVectors.right = Phaser.Math.Vector2.RIGHT)      
        this.buttonLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.buttonUp = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.buttonRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.buttonDown = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);        
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
        if (this.buttonLeft.isDown) {
            this.vectorLeft.set(-1, 0);  
            console.log("left");
        }
        else {
            this.vectorLeft.set(0, 0);            
        }
        
        if (this.buttonUp.isDown) {
            this.vectorUp.set(0, -1);            
            console.log("Up");
        }      
        else {
            this.vectorUp.set(0, 0);
        }

        if (this.buttonRight.isDown) {
            this.vectorRight.set(1, 0);
            console.log("Right");
        }
        else {
            this.vectorRight.set(0, 0);
        }

        if (this.buttonDown.isDown) {
            this.vectorDown.set(0, 1);
            console.log("Down");
        }
        else {
            this.vectorDown.set(0, 0);
        }

        console.log(this.vectorLeft);
        console.log(this.vectorUp);
        console.log(this.vectorRight);
        console.log(this.vectorDown);
        
        /*if (this.buttonRight.isDown) {
            let vec = new Phaser.Math.Vector2(1, 0);
            console.log(vec);
            console.log(this.playerUnitVectors.right);
            this.playerUnitVectors.right.set(1, 0);            
            console.log(vec);
            console.log(this.playerUnitVectors.right);
            console.log(this.playerUnitVectors);
            console.log("Right");
        }*/
        //console.log(this.playerUnitVectors);

        
        //console.log(this.vectorArray);
        //console.log(this.vectorRight);
        //console.log(this.playerUnitVectors);        
        /*
        if (cursors.left.isDown) {
            console.log(cursors);
            playerUnitVectors.left = Phaser.Math.Vector2.LEFT;    
            //console.log(playerUnitVectors);
            cursors.left.isDown = false;
        }

        if (cursors.up.isDown) {
            console.log(cursors);
            playerUnitVectors.up = Phaser.Math.Vector2.UP;
            //console.log(playerUnitVectors);
            cursors.up.isDown = false;
        }
        

        if (cursors.right.isDown) {            
            playerUnitVectors.right = Phaser.Math.Vector2.RIGHT;
            console.log(cursors);
            cursors.right.isDown = false;
            //console.log(playerUnitVectors);
        }
        
        if (cursors.down.isDown) {
            console.log(cursors);
            playerUnitVectors.down = Phaser.Math.Vector2.DOWN;
            //console.log(playerUnitVectors);
            cursors.down.isDown = false;
        } */             
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
