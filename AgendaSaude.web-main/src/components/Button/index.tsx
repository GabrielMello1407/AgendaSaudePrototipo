"use client";
import Link from "next/link";

import cn from "../../lib/cn";

const ButtonColors = {
  primary: "primary"
} as const;

const ButtonVariants = {
  filled: "filled",
  outlined: "outlined",
  plain: "plain"
} as const;

type ButtonColors = keyof typeof ButtonColors;
type ButtonVariants = keyof typeof ButtonVariants;

type ButtonProps = {
  children?: React.ReactNode;
  leftAccessory?: React.ReactNode;
  rightAccessory?: React.ReactNode;
  color?: ButtonColors;
  variant?: ButtonVariants;
  className?: string;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
} & React.ComponentProps<"button">;

export default function Button({
  href,
  onClick,
  children,
  leftAccessory,
  rightAccessory,
  color = ButtonColors.primary,
  variant = ButtonVariants.filled,
  className,
  disabled = false,
  ...props
}: ButtonProps) {
  const defaultButtonClass =
    "flex items-center gap-1 px-3 py-1.5 rounded-sm text-sm font-normal touch-manipulation cursor-pointer  text-black transition-all duration-100 ease-in";

  const variants = {
    filled: {
      primary:
        "border border-gray-300 bg-gray-200  text-slate-700 hover:bg-gray-300 hover:text-black  hover:border-gray-400 "
    },
    outlined: {
      primary:
        "border border-gray-300 bg-transparent text-gray-400  hover:border-gray-400 hover:text-gray-500 "
    },
    plain: {
      primary:
        "border border-transparent bg-transparent  text-gray-100 hover:text-blue-600 hover:bg-transparent p-0 font-semibold"
    }
  };
  const disabledClasses = {
    filled:
      "cursor-not-allowed border border-gray-500 bg-gray-500  text-slate-700 hover:bg-gray-500 ",
    outlined:
      "cursor-not-allowed border border-gray-500 bg-transparent text-gray-500 ",
    plain:
      "cursor-not-allowed border border-transparent bg-transparent text-gray-500 hover:bg-transparent hover:text-gray-500 "
  };

  if (href) {
    return (
      <Link
        onClick={onClick}
        target="_blank"
        href={href}
        className={cn(
          defaultButtonClass,
          disabled ? disabledClasses[variant] : variants[variant][color],
          className
        )}
      >
        {leftAccessory ? leftAccessory : null}
        <p>{children}</p>
        {rightAccessory ? rightAccessory : null}
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      className={cn(
        defaultButtonClass,
        disabled ? disabledClasses[variant] : variants[variant][color],
        className
      )}
      {...props}
    >
      {leftAccessory ? leftAccessory : null}
      <p>{children}</p>
      {rightAccessory ? rightAccessory : null}
    </button>
  );
}
