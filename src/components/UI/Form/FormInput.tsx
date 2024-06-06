import { ChangeEvent, forwardRef } from "react";
import styles from "./formInput.module.css";

interface BaseProps {
  id: string;
  label?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface TextInputProps extends BaseProps {
  type: "text" | "number" | "email" | "password" | "datetime-local";
  value?: string | number;
  required?: boolean;
  placeholder?: string;
  name?: string;
}

interface CheckboxProps extends BaseProps {
  type: "checkbox";
  checked: boolean;
}

type FormInputProps = TextInputProps | CheckboxProps;

const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const { id, label, type } = props;

  if (type === "checkbox") {
    return (
      <div className={styles.checkbox_styles}>
        <input
          id={id}
          type="checkbox"
          checked={props.checked}
          onChange={props.onChange}
          aria-label={label}
          ref={ref}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  }
  return (
    <div className={styles.input_styles} data-type="text">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={id}
        type={type}
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        placeholder={props.placeholder}
        aria-label={props.label}
        required={props.required}
      />
    </div>
  );
});

export default FormInput;
