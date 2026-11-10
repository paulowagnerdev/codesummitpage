import { useEffect, useRef, useState } from "react";
import { navItems, whatsappLink } from "../data/company";
import { Logo } from "./Logo";
import { Button } from "./Button";
import styles from "./Header.module.css";

export function Header() {
    const [theme, setTheme] = useState("dark");
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState(null);
    const [open, setOpen] = useState(false);
    const toggleRef = useRef(null);

    /* Tema (claro/escuro) conforme a seção sob o header, auto-hide e seção ativa */
    useEffect(() => {
        let lastY = window.scrollY;
        let frame = 0;

        const update = () => {
            frame = 0;
            const y = window.scrollY;
            const probe = 36;

            const sections = document.querySelectorAll("[data-theme]");
            for (const section of sections) {
                const r = section.getBoundingClientRect();
                if (r.top <= probe && r.bottom > probe) {
                    setTheme(section.dataset.theme);
                    break;
                }
            }

            const mid = window.innerHeight * 0.4;
            let current = null;
            for (const item of navItems) {
                const el = document.getElementById(item.id);
                if (!el) continue;
                const r = el.getBoundingClientRect();
                if (r.top <= mid && r.bottom > mid) current = item.id;
            }
            setActive(current);

            setScrolled(y > 12);
            if (Math.abs(y - lastY) > 6) {
                setHidden(y > lastY && y > 240);
                lastY = y;
            }
        };

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    /* Menu mobile: trava a rolagem, fecha com Esc e ao voltar ao desktop */
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        if (!open) return;

        const onKey = (e) => {
            if (e.key === "Escape") {
                setOpen(false);
                toggleRef.current?.focus();
            }
        };
        const mq = window.matchMedia("(min-width: 901px)");
        const onMq = () => mq.matches && setOpen(false);

        document.addEventListener("keydown", onKey);
        mq.addEventListener("change", onMq);
        return () => {
            document.removeEventListener("keydown", onKey);
            mq.removeEventListener("change", onMq);
        };
    }, [open]);

    const close = () => setOpen(false);
    const classes = [
        styles.header,
        styles[open ? "dark" : theme],
        scrolled && styles.scrolled,
        hidden && !open && styles.hidden,
        open && styles.open,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <header className={classes}>
            <div className={`container ${styles.bar}`}>
                <a href="#inicio" className={styles.brand} aria-label="Code Summit, voltar ao início" onClick={close}>
                    <Logo />
                </a>

                <nav className={styles.nav} aria-label="Principal">
                    <ul className={styles.list}>
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    className={styles.link}
                                    aria-current={active === item.id ? "true" : undefined}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <Button href={whatsappLink()} className={styles.cta}>
                        Fale conosco
                    </Button>
                </nav>

                <button
                    ref={toggleRef}
                    type="button"
                    className={styles.toggle}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    onClick={() => setOpen((v) => !v)}
                >
                    <span className="visually-hidden">{open ? "Fechar menu" : "Abrir menu"}</span>
                    <span className={styles.bars} aria-hidden="true" />
                </button>
            </div>

            <div id="mobile-menu" className={styles.panel} hidden={!open}>
                <nav aria-label="Menu móvel" className="container">
                    <ul className={styles.panelList}>
                        {navItems.map((item, i) => (
                            <li key={item.id} style={{ "--i": i }}>
                                <a href={`#${item.id}`} onClick={close}>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.panelCta} style={{ "--i": navItems.length }}>
                        <Button href={whatsappLink()} onClick={close}>
                            Fale conosco
                        </Button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
