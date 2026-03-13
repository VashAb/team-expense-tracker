import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  isLoading?: boolean;
  loadingText?: string;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
  secondary:
    'rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2',
  link:
    'text-sm font-medium text-red-700 underline hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 rounded',
};

const Button = ({
  variant = 'primary',
  isLoading = false,
  loadingText,
  children,
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={variantStyles[variant]}
      {...rest}
    >
      {isLoading ? (loadingText ?? children) : children}
    </button>
  );
};

export default Button;
