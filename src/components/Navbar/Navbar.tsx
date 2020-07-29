import React from "react";
import cn from "classnames";
import { CSSTransition } from "react-transition-group";
import s from "./Navbar.module.scss";
import overlayStyles from "../Overlay/Overlay.module.scss";
import Overlay from "../Overlay/Overlay";
import themeVariables from "../../assets/theme/variables";
import Link from "next/link";

interface IProps {
  isOpen: boolean;
  setIsOpen: (status: boolean) => void;
}

const Navbar: React.FC<IProps> = React.memo((props: IProps) => {
  const { isOpen, setIsOpen } = props;

  return (
    <div className={cn(s.navbar, { [s.active]: isOpen })}>
      <CSSTransition
        in={isOpen}
        timeout={themeVariables.transition.transition_1}
        classNames={{
          enter: overlayStyles.overlayTransitionEnter,
          enterActive: overlayStyles.overlayTransitionEnterActive,
          exit: overlayStyles.overlayTransitionExit,
          exitActive: overlayStyles.overlayTransitionExitActive,
        }}
        unmountOnExit
        appear={isOpen}
      >
        <Overlay onClick={() => setIsOpen(false)} />
      </CSSTransition>
      <CSSTransition
        in={isOpen}
        timeout={themeVariables.transition.transition_1}
        classNames={{
          enter: s.navbarPanelTransitionEnter,
          enterActive: s.navbarPanelTransitionEnterActive,
          exit: s.navbarPanelTransitionExit,
          exitActive: s.navbarPanelTransitionExitActive,
        }}
        unmountOnExit
        appear={isOpen}
      >
        <aside className={s.navbarPanel}>
          <button
            onClick={() => setIsOpen(false)}
            type="button"
            className={s.closeButton}
          >
            <img src="/close.svg" alt="" />
          </button>
          <nav>
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
          </nav>
        </aside>
      </CSSTransition>
    </div>
  );
});

export default Navbar;
