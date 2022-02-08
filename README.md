# phaser_utility

Project Title - Phaser Utility
=======================================

Intro - Utility Classes for use with the Phaser.io Framework

* * *
Needing some extra functionailty in Phaser I made these helper classes to assist me in scaling and placing
game objects based on the width or height of a game. This is extremely useful on mobile devices

### List of features

*   Scale Objects proporunately to a percentage of the game's width or height
*   Align Objects on a grid that scales to the screen size
*   Place objects in grid squares by number (0,1,2) or by coordinates (x:10,y:2)
*   Center Objects on the stage
*   Adds a few extra helpful functions

### Example

https://www.youtube.com/watch?v=JeTY0wfVtXg

### Code Demo

```Example Usage

import { BaseScene } from "phaser-utility/scenes/BaseScene";

//extend with BaseScene instead of Phaser.Scene

export class SceneMain extends BaseScene
{
    constructor()
    {
        super("SceneMain");
    }
    preload()
    {
        this.load.image("face","./assets/face.png");
    }
    create()
    {
        //initilize the variables in BaseScene
        super.create();

        //extra functions

        //get the game's width and height
        let width:number=this.getW();
        let height:number=this.getH();

        //create a grid system on the stage
    
        let rows:number=11;
        let cols:number=11;
        this.makeGrid(rows,cols);

        //show the grid for debugging
        this.grid.show();

        //make an image
        let face=this.add.image(0,0,"face");
        
        //scale the object to 50% of the canvas width        
        //Align.scaleToGameW(object, percentage, baseScene);

        Align.scaleToGameW(face,0.5,this);
        
         //place the object on the grid
        let x:number=5;
        let y:number=3;
        this.grid.placeAt(x,y,face);
    }
}

```

### Align Class


#### Scale To Game Width
Align.scaleToGameW(object,percent,baseScene);

#### Scale To Game Height
Align.scaleToGameH(object,percent,baseScene);

### center object horizonta
Align.centerH(obj: IGameObj, scene: IBaseScene);

### center object verticle
Align.centerV(obj, scene: IBaseScene);

### center both horizontal and verticle
Align.center(obj, baseScene);

### center both horiontal and verticle with an object of an orientation of (0,0)
Align.center2(obj,baseScene);

### get number of pixles from top of canvas based on percentage
Align.getYPer(percent, baseScene);

### get number of pixles from left of canvas based on percentage
Align.getXPer(percent, baseScene);

### center 1 object to the center of a second object
Align.centerToObj(obj1, obj2);


### Download & Installation

```
npm i phaser-utility
```
or
```
yarn add phaser-utility
```


### Authors
William Clarkson

https://williamclarkson.net
https://phasergames.com