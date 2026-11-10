import { useEffect } from "react";

/**
 * Faz o elemento “seguir” levemente o ponteiro quando ele se aproxima.
 * Desativado para toque e para quem prefere menos movimento.
 */
export function useMagnetic(ref, { strength = 0.3, radius = 120 } = {}) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!fine || reduced) return;

        let frame = 0;
        let tx = 0, ty = 0, x = 0, y = 0;

        const tick = () => {
            x += (tx - x) * 0.18;
            y += (ty - y) * 0.18;
            el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
            if (Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1) {
                frame = requestAnimationFrame(tick);
            } else {
                frame = 0;
            }
        };

        const start = () => {
            if (!frame) frame = requestAnimationFrame(tick);
        };

        const onMove = (event) => {
            const rect = el.getBoundingClientRect();
            const dx = event.clientX - (rect.left + rect.width / 2);
            const dy = event.clientY - (rect.top + rect.height / 2);
            const reach = Math.max(rect.width, rect.height) / 2 + radius;
            if (Math.hypot(dx, dy) < reach) {
                tx = dx * strength;
                ty = dy * strength;
            } else {
                tx = 0;
                ty = 0;
            }
            start();
        };

        const onLeave = () => {
            tx = 0;
            ty = 0;
            start();
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("pointerleave", onLeave);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerleave", onLeave);
            el.style.transform = "";
        };
    }, [ref, strength, radius]);
}
