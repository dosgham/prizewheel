const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvas_gradient = document.getElementById('canvas_gradient');
const ctx_gradient = canvas_gradient.getContext('2d');

const button = document.getElementById('go');

const canvas_pointer = document.getElementById('canvas_pointer');
const ctx_pointer = canvas_pointer.getContext('2d');

const canvas_text = document.getElementById('canvas_text');
const ctx_text = canvas_text.getContext('2d');

const canvas_prize = document.getElementById('canvas_prize');
const ctx_prize = canvas_prize.getContext('2d');


const todolist = ['Sleep','Games','Movies','Snacks','Books','Gardening','Jogging','Music'];

const restart = document.getElementById('restart');
const color_palette = ['hsl(300, 100%, 89%)','hsl(249, 100%, 85%)','hsl(217, 100%, 81%)','hsl(185, 100%, 80%)','hsl(110, 100%, 87%)','hsl(62, 100%, 86%)','hsl(33, 100%, 82%)','hsl(0, 100%, 84%)'];
const text_palette = ['hsl(300, 100%, 29%)','hsl(249, 100%, 28%)','hsl(217, 100%, 27%)','hsl(185, 100%, 26%)','hsl(110, 100%, 29%)','hsl(62, 100%, 28%)','hsl(33, 100%, 27%)','hsl(0, 100%, 28%)']
const border_palette = ['hsl(300, 100%, 79%)','hsl(249, 100%, 75%)','hsl(217, 100%, 71%)','hsl(185, 100%, 70%)','hsl(110, 100%, 77%)','hsl(62, 100%, 76%)','hsl(33, 100%, 72%)','hsl(0, 100%, 74%)']
const line_palette = ['#ff87bc','#c98aff','#7f92ff','#68cbff','#82f8c4','#ccff88','#fddf7a','#ff9c75']
canvas.height =1000;
canvas.width =1000;
canvas_pointer.height =1000;
canvas_pointer.width =1000;
canvas_text.height =1000;
canvas_text.width =1000;
canvas_prize.height =1000;
canvas_prize.width =1000;
canvas_gradient.height =1000;
canvas_gradient.width =1000;
ctx.lineWidth = 10;
ctx_prize.lineWidth = 10;
ctx_pointer.lineWidth = 5;


var canvas_width = canvas.width;
var canvas_height = canvas.height;
var radius = canvas.width/2.5;
var button_status = false;
var speed = 4.00;
var angle = - speed *Math.PI /100;
var dynamicGrd = 0;
var index = 0;

window.requestAnimationFrame(draw);
window.requestAnimationFrame(draw_text);
window.requestAnimationFrame(draw_pointer);
window.requestAnimationFrame(draw_gradient);

var interval;
var interval_gradient = setInterval(()=>{
    window.requestAnimationFrame(draw_gradient);
},10)
button.addEventListener('click',()=>{
    if(!button_status){
        angle = - speed *Math.PI /100;
        button.innerHTML=`<span>Stop</span>`;
        speed = 4;
        clearInterval(interval_gradient);
        interval = setInterval(()=>{
            window.requestAnimationFrame(draw);
            window.requestAnimationFrame(draw_text);
            window.requestAnimationFrame(draw_gradient);
        },5);
        
        button_status = true;
    }else{
        button.innerHTML = '';
        button_status = false;
        button.disabled = true;
        
        var speed_interval = setInterval(()=>{
            speed = speed*0.9;
        },100);
        setTimeout(function(){
            clearInterval(interval);
            clearInterval(speed_interval); 
            canvas_prize.style.zIndex = 1000;
            restart.style.zIndex = 1001;
        },4000);
        setTimeout(()=>{
            prize_anim();
            prize_tumbling();
        },5000);
        setTimeout(function(){
            restart.classList.add('finished');
            restart.innerText = 'retry';
        },6000);
    }   
})

function draw_pointer(){
    ctx_pointer.save();
    ctx_pointer.beginPath();
    ctx_pointer.moveTo(canvas_width/2, canvas_height/2);
    ctx_pointer.bezierCurveTo(canvas_width/2-100,canvas_height/2-20,canvas_width/2,canvas_height/2-radius,canvas_width/2, canvas_height/2-radius+20);
    ctx_pointer.bezierCurveTo(canvas_width/2,canvas_height/2-radius,canvas_width/2+100,canvas_height/2-20,canvas_width/2, canvas_height/2);
    ctx_pointer.fillStyle = '#ef476f';
    ctx_pointer.fill();
}
function draw_text(){
    ctx_text.clearRect(0,0,canvas.width,canvas.height);
    ctx_text.save();
    ctx_text.translate(canvas_width/2, canvas_height/2);
    ctx_text.rotate(-Math.PI/8+angle);
    ctx_text.translate(-canvas_width/2, -canvas_height/2);
  
    for(let i = 0;i<8;i++){
    
    ctx_text.translate(canvas_width/2, canvas_height/2);
    ctx_text.rotate(Math.PI/4);
    ctx_text.translate(-canvas_width/2, -canvas_height/2);
    ctx_text.font='50px "Comic Sans MS"';
    ctx_text.fillStyle=text_palette[i];
    ctx_text.fillText(todolist[i],canvas_width/2-ctx_text.measureText(todolist[i]).width/2,canvas_height/2-radius*0.8);
    }
    ctx_text.restore();
}
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    angle = angle + speed *Math.PI /100; 
    if(dynamicGrd>1){
        dynamicGrd = dynamicGrd - 1;
    }
    ctx.save();
    ctx.translate(canvas_width/2, canvas_height/2);
    ctx.rotate(angle);
    ctx.translate(-canvas_width/2, -canvas_height/2);
    // -1/4 -1/2
    ctx.lineWidth=25;
    for(let i=0;i<8;i++){
        ctx.beginPath();
        ctx.arc(canvas_width/2, canvas_height/2, radius,Math.PI/4*(i-1), Math.PI/4*(i-2),true);
        ctx.strokeStyle = border_palette[i];
        ctx.stroke();
        ctx.lineTo(canvas_width/2,canvas_height/2);
        ctx.closePath();
       
        var grd = ctx.createRadialGradient(canvas_width/2, canvas_height/2,1,canvas_width/2, canvas_height/2,radius);
        grd.addColorStop(0,'white');
        grd.addColorStop(0.7,color_palette[i]);
        ctx.fillStyle = grd;
        ctx.fill();
    }
    ctx.restore();
}


