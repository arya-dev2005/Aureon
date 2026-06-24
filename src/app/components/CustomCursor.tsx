import { useEffect, useRef, useState } from "react";

interface TrailDot {
  x: number;
  y: number;
  alpha: number;
  id: number;
}

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    // current rendered position (lerped)
    x: -200,
    y: -200,
    // raw mouse position
    mx: -200,
    my: -200,
    // velocity
    vx: 0,
    vy: 0,
    prevX: -200,
    prevY: -200,
    hovered: false,
    clicking: false,
    hidden: false,
    // ripples on click
    ripples: [] as { x: number; y: number; r: number; alpha: number }[],
    // comet trail
    trail: [] as TrailDot[],
    trailId: 0,
    raf: 0,
  });

  useEffect(() => {
    // Touch devices — bail out
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const s = stateRef.current;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      s.mx = e.clientX;
      s.my = e.clientY;
      s.hidden = false;
    };

    const onOver = (e: MouseEvent) => {
      s.hovered = !!(e.target as HTMLElement).closest(
        "a,button,[role='button'],input,textarea,select,label,[data-hover]"
      );
    };

    const onDown = (e: MouseEvent) => {
      s.clicking = true;
      s.ripples.push({ x: e.clientX, y: e.clientY, r: 0, alpha: 0.7 });
    };
    const onUp = () => { s.clicking = false; };
    const onLeave = () => { s.hidden = true; };
    const onEnter = () => { s.hidden = false; };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    let frame = 0;

    const draw = () => {
      s.raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (s.hidden) return;

      // Lerp position — smooth follow
      const ease = 0.16;
      s.x += (s.mx - s.x) * ease;
      s.y += (s.my - s.y) * ease;

      // Velocity (from lerped position delta for smooth stretch)
      s.vx = s.x - s.prevX;
      s.vy = s.y - s.prevY;
      s.prevX = s.x;
      s.prevY = s.y;

      const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
      const angle = Math.atan2(s.vy, s.vx);

      // Add trail dot every 2 frames when moving
      frame++;
      if (speed > 1 && frame % 2 === 0) {
        s.trail.push({ x: s.x, y: s.y, alpha: 0.55, id: s.trailId++ });
      }

      // Decay trail
      for (let i = s.trail.length - 1; i >= 0; i--) {
        s.trail[i].alpha -= 0.055;
        if (s.trail[i].alpha <= 0) s.trail.splice(i, 1);
      }

      // Draw trail dots
      s.trail.forEach((dot, i) => {
        const ratio = i / Math.max(s.trail.length, 1);
        const r = 2.5 * ratio * dot.alpha;
        if (r < 0.2) return;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,169,110,${dot.alpha * 0.6})`;
        ctx.fill();
      });

      // Draw ripples
      for (let i = s.ripples.length - 1; i >= 0; i--) {
        const rp = s.ripples[i];
        rp.r += 3.5;
        rp.alpha -= 0.032;
        if (rp.alpha <= 0) { s.ripples.splice(i, 1); continue; }

        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201,169,110,${rp.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Second smaller ripple
        if (rp.r > 10) {
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.r * 0.55, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(240,217,154,${rp.alpha * 0.5})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      // ── Main cursor shape ──────────────────────────────────────────
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(angle);

      // Stretch factor: elongate in movement direction
      const stretch = Math.min(speed * 0.22, 2.6);
      const rx = (s.hovered ? 5 : 5 + stretch);    // x radius (motion axis)
      const ry = (s.hovered ? 5 : Math.max(5 - stretch * 0.55, 2.5));  // y radius (perpendicular)

      // Outer glow
      const glowR = s.hovered ? 22 : 14 + stretch * 2;
      const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, glowR);
      grd.addColorStop(0, `rgba(201,169,110,${s.hovered ? 0.2 : 0.12})`);
      grd.addColorStop(1, "rgba(201,169,110,0)");
      ctx.beginPath();
      ctx.ellipse(0, 0, glowR, glowR * (ry / rx), 0, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Hover ring
      if (s.hovered) {
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(201,169,110,0.65)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Core dot (ellipse that stretches with velocity)
      const coreGrd = ctx.createRadialGradient(-rx * 0.2, -ry * 0.2, 0, 0, 0, Math.max(rx, ry));
      coreGrd.addColorStop(0, s.clicking ? "#FFFAE0" : "#F0D99A");
      coreGrd.addColorStop(0.5, "#C9A96E");
      coreGrd.addColorStop(1, "#A07840");

      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = coreGrd;
      ctx.fill();

      // Inner specular highlight
      ctx.beginPath();
      ctx.ellipse(-rx * 0.25, -ry * 0.28, rx * 0.35, ry * 0.28, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.28)";
      ctx.fill();

      ctx.restore();
    };

    draw();

    return () => {
      cancelAnimationFrame(s.raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        pointerEvents: "none",
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}
