import { useRef } from "react";
import { values } from "../data/company";
import { useInView } from "../hooks/useInView";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { Reveal } from "./Reveal";
import styles from "./About.module.css";

export function About() {
    const mediaRef = useRef(null);
    const shown = useInView(mediaRef, { rootMargin: "0px 0px -20% 0px" });
    useScrollProgress(mediaRef, { mode: "pass" });

    return (
        <section id="sobre" className={styles.section} data-theme="light" aria-labelledby="about-title">
            <div className={`container ${styles.grid}`}>
                <div ref={mediaRef} className={`${styles.media} ${shown ? styles.shown : ""}`}>
                    <img
                        src="./programmer-1200.webp"
                        srcSet="./programmer-720.webp 720w, ./programmer-1200.webp 1200w"
                        sizes="(max-width: 900px) 100vw, 50vw"
                        width="1200"
                        height="800"
                        loading="lazy"
                        decoding="async"
                        alt="Desenvolvedor da Code Summit trabalhando com código em dois monitores"
                    />
                </div>

                <div className={styles.copy}>
                    <h2 id="about-title" className={styles.title}>
                        <Reveal as="span" className={styles.titleLine}>Código é o que fazemos.</Reveal>
                        <Reveal as="span" delay={0.1} className={`${styles.titleLine} ${styles.muted}`}>
                            Pessoas é o que somos.
                        </Reveal>
                    </h2>
                    <Reveal as="p" delay={0.15} className={styles.text}>
                        Cada sistema que entregamos começa por entender quem vai usá-lo. Unimos tecnologia e
                        estratégia para criar software que resolve problemas reais e acompanha o crescimento de
                        quem confia em nós.
                    </Reveal>

                    <dl className={styles.values}>
                        {values.map((v, i) => (
                            <Reveal key={v.title} delay={0.1 + i * 0.08} className={styles.value}>
                                <dt>{v.title}</dt>
                                <dd>{v.text}</dd>
                            </Reveal>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
