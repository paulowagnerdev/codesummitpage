import { useEffect, useRef } from "react";

/**
 * Progresso de rolagem (0 → 1) de um elemento, sem re-renderizar o React:
 * escreve a variável CSS `--progress` no próprio elemento e chama `onProgress`.
 *
 * - "pin": 0 quando o topo encosta no topo da tela, 1 quando o fim encosta no fim
 *   (ideal para seções com conteúdo `position: sticky`).
 * - "pass": 0 quando o elemento começa a entrar por baixo, 1 quando sai por cima.
 */
export function useScrollProgress(ref, { mode = "pin", onProgress } = {}) {
    const callback = useRef(onProgress);
    callback.current = onProgress;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let frame = 0;
        let last = -1;

        const measure = () => {
            frame = 0;
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;
            const raw =
                mode === "pin"
                    ? -rect.top / Math.max(1, rect.height - vh)
                    : (vh - rect.top) / (rect.height + vh);
            const p = Math.min(1, Math.max(0, raw));
            if (Math.abs(p - last) < 0.0005) return;
            last = p;
            el.style.setProperty("--progress", p.toFixed(4));
            callback.current?.(p);
        };

        const request = () => {
            if (!frame) frame = requestAnimationFrame(measure);
        };

        measure();
        window.addEventListener("scroll", request, { passive: true });
        window.addEventListener("resize", request);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", request);
            window.removeEventListener("resize", request);
        };
    }, [ref, mode]);
}
