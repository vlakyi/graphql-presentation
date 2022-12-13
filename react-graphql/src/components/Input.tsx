import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, name, ...props }: InputProps) {
  return (
    <label>
      {label}
      <input
        name={name}
        type="text"
        placeholder={label}
        className="input input-bordered w-full max-w-xs input-sm mt-2"
        {...props}
      />
    </label>
  );
}
