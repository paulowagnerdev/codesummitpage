import { useId } from "react";
import styles from "./ServiceVisual.module.css";

/* Ilustrações em traço, animadas só com CSS. Remontam (via `key`) a cada troca. */

function Web() {
    return (
        <g>
            <rect className={styles.draw} x="70" y="90" width="260" height="200" rx="10" />
            <path className={styles.draw} d="M70 118h260" />
            <circle className={styles.dot} cx="86" cy="104" r="3" />
            <circle className={styles.dot} cx="98" cy="104" r="3" style={{ "--d": ".1s" }} />
            <circle className={styles.dot} cx="110" cy="104" r="3" style={{ "--d": ".2s" }} />
            <rect className={styles.block} x="90" y="136" width="130" height="14" rx="3" style={{ "--d": ".5s" }} />
            <rect className={styles.block} x="90" y="158" width="90" height="8" rx="3" style={{ "--d": ".6s" }} />
            <rect className={`${styles.block} ${styles.accent}`} x="90" y="178" width="58" height="18" rx="9" style={{ "--d": ".75s" }} />
            <rect className={styles.block} x="236" y="136" width="74" height="60" rx="5" style={{ "--d": ".85s" }} />
            <rect className={styles.block} x="90" y="214" width="66" height="56" rx="5" style={{ "--d": ".95s" }} />
            <rect className={styles.block} x="167" y="214" width="66" height="56" rx="5" style={{ "--d": "1.05s" }} />
            <rect className={styles.block} x="244" y="214" width="66" height="56" rx="5" style={{ "--d": "1.15s" }} />
        </g>
    );
}

function Mobile() {
    const clip = `clip${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
    return (
        <g>
            <clipPath id={clip}>
                <rect x="146" y="88" width="108" height="214" rx="12" />
            </clipPath>
            <rect className={styles.draw} x="140" y="60" width="120" height="250" rx="22" />
            <path className={styles.draw} d="M182 76h36" />
            <g clipPath={`url(#${clip})`}>
            <g className={styles.feed}>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <g key={i} transform={`translate(0 ${i * 58})`}>
                        <rect className={styles.soft} x="154" y="96" width="92" height="46" rx="8" />
                        <circle className={i % 3 === 0 ? styles.accentFill : styles.softFill} cx="170" cy="112" r="7" />
                        <path className={styles.thin} d="M184 110h48M184 120h30M162 132h60" />
                    </g>
                ))}
            </g>
            </g>
        </g>
    );
}

function Corporate() {
    const cells = [];
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            cells.push(
                <rect
                    key={`${r}-${c}`}
                    className={styles.cell}
                    x={92 + c * 56}
                    y={92 + r * 56}
                    width="44"
                    height="44"
                    rx="6"
                    style={{ "--d": `${(r + c) * 0.12}s` }}
                />
            );
        }
    }
    return (
        <g>
            {cells}
            <path className={styles.flow} d="M114 114 H226 V170 H170 V226 H282 V282" />
            <circle className={styles.runner} r="5">
                <animateMotion dur="4s" repeatCount="indefinite" path="M114 114 H226 V170 H170 V226 H282 V282" />
            </circle>
        </g>
    );
}

function Api() {
    const nodes = [
        [200, 200, 1], [92, 110, 0], [310, 104, 0], [96, 296, 0], [306, 300, 0], [200, 72, 0],
    ];
    const links = [
        "M200 200 L92 110", "M200 200 L310 104", "M200 200 L96 296", "M200 200 L306 300", "M200 200 L200 72",
    ];
    return (
        <g>
            {links.map((d, i) => (
                <g key={d}>
                    <path className={styles.draw} d={d} style={{ "--d": `${i * 0.1}s` }} />
                    <circle className={styles.packet} r="4" style={{ "--d": `${i * 0.5}s` }}>
                        <animateMotion dur="2.4s" begin={`${i * 0.45}s`} repeatCount="indefinite" path={d} />
                    </circle>
                </g>
            ))}
            {nodes.map(([x, y, hub]) =>
                hub ? (
                    <g key={`${x}-${y}`}>
                        <circle className={styles.hubRing} cx={x} cy={y} r="34" />
                        <circle className={styles.accentFill} cx={x} cy={y} r="18" />
                    </g>
                ) : (
                    <circle key={`${x}-${y}`} className={styles.node} cx={x} cy={y} r="14" />
                )
            )}
        </g>
    );
}

function Support() {
    return (
        <g>
            <path className={styles.draw} d="M200 70 L292 104 V190 C292 252 252 296 200 318 C148 296 108 252 108 190 V104 Z" />
            <path className={`${styles.draw} ${styles.check}`} d="M160 196 L188 224 L244 166" />
            <path className={styles.pulse} d="M40 350 H140 L156 330 L172 368 L188 340 L200 350 H360" />
        </g>
    );
}

const MAP = { web: Web, mobile: Mobile, corporate: Corporate, api: Api, support: Support };

export function ServiceVisual({ type }) {
    const Scene = MAP[type] ?? Web;
    const grid = `grid${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
    return (
        <svg className={styles.svg} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
            <defs>
                <pattern id={grid} width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M20 0H0V20" fill="none" stroke="currentColor" strokeOpacity=".06" />
                </pattern>
            </defs>
            <rect width="400" height="400" fill={`url(#${grid})`} />
            <Scene />
        </svg>
    );
}
