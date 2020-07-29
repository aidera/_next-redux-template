import React from "react";
import { useDispatch } from "react-redux";
import s from "./Header.module.scss";
import Button from "../Button/Button";
import { setIsNavbarOpen } from "../../redux/app/app.actions";
import Link from "next/link";

const Header: React.FC = React.memo(() => {
  const dispatch = useDispatch();

  return (
    <header className={`${s.header}`}>
      <Button onClick={() => dispatch(setIsNavbarOpen(true))}>
        <img className={s.icon} src="/open-menu.svg" alt="menu" />
      </Button>
      <Link href="/">
        <a>Index</a>
      </Link>
      <Link href="/post/1">
        <a>Post 1</a>
      </Link>
      <Link href="/post/2">
        <a>Post 2</a>
      </Link>
      <Link href="/post/3">
        <a>Post 3</a>
      </Link>
      <Link href="/login">
        <a>Login</a>
      </Link>
      <Link href="/registry">
        <a>Registry</a>
      </Link>
    </header>
  );
});

export default Header;
