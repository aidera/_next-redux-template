import cn from "classnames";
import { Field, useField } from "formik";
import React from "react";
import s from "./FormControls.module.scss";
import { errorContainer, fieldIcon, maxLengthCounter } from "./Common";
import { IconEnum } from "../../types/Form";

interface IProps {
  name: string;
  label?: string;
  maxLength?: number;
  placeholder?: string;
  type?: string;
  icon?: IconEnum;
  autoFocus?: boolean;
}

const FieldTextarea: React.FC<IProps> = React.memo((props: IProps) => {
  const { name, label, maxLength, placeholder, icon, autoFocus } = props;

  const [field, { error, touched }] = useField(name);

  const textareaElement = document.querySelector(
    `#${name}`
  ) as HTMLTextAreaElement;

  return (
    <fieldset
      onClick={() => {
        if (textareaElement) {
          textareaElement.focus();
        }
      }}
      className={cn(s.field, s.fieldTextarea, { [s.active]: field.value })}
    >
      {!!label && <label htmlFor={name}>{label}</label>}

      <div className={s.container}>
        <Field
          as="textarea"
          name={name}
          id={name}
          rows={1}
          placeholder={placeholder}
          maxLength={maxLength}
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
              if (textareaElement) {
                textareaElement.focus();
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

export default FieldTextarea;
