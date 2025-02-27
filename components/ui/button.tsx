import * as React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(
        "bg-black text-white disabled:bg-gray-500 hover:bg-gray-900 dark:bg-white dark:text-black dark:disabled:bg-gray-500 dark:hover:bg-gray-200 p-2",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
