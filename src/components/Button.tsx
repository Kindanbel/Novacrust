import type { MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button = ({ text, onClick, disabled = false }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-[#063B3F] text-white py-4 rounded-full font-medium transition
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}
      `}
    >
      {text}
    </button>
  );
};

export default Button;
