export default class Mapa{
    constructor(linhas = 8, colunas = 12, tamanho = 32){
        this.LINHAS = linhas;
        this.COLUNAS = colunas;
        this.SIZE = tamanho;
        this.tiles = [] ;
        for (let l  = 0; l   < this.LINHAS; l++) {
            this.tiles[l] = [];
            for (let c = 0; c < this.COLUNAS; c++) {
                this.tiles[l][c] = 0
            }
        }
        this.cena = null;
    }
    desenhar(ctx){
        for (let l  = 0; l   < this.LINHAS; l++) {
            for (let c = 0; c < this.COLUNAS; c++) {
                switch (this.tiles[l][c]) {
                    case 1:
                       ctx.drawImage(this.cena.assets.img("fundo"),c*this.SIZE, l*this.SIZE);
                        break;
                    case 2:
                        ctx.drawImage(this.cena.assets.img("moedas"),c*this.SIZE, l*this.SIZE);
                    break;
                    default:
                        ctx.drawImage(this.cena.assets.img("grama"),c*this.SIZE, l*this.SIZE);
                }
            }
        }
    }
    carregaMapa(modelo){
        this.LINHAS = modelo.length ; 
        this.COLUNAS = modelo[0]?.length ?? 0 ; 

        this.tiles = [];
        for (let l  = 0; l   < this.LINHAS; l++) {
            this.tiles[l] = [];
            for (let c = 0; c < this.COLUNAS; c++) {
                this.tiles[l][c] = modelo[l][c];
            }
        }
    }
}