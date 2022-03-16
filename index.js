import {default as V} from './Vector.js';
import Population from './Population.js';

let canvas = document.querySelector('canvas#myCanvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width = 500;
ctx.canvas.height = 500;


let target = V.createNew(ctx.canvas.width/2, 30);
let rockets = new Population(ctx);

loop();
function loop(){

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(target.x, target.y, 20, 0, Math.PI*2);
    ctx.fill();

    rockets.draw();


}

