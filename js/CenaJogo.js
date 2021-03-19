import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/mapa1.js";

export default class CenaJogo extends Cena{
    constructor(){
        super();
        this.criar = 2;
        this.pc = null;
    }
    passo(dt){
       
        for (const sprite of this.sprites) {
            sprite.passo(dt);
        }
        this.criar = this.criar - 1 * dt;
        if (this.criar < 0) {
            this.criar = 2 ;
            this.criaSpriteAle();
        }
    }
    quandoColidir(a,b){

        if (!a.tags.has("enemy") &&  b.tags.has("enemy")) {
            this.assets.play("boom");
            this.rodando = false;
            this.game.selecionaCena("fim") ;
            if (!this.aRemover.includes(b)) {
                this.aRemover.push(b);
            }
        }
        if (!a.tags.has("pc") &&  b.tags.has("pc")) {
            this.assets.play("boom");
            this.rodando = false;
            this.game.selecionaCena("fim") ;
            if (!this.aRemover.includes(a)) {
                this.aRemover.push(a);
            }
        }
    }
    valorCriado(min,max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max-min+1)) + min ; 
    }
    corCriado(min,max) {
        let cor = null;
        let x = null;
        min = Math.ceil(min);
        max = Math.floor(max);
        x = Math.floor(Math.random() * (max - min + 1)) + min;
        cor = `hsl ($ {x}, 50%, 50%)`;
        console.log(cor);
        return cor;
    }
    
    criaSpriteAle(n=1){
        const pc = this.pc;
        for (let i = 0; i < n; i++) {
            let sprite = new Sprite({
                x : this.valorCriado(100, 200),
                y : this.valorCriado(100, 200),
                vx : this.valorCriado(-10, 10),
                vy : this.valorCriado(-10, 10),
                cor : this.corCriado(0,360),
                controlar : function perseguePC(dt){
                    this.vx =30 * Math.sign(pc.x - this.x);
                    this.vy = 30 * Math.sign(pc.y - this.y);
                },
                tags: ["enemy"],
            });
            
            this.adicionar(sprite);
            sprite.passo(0);
        }
        
    }
    
    preparar(){
        super.preparar();
        const mapa1 = new Mapa(10, 14, 32);
        mapa1.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa1);

        const pc = new Sprite({x: 56,y:148, color:"#708090",tags:["pc"]});
        this.pc = pc;
        pc.tags.add("pc");
        const cena = this;
        pc.controlar = function(dt){
            if (cena.input.comandos.get("MOVE_ESQUERDA")) {
                this.vx = -800;
            }else if (cena.input.comandos.get("MOVE_DIREITA")) {
                this.vx = 800;
            }else{
                this.vx = 0;
            }
            if (cena.input.comandos.get("MOVE_CIMA")) {
                if (this.vy < 0.1) {
                    this.vy = -300;
                }
            }else if (cena.input.comandos.get("MOVE_BAIXO")) {
                this.vy = 800;
            }else{
                //this.vy = 0;
            }
        };  
        this.adicionar(pc);
        
    } 
}
