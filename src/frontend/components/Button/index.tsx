import "./index.css";
import { useMemo, type ReactNode } from "react";
import React from "react";

export enum ETypeButton {
  DEFAULT = "default",
  PRIMARY = "primary",
}

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | string;
  typeButton?: ETypeButton;
  loading?: boolean;
}

function Button(props: IButtonProps): JSX.Element {
  const { loading } = props;

  const renderClass = useMemo(() => {
    switch (props.typeButton) {
      case ETypeButton.PRIMARY:
        return "button-component__primary";
      default:
        return "button-component__default";
    }
  }, [props.typeButton]);

  return (
    <button
      disabled={loading}
      {...props}
      className={`button-component ${renderClass} ${props.className}`}
    >
      {/* {loading ? <LoadingOutlined /> : props.children} */}
      {props.children}
    </button>
  );
}

export default Button;
