import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`${className} w-80 border border-teal-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-700`}
      {...props}
    />
  );
});

export default Input;
