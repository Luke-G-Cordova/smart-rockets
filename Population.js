import Rocket from './Rocket.js';
import {default as V} from './Vector.js';
export default class Population{
    constructor(ctx){
        this.size = 25;
        this.ctx = ctx;
        this.spawnPoint = V.createNew(this.ctx.canvas.width/2, this.ctx.canvas.height - 20);
        this.irw = 10;
        this.iry = 20;
        this.lifeSpan = 200;
        this.population = [];

        for(let i = 0;i<this.size;i++){
            let roc = new Rocket();
            roc.position = this.spawnPoint;
            roc.dna = new DNA();
            this.population.push(roc);
        }
    }
    loop(){
        for(let rocket of this.population){

        }
    }
    draw(){
        this.ctx.fillStyle = 'rgba(255, 255, 255, .7)'; 
        for(let rocket of this.population){
            this.ctx.fillRect(rocket.position.x, rocket.position.y, this.irw, this.iry);
        }
    }
}