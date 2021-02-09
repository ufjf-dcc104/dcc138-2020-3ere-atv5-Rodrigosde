export default class Cena {
    //responsável por desenhar elementos na tela em uma animacao
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }
    desenhar(){
        this.fillStyle = "grey";
        this.ctx.fillRect(0, 0, this.canvas.width,
             this.canvas.height);
    }
}