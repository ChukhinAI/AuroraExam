import Leaf from "./leaf";
import { get_random_int as rand } from "./accessory_functions";
import {fillMap} from"./fill_map";
import Rectangle from "./rectangle";
const TILE_MAPPING = {
    BLANK: 17,
    FLOOR: 95
}

const LEVEL_TO_TILE ={
    0: TILE_MAPPING.BLANK,
    1: TILE_MAPPING.FLOOR
}

const STREET_TILESET_MAPPING = {
    ASPHALT: [0, 1, 2, 3],
    GRASS : [4, 5, 6, 7],
    ROOF : [8, 9, 10, 11],
    PEDASTRIAN_AREA : [12, 12, 12, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19]
}

const LEVEL_TO_STREET_TILESET ={
    0: STREET_TILESET_MAPPING.GRASS,
    1: STREET_TILESET_MAPPING.ASPHALT
}

export function create_map(tile_size, scene) {
    const MAX_LEAF_SIZE = 80;
    let width = 200;
    let height = 200;
    let leafs = []; // new Array
//console.log(scene);
// сначала создаём лист, который будет "корнем" для всех остальных листьев.
// let root = new Leaf(0, 0, _sprMap.width, _sprMap.height);
    let root = new Leaf(0, 0, width, height); // пока 200 х 200
    leafs.push(root);

    let did_split = true;
// циклически снова и снова проходим по каждому листу в нашем leafs, пока больше не останется листьев, которые можно разрезать.
    while (did_split) {
        did_split = false;
        for (let current_leaf of leafs) // тут было for each
        {
            //console.log(current_leaf);
            if (current_leaf.leftChild == undefined && current_leaf.rightChild == undefined) // если лист ещё не разрезан...
            {
                // если этот лист слишком велик, или есть вероятность 75%...
                if (current_leaf.width > MAX_LEAF_SIZE || current_leaf.height > MAX_LEAF_SIZE || Math.random() > 0.25) {
                    if (current_leaf.split()) // разрезаем лист!
                    {
                        // если мы выполнили разрезание, передаём дочерние листья в Vector, чтобы в дальнейшем можно было в цикле обойти и их
                        leafs.push(current_leaf.leftChild);
                        leafs.push(current_leaf.rightChild);
                        did_split = true;
                    }
                }
            }
        }
    }
    let rectangleArray = [];
    root.createRooms(rectangleArray);
    let randomNumber = rand(0, rectangleArray.length);
    let auroraX = (rand(rectangleArray[randomNumber].corner_x + 1,
        rectangleArray[randomNumber].corner_x - 1 + rectangleArray[randomNumber].size_x) - 0.5) * tile_size;
    let auroraY = (rand(rectangleArray[randomNumber].corner_y + 1,
        rectangleArray[randomNumber].corner_y - 1 + rectangleArray[randomNumber].size_y) - 0.5) * tile_size;
    /*let auroraX = (rand(rectangleArray[randomNumber].corner_x,
        rectangleArray[randomNumber].corner_x + rectangleArray[randomNumber].size_x) - 1) * tile_size;
    let auroraY = (rand(rectangleArray[randomNumber].corner_y,
        rectangleArray[randomNumber].corner_y + rectangleArray[randomNumber].size_y) - 1) * tile_size;*/
    create_halls(leafs, 2, rectangleArray);
    let map_matrix = fillMap(rectangleArray, width, height);

    scene.map = scene.make.tilemap({tileWidth: tile_size,
        tileHeight: tile_size,
        width: width,
        height: height});
    let tileSet = scene.map.addTilesetImage("tiles", null, tile_size, tile_size);   
    let streetTileSet = scene.map.addTilesetImage("streetTileSet", null, tile_size, tile_size)    
    let grassLayer = scene.map.createBlankDynamicLayer("Grass", streetTileSet);    
    let roadsLayer  = scene.map.createBlankDynamicLayer("Roads", streetTileSet);
    let pedastrianAreaLayer = scene.map.createBlankDynamicLayer("Pedastrian Area", streetTileSet);
    let roofLayer  = scene.map.createBlankDynamicLayer("Roofs", streetTileSet);
    let layerArray = [grassLayer, roadsLayer, pedastrianAreaLayer, roofLayer];
    //let carLayer   = scene.map.createBlankDynamicLayer("Stuff", tileSet);
    /*grassLayer.setDepth(0);
    roadsLayer.setDepth(1);
    roofLayer.setDepth(2);*/
    //stuffLayer.setDepth(3);

    let randomTileNumer = 0;
    for (let x = 0; x < width; x++)
    {
        for (let y = 0; y < height; y++)
        {
            switch(map_matrix[x][y]) {
                case 0:  
                    randomTileNumer = rand(0, STREET_TILESET_MAPPING.GRASS.length - 1);
                    grassLayer.putTileAt(STREET_TILESET_MAPPING.GRASS[randomTileNumer], x, y);
                    break;
                case 1: 
                    randomTileNumer = rand(0, STREET_TILESET_MAPPING.ASPHALT.length - 1);
                    roadsLayer.putTileAt(STREET_TILESET_MAPPING.ASPHALT[randomTileNumer], x, y);
                    break;
                case 2:
                    randomTileNumer = rand(0, STREET_TILESET_MAPPING.PEDASTRIAN_AREA.length - 1);
                    pedastrianAreaLayer.putTileAt(STREET_TILESET_MAPPING.PEDASTRIAN_AREA[randomTileNumer], x, y);
                    break;
                case 3:                    
                    roofLayer.putTileAt(STREET_TILESET_MAPPING.ROOF[0], x, y);       
                    roofLayer.putTileAt(STREET_TILESET_MAPPING.ROOF[1], x + 1, y);       
                    roofLayer.putTileAt(STREET_TILESET_MAPPING.ROOF[2], x, y + 1);       
                    roofLayer.putTileAt(STREET_TILESET_MAPPING.ROOF[3], x + 1, y + 1);                           
                    
                    map_matrix[x + 1][y] = -1;
                    map_matrix[x][y + 1] = -1;
                    map_matrix[x + 1][y + 1] = -1;
                    
                    break;
                case 4:
                    randomTileNumer = rand(0, STREET_TILESET_MAPPING.GRASS.length - 1);
                    grassLayer.putTileAt(STREET_TILESET_MAPPING.GRASS[randomTileNumer], x, y);
                    break;
              }            
        }
    }

    /*for (let x = 1; x < width - 1; x++)
    {
        for (let y = 1; y < height - 1; y++)
        {
            if (map_matrix[x][y] == 0 
                && map_matrix[x - 1][y] == 0 && map_matrix[x][y - 1] == 0 && map_matrix[x + 1][y] == 0 && map_matrix[x][y + 1] == 0
                && map_matrix[x - 1][y - 1] == 0 && map_matrix[x + 1][y - 1] == 0 && map_matrix[x + 1][y + 1] == 0 && map_matrix[x - 1][y + 1] == 0)
            {                
                roofLayer.putTileAt(STREET_TILESET_MAPPING.ROOF, x, y);
                map_matrix[x][y] == 3;
            }            
        }
    }*/

    settingWorld(scene, layerArray);
    scene.player = scene.characterFactory.buildCharacter('playerCar', auroraX, auroraY,{player: true});
    //scene.player.setDepth(5);    
    
    //scene.player = scene.characterFactory.buildCharacter('player', auroraX, auroraY,{player: true});
    scene.gameObjects.push(scene.player);
    
    console.log(scene);
    /*scene.physics.add.collider(scene.player, groundLayer);
    scene.physics.add.collider(scene.player, stuffLayer);
    scene.physics.add.collider(scene.player, outsideLayer);*/
    const camera = scene.cameras.main;
    camera.setZoom(1);
    camera.setBounds(0, 0, scene.map.widthInPixels, scene.map.heightInPixels);
    camera.startFollow(scene.player);
    camera.roundPixels = true;
    //return {"Grass": grassLayer, "Roads": roadsLayer, "Roofs": roofLayer};
}

