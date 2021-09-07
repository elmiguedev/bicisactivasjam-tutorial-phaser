import Phaser from "phaser";
import FondoPng from "../assets/img/fondo.png";
import BiciPng from "../assets/img/bici.png";
import AceitePng from "../assets/img/aceite.png";
import MusicaMp3 from "../assets/sounds/music.mp3";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }

    preload() {
        // pre cargamos nuestros recursos
        this.load.image("fondo", FondoPng);
        this.load.image("aceite", AceitePng);
        this.load.spritesheet("bici", BiciPng, {
            frameWidth: 64,
            frameHeight: 64,
        })

        this.load.audio("musica",MusicaMp3);

    }

    create() {

        // agregar el fondo
        this.crearFondo();

        // crea la linea de la calle
        this.crearLineas();

        // agregar la bici
        this.crearChanguito();

        // crear las teclas
        this.crearTeclas();

        // crea obstaculos
        this.crearObstaculos();

        // crea las colisiones
        this.crearColisiones();
    
        // crea el puntaje
        this.crearPuntaje();

        // crea la musica
        this.crearMusica(); 
    }

    update() {

        // controlar el movimiento del changuito
        if (this.teclaAbajo.isDown) {
            this.bici.y += 5;
        }

        if (this.teclaArriba.isDown) {
            this.bici.y -= 5;
        }

        // controlar la linea de la calle
        this.linea.x -= 5;
        if (this.linea.x < 0) {
            this.linea.x = 320;
        }

        // controlar el movimiento de los obstaculos
        const obstaculos = this.obstaculos.getChildren();
        for (const obstaculo of obstaculos) {
            obstaculo.x -= 5;
            if (obstaculo.x < 0) {
                obstaculo.destroy();
            }
        }

        // controlar puntaje
        this.puntaje++;
        this.puntajeTexto.setText("Puntaje: " + this.puntaje);

    }

    crearFondo() {
        this.fondo = this.add.image(0, 0, "fondo");
        this.fondo.setOrigin(0);
    }

    crearChanguito() {
        this.anims.create({
            key: "bici_movimiento",
            frames: this.anims.generateFrameNames("bici"),
            repeat: -1,
            frameRate: 12
        })
        this.bici = this.physics.add.sprite(50, 100, "bici");
        this.bici.play("bici_movimiento");

        this.bici.body.setSize(32,32);

    }

    crearTeclas() {
        this.teclaArriba = this.input.keyboard.addKey("up");
        this.teclaAbajo = this.input.keyboard.addKey("down");

    }

    crearLineas() {
        this.linea = this.add.rectangle(320,100,20,5,0xFFFFFF)
    }

    crearObstaculos() {
        this.obstaculos = this.physics.add.group();
        this.timerObstaculos = setInterval(() => {
            const y = Phaser.Math.Between(20,140);
            const obstaculo = this.physics.add.image(320,y,"aceite");
            this.obstaculos.add(obstaculo);
        }, 1000);
    }

    crearColisiones() {
        this.physics.add.collider(this.bici,this.obstaculos, (b,o) => {
            clearInterval(this.timerObstaculos);
            this.sound.stopAll();
            this.scene.start("GameOverScene", {
                puntaje: this.puntaje
            });
        })
    }

    crearPuntaje() {
        this.puntaje = 0;
        this.puntajeTexto = this.add.text(10, 10, "Puntaje: " + this.puntaje);
    }

    crearMusica() {
        this.sound.play("musica");
    }



}