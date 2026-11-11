import { company, navItems, services, whatsappLink } from "../data/company";
import { Logo } from "./Logo";
import styles from "./Footer.module.css";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer} data-theme="dark">
            <div className={`container ${styles.grid}`}>
                <div className={styles.brand}>
                    <Logo />
                    <p>{company.description}</p>
                </div>

                <nav aria-label="Rodapé" className={styles.col}>
                    <h2>Navegação</h2>
                    <ul>
                        <li><a href="#inicio">Início</a></li>
                        {navItems.map((item) => (
                            <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>
                        ))}
                    </ul>
                </nav>

                <div className={styles.col}>
                    <h2>Serviços</h2>
                    <ul>
                        {services.map((s) => (
                            <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
                        ))}
                    </ul>
                </div>

                <div className={styles.col}>
                    <h2>Contato</h2>
                    <ul>
                        <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
                        {company.social.map((s) => (
                            <li key={s.label}>
                                <a
                                    href={s.href || "#"}
                                    {...(s.href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                >
                                    {s.label}
                                </a>
                            </li>
                        ))}
                        <li><span>{company.contact.city}</span></li>
                    </ul>
                </div>
            </div>

            <div className={`container ${styles.base}`}>
                <div className={styles.baseInner}>
                    <p>© {year} Code Summit. Todos os direitos reservados.</p>
                    <a href="#inicio">Voltar ao topo</a>
                </div>
            </div>
        </footer>
    );
}
