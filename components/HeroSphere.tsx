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

      const RINGS = 26;
      const SEG = 120;
      const RADIUS = 1.25;
      const GOLDEN = 2.39996323; // ángulo áureo (rad)
      const material = new THREE.LineBasicMaterial({
        color: 0xc8ccd6,
        transparent: true,
        opacity: 0.5,
      });
      const geometries: InstanceType<typeof THREE.BufferGeometry>[] = [];

      for (let i = 0; i < RINGS; i++) {
        const pts: InstanceType<typeof THREE.Vector3>[] = [];
        for (let s = 0; s <= SEG; s++) {
          const a = (s / SEG) * Math.PI * 2;
          pts.push(new THREE.Vector3(Math.cos(a) * RADIUS, Math.sin(a) * RADIUS, 0));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        geometries.push(geo);
        const ring = new THREE.LineLoop(geo, material);
        ring.rotation.y = i * GOLDEN;
        ring.rotation.x = i * GOLDEN * 0.5;
        spin.add(ring);
      }

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
        spin.rotation.y += 0.0016;
        spin.rotation.x += 0.0004;
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
