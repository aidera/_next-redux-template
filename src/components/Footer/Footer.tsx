import React from "react";
import s from "./Footer.module.scss";

const Footer = React.memo(() => {
  return <footer className={s.footer} />;
});

export default Footer;
