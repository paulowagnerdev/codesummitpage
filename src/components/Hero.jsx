import { whatsappLink } from "../data/company";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { TopoCanvas } from "./TopoCanvas";
import { Button, ChatIcon } from "./Button";
import styles from "./Hero.module.css";

const LINES = ["Transformamos ideias", "em sistemas que", "impulsionam negócios."];
const LINES_NARROW = ["Transformamos", "ideias em", "sistemas que", "impulsionam", "negócios."];

export function Hero() {
    const reduced = useReducedMotion();
    const narrow = useMediaQuery("(max-width: 700px)");
    const summit = narrow ? { x: 0.68, y: 0.26 } : { x: 0.7, y: 0.32 };

    return (
        <section id="inicio" className={styles.hero} data-theme="dark" aria-labelledby="hero-title">
            <TopoCanvas reduced={reduced} summit={summit} />
            <div className={styles.shade} aria-hidden="true" />

            <div className={`container ${styles.content}`}>
                <h1 id="hero-title" className={styles.title}>
                    {(narrow ? LINES_NARROW : LINES).map((line, i) => (
                        <span key={line} className={styles.line}>
                            <span style={{ "--i": i }}>{line}</span>
                        </span>
                    ))}
                </h1>

                <div className={styles.bottom}>
                    <p className={styles.lead}>
                        A Code Summit desenvolve software sob medida: sites, aplicativos, sistemas corporativos e
                        integrações, com foco em desempenho, segurança e evolução contínua.
                    </p>
                    <div className={styles.actions}>
                        <Button href={whatsappLink("Olá! Gostaria de falar com um especialista.")} icon={<ChatIcon />}>
                            Falar com um especialista
                        </Button>
                        <Button href="#solucoes" variant="ghost-dark">
                            Ver soluções
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
