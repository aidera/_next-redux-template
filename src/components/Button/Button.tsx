import React from "react";
import cn from "classnames";
import { ColorEnum } from "../../types/Theme";
import s from "./Button.module.scss";

interface IProps {
  type?: "button" | "submit" | "reset";
  variant?: "fill" | "outline";
  color?: ColorEnum;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<IProps> = React.memo((props: IProps) => {
  const { type, variant, color, children, onClick } = props;

  return (
    <button
      onClick={onClick}
      className={cn(s.button, {
        [s.filled]: variant === "fill",
        [s.outline]: variant === "outline",
        [s.primary]: color === ColorEnum.primary,
        [s.success]: color === ColorEnum.success,
        [s.warning]: color === ColorEnum.warning,
        [s.danger]: color === ColorEnum.danger,
      })}
      type={type}
    >
      {children}
    </button>
  );
});

export default Button;
