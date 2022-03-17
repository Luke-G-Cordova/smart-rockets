import Rocket from './Rocket.js';
import {default as V} from './Vector.js';
export default class Population{
    constructor(ctx){
        this.ctx = ctx;

        this.target = V.createNew(this.ctx.canvas.width/2, 30);

        this.size = 25;
        this.spawnPoint = V.createNew(this.ctx.canvas.width/2, this.ctx.canvas.height - 20);
        this.startingDistance = this.spawnPoint.clone().sub(this.target).magnitude;
        this.irw = 30;
        this.iry = 10;
        this.lifeSpan = 200;
        this.population = [];

        this.genePool = [];

        this.currentDay = 0;
        this.madeIt = 0;

        for(let i = 0;i<this.size;i++){
            let roc = new Rocket();
            roc.position = this.spawnPoint.clone();
            this.giveNewDNA(roc);
            this.population.push(roc);
        }
    }

    loop(){
        if(this.currentDay === this.lifeSpan){
            // console.log(this.madeIt);
            this.madeIt = 0;
            this.currentDay = 0;
            this.genePool = [];
            let max = 0;
            let min = 1000;
            // put rockets in genepool based on their closeness to the target
            for(let rocket of this.population){
                let distance = rocket.position.clone().sub(this.target).magnitude;
                distance = this.scale(distance, 0, this.startingDistance, 10, 0);
                if(rocket.gotToTarget){
                    distance = 50;
                    let time = this.scale(rocket.tStamp, 50, this.lifeSpan, 200, 0);
                    distance += time;

                }else if(rocket.crashed){
                    distance/=2;
                }
                if(distance > max)max = distance;
                if(distance < min)min = distance;
                for(let i = 0;i<distance;i++){
                    this.genePool.push(rocket.dna);
                }

                rocket.gotToTarget = false;
                rocket.crashed = false;
            }
            // console.log(max, min);
            // give a rocket new genes based on the current genepool
            for(let rocket of this.population){
                rocket.position = this.spawnPoint.clone();
                rocket.velocity.mult(0);
                let par1 = this.genePool[Math.floor(Math.random() * this.genePool.length)];
                let par2 = this.genePool[Math.floor(Math.random() * this.genePool.length)];
                rocket.dna = [];
                for(let i = 0;i<this.lifeSpan;i++){
                    if(Math.random() >= 0.0000){
                        if(i%2===0){
                            rocket.dna.push(par1[i]);
                        }else{
                            rocket.dna.push(par2[i]);
                        }
                    }else{
                        rocket.dna.push(V.createRandom(-1, 1).mult(.3));
                    }
                }
            }
        }
        for(let rocket of this.population){
            if(!rocket.crashed && 
                (rocket.position.x <= 0 || 
                rocket.position.x >= this.ctx.canvas.width || 
                rocket.position.y <= 0 || 
                rocket.position.y >= this.ctx.canvas.height)
            ){
                rocket.crashed = true;
            }else if(!rocket.gotToTarget && Math.abs(rocket.position.clone().sub(this.target).magnitude) <= 20){
                rocket.position = this.target;
                rocket.gotToTarget = true;
                rocket.tStamp = this.currentDay;
                this.madeIt++;
            }else{
                rocket.applyForce(rocket.dna[this.currentDay]);
                rocket.update();
                if(!rocket.gotToTarget) rocket.tStamp = this.currentDay;
            }
        }
        this.currentDay++;
    }
    scale (number, inMin, inMax, outMin, outMax) {
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
    draw(){
        this.ctx.fillStyle = 'rgba(255, 255, 255, .7)'; 
        for(let rocket of this.population){
            this.ctx.translate(rocket.position.x, rocket.position.y);
            this.ctx.rotate(-rocket.velocity.getAngle());
            this.ctx.translate(-rocket.position.x, -rocket.position.y);
            this.ctx.fillRect(rocket.position.x, rocket.position.y, this.irw, this.iry);
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    }
    giveNewDNA(rocket){
        rocket.dna = [];
        for(let k = 0;k<this.lifeSpan;k++){
            rocket.dna.push(V.createRandom(-1, 1).mult(.3));
        }
    }
    
}