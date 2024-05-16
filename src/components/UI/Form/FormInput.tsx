import { ChangeEvent } from "react";
import styles from "./formInput.module.css";

interface BaseProps {
  id: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface TextInputProps extends BaseProps {
  type: "text" | "email" | "password";
  value: string;
  required?: boolean;
  placeholder?: string;
}

interface CheckboxProps extends BaseProps {
  type: "checkbox";
  checked: boolean;
}

type FormInputProps = TextInputProps | CheckboxProps;

export default function FormInput(props: FormInputProps) {
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
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  }
  return (
    <div className={styles.input_styles}>
      {/* <label htmlFor={props.id}>{props.label}</label> */}
      <input
        id={id}
        type={type}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        aria-label={props.label}
        required={props.required}
      />
    </div>
  );
}
