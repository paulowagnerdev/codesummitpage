import { forwardRef } from "react";
import styles from "./Button.module.css";

/**
 * Botão/link da marca. `variant`: "primary" | "ghost" | "ghost-dark".
 * O rótulo desliza para cima no hover (microinteração).
 */
export const Button = forwardRef(function Button(
    { href, variant = "primary", icon, children, className = "", ...rest },
    ref
) {
    const Tag = href ? "a" : "button";
    const external = href?.startsWith("http");

    return (
        <Tag
            ref={ref}
            href={href}
            className={`${styles.btn} ${styles[variant]} ${className}`}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            {...rest}
        >
            {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
            <span className={styles.label}>
                <span className={styles.text}>{children}</span>
                <span className={styles.text} aria-hidden="true">{children}</span>
            </span>
        </Tag>
    );
});

export const ChatIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
);
