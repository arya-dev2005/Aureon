import { useEffect, useRef } from "react";

interface P {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  opacity: number; oDir: number;
}

export function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const isMobileDevice = window.matchMedia("(pointer: coarse)").matches;
    const pCount = isMobileDevice ? 20 : 88;
    const particles: P[] = Array.from({ length: pCount }, () => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 500),
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.22 - 0.07,
      radius: Math.random() * 1.9 + 0.4,
      opacity: Math.random() * 0.5 + 0.08,
      oDir: Math.random() > 0.5 ? 0.003 : -0.003,
    }));

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    // track on parent too since canvas is pointer-events:none
    const parent = canvas.parentElement;
    const grandParent = parent?.parentElement;
    parent?.addEventListener("mousemove", handleMouse as EventListener);
    grandParent?.addEventListener("mousemove", handleMouse as EventListener);

    let raf: number;
    const REPEL = 90;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Connection web
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 108) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201,169,110,${(1 - d / 108) * 0.1})`;
            ctx.lineWidth = 0.45;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        // Mouse repel
        const dx = p.x - mx;
        const dy = p.y - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < REPEL && d > 0) {
          const f = (1 - d / REPEL) * 0.9;
          p.vx += (dx / d) * f * 0.07;
          p.vy += (dy / d) * f * 0.07;
        }

        // Speed limit + friction
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 1.1) { p.vx = (p.vx / spd) * 1.1; p.vy = (p.vy / spd) * 1.1; }
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.vy -= 0.007;

        p.x += p.vx;
        p.y += p.vy;
        p.opacity += p.oDir;
        if (p.opacity > 0.58 || p.opacity < 0.05) p.oDir *= -1;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Soft radial glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4.5);
        grd.addColorStop(0, `rgba(201,169,110,${p.opacity * 0.28})`);
        grd.addColorStop(1, "rgba(201,169,110,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,184,122,${p.opacity})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      parent?.removeEventListener("mousemove", handleMouse as EventListener);
      grandParent?.removeEventListener("mousemove", handleMouse as EventListener);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
