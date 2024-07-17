import { Button as ButtonMUI } from "@mui/material";

interface IProps {
  children: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button = ({ children, onClick, disabled, className }: IProps) => {
  return (
    <ButtonMUI
      onClick={onClick}
      disabled={disabled}
      className={className}
      variant="contained"
    >
      {children}
    </ButtonMUI>
  );
};