function create_halls(leafs, hallSize, rectangleArray)
{
    for (let current_leaf of leafs)
    {
        if (current_leaf.leftChild != undefined && current_leaf.rightChild != undefined)
        {
            let room1 = current_leaf.leftChild.get_room();
            let room2 = current_leaf.rightChild.get_room();
            let x1 = rand(room1.corner_x + hallSize, room1.corner_x + room1.size_x - hallSize);
            let y1 = rand(room1.corner_y + hallSize, room1.corner_y + room1.size_y - hallSize);
            let x2 = rand(room2.corner_x + hallSize, room2.corner_x + room2.size_x - hallSize);
            let y2 = rand(room2.corner_y + hallSize, room2.corner_y + room2.size_y - hallSize);
            let minX = Math.min(x1, x2) - hallSize;
            let minY = Math.min(y1, y2) - hallSize;
            let maxX = Math.max(x1, x2) - hallSize;
            let maxY = Math.max(y1, y2) - hallSize;
            let width = x1 - x2;
            let height = y1 - y2;
            let mainDiag = width * height >= 0;
            let choise = Math.random() >= 0.5;
            width = Math.abs(width) + 2 * hallSize;
            height = Math.abs(height) + 2 * hallSize;
            let horX, horY, vertX, vertY;
            if (choise)
            {
                horX = minX;
                horY = minY;
            }
            else
            {
                horX = minX;
                horY = maxY;
            }
            if (choise && mainDiag || !choise && !mainDiag)
            {
                vertX = maxX;
                vertY = minY;
            }
            else
            {
                vertX = minX;
                vertY = minY;
            }
            if (height > hallSize)
            {
                let rectangle = new Rectangle(vertX, vertY, 2 * hallSize, height);
                rectangleArray.push(rectangle);

            }
            if (width > hallSize)
            {
                let rectangle = new Rectangle(horX, horY, width, 2 * hallSize);
                rectangleArray.push(rectangle);
            }
        }
    }
}

function settingWorld(scene, layerArray)
{
    /*scene.physics.add.collider(scene, outsideLayer);
    scene.physics.add.collider(scene, groundLayer);
    scene.physics.add.collider(scene, stuffLayer);*/
    scene.physics.world.setBounds(0,0, scene.map.widthInPixels,
        scene.map.heightInPixels, true);
    for (let layer of layerArray) {
        layer.setCollisionBetween(1, 500);
    }
    /*groundLayer.
    //stuffLayer.setDepth(10);
    //outsideLayer.setDepth(9999);
    outsideLayer.setCollisionBetween(1, 500);*/
}
