import buildLevel from "../src/utils/level_procedural_generator/level-builder";
import CharacterFactory from "../src/characters/character_factory";
import Union from "../src/ai/steerings/union"
import Group from "../src/characters/group";
import auroraSpriteSheet from '../assets/sprites/characters/aurora.png'
import playerCar from '../assets/sprites/cars/playerCar.png';
import punkSpriteSheet from '../assets/sprites/characters/punk.png'
import blueSpriteSheet from '../assets/sprites/characters/blue.png'
import yellowSpriteSheet from '../assets/sprites/characters/yellow.png'
import greenSpriteSheet from '../assets/sprites/characters/green.png'
import slimeSpriteSheet from '../assets/sprites/characters/slime.png'
import streetTileSetSheet from "../assets/streetTilesets/asphalt.png";
import Footsteps from "../assets/audio/footstep_ice_crunchy_run_01.wav";
import EffectsFactory from "../src/utils/effects-factory";
import tilemapPng from '../assets/tileset/Dungeon_Tileset.png'
import {create_map} from "../src/utils/evseenko_chukhin/map_creation";
import CellularAutomataMapGenerator from '../src/utils/automata_generator/map-generator';
import CellularAutomataLevelBuilder from '../src/utils/automata_generator/level-builder';
import { TILES } from '../src/utils/automata_generator/tiles'; 

let scene_chukhin_evseenko = new Phaser.Class({

    Extends: Phaser.Scene,


    initialize: function StartingScene() {
        Phaser.Scene.call(this, {key: 'scene_chukhin_evseenko'});
    },

    effectsFrameConfig: {frameWidth: 32, frameHeight: 32},
    streetTileSetFrameConfig: {frameWidth: 32, frameHeight: 32},
    characterFrameConfig: {frameWidth: 31, frameHeight: 31},    
    slimeFrameConfig: {frameWidth: 32, frameHeight: 32},

    preload: function () {
        //this.load.image("islands-tiles", tilemapPng);
        this.load.image("tiles", tilemapPng);
        //loading spitesheets
        //this.load.spritesheet('aurora', auroraSpriteSheet, this.characterFrameConfig);
        //this.load.spritesheet('aurora', small_car, this.small_car);
        this.load.image('playerCar', playerCar);
        this.load.spritesheet("streetTileSet", streetTileSetSheet, this.streetTileSetFrameConfig);
        this.load.spritesheet('blue', blueSpriteSheet, this.characterFrameConfig);
        this.load.spritesheet('green', greenSpriteSheet, this.characterFrameConfig);
        this.load.spritesheet('yellow', yellowSpriteSheet, this.characterFrameConfig);
        this.load.spritesheet('punk', punkSpriteSheet, this.characterFrameConfig);
        this.load.spritesheet('slime', slimeSpriteSheet, this.slimeFrameConfig);
        this.load.audio('footsteps', Footsteps);
        //this.effectsFactory = new EffectsFactory(this);
    },

    create: function () {
        this.gameObjects = [];
        this.characterFactory = new CharacterFactory(this);
        this.level++;
        this.tileSize = 32;
        //this.effectsFactory.loadAnimations();

        create_map(32, this);

        this.input.keyboard.once("keydown_D", event => {
            // Turn on physics debugging to show player's hitbox
            this.physics.world.createDebugGraphic();

            const graphics = this.add
                .graphics()
                .setAlpha(0.75)
                .setDepth(20);
        });
    },

    update: function () {
        if (this.gameObjects) {
            this.gameObjects.forEach( function(element) {
                element.update();
            });
        }
    },

    tileToPixels({ x, y }) {
        return { x: x * this.tileSize, y: y * this.tileSize };
    }
});

export default scene_chukhin_evseenko
