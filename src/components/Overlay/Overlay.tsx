import React from "react";
import s from "./Overlay.module.scss";

interface IProps {
  onClick?: () => void;
}

const Overlay: React.FC<IProps> = React.memo((props: IProps) => {
  const { onClick } = props;
  return <div role="dialog" onClick={onClick} className={s.overlay} />;
});

export default Overlay;
