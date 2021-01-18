import { get_random_int as rand } from "./accessory_functions";

export function fillMap(rectangleArray, width, height)
{
    let mapArray = new Array();    
    for (let w = 0; w < width; w++)
    {
        mapArray[w] = new Array();
        for (let h = 0; h < height; h++)
        {
            mapArray[w][h] = 0;
        }
    }

    for (let currentRectangle of rectangleArray)
    {        
        let secondCornerX = currentRectangle.corner_x + currentRectangle.size_x;
        let secondCornerY = currentRectangle.corner_y + currentRectangle.size_y;
        for (let w = currentRectangle.corner_x; w < secondCornerX; w++)
        {
            //console.log("w = " + w);
            for (let h = currentRectangle.corner_y; h < secondCornerY; h++)
            {
                //console.log("h = " + h);
                //console.log("mapArray[" + (w - 1) + "][" + (h - 1)  + "]" + mapArray[w - 1][h - 1]);
                // mapArray[w][h - 1] = 1; // original
                mapArray[w][h] = 1;
            }
        }
    }
    mapArray = addPedastrianArea(mapArray);
    return  addHouses(mapArray);
}

function addPedastrianArea(mapArray) {
    for (let x = 1; x < mapArray.length - 1; x++) {
        for (let y = 1; y < mapArray[0].length- 1; y++) {
            if (mapArray[x][y] == 0 && (mapArray[x - 1][y] == 1 || mapArray[x + 1][y] == 1 || mapArray[x][y - 1] == 1 || mapArray[x][y + 1] == 1
                                        || mapArray[x - 1][y - 1] == 1 || mapArray[x + 1][y - 1] == 1 || mapArray[x - 1][y + 1] == 1 || mapArray[x + 1][y + 1] == 1)){
                mapArray[x][y] = 2;
            }
        }
    }

    for (let x = 1; x < mapArray.length - 1; x++) {        
        if (mapArray[x][1] == 1){
            mapArray[x][1] = 2;        
        }

        if (mapArray[x][mapArray[0].length - 2] == 1){
            mapArray[x][mapArray[0].length - 2] = 2;  
        }      
    }    

    
    for (let y = 1; y < mapArray[0].length- 1; y++) {
        if (mapArray[1][y] == 1) {
            mapArray[1][y] = 2;
        }

        if (mapArray[mapArray.length - 2][y] == 1) {
            mapArray[mapArray.length - 2][y] = 2;
        }
    }        
    
    return mapArray;
}

function addHouses(mapArray) {
    let houseArea = 7
    for (let x = 2; x < mapArray.length - 2 - houseArea; x++) {
        for (let y = 2; y < mapArray[0].length - 2 - houseArea; y++) {
            let placeIsHere = true;
            for (let xi = x; xi < x + houseArea; xi ++) {
                for (let yi = y; yi < y + houseArea; yi ++) {
                    if (mapArray[xi][yi] != 0) {
                        placeIsHere = false;
                        break;
                    }
                }        
            }        

            if (placeIsHere) {                
                for (let xi = x; xi < x + houseArea; xi ++) {
                    for (let yi = y; yi < y + houseArea; yi ++) {
                        mapArray[xi][yi] = 4;
                    }        
                }        

                let randomTileNumberX = rand(x, x + houseArea - 2);
                let randomTileNumberY = rand(y, y + houseArea - 2);
                mapArray[randomTileNumberX][randomTileNumberY] = 3;
                mapArray[randomTileNumberX + 1][randomTileNumberY] = 3;
                mapArray[randomTileNumberX][randomTileNumberY + 1] = 3;
                mapArray[randomTileNumberX + 1][randomTileNumberY + 1] = 3;
            }
        } 
    }

    return mapArray;
}