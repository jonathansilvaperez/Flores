document.addEventListener("DOMContentLoaded", () => {
  // Cambiar tema
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    toggle.textContent = theme === "light" ? "🌞" : "🌙";
  }
  const saved = localStorage.getItem("theme") || "dark";
  applyTheme(saved);
  toggle.addEventListener("click", () => {
    applyTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
  });

  // Confeti
  const cvs = document.getElementById('confetti');
  const ctx = cvs.getContext('2d');
  let W=innerWidth,H=innerHeight,pieces=[];
  cvs.width=W;cvs.height=H;
  function confetti() {
    pieces = Array.from({length:160},()=>({
      x:Math.random()*W, y:-20, r:4+Math.random()*6,
      c:`hsl(${Math.random()*360},90%,65%)`, vx:-2+Math.random()*4, vy:2+Math.random()*2, a:Math.random()*Math.PI
    }));
    let t=0;
    function loop(){
      ctx.clearRect(0,0,W,H);
      for(const p of pieces){
        p.x+=p.vx; p.y+=p.vy+=0.05; p.a+=0.1;
        ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.a);
        ctx.fillStyle=p.c;ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r);ctx.restore();
      }
      if(t++<120) requestAnimationFrame(loop);
    } loop();
  }

  // Botones
  const yesBtn=document.getElementById('btnYes');
  const noBtn=document.getElementById('btnNo');
  const out=document.getElementById('resultado');
  function show(msg,color){
    out.style.display='block';
    out.style.borderColor=color;
    out.innerHTML=msg;
  }
  yesBtn.onclick=()=>{
    show("💛 Gracias por perdonarme. Te prometo que todo será diferente.<br><small>– Jonathan Silva</small>",'rgba(68,255,209,.35)');
    confetti();
    window.open(`https://wa.me/56951598907?text=${encodeURIComponent("💛 Te agradezco por perdonarme. Prometo mejorar y cuidar de ti siempre. – Jonathan Silva 🌻")}`,"_blank");
  };
  noBtn.onclick=()=>show("Entiendo si necesitas tiempo. Estoy aquí para hablarlo cuando quieras 🌻",'rgba(255,209,102,.35)');
});
