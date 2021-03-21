import Cena from "./Cena.js";

export default class CenaFim extends Cena{
    desenhar(){
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width,this.canvas.height);
        this.mapa?.desenhar(this.ctx);
        this.ctx.font = "20px Impact ";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";
        if (document.getElementById("moedas").textContent < 6) {
            this.ctx.fillText("GAME OVER", this.canvas.width/2, this.canvas.height/2-10);
        }
        if (document.getElementById("moedas").textContent == 6) {
            this.ctx.fillText("VOCÊ VENCEU, PARABÉNS!!", this.canvas.width/2, this.canvas.height/2-10);
        }
        this.ctx.fillText("Moedas: "+document.getElementById("moedas").textContent+"/6",this.canvas.width / 2,this.canvas.height / 2 + 20);
      
        if (this.assets.acabou()) {
            this.ctx.fillStyle = "red";
            this.ctx.fillText("Aperte espaço para jogar novamente!", this.canvas.width/2, this.canvas.height/2+50);
        }
    }
    quadro(t){
        this.t0 = this.t0 ?? t;
        this.dt = (t - this.t0)/1000;

        if (this.assets.acabou()) {
            if (this.input.comandos.get("PROXIMA_CENA")) {
                this.game.selecionaCena("carregando");
                return;
            }
        }
        this.desenhar();
        this.iniciar();
        this.to = t;
    }
}