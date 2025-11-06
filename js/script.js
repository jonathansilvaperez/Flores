// ===== Guard: evita doble inicialización si el script se inyecta más de una vez =====
if (window.__girasoles_loaded__) {
  // Ya cargado: no hacemos nada
} else {
  window.__girasoles_loaded__ = true;

  document.addEventListener("DOMContentLoaded", () => {
    // ---------- Confeti (global, pero con guard de animación) ----------
    const cvs = document.getElementById('confetti');
    const ctx = cvs.getContext('2d');
    let W=0, H=0, pieces=[], running=false, raf;
    const DPR = window.devicePixelRatio || 1;

    function size(){
      W = cvs.width  = Math.round(innerWidth * DPR);
      H = cvs.height = Math.round(innerHeight * DPR);
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }
    size();
    addEventListener('resize', size, {passive:true});

    function burst(n=140){
      pieces = Array.from({length:n}, ()=>({
        x: Math.random()*W, y: -20, r: 4+Math.random()*6,
        c: `hsl(${Math.random()*360},90%,65%)`,
        vx: -2+Math.random()*4, vy: 2+Math.random()*2, a: Math.random()*Math.PI
      }));
      if(!running){
        running = true;
        loop();
        setTimeout(()=>{ running=false; cancelAnimationFrame(raf); }, 1800);
      }
    }
    function loop(){
      raf = requestAnimationFrame(loop);
      ctx.clearRect(0,0,W,H);
      pieces.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy+=0.05; p.a+=0.1;
        ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.a);
        ctx.fillStyle=p.c; ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r);
        ctx.restore();
      });
    }

    // ---------- Encapsular lógica en la sección que contiene #respuesta ----------
    const selectEl = document.getElementById('respuesta');
    if (!selectEl) return; // No hay módulo; salimos.

    const moduleSection = selectEl.closest('section.card') || document;
    // Dentro de este módulo buscamos todo:
    const enviarBtn = moduleSection.querySelector('#enviar');
    const yesBtn    = moduleSection.querySelector('#btnYes');
    const noBtn     = moduleSection.querySelector('#btnNo');

    // Limpiar duplicados de #resultado si existieran
    const resultados = moduleSection.querySelectorAll('#resultado');
    if (resultados.length > 1) {
      resultados.forEach((el,i)=>{ if (i>0) el.remove(); });
    }
    const out = moduleSection.querySelector('#resultado');

    function show(msg, good=false){
      if (!out) return;
      out.style.display = 'block';
      out.style.borderColor = good ? 'rgba(68,255,209,.35)' : 'rgba(255,209,102,.35)';
      out.innerHTML = msg;
    }

    // Click en Enviar
    enviarBtn?.addEventListener('click', ()=>{
      const v = selectEl.value;
      if (v === 'si') {
        show("💛 Gracias por perdonarme. Te prometo que todo será diferente. <br><small>– Jonathan Silva</small>", true);
        burst(160);
        const msg = encodeURIComponent("💛 Te agradezco por perdonarme. Prometo mejorar y cuidar de ti siempre. – Jonathan Silva 🌻");
        window.open(`https://wa.me/56951598907?text=${msg}`, "_blank");
      } else if (v === 'no') {
        show("Entiendo si necesitas tiempo. Estoy aquí para hablarlo cuando quieras 🌻");
      } else {
        show("Por favor, elige una opción para continuar.");
      }
    });

    // Botones grandes: actualizan el select y reutilizan la lógica
    yesBtn?.addEventListener('click', ()=>{ selectEl.value = 'si'; enviarBtn?.click(); });
    noBtn?.addEventListener('click',  ()=>{ selectEl.value = 'no'; enviarBtn?.click(); });
  });
}
