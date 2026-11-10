import { useCallback, useEffect, useRef, useState } from "react";
import { process as steps } from "../data/company";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Reveal } from "./Reveal";
import styles from "./Process.module.css";

const CLIMB =
    "M30 470 C110 462 160 440 214 404 C262 372 288 364 330 340 C380 312 404 286 440 246 C480 202 512 182 552 150 C596 114 624 82 662 52";
const RIDGE = `${CLIMB} C690 76 712 104 734 112 C756 100 772 96 800 116 L800 500 L30 500 Z`;
const STOPS = [0.04, 0.36, 0.68, 1];

/** Etapas do processo como uma subida guiada pela rolagem. */
export function Process() {
    const sectionRef = useRef(null);
    const pathRef = useRef(null);
    const climberRef = useRef(null);
    const [active, setActive] = useState(0);
    const [points, setPoints] = useState([]);
    const pinned = useMediaQuery("(min-width: 901px)");

    useEffect(() => {
        const path = pathRef.current;
        if (!path) return;
        const len = path.getTotalLength();
        setPoints(STOPS.map((f) => path.getPointAtLength(len * f)));
    }, [pinned]);

    const onProgress = useCallback((p) => {
        const path = pathRef.current;
        const climber = climberRef.current;
        if (path && climber) {
            const eased = Math.min(1, p * 1.08);
            const pt = path.getPointAtLength(path.getTotalLength() * eased);
            climber.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
            path.style.strokeDashoffset = String(1 - eased);
        }
        let idx = 0;
        STOPS.forEach((stop, i) => {
            if (p * 1.08 >= stop - 0.02) idx = i;
        });
        setActive((prev) => (prev === idx ? prev : idx));
    }, []);

    useScrollProgress(sectionRef, { mode: "pin", onProgress: pinned ? onProgress : undefined });

    return (
        <section
            ref={sectionRef}
            id="processo"
            className={`${styles.section} ${pinned ? styles.pinned : ""}`}
            data-theme="dark"
            aria-labelledby="process-title"
        >
            <div className={styles.sticky}>
                <div className={`container ${styles.layout}`}>
                    <div className={styles.copy}>
                        <Reveal as="h2" id="process-title" className={styles.title}>
                            Do primeiro passo ao cume
                        </Reveal>
                        <Reveal as="p" delay={0.08} className={styles.intro}>
                            Um caminho claro, em etapas, para que você saiba o que está sendo construído em cada momento.
                        </Reveal>

                        <ol className={styles.steps}>
                            {steps.map((step, i) => (
                                <li
                                    key={step.title}
                                    className={`${styles.step} ${!pinned || i <= active ? styles.reached : ""} ${pinned && i === active ? styles.current : ""}`}
                                    aria-current={pinned && i === active ? "step" : undefined}
                                >
                                    <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                                    <div>
                                        <h3 className={styles.stepTitle}>{step.title}</h3>
                                        <div className={styles.stepBody}>
                                            <p>{step.text}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {pinned && (
                        <div className={styles.visual} aria-hidden="true">
                            <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMax meet">
                                <path className={styles.ridge} d={RIDGE} />
                                {[1, 2, 3, 4].map((k) => (
                                    <path
                                        key={k}
                                        className={styles.echo}
                                        d={CLIMB}
                                        transform={`translate(${k * 26} ${k * 22})`}
                                        style={{ opacity: 0.22 - k * 0.04 }}
                                    />
                                ))}
                                <path className={styles.trail} d={CLIMB} />
                                <path ref={pathRef} className={styles.climb} d={CLIMB} pathLength="1" />
                                {points.map((pt, i) => (
                                    <g key={i} transform={`translate(${pt.x} ${pt.y})`} className={`${styles.stop} ${i <= active ? styles.stopOn : ""}`}>
                                        <circle r={i === STOPS.length - 1 ? 9 : 6} />
                                        <text x="16" y="-12">{String(i + 1).padStart(2, "0")}</text>
                                    </g>
                                ))}
                                <g ref={climberRef} className={styles.climber}>
                                    <circle r="16" className={styles.halo} />
                                    <circle r="5" />
                                </g>
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
