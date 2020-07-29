import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import s from "./Modal.module.scss";
import Preloader from "../Preloader/Preloader";
import Overlay from "../Overlay/Overlay";
import Button from "../Button/Button";
import { ColorEnum } from "../../types/Theme";

/* Modal windows that can be without buttons, with 1 resolve/reject button or 2 buttons */
/* Made with class component because of show-animation in beginning and loading state inside
(when state in func have changed component rerenders and begin show-animation again) */

interface IProps {
  text?: string | null;
  buttonResolveText?: string;
  buttonRejectText?: string;
  callbackResolve?: (() => void) | undefined;
  callbackReject?: (() => void) | undefined;
  callbackCancel?: (() => void) | undefined;
  promiseResolve?: () => Promise<string | number | null | unknown>;
  promiseReject?: () => Promise<string | number | null | unknown>;
  promiseCancel?: () => Promise<string | number | null | unknown>;
  promiseResolveError?: string | null;
  promiseRejectError?: string | null;
  promiseCancelError?: string | null;
  setIsOpen: (status: boolean) => void;
  isOpen: boolean;
}

const Modal: React.FC<IProps> = React.memo((props: IProps) => {
  const {
    text,
    buttonResolveText,
    buttonRejectText,
    callbackResolve,
    callbackReject,
    callbackCancel,
    promiseResolve,
    promiseReject,
    promiseCancel,
    promiseResolveError,
    promiseRejectError,
    promiseCancelError,
    setIsOpen,
    isOpen,
  } = props;

  const [isPromiseResolveError, setIsPromiseResolveError] = useState(false);
  const [isPromiseRejectError, setIsPromiseRejectError] = useState(false);
  const [isPromiseCancelError, setIsPromiseCancelError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const closeModal = async () => {
    setIsFetching(false);
    setIsPromiseResolveError(false);
    setIsPromiseRejectError(false);
    setIsPromiseCancelError(false);
    setIsOpen(false);
  };

  const cancelModal = async () => {
    if (promiseCancel) {
      setIsFetching(true);
      setIsPromiseResolveError(false);
      setIsPromiseRejectError(false);
      setIsPromiseCancelError(false);
      if (callbackCancel) {
        callbackCancel();
      }
      if (promiseCancel) {
        promiseCancel()
          .then(() => {
            closeModal();
          })
          .catch(() => {
            setIsPromiseCancelError(true);
            setIsFetching(false);
          });
      }
    } else {
      if (callbackCancel) {
        callbackCancel();
      }
      closeModal();
    }
  };

  const resolveModal = async () => {
    if (promiseResolve) {
      setIsFetching(true);
      setIsPromiseResolveError(false);
      setIsPromiseRejectError(false);
      setIsPromiseCancelError(false);
      if (callbackResolve) {
        callbackResolve();
      }
      if (promiseResolve) {
        promiseResolve()
          .then(() => {
            closeModal();
          })
          .catch(() => {
            setIsPromiseResolveError(true);
            setIsFetching(false);
          });
      }
    } else {
      if (callbackResolve) {
        callbackResolve();
      }
      closeModal();
    }
  };

  const rejectModal = async () => {
    if (promiseReject) {
      setIsFetching(true);
      setIsPromiseResolveError(false);
      setIsPromiseRejectError(false);
      setIsPromiseCancelError(false);
      if (callbackReject) {
        callbackReject();
      }
      if (promiseReject) {
        promiseReject()
          .then(() => {
            closeModal();
          })
          .catch(() => {
            setIsPromiseRejectError(true);
            setIsFetching(false);
          });
      }
    } else {
      if (callbackReject) {
        callbackReject();
      }
      closeModal();
    }
  };

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="toggleOpacity"
      unmountOnExit
      onEnter={() => setIsOpen(true)}
      onExited={() => setIsOpen(false)}
    >
      <div className={s.modal}>
        <Overlay onClick={cancelModal} />
        <div className={s.modalCard}>
          <span>{text}</span>

          {isPromiseResolveError && promiseResolveError && (
            <div className={s.error}>
              {promiseResolveError || "Oops... something wrong"}
            </div>
          )}

          {isPromiseRejectError && promiseRejectError && (
            <div className={s.error}>
              {promiseRejectError || "Oops... something wrong"}
            </div>
          )}

          {isPromiseCancelError && promiseCancelError && (
            <div className={s.error}>
              {promiseCancelError || "Oops... something wrong"}
            </div>
          )}

          <div className={s.buttons}>
            {isFetching && <Preloader />}

            {!!buttonResolveText && !isFetching && (
              <Button
                variant="fill"
                color={ColorEnum.success}
                type="button"
                onClick={resolveModal}
              >
                {buttonResolveText || "Yes"}
              </Button>
            )}

            {!!buttonRejectText && !isFetching && (
              <Button
                variant="fill"
                color={ColorEnum.danger}
                type="button"
                onClick={rejectModal}
              >
                {buttonRejectText || "No"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
});

export default Modal;
