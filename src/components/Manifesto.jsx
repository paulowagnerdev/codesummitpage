import { useRef } from "react";
import { company } from "../data/company";
import { useScrollProgress } from "../hooks/useScrollProgress";
import styles from "./Manifesto.module.css";

/** Texto que “acende” palavra por palavra conforme a rolagem. */
export function Manifesto() {
    const ref = useRef(null);
    useScrollProgress(ref, { mode: "pass" });
    const words = company.about.split(" ");

    return (
        <section ref={ref} className={styles.section} data-theme="light" aria-label="Quem somos">
            <div className="container">
                <p className={styles.text}>
                    {words.map((word, i) => (
                        <span key={i} className={styles.word} style={{ "--w": i / words.length }}>
                            {word}{" "}
                        </span>
                    ))}
                </p>
            </div>
        </section>
    );
}
