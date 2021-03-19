import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/mapa1.js";

export default class CenaJogo extends Cena{
    quandoColidir(a,b){
        
        if (!this.aRemover.includes(a)) {
            this.aRemover.push(a);
        }
        if (!this.aRemover.includes(b)) {
            this.aRemover.push(b);
        }
        if (!a.tags.has("enemy") &&  b.tags.has("enemy")) {
            this.rodando = false;
            this.game.selecionaCena("fim") ;
        }
       this.assets.play("boom");
    }
    preparar(){
        super.preparar();
        const mapa1 = new Mapa(10, 14, 32);
        mapa1.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa1);

        const pc = new Sprite({x: 56,y:148});
        pc.tags.add("pc");
        const cena = this;
        pc.controlar = function(dt){
            if (cena.input.comandos.get("MOVE_ESQUERDA")) {
                this.vx = -0.3;
            }else if (cena.input.comandos.get("MOVE_DIREITA")) {
                this.vx = 0.3;
            }else{
                this.vx = 0;
            }
            if (cena.input.comandos.get("MOVE_CIMA")) {
                this.vy = -0.5;
            }else if (cena.input.comandos.get("MOVE_BAIXO")) {
                this.vy = 0.5;
            }else{
                this.vy = 0;
            }
        };

        function perseguePC(dt){
            this.vx = 0.15 * Math.sign(pc.x - this.x);
            this.vy = 0.15 * Math.sign(pc.y - this.y);
        }

        this.adicionar(pc);
        const en1 = new Sprite({x:365,y:110,color: "red", controlar: perseguePC, tags:["enemy"]});
        this.adicionar(en1);
        this.adicionar(new Sprite({x:135, y:45, vx:0.4, color: "red",controlar:perseguePC, tags:["enemy"]}));
        this.adicionar(new Sprite({x:140, y:260, vx:0.4, color: "red",controlar:perseguePC, tags:["enemy"]}));

        //this.adicionaSpriteAle(15);
        //this.reposicionarSprite(4000);
    }
}