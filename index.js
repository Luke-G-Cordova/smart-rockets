import {default as V} from './Vector.js';
import Population from './Population.js';
let p = document.querySelector('p#gen');
let pr = document.querySelector('p#prev');
let canvas = document.querySelector('canvas#myCanvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width = 500;
ctx.canvas.height = 500;

let gofast = false;

let rockets = new Population(ctx);

let target = rockets.target;

let interval = setInterval(loop, 15);
window.addEventListener('click', () => {
    gofast = !gofast;
    clearInterval(interval);
    interval = setInterval(loop, gofast?0:15);
});
let count = 0;
let gen = 0;
function loop(){
    if(count===200){
        count = 0;
        gen++;
        p.innerHTML = gen;
    }
    
    if(true){
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        rockets.draw();

        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(target.x, target.y, 20, 0, Math.PI*2);
        ctx.fill();
    }
    rockets.loop();
    count++;
}

