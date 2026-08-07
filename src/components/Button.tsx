import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Slot } from 'radix-ui';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { asChild, type, ...props },
  ref
) {
  if (asChild) {
    return <Slot.Root ref={ref} {...props} />;
  }
  return <button ref={ref} type={type ?? 'button'} {...props} />;
});
