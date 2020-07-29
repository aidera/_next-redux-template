import cn from "classnames";
import React from "react";
import s from "./FormControls.module.scss";

export const errorContainer = (error: string | undefined, touched: boolean) => {
  if (error && touched) {
    return <div className={s.messageError}>{error}</div>;
  }
  return null;
};

export const maxLengthCounter = (
  currentLength: number,
  maxLength: number | undefined
) => {
  if (maxLength) {
    return (
      <div
        className={cn(s.maxLength, {
          [s.error]: currentLength >= maxLength,
        })}
      >
        {currentLength}/{maxLength}
      </div>
    );
  }
  return null;
};

export const fieldIcon = (icon: "email" | "password" | "user" | "search") => {
  switch (icon) {
    case "email":
      return <img src="/mail.svg" alt="mail" />;

    case "password":
      return <img src="/password.svg" alt="password" />;

    case "user":
      return <img src="/user.svg" alt="user" />;

    default:
      return null;
  }
};
