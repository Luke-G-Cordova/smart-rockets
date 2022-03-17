import {default as V} from './Vector.js';

export default class Rocket{
    constructor(){
        this.position = V.createNew(0, 0);
        this.velocity = V.createNew(0, 0);
        this.acceleration = V.createNew(0, 0);
        this.dna = [];
        this.gotToTarget = false;
        this.crashed = false;
    }

    applyForce(vector){
        this.acceleration.add(vector);
    }

    update(){
        if(!this.gotToTarget && !this.crashed){
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.acceleration.mult(0);
        }
    }
}
