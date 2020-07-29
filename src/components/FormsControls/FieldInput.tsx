import cn from "classnames";
import { Field, useField } from "formik";
import React, { useEffect } from "react";
import s from "./FormControls.module.scss";
import { errorContainer, fieldIcon, maxLengthCounter } from "./Common";
import { IconEnum } from "../../types/Form";
import getDocument from "../../utils/getDocument";

interface IProps {
  name: string;
  label?: string;
  maxLength?: number;
  placeholder?: string;
  type?: string;
  icon?: IconEnum;
  autoFocus?: boolean;
}

const FieldInput: React.FC<IProps> = React.memo((props: IProps) => {
  const { name, label, maxLength, placeholder, type, icon, autoFocus } = props;

  const [field, { error, touched }] = useField(name);

  let inputElement = null;

  useEffect(() => {
    getDocument().onload = () => {
      inputElement = document.querySelector(`#${name}`) as HTMLInputElement;
    };
  }, []);

  return (
    <fieldset
      className={cn(s.field, s.fieldInput, {
        [s.active]: field.value,
        [s.error]: error && touched,
      })}
      onClick={() => {
        if (inputElement) {
          inputElement.focus();
        }
      }}
    >
      {!!label && <label htmlFor={`${name}`}>{label}</label>}

      <div className={s.container}>
        <Field
          name={name}
          as="input"
          id={name}
          placeholder={placeholder}
          maxLength={maxLength}
          type={type}
          autoFocus={autoFocus}
          className={cn({
            [s.error]: error && touched,
            [s.withIcon]: icon,
          })}
        />
        {icon && (
          <button
            type="button"
            onClick={() => {
              if (inputElement) {
                inputElement.focus();
              }
            }}
            className={s.fieldIcon}
          >
            {fieldIcon(icon)}
          </button>
        )}
        {field.value && maxLengthCounter(field.value.length, maxLength)}
      </div>

      {errorContainer(error, touched)}
    </fieldset>
  );
});

export default FieldInput;
