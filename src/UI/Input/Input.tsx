import { Input as InputMUI } from "@mui/material";

interface IProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string
  disabled?: boolean;
  className?: string
}

export const Input = ({ value, onChange, placeholder,type, disabled, className }: IProps) => {
  return (
    <InputMUI
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      type={type}
      className={className}
    />
  );
};
