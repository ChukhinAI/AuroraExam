import {StateTableRow, StateTable} from '../ai/behaviour/state';
import Slime from "./slime";
import Player from "./player";
import PlayerCar from "./playerCar";
import cyberpunkConfigJson from "../../assets/animations/cyberpunk.json";
import slimeConfigJson from "../../assets/animations/slime.json";
import mineConfigJson from '../../assets/animations/mine.json';
import AnimationLoader from "../utils/animation-loader";
import Vector from "../accessoryClasses/vector.js";

import Mine from "./mine";
import SmartSlime from './minerScene/smartSlime';
import NPC from "../characters/npc";

export default class CharacterFactory {



    constructor(scene) {
        this.scene = scene;

        this.cyberSpritesheets =  ['aurora', 'blue', 'yellow', 'green', 'punk'];
        this.slimeSpriteSheet = 'slime';  

        this.mineSpriteSheet = 'mine';
        const slimeStateTable = new StateTable(this);
        slimeStateTable.addState(new StateTableRow('searching', this.foundTarget, 'jumping'));
        slimeStateTable.addState(new StateTableRow('jumping', this.lostTarget, 'searching'));

        let animationLibrary =  new Map();
        this.cyberSpritesheets.forEach(
            function (element) {
                animationLibrary.set(element, new AnimationLoader(scene,
                    element,
                    cyberpunkConfigJson,
                    element).createAnimations());
            }
        );
        animationLibrary
            .set(this.mineSpriteSheet, new AnimationLoader(scene, this.mineSpriteSheet, mineConfigJson, this.mineSpriteSheet)
            .createAnimations());
        animationLibrary
            .set(this.slimeSpriteSheet,
            new AnimationLoader(scene, this.slimeSpriteSheet, slimeConfigJson, this.slimeSpriteSheet)
                .createAnimations());
        this.animationLibrary = animationLibrary;
    }

    buildCharacter(spriteSheetName, x, y, params = {}) {
        switch (spriteSheetName) {
            case 'green':
            case 'punk':
            //case 'aurora'
            case 'playerCar':
            case 'blue':
            case 'yellow':
                if (params.player)
                    return this.buildPlayerCharacter(spriteSheetName, x, y, params);
                else {
                    if (params.Steering)
                        return this.buildNPCCharacter(spriteSheetName, x, y, params);
                    else
                        return this.buildCyberpunkCharacter(spriteSheetName, x, y, params);
                }
            case "slime":
                return this.buildSlime(x, y, params);
            case "mine":
                return this.buildMine(x, y, params);
        }
    }


    buildNPCCharacter(spriteSheetName, x, y, params) {
        let character = new NPC(this.scene, x, y, spriteSheetName, 2, params.Steering);
        character.animationSets = this.animationLibrary.get(spriteSheetName);
        return character;
    }

    buildPlayerCharacter(spriteSheetName, x, y, params = {}) {
        let unitDirectionVector = new Vector(0, -1);
        let character = new PlayerCar(this.scene, x, y, spriteSheetName, 0, params, unitDirectionVector);        
        //let character = new Player(this.scene, x, y, spriteSheetName, 2, params);
        character.maxSpeed = 600;   
        character.minSpeed = -100;        
        character.setCollideWorldBounds(true);
        character.cursors = this.scene.input.keyboard.createCursorKeys();        
        //character.animationSets = this.animationLibrary.get('aurora');
        //todo: not here
        /*character.footstepsMusic = this.scene.sound.add('footsteps', {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });*/
        //todo uncomment at your won risk - these footsteps will get you insane
        // character.footstepsMusic.play();

        character.engineSound = this.scene.sound.add('engineSound', {
            mute: false,
            volume: 0.5, // 1
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });

        character.switchGearSound = this.scene.sound.add('switchGearSound', {
            mute: false,
            volume: 0.5, // 1
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        });

        character.engineStartSound = this.scene.sound.add('engineStartSound', {
            mute: false,
            volume: 1.2, // 1
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        });

        character.engineGear1Sound = this.scene.sound.add('engineGear1Sound', {
            mute: false,
            volume: 0.2, // 1
            rate: 0.6,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });

        character.engineGear2Sound = this.scene.sound.add('engineGear2Sound', {
            mute: false,
            volume: 0.2, // 1
            rate: 0.6,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });

        character.engineGear3Sound = this.scene.sound.add('engineGear3Sound', {
            mute: false,
            volume: 0.3, // 1
            rate: 0.6,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });

        return character;

    }

    buildCyberpunkCharacter(spriteSheetName, x, y, params) {
        return this.scene.physics.add.sprite(x, y, spriteSheetName, 2);

        //todo: add mixin
    }

    buildSlime(x, y, params) {
        const slimeType = params.slimeType;
        let slime;
        if (params.useSteering) {
            slime = new SmartSlime(this.scene, x, y, this.slimeSpriteSheet, 9*slimeType);
        } else {
            slime = new Slime(this.scene, x, y, this.slimeSpriteSheet, 9 * slimeType);
        }

        slime.animations = this.animationLibrary
                .get(this.slimeSpriteSheet)
                .get(this.slimeNumberToName(slimeType));
        slime.setCollideWorldBounds(true);
        slime.speed = 40;
        return slime;
    }

    slimeNumberToName(n)
    {
        switch (n) {
            case 0: return 'Blue';
            case 1: return 'Green';
            case 2: return 'Orange';
            case 3: return 'Pink';
            case 4: return 'Violet';
        }

    }
    
    buildMine(x, y, params) {
        let mine = new Mine(this.scene, x, y, this.mineSpriteSheet, 0);
        mine.animations = this.animationLibrary.get(this.mineSpriteSheet).get("Mine");
    }
}
