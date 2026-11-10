import { useId, useState } from "react";
import { services } from "../data/company";
import { Reveal } from "./Reveal";
import { ServiceVisual } from "./ServiceVisual";
import styles from "./Services.module.css";

export function Services() {
    const [active, setActive] = useState(0);
    const baseId = useId();

    return (
        <section id="solucoes" className={styles.section} data-theme="light" aria-labelledby="services-title">
            <div className="container">
                <header className={styles.head}>
                    <Reveal as="h2" id="services-title" className={styles.title}>
                        Soluções que criamos para o seu negócio
                    </Reveal>
                    <Reveal as="p" delay={0.1} className={styles.intro}>
                        Da primeira conversa ao sistema em produção, cuidamos de cada etapa para que a tecnologia
                        trabalhe a favor da sua operação.
                    </Reveal>
                </header>

                <div className={styles.grid}>
                    <ul className={styles.list}>
                        {services.map((service, i) => {
                            const open = i === active;
                            const panelId = `${baseId}-panel-${i}`;
                            const buttonId = `${baseId}-button-${i}`;
                            return (
                                <Reveal as="li" key={service.id} id={service.id} delay={i * 0.06} className={`${styles.item} ${open ? styles.open : ""}`}>
                                    <h3>
                                        <button
                                            id={buttonId}
                                            type="button"
                                            className={styles.trigger}
                                            aria-expanded={open}
                                            aria-controls={panelId}
                                            onClick={() => setActive(i)}
                                        >
                                            <span className={styles.name}>{service.title}</span>
                                            <span className={styles.short}>{service.short}</span>
                                            <span className={styles.plus} aria-hidden="true" />
                                        </button>
                                    </h3>
                                    <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.panel}>
                                        <div className={styles.panelInner}>
                                            <p>{service.body}</p>
                                            <div className={styles.inlineVisual} aria-hidden="true">
                                                {open && <ServiceVisual type={service.visual} />}
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </ul>

                    <div className={styles.stage} aria-hidden="true">
                        <div className={styles.stageInner}>
                            <ServiceVisual key={services[active].visual} type={services[active].visual} />
                            <span className={styles.caption}>{services[active].title}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
