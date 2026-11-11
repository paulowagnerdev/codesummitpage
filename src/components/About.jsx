import { useRef } from "react";
import { values } from "../data/company";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { TopoCanvas } from "./TopoCanvas";
import { Reveal } from "./Reveal";
import styles from "./About.module.css";

const SUMMIT = { x: 0.62, y: 0.36 };

export function About() {
    const mediaRef = useRef(null);
    const shown = useInView(mediaRef, { rootMargin: "0px 0px -20% 0px" });
    const reduced = useReducedMotion();

    return (
        <section id="sobre" className={styles.section} data-theme="light" aria-labelledby="about-title">
            <div className={`container ${styles.grid}`}>
                {/* Composição visual: o mesmo relevo do banner, agora com código e pessoas sobre ele */}
                <div
                    ref={mediaRef}
                    className={`${styles.media} ${shown ? styles.shown : ""}`}
                    data-theme="dark"
                    aria-hidden="true"
                >
                    <TopoCanvas reduced={reduced} summit={SUMMIT} seed={29} flag="" className={styles.topo} />
                    <div className={styles.glow} />

                    <div className={styles.meta}>
                        <span>26°29′S · 49°04′O</span>
                        <span>Jaraguá do Sul</span>
                    </div>

                    <div className={styles.scale}>
                        {["2.400", "1.800", "1.200", "600", "0"].map((m) => (
                            <span key={m}>{m}</span>
                        ))}
                    </div>

                    <div className={styles.code}>
                        <div className={styles.codeBar}>
                            <i /><i /><i />
                            <span>cume.js</span>
                        </div>
                        <pre>
                            <code>
                                <span className={styles.k}>const</span> projeto ={" "}
                                <span className={styles.f}>construir</span>({"{"}
                                {"\n"}  ideia: <span className={styles.s}>"sua"</span>,
                                {"\n"}  pessoas: <span className={styles.s}>"nós"</span>,
                                {"\n"}  destino: <span className={styles.s}>"o topo"</span>,
                                {"\n"}{"}"});
                                <span className={styles.caret} />
                            </code>
                        </pre>
                    </div>

                    <div className={styles.people}>
                        <div className={styles.avatars}>
                            <span>CS</span>
                            <span>{"</>"}</span>
                            <span>+</span>
                        </div>
                        <p>
                            <strong>Pessoas</strong>
                            <span>escrevendo cada linha</span>
                        </p>
                    </div>
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
