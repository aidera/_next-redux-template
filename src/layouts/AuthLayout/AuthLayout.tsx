import React from "react";
import s from "./AuthLayout.module.scss";

interface IProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<IProps> = React.memo((props: IProps) => {
  const { children } = props;

  return (
    <>
      <main className={s.page}>
        <div className={s.formBlock}>{children}</div>
        <div className={s.imgBlock}>
          <img src="/sign-bg.jpg" alt="" />
        </div>
      </main>
    </>
  );
});

export default AuthLayout;
