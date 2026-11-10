import { useRef } from "react";
import { useInView } from "../hooks/useInView";

/** Envolve conteúdo que deve surgir suavemente ao entrar na tela. */
export function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
    const ref = useRef(null);
    const visible = useInView(ref);

    return (
        <Tag
            ref={ref}
            className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
            style={{ "--delay": `${delay}s` }}
            {...rest}
        >
            {children}
        </Tag>
    );
}