function draw_gradient(){
    
    dynamicGrd = dynamicGrd+0.01;
    if(dynamicGrd>1){
        dynamicGrd = dynamicGrd - 1;
    }
    ctx_gradient.clearRect(0,0,canvas.width,canvas.height);
    ctx_gradient.save();
    ctx_gradient.translate(canvas_width/2, canvas_height/2);
    ctx_gradient.rotate(angle-Math.PI/4);
    ctx_gradient.translate(-canvas_width/2, -canvas_height/2);
    
for(let i=0;i<8;i++){
    ctx_gradient.translate(canvas_width/2, canvas_height/2);
    ctx_gradient.rotate(Math.PI/4);
    ctx_gradient.translate(-canvas_width/2, -canvas_height/2);
    ctx_gradient.beginPath();
    ctx_gradient.moveTo(canvas_width/2,canvas_height/2);
    ctx_gradient.lineTo(canvas_width/2,canvas_height/2-radius-14);
    ctx_gradient.lineWidth=15;
    var grd = ctx_gradient.createLinearGradient(canvas_width/2, canvas_height/2,canvas_width/2,canvas_height/2-radius-14);
    grd.addColorStop(0,line_palette[i]);
    if(dynamicGrd>0.2){
        grd.addColorStop(dynamicGrd-0.2,line_palette[i]);
    }
    grd.addColorStop(dynamicGrd,'white');
    if(dynamicGrd<0.8){
        grd.addColorStop(dynamicGrd+0.2,line_palette[i]);
    }
    grd.addColorStop(1,line_palette[i]); 
    ctx_gradient.strokeStyle = grd;
    ctx_gradient.stroke();
    
}
ctx_gradient.restore();
}
function prize_anim(){
    var prize_interval = setInterval(()=>{
        prize_incre_radius();
    },25);
    setTimeout(()=>{
        clearInterval(prize_interval);
    },250);
 
}

function prize_incre_radius(){
    radius = radius*(1+0.01);
    ctx_prize.save();
    index = Math.floor(angle/(Math.PI/4))%8;
    ctx_prize.beginPath();
    ctx_prize.arc(canvas_width/2, canvas_height/2, radius,angle-Math.PI/4*(index+2), angle-Math.PI/4*(index+3),true);
    ctx_prize.lineTo(canvas_width/2, canvas_height/2);
    var grd = ctx_prize.createRadialGradient(canvas_width/2, canvas_height/2,1,canvas_width/2, canvas_height/2,radius);
    grd.addColorStop(0,'white');
    grd.addColorStop(0.7,color_palette[7-index]);
    ctx_prize.fillStyle = grd;
    ctx_prize.fill();
    ctx_prize.beginPath();
    ctx_prize.fillStyle = text_palette[7-index];
    ctx_prize.font='50px "Comic Sans MS"';
    const canvas_prize_width = canvas_prize.width;
    const canvas_prize_height = canvas_prize.height;
    ctx_prize.translate(canvas_prize_width/2, canvas_prize_height/2);
    ctx_prize.rotate(angle + Math.PI/4*(7-index)+Math.PI/8);
   
    ctx_prize.translate(-canvas_prize_width/2, -canvas_prize_height/2); 
    ctx_prize.fillText(todolist[7-index],canvas_prize_width/2-ctx_prize.measureText(todolist[7-index]).width/2,canvas_prize_height/2-radius*0.8);
    ctx_prize.fill();
    ctx_prize.restore();
}

function prize_tumbling(){
    canvas_prize.animate([
        {transform:'rotate(0deg)'},
        {transform:'rotate(20deg)'},
        {transform:'rotate(0deg)'},
        {transform:'rotate(-20deg)'},
        {transform:'rotate(0deg)'}
    ],
        {duration:1000,
        iterations:Infinity}
    );
}


restart.addEventListener('click',()=>{
    location.reload();
})






