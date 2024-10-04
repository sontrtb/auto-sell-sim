import "./index.css"
import React from "react";

interface IButtonProps {
    title: string;
    onClick?: () => void;
}

function Button(props: IButtonProps) {
    const {title, onClick} = props;

    return (
        <button onClick={onClick}>{title}</button>
    )
}

export default Button