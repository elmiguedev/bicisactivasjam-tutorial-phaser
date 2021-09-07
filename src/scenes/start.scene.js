import Phaser from "phaser";

export default class StartScene extends Phaser.Scene {
    constructor() {
        super("StartScene")
    }

    preload() {

    }
    
    create() {
        this.mensaje = this.add.text(160,100,"Presione ENTER para iniciar");
        this.mensaje.setOrigin(0.5);

        this.teclaEnter = this.input.keyboard.addKey("enter");

    }

    update() {

        if (this.teclaEnter.isDown) {
            this.scene.start("MainScene");
        }

    }
}