import Link from "next/link";
import Image from "next/image";
import ChevronRightIcon from "../icons/chevron-right";
interface LinkProps {
  href: string;
  variant?: "primary" | "secondary";
  text: string;
  Icon?: boolean;
}

const ButtonLink = ({ href, variant = "primary", text, Icon }: LinkProps) => {
  const variantClass = {
    primary:
      "bg-onyx-700 dark:bg-white text-onyx-50 dark:text-onyx-900 hover:bg-onyx-600 dark:hover:bg-onyx-300 borderStyle transitionAll",
    secondary:
      "bg-onxy-300 dark:bg-onyx-800 text-onyx-800 dark:text-gray-200 hover:bg-onyx-100 dark:hover:bg-onyx-600 borderStyle transitionAll",
  }[variant];
  return (
    <>
      <Link
        className={`${variantClass} flex items-center w-max gap-1 px-4 h-[45px] justify-center rounded-lg transitionAll font-medium`}
        href={href}
        aria-label={text}
      >
        <span>{text}</span>
        {Icon ? <ChevronRightIcon /> : null}
      </Link>
    </>
  );
};

export default ButtonLink;
