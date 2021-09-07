import Phaser from "phaser";
import GameOverScene from "./scenes/gameover.scene.js";
import MainScene from "./scenes/main.scene.js";
import StartScene from "./scenes/start.scene.js";

new Phaser.Game({
    type: Phaser.AUTO,
    width: 320,
    height: 200,
    zoom: 2,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    },
    render: {
        pixelArt: true
    },
    scene: [
        StartScene,
        MainScene,
        GameOverScene
    ]
});