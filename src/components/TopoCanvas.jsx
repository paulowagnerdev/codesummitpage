import { useEffect, useRef } from "react";
import styles from "./TopoCanvas.module.css";

/* ----------------------------------------------------------
   Mapa topográfico vivo.
   Um relevo (cume principal + crista secundária + ruído) é
   desenhado como curvas de nível via marching squares. O relevo
   respira devagar e o ponteiro “ergue” o terreno ao redor.
   ---------------------------------------------------------- */

// Ruído de valor 2D com interpolação suave (rápido e sem dependências)
function makeNoise(seed = 7) {
    const size = 256;
    const perm = new Uint8Array(size * 2);
    const vals = new Float32Array(size);
    let s = seed;
    const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < size; i++) {
        perm[i] = i;
        vals[i] = rand();
    }
    for (let i = size - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [perm[i], perm[j]] = [perm[j], perm[i]];
    }
    for (let i = 0; i < size; i++) perm[i + size] = perm[i];

    const fade = (t) => t * t * (3 - 2 * t);
    return (x, y) => {
        const xi = Math.floor(x), yi = Math.floor(y);
        const xf = x - xi, yf = y - yi;
        const X = xi & 255, Y = yi & 255;
        const a = vals[perm[perm[X] + Y]];
        const b = vals[perm[perm[X + 1] + Y]];
        const c = vals[perm[perm[X] + Y + 1]];
        const d = vals[perm[perm[X + 1] + Y + 1]];
        const u = fade(xf), v = fade(yf);
        return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    };
}

const LEVELS = 16;

export function TopoCanvas({ reduced = false, summit = { x: 0.72, y: 0.42 }, seed = 11, flag = "Cume", className = "" }) {
    const canvasRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const noise = makeNoise(seed);

        let w = 0, h = 0, dpr = 1;
        let cols = 0, rows = 0, cell = 0;
        let field = new Float32Array(0);
        let frame = 0;
        let running = false;
        let visible = true;
        let last = 0;
        const start = performance.now();

        // ponteiro suavizado (coordenadas normalizadas)
        const pointer = { x: summit.x, y: summit.y, tx: summit.x, ty: summit.y, strength: 0, target: 0 };

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = rect.width;
            h = rect.height;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            cell = w < 700 ? 9 : 11;
            cols = Math.ceil(w / cell) + 1;
            rows = Math.ceil(h / cell) + 1;
            field = new Float32Array(cols * rows);
            draw(performance.now());
            placeMarker();
        };

        // Posiciona o marcador no ponto mais alto real do relevo
        const placeMarker = () => {
            const marker = markerRef.current;
            if (!marker) return;
            let best = 0;
            for (let k = 1; k < field.length; k++) if (field[k] > field[best]) best = k;
            const i = best % cols, j = Math.floor(best / cols);
            marker.style.left = `${((i * cell) / w) * 100}%`;
            marker.style.top = `${((j * cell) / h) * 100}%`;
        };

        const height = (nx, ny, t) => {
            const aspect = w / h;
            // cume principal
            const dx = (nx - summit.x) * aspect, dy = ny - summit.y;
            const main = Math.exp(-(dx * dx * 5.5 + dy * dy * 7));
            // crista secundária
            const sx = (nx - summit.x - 0.17) * aspect, sy = ny - summit.y - 0.12;
            const ridge = 0.55 * Math.exp(-(sx * sx * 9 + sy * sy * 11));
            // ruído em duas oitavas que derivam em sentidos opostos
            const n =
                noise(nx * 3.2 * aspect + t * 0.05, ny * 3.2 + t * 0.03) * 0.55 +
                noise(nx * 7.0 * aspect - t * 0.04, ny * 7.0 + 40) * 0.25;
            // ponteiro: uma pequena elevação local
            const px = (nx - pointer.x) * aspect, py = ny - pointer.y;
            const lift = pointer.strength * 0.32 * Math.exp(-(px * px + py * py) * 38);
            return main * 0.95 + ridge + n * 0.42 + lift;
        };

        const draw = (now) => {
            const t = reduced ? 0 : (now - start) / 1000;

            pointer.x += (pointer.tx - pointer.x) * 0.06;
            pointer.y += (pointer.ty - pointer.y) * 0.06;
            pointer.strength += (pointer.target - pointer.strength) * 0.05;

            for (let j = 0; j < rows; j++) {
                const ny = (j * cell) / h;
                for (let i = 0; i < cols; i++) {
                    field[j * cols + i] = height((i * cell) / w, ny, t);
                }
            }

            ctx.clearRect(0, 0, w, h);
            ctx.lineWidth = 1;

            for (let l = 0; l < LEVELS; l++) {
                const level = 0.18 + l * 0.085;
                const k = l / (LEVELS - 1);
                const major = l % 4 === 3;
                ctx.strokeStyle = `rgba(159, 211, 230, ${(major ? 0.2 : 0.07) + k * (major ? 0.45 : 0.2)})`;
                ctx.lineWidth = major ? 1.15 : 0.8;
                ctx.beginPath();

                for (let j = 0; j < rows - 1; j++) {
                    for (let i = 0; i < cols - 1; i++) {
                        const a = field[j * cols + i];
                        const b = field[j * cols + i + 1];
                        const c = field[(j + 1) * cols + i + 1];
                        const d = field[(j + 1) * cols + i];
                        let idx = 0;
                        if (a > level) idx |= 8;
                        if (b > level) idx |= 4;
                        if (c > level) idx |= 2;
                        if (d > level) idx |= 1;
                        if (idx === 0 || idx === 15) continue;

                        const x = i * cell, y = j * cell;
                        const top = x + cell * ((level - a) / (b - a));
                        const right = y + cell * ((level - b) / (c - b));
                        const bottom = x + cell * ((level - d) / (c - d));
                        const left = y + cell * ((level - a) / (d - a));

                        switch (idx) {
                            case 1: case 14: ctx.moveTo(x, left); ctx.lineTo(bottom, y + cell); break;
                            case 2: case 13: ctx.moveTo(bottom, y + cell); ctx.lineTo(x + cell, right); break;
                            case 3: case 12: ctx.moveTo(x, left); ctx.lineTo(x + cell, right); break;
                            case 4: case 11: ctx.moveTo(top, y); ctx.lineTo(x + cell, right); break;
                            case 5: ctx.moveTo(x, left); ctx.lineTo(top, y); ctx.moveTo(bottom, y + cell); ctx.lineTo(x + cell, right); break;
                            case 6: case 9: ctx.moveTo(top, y); ctx.lineTo(bottom, y + cell); break;
                            case 7: case 8: ctx.moveTo(x, left); ctx.lineTo(top, y); break;
                            case 10: ctx.moveTo(top, y); ctx.lineTo(x + cell, right); ctx.moveTo(x, left); ctx.lineTo(bottom, y + cell); break;
                            default: break;
                        }
                    }
                }
                ctx.stroke();
            }
        };

        const loop = (now) => {
            frame = 0;
            if (!running) return;
            // ~40 fps é suficiente para um movimento lento e economiza bateria
            if (now - last > 24) {
                last = now;
                draw(now);
            }
            frame = requestAnimationFrame(loop);
        };

        const play = () => {
            if (reduced || running || !visible || document.hidden) return;
            running = true;
            frame = requestAnimationFrame(loop);
        };

        const pause = () => {
            running = false;
            cancelAnimationFrame(frame);
            frame = 0;
        };

        const onPointer = (e) => {
            const rect = canvas.getBoundingClientRect();
            const inside = e.clientY >= rect.top && e.clientY <= rect.bottom;
            if (!inside) {
                pointer.target = 0;
                return;
            }
            pointer.tx = (e.clientX - rect.left) / rect.width;
            pointer.ty = (e.clientY - rect.top) / rect.height;
            pointer.target = 1;
        };

        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            visible ? play() : pause();
        });
        io.observe(canvas);

        const onVisibility = () => (document.hidden ? pause() : play());
        document.addEventListener("visibilitychange", onVisibility);
        if (!reduced) window.addEventListener("pointermove", onPointer, { passive: true });

        resize();
        play();

        return () => {
            pause();
            ro.disconnect();
            io.disconnect();
            document.removeEventListener("visibilitychange", onVisibility);
            window.removeEventListener("pointermove", onPointer);
        };
    }, [reduced, summit.x, summit.y, seed]);

    return (
        <div className={`${styles.wrap} ${className}`} aria-hidden="true">
            <canvas ref={canvasRef} className={styles.canvas} />
            <span
                ref={markerRef}
                className={styles.summit}
                style={{ left: `${summit.x * 100}%`, top: `${summit.y * 100}%` }}
            >
                {flag && <span className={styles.flag}>{flag}</span>}
            </span>
        </div>
    );
}
