import { IBaseScene, AlignGrid } from "..";
/**
 * The base scene includes extra information
 * as well as the standard scene
 * passed to other classes as the IBaseScene interface
 */
export declare class BaseScene extends Phaser.Scene implements IBaseScene {
    gw: number;
    gh: number;
    grid: AlignGrid;
    /**
     * coordinates from align grid
     */
    ch: number;
    cw: number;
    cd: number;
    constructor(sceneName: string);
    /**
     *
     * @returns alginGrid
     */
    getGrid(): AlignGrid;
    /**
     * overridden in scene class
     */
    create(): void;
    resetSize(w: number, h: number): void;
    /**
     * make the align grid
     * @param r rows
     * @param c columns
     */
    makeGrid(r?: number, c?: number): void;
    placePhysicImage(key: string, pos: number, scale: number): Phaser.Physics.Arcade.Sprite;
    placeImage(key: string, pos: number, scale: number): Phaser.GameObjects.Sprite;
    placeImage2(key: string, col: number, row: number, scale: number): Phaser.GameObjects.Sprite;
    /**
     *
     * @returns the real scene
     */
    getScene(): Phaser.Scene;
    /**
     *
     * @returns the games width
     */
    getW(): number;
    /**
     *
     * @returns the game height
     */
    getH(): number;
    /**
     * Plays a sound effect
     * @param soundKey
     */
    playSound(soundKey: string): void;
}
