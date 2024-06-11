import { Link } from "react-router-dom";
import styles from "./Button.module.scss";
import React, { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
    to?: string;
    href?: string;
    size?: string;
    type?: string;
    className?: string;
    children: ReactNode;
    disabled?: boolean;
    openNewTab?: boolean;
    underline?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export default function Button({
    to = "",
    href = "",
    size = "m",
    type = "primary",
    className = "",
    children,
    disabled = false,
    openNewTab = false,
    underline = false,
    onClick,
}: ButtonProps) {
    const classNames = [
        className,
        styles.wrapper,
        styles[type],
        styles[size],
        underline ? styles.underline : "",
        disabled ? styles.disabled : "",
    ].join(" ");

    const props: Record<string, any> = {};

    let Component: React.ElementType = "button";

    if (href) {
        Component = "a";
        props.href = href;
        if (openNewTab) {
            props.target = "_blank";
            props.rel = "noopener noreferrer";
        }
    }

    if (to) {
        Component = Link;
        props.to = to;
    }

    return (
        <Component {...props} className={classNames} onClick={onClick}>
            <span>{children}</span>
        </Component>
    );
}
