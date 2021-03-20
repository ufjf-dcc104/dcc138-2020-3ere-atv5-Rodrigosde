export default class Sprite{
    /*
    É responsável por modelar algo que 
    se move na tela.
    */

    constructor({
        x=100,
        y=100,
        vx=0,
        vy=0,
        w=20,
        h=20,
        cor = "#FAFAD2",
        controlar = ()=>{},
        tags = ["pc"],
}={}){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.w = w;
        this.h = h;
        this.cor = cor;
        this.cena = null;
        this.mx = 0;
        this.my = 0; 
        this.controlar =controlar;
        this.tags = new Set();
        tags.forEach((tag)=>{this.tags.add(tag);});      
    }
    desenhar(ctx){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x - this.w/2, this.y - this.h/2, this.w,this.h);
        ctx.strokeStyle = "grey";
        ctx.strokeRect(
            this.mx*this.cena.mapa.SIZE , 
            this.my*this.cena.mapa.SIZE ,
            this.cena.mapa.SIZE ,
            this.cena.mapa.SIZE 
            )

    }
    controlar(dt){

    }
    mover(dt){
        
        this.vy = this.vy + 300*dt;
        const dx = Math.min(Math.abs(this.vx * dt),this.w/2 - 1);
        const sx = Math.sign(this.vx);
        const dy = Math.min(Math.abs(this.vy * dt),this.h/2 - 1);
        const sy = Math.sign(this.vy);
        this.x = this.x + sx*dx;
        this.y = this.y + sy*dy;
        
        this.mx = Math.floor(this.x / this.cena.mapa.SIZE);
        this.my = Math.floor(this.y / this.cena.mapa.SIZE);
    }
    passo(dt){
       this.controlar(dt);
       this.mover(dt);
    }
    colidiuCom(outro){
        return !(
            this.x - this.w/2 > outro.x + outro.w/2 ||
            this.x + this.w/2 < outro.x - outro.w/2 ||
            this.y - this.h/2 > outro.y + outro.h/2 ||
            this.y + this.h/2 < outro.y - outro.h/2
        );
    }
    aplicaRestricoes(dt) {
        this.aplicaRestricoesDireita(this.mx + 1, this.my - 1);
        this.aplicaRestricoesDireita(this.mx + 1, this.my);
        this.aplicaRestricoesDireita(this.mx + 1, this.my + 1);
        this.aplicaRestricoesEsquerda(this.mx - 1, this.my - 1);
        this.aplicaRestricoesEsquerda(this.mx - 1, this.my);
        this.aplicaRestricoesEsquerda(this.mx - 1, this.my + 1);

        this.aplicaRestricoesBaixo(this.mx - 1, Math.min(this.my + 1, this.cena.mapa.LINHAS-1));
        this.aplicaRestricoesBaixo(this.mx, Math.min(this.my + 1, this.cena.mapa.LINHAS-1));
        this.aplicaRestricoesBaixo(this.mx + 1, Math.min(this.my + 1, this.cena.mapa.LINHAS-1));

        this.aplicaRestricoesCima (Math.max(this.mx - 1,0 ),Math.max(this.my - 1,0) );
        this.aplicaRestricoesCima(this.mx, Math.max(this.my - 1,0));
        this.aplicaRestricoesCima(this.mx + 1, Math.max(this.my - 1,0));
      }
    aplicaRestricoesDireita(pmx, pmy){
        if (this.vx > 0) {
          const SIZE = this.cena.mapa.SIZE;
          if (this.cena.mapa.tiles[pmy][pmx] != 0) {
            const tile = {
              x: pmx * SIZE + SIZE / 2,
              y: pmy * SIZE + SIZE / 2,
              w: SIZE,
              h: SIZE,
            };
            this.cena.ctx.strokeStyle = "white";
            this.cena.ctx.strokeRect(tile.x-SIZE/2, tile.y-SIZE/2, SIZE, SIZE);
            if (this.colidiuCom(tile)) {
              this.vx = 0;
              this.x = tile.x - tile.w / 2 - this.w / 2 - 1;
            }
          }
        }
      }
    aplicaRestricoesEsquerda(pmx, pmy){
        if(this.vx < 0){
            const SIZE =this.cena.mapa.SIZE;
            //console.log(pmy,pmx);
            if(this.cena.mapa.tiles[pmy][pmx] != 0){
                const tile = {
                    x: pmx*SIZE+SIZE/2, 
                    y: pmy*SIZE+SIZE/2, 
                    w: SIZE, 
                    h: SIZE,
                };
                this.cena.ctx.strokeStyle = "white"
                this.cena.ctx.strokeRect(tile.x-SIZE/2,tile.y-SIZE/2,SIZE,SIZE);
                if (this.colidiuCom(tile)) {
                    this.vx = 0;
    
                    this.x = tile.x + tile.w/2 + this.w/2 + 1;
                }
            }
        }
    }

    aplicaRestricoesBaixo(pmx, pmy){
       
        if(this.vy > 0){
            
            const SIZE =this.cena.mapa.SIZE;
            //console.log(pmy,pmx);
            if(this.cena.mapa.tiles[pmy][pmx] != 0){
                const tile = {
                    x: pmx*SIZE+SIZE/2, 
                    y: pmy*SIZE+SIZE/2, 
                    w: SIZE, 
                    h: SIZE,
                };

                this.cena.ctx.strokeStyle = "white"
                this.cena.ctx.strokeRect(tile.x-SIZE/2,tile.y-SIZE/2,SIZE,SIZE);
                if (this.colidiuCom(tile)) {

                    this.vy = 0;
                    this.y = tile.y - tile.h/2 - this.h/2 - 1;
                }
            }
        }
    }
    aplicaRestricoesCima(pmx, pmy){
        if(this.vy < 0){
            const SIZE =this.cena.mapa.SIZE;
            //console.log(pmy,pmx);
            if(this.cena.mapa.tiles[pmy][pmx] != 0){
                const tile = {
                    x: pmx*SIZE+SIZE/2, 
                    y: pmy*SIZE+SIZE/2, 
                    w: SIZE, 
                    h: SIZE,
                };
                this.cena.ctx.strokeStyle = "white"
                this.cena.ctx.strokeRect(tile.x-SIZE/2,tile.y-SIZE/2,SIZE,SIZE);
                if (this.colidiuCom(tile)) {
                    this.vy = 0;
                    this.y = tile.y + tile.h/2 + this.h/2 + 1;
                
                }
            }
        }
    }
}