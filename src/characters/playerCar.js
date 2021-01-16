import { Math } from "phaser";
import Mine from "./mine";
import Vector from "../accessoryClasses/vector.js"

export default class PlayerCar extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, name, frame, params, unitDirectionVector) {
        super(scene, x, y, name, frame);
        scene.physics.world.enable(this);
        scene.add.existing(this);                

        this.leftVector = new Vector(-1, 0);
        this.upVector = new Vector(0, -1);
        this.rightVector = new Vector(1, 0);
        this.downVector = new Vector(0, 1);        
        
        this.unitDirectionVector = unitDirectionVector;   
        this.angle = this.unitDirectionVector.angleInDegrees();      

        this.buttonLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.buttonUp = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.buttonRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.buttonDown = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);        

        this.abilities  = params.abilities || [];                             
    }

    update() {
        const body = this.body;
        this.body.setVelocity(0);
        const speed = this.maxSpeed;
        const cursors = this.cursors;

        let cursorResultVector = this.checkPlayerActions(cursors);
        console.log(cursorResultVector);
        let crossZCoordinate = cursorResultVector.crossZCoordinate(this.unitDirectionVector);

        let rotationDirection = 0;
        if (crossZCoordinate > 0) {
            rotationDirection = -1;
        }

        if (crossZCoordinate < 0) {
            rotationDirection = 1;
        }

        console.log(this.unitDirectionVector);
        this.unitDirectionVector.rotateOnAngleInDegrees(crossZCoordinate * 5);
        console.log(this.unitDirectionVector);        
        this.angle = this.unitDirectionVector.angleInDegrees(); 
        console.log(this.angle);  

        /*if (this.abilities.includes('mines'))
        {
            if (cursors.space.isDown && this.scene.time.now - this.lastMineTime > 1000) {
                this.lastMineTime = this.scene.time.now;
                this.scene.characterFactory.buildMine(this.body.x, this.body.y);
            }
        }*/
        //this.body.setAcceleration()    

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
        let result = new Vector(0, 0);          
        
        if (this.buttonLeft.isDown) {
            result.add(this.leftVector);
        }        
        
        if (this.buttonUp.isDown) {
            result.add(this.upVector);
        }      

        if (this.buttonRight.isDown) {
            result.add(this.rightVector);            
        }        

        if (this.buttonDown.isDown) {
            result.add(this.downVector);
        }   
        
        return result;
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
        }*/    
}
