import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js"
import Mapa from "./Mapa.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/mapa1.js";
import InputManager from "./InputManager.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("grama","assets/fundo1.png");
assets.carregaImagem("fundo","assets/fundo.png");
assets.carregaImagem("madeira","assets/madeira.png");
assets.carregaAudio("moeda","assets/coin.wav");
assets.carregaAudio("boom","assets/boom.wav");

const canvas = document.querySelector("canvas");
canvas.width = 14 * 32;
canvas.height = 10 * 32;

input.configurarTeclado(
    {
        "ArrowLeft" : "MOVE_ESQUERDA",
        "ArrowRight" : "MOVE_DIREITA",
        "ArrowUp" : "MOVE_CIMA",
        "ArrowDown" : "MOVE_BAIXO",
    }
);

const cena1 = new Cena(canvas, assets);

const mapa1 = new Mapa(10, 14, 32);
mapa1.carregaMapa(modeloMapa1);
cena1.configuraMapa(mapa1);

const pc = new Sprite({x: 56,y:148});

pc.controlar = function(dt){
    if (input.comandos.get("MOVE_ESQUERDA")) {
        this.vx = -0.3;
    }else if (input.comandos.get("MOVE_DIREITA")) {
        this.vx = 0.3;
    }else{
        this.vx = 0;
    }
    if (input.comandos.get("MOVE_CIMA")) {
        this.vy = -0.5;
    }else if (input.comandos.get("MOVE_BAIXO")) {
        this.vy = 0.5;
    }else{
        this.vy = 0;
    }
};

function perseguePC(dt){
    this.vx = 0.15 * Math.sign(pc.x - this.x);
    this.vy = 0.15 * Math.sign(pc.y - this.y);
}

cena1.adicionar(pc);
const en1 = new Sprite({x:365,y:110,color: "red", controlar: perseguePC});
cena1.adicionar(en1);
cena1.adicionar(new Sprite({x:135, y:45, vx:0.4, color: "red",controlar:perseguePC}));
cena1.adicionar(new Sprite({x:140, y:260, vx:0.4, color: "red",controlar:perseguePC}));

//cena1.adicionaSpriteAle(15);
//cena1.reposicionarSprite(4000);

cena1.iniciar();

document.addEventListener("keydown", (e) =>{
    switch (e.key) {
        case "s":
            cena1.iniciar();
            break;
        case "p":
            cena1.parar();
            break;  
        case "c":
            assets.play("moeda");
            break;
        case "b":
            assets.play("boom");
            break;     
    }
});