import styles from "./Logo.module.css";

/** Marca: o cume (traço contínuo derivado do logotipo original) + nome. */
export function Logo({ className = "" }) {
    return (
        <span className={`${styles.logo} ${className}`}>
            <svg className={styles.mark} viewBox="0 0 120 50" aria-hidden="true">
                <path d="M3 46 C13 36 22 30 31 26 C40 22 46 10 53 4 C60 10 70 24 77 28 C80 24 82 20 85 20 C91 24 105 41 117 47" />
                <circle className={styles.peak} cx="53" cy="4" r="3.4" />
            </svg>
            <span className={styles.word}>Code Summit</span>
        </span>
    );
}
