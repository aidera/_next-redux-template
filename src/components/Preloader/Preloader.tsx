import React from "react";
import s from "./Preloader.module.scss";

const Preloader = React.memo(() => {
  return (
    <div className={s.preloader}>
      <img src="loader.svg" alt="preloader" />
    </div>
  );
});

export default Preloader;
