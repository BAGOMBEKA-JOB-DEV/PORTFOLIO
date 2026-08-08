import clsx from "clsx";
import type { IconType } from "react-icons";
import { BiLinkExternal } from "react-icons/bi";

type Props = {
  icon?: IconType;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const Button: React.FC<React.PropsWithChildren<Props>> = ({
  onClick,
  children,
  className,
  type = "button",
  disabled = false,
  icon: Icon = BiLinkExternal,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={clsx(
      "w-fit inline-flex gap-2.5 items-center justify-center px-8 py-3 rounded-lg",
      "bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 font-bold",
      "transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900",
      className,
    )}
  >
    {Icon && <Icon fontSize={16} />}
    <span>{children}</span>
  </button>
);

export default Button;
