document.addEventListener('DOMContentLoaded',()=>{
const cvs=document.getElementById('confetti'),ctx=cvs.getContext('2d');let W=0,H=0,pieces=[],run=false,raf,DPR=window.devicePixelRatio||1;
function size(){W=cvs.width=Math.round(innerWidth*DPR);H=cvs.height=Math.round(innerHeight*DPR);ctx.setTransform(DPR,0,0,DPR,0,0)}size();addEventListener('resize',size);
function burst(n=140){pieces=Array.from({length:n},()=>({x:Math.random()*W,y:-20,r:4+Math.random()*6,c:`hsl(${Math.random()*360},90%,65%)`,vx:-2+Math.random()*4,vy:2+Math.random()*2,a:Math.random()*Math.PI}));if(!run){run=true;loop();setTimeout(()=>{run=false;cancelAnimationFrame(raf)},1800)}}
function loop(){raf=requestAnimationFrame(loop);ctx.clearRect(0,0,W,H);pieces.forEach(p=>{p.x+=p.vx;p.y+=p.vy+=0.05;p.a+=0.1;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.a);ctx.fillStyle=p.c;ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r);ctx.restore()})}
const sel=document.getElementById('respuesta'),enviar=document.getElementById('enviar'),out=document.getElementById('resultado');
function show(m,g=false){out.style.display='block';out.style.borderColor=g?'rgba(68,255,209,.35)':'rgba(255,209,102,.35)';out.innerHTML=m}
enviar.addEventListener('click',()=>{const v=sel.value;if(v==='si'){show('💛 Gracias por perdonarme. Te prometo que todo será diferente. <br><small>– Jonathan Silva</small>',true);burst(160);const msg=encodeURIComponent('💛 Te agradezco por perdonarme. Prometo mejorar y cuidar de ti siempre. – Jonathan Silva 🌻');window.open('https://wa.me/56951598907?text='+msg,'_blank')}else if(v==='no'){show('Entiendo si necesitas tiempo. Estoy aquí para hablarlo cuando quieras 🌻')}else{show('Por favor, elige una opción para continuar.')}});
document.getElementById('btnYes').addEventListener('click',()=>{sel.value='si';enviar.click()});
document.getElementById('btnNo').addEventListener('click',()=>{sel.value='no';enviar.click()});
});