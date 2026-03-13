import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'link';
type Size = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  loadingText?: string;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'rounded-md bg-indigo-600 font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
  secondary:
    'rounded-md border border-gray-300 bg-white font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2',
  danger:
    'rounded-md bg-red-50 font-medium text-red-600 hover:bg-red-100 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2',
  link:
    'font-medium text-red-700 underline hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 rounded',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
};

const Spinner = ({ size }: { size: Size }) => (
  <span className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent ${size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'}`} />
);

const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loadingText,
  children,
  disabled,
  className,
  ...rest
}: ButtonProps) => {
  const styles = variant === 'link'
    ? variantStyles.link
    : `${variantStyles[variant]} ${sizeStyles[size]}`;

  return (
    <button
      disabled={disabled || isLoading}
      className={className ? `${styles} ${className}` : styles}
      {...rest}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <Spinner size={size} />
          {loadingText ?? children}
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
