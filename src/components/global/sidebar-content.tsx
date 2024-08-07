import clsx from "clsx";

interface SidebarProps {
  children: React.ReactNode;
  borderTop?: boolean;
  borderBottom?: boolean;
  className?: string;
}

export const SidebarContent = ({
  children,
  borderTop,
  borderBottom,
  className,
}: SidebarProps) => {
  return (
    <div
      className={clsx(
        borderTop && "relative border-t border-onyx-100 dark:border-onyx-800",
        borderBottom && "border-b border-onyx-100 dark:border-onyx-800",
        "px-2 py-4",
        { className },
      )}
    >
      {children}
    </div>
  );
};
