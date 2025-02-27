import * as React from "react";
import { cn } from "@/lib/utils";

const Select = React.forwardRef<
  HTMLSelectElement,
  React.ComponentProps<"select">
>(({ className, ...props }, ref) => {
  return (
    <select
      className={cn(
        "border border-gray-300 dark:border-gray-700 bg-white dark:bg-black p-2",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Select.displayName = "Select";

const SelectOption = React.forwardRef<
  HTMLOptionElement,
  React.ComponentProps<"option">
>(({ className, ...props }, ref) => {
  return <option className={cn("", className)} ref={ref} {...props} />;
});
SelectOption.displayName = "SelectOption";

export { Select, SelectOption };
