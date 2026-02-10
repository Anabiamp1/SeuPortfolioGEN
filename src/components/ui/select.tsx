import * as React from "react";
import * as SelectBase from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectBase.Root;
const SelectGroup = SelectBase.Group;
const SelectValue = SelectBase.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectBase.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectBase.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectBase.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm",
      "ring-offset-background placeholder:text-muted-foreground",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "[&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectBase.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectBase.Icon>
  </SelectBase.Trigger>
));
SelectTrigger.displayName = "SelectTrigger";

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectBase.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectBase.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectBase.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectBase.ScrollUpButton>
));
SelectScrollUpButton.displayName = "SelectScrollUpButton";

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectBase.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectBase.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectBase.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectBase.ScrollDownButton>
));
SelectScrollDownButton.displayName = "SelectScrollDownButton";

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectBase.Content>,
  React.ComponentPropsWithoutRef<typeof SelectBase.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectBase.Portal>
    <SelectBase.Content
      ref={ref}
      position={position}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectBase.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectBase.Viewport>
      <SelectScrollDownButton />
    </SelectBase.Content>
  </SelectBase.Portal>
));
SelectContent.displayName = "SelectContent";

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectBase.Label>,
  React.ComponentPropsWithoutRef<typeof SelectBase.Label>
>(({ className, ...props }, ref) => (
  <SelectBase.Label ref={ref} className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)} {...props} />
));
SelectLabel.displayName = "SelectLabel";

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectBase.Item>,
  React.ComponentPropsWithoutRef<typeof SelectBase.Item>
>(({ className, children, ...props }, ref) => (
  <SelectBase.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectBase.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectBase.ItemIndicator>
    </span>

    <SelectBase.ItemText>{children}</SelectBase.ItemText>
  </SelectBase.Item>
));
SelectItem.displayName = "SelectItem";

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectBase.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectBase.Separator>
>(({ className, ...props }, ref) => (
  <SelectBase.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
SelectSeparator.displayName = "SelectSeparator";

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
