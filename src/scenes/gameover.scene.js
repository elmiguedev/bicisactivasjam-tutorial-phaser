import Phaser from "phaser";

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOverScene");
    }

    init(data) {
        this.puntaje = data.puntaje;
    }

    preload() {
        
    }

    create() {
        this.mensaje = this.add.text(160,100,"- Game Over - tu puntaje fue: " + this.puntaje);
        this.mensaje.setOrigin(0.5);

        this.teclaEnter = this.input.keyboard.addKey("enter");
        
    }

    update() {
        if (this.teclaEnter.isDown) {
            this.scene.start("MainScene");
        }
    }
}