"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Esfera de líneas en WebGL (Three.js) para el hero.
 * - Gira en 3D y se inclina suavemente hacia el cursor.
 * - Three.js se carga con import() dinámico (chunk aparte, no bloquea el render).
 * - Fallback al PNG si: SSR, sin WebGL, o prefers-reduced-motion.
 */
export default function HeroSphere() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const probe = document.createElement("canvas");
    const hasWebGL = !!(
      probe.getContext("webgl") || probe.getContext("experimental-webgl")
    );
    if (reduce || !hasWebGL) return; // queda el PNG de fallback

    let disposed = false;
    let raf = 0;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed || !mountRef.current) return;

      const host = mountRef.current;
      const size = () => ({
        w: host.clientWidth || 460,
        h: host.clientHeight || 460,
      });
      let { w, h } = size();

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
      camera.position.z = 3.25;

      // Esfera tejida: anillos (círculos) orientados con el ángulo áureo.
      const tilt = new THREE.Group();
      const spin = new THREE.Group();
      tilt.add(spin);
      scene.add(tilt);

      // Toroide tejido (anillo con hueco), fiel al asset original: muchos
      // círculos de sección con una leve torsión que crea el "ribbon".
      const R = 1.0; // radio del anillo
      const TUBE = 0.5; // radio del tubo (hueco central ~1/3 del diámetro)
      const CIRCLES = 84; // círculos de sección (finos y densos)
      const SEG = 64; // segmentos por círculo
      const TWIST = 0.6; // torsión suave -> tejido diagonal (sin "alas")
      const material = new THREE.LineBasicMaterial({
        color: 0xc8ccd6,
        transparent: true,
        opacity: 0.32,
      });
      const geometries: InstanceType<typeof THREE.BufferGeometry>[] = [];

      for (let i = 0; i < CIRCLES; i++) {
        const theta = (i / CIRCLES) * Math.PI * 2;
        const ct = Math.cos(theta);
        const st = Math.sin(theta);
        const tw = theta * TWIST;
        const vt = Math.sin(tw); // componente tangencial del eje v
        const vz = Math.cos(tw); // componente Z del eje v
        const pts: InstanceType<typeof THREE.Vector3>[] = [];
        for (let s = 0; s <= SEG; s++) {
          const phi = (s / SEG) * Math.PI * 2;
          const cphi = Math.cos(phi) * TUBE;
          const sphi = Math.sin(phi) * TUBE;
          // centro del círculo en R*radial; u = radial, v = cos(tw)*Z + sin(tw)*tangencial
          const x = (R + cphi) * ct + sphi * vt * -st;
          const y = (R + cphi) * st + sphi * vt * ct;
          const z = sphi * vz;
          pts.push(new THREE.Vector3(x, y, z));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        geometries.push(geo);
        spin.add(new THREE.LineLoop(geo, material));
      }

      // Tilt base para verlo en 3/4 (como el render original).
      spin.rotation.x = 0.5;

      setReady(true);

      // Parallax hacia el cursor
      let targetX = 0;
      let targetY = 0;
      const onMove = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        const nx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
        const ny = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
        targetX = Math.max(-1, Math.min(1, nx));
        targetY = Math.max(-1, Math.min(1, ny));
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      const ro = new ResizeObserver(() => {
        const next = size();
        w = next.w;
        h = next.h;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });
      ro.observe(host);

      const animate = () => {
        if (disposed) return;
        raf = requestAnimationFrame(animate);
        spin.rotation.z += 0.003; // gira sobre el eje del anillo
        // inclinación suave (lerp) hacia el cursor
        tilt.rotation.y += (targetX * 0.45 - tilt.rotation.y) * 0.05;
        tilt.rotation.x += (targetY * 0.4 - tilt.rotation.x) * 0.05;
        renderer.render(scene, camera);
      };

      // Pausar el loop cuando el hero sale del viewport (ahorra GPU/batería).
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          if (!raf) animate();
        } else {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      });
      io.observe(host);

      // Si se pierde el contexto WebGL en runtime, volver al PNG (red de seguridad).
      const onContextLost = (e: Event) => {
        e.preventDefault();
        cancelAnimationFrame(raf);
        raf = 0;
        if (renderer.domElement.parentNode === host) {
          host.removeChild(renderer.domElement);
        }
        setReady(false);
      };
      renderer.domElement.addEventListener("webglcontextlost", onContextLost);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onMove);
        renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
        io.disconnect();
        ro.disconnect();
        geometries.forEach((g) => g.dispose());
        material.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === host) {
          host.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0" aria-hidden="true">
      {!ready && (
        <Image
          src="/sphere.png"
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 80vw, 460px"
          className="animate-spin-slow object-contain opacity-90 [animation-duration:120s]"
        />
      )}
    </div>
  );
}
