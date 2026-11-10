import { useEffect, useState } from "react";

/**
 * Observa quando o elemento entra na viewport.
 * Com `once`, para de observar depois da primeira vez.
 */
export function useInView(ref, { once = true, rootMargin = "0px 0px -12% 0px", threshold = 0 } = {}) {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (!("IntersectionObserver" in window)) {
            setInView(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (once) observer.disconnect();
                } else if (!once) {
                    setInView(false);
                }
            },
            { rootMargin, threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [ref, once, rootMargin, threshold]);

    return inView;
}
