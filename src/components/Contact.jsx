import { useRef } from "react";
import { company, whatsappLink } from "../data/company";
import { useMagnetic } from "../hooks/useMagnetic";
import { Reveal } from "./Reveal";
import { Button, ChatIcon } from "./Button";
import styles from "./Contact.module.css";

export function Contact() {
    const orbRef = useRef(null);
    useMagnetic(orbRef, { strength: 0.35, radius: 140 });
    const { contact, social } = company;

    return (
        <section id="contato" className={styles.section} data-theme="dark" aria-labelledby="contact-title">
            <div className={`container ${styles.inner}`}>
                <div className={styles.top}>
                    <Reveal as="h2" id="contact-title" className={styles.title}>
                        Vamos construir algo gigante juntos?
                    </Reveal>

                    <a
                        ref={orbRef}
                        href={whatsappLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.orb}
                    >
                        <ChatIcon />
                        <span>Iniciar conversa no WhatsApp</span>
                    </a>
                </div>

                <div className={styles.bottom}>
                    <Reveal as="p" className={styles.text}>
                        Conte sobre o seu projeto e descubra como podemos transformar a sua ideia em uma solução de
                        sucesso. Respondemos pelo WhatsApp ou por telefone.
                    </Reveal>

                    <dl className={styles.details}>
                        <Reveal className={styles.detail}>
                            <dt>WhatsApp e telefone</dt>
                            <dd><a href={contact.phoneHref}>{contact.phoneDisplay}</a></dd>
                        </Reveal>
                        {contact.email && (
                            <Reveal className={styles.detail}>
                                <dt>E-mail</dt>
                                <dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd>
                            </Reveal>
                        )}
                        <Reveal delay={0.06} className={styles.detail}>
                            <dt>Localização</dt>
                            <dd>{contact.city}</dd>
                        </Reveal>
                        {social.map((s, i) => (
                            <Reveal key={s.label} delay={0.12 + i * 0.06} className={styles.detail}>
                                <dt>{s.label}</dt>
                                <dd>
                                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                                        {s.href.replace(/^https?:\/\//, "")}
                                    </a>
                                </dd>
                            </Reveal>
                        ))}
                    </dl>

                    <div className={styles.mobileCta}>
                        <Button href={whatsappLink()} icon={<ChatIcon />}>Falar com um especialista</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
