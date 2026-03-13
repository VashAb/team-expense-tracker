import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

type BaseProps = {
  label?: string;
  error?: string;
  id: string;
};

type InputProps = BaseProps & {
  as?: 'input';
} & InputHTMLAttributes<HTMLInputElement>;

type SelectProps = BaseProps & {
  as: 'select';
  children: React.ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>;

type TextareaProps = BaseProps & {
  as: 'textarea';
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

type FormFieldProps = InputProps | SelectProps | TextareaProps;

const ELEMENT_MAP = {
  input: 'input',
  select: 'select',
  textarea: 'textarea',
} as const;

const inputClassName =
  'mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500';

const FormField = (props: FormFieldProps) => {
  const { label, error, id, as = 'input', children, ...rest } = props as BaseProps & {
    as?: keyof typeof ELEMENT_MAP;
    children?: React.ReactNode;
  } & Record<string, unknown>;

  const errorId = `${id}-error`;
  const Element = ELEMENT_MAP[as];

  const elementProps = {
    id,
    className: inputClassName,
    ...(error && { 'aria-invalid': true, 'aria-describedby': errorId }),
    ...rest,
  };

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Element {...elementProps as Record<string, unknown>}>{children}</Element>
      <p id={errorId} className="mt-1 text-sm text-red-600 min-h-[1.25rem]">{error ?? '\u00A0'}</p>
    </div>
  );
};

export default FormField;
