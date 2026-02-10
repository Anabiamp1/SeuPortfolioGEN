import * as React from "react";
import * as MenuBase from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const ContextMenu = MenuBase.Root;
const ContextMenuTrigger = MenuBase.Trigger;
const ContextMenuGroup = MenuBase.Group;
const ContextMenuPortal = MenuBase.Portal;
const ContextMenuSub = MenuBase.Sub;
const ContextMenuRadioGroup = MenuBase.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenuBase.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenuBase.SubTrigger> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <MenuBase.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
      "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      "focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenuBase.SubTrigger>
));
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof MenuBase.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenuBase.SubContent>
>(({ className, ...props }, ref) => (
  <MenuBase.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
ContextMenuSubContent.displayName = "ContextMenuSubContent";

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof MenuBase.Content>,
  React.ComponentPropsWithoutRef<typeof MenuBase.Content>
>(({ className, ...props }, ref) => (
  <MenuBase.Portal>
    <MenuBase.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </MenuBase.Portal>
));
ContextMenuContent.displayName = "ContextMenuContent";

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof MenuBase.Item>,
  React.ComponentPropsWithoutRef<typeof MenuBase.Item> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <MenuBase.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
ContextMenuItem.displayName = "ContextMenuItem";

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenuBase.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenuBase.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenuBase.CheckboxItem
    ref={ref}
    checked={checked}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenuBase.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenuBase.ItemIndicator>
    </span>
    {children}
  </MenuBase.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof MenuBase.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenuBase.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenuBase.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenuBase.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenuBase.ItemIndicator>
    </span>
    {children}
  </MenuBase.RadioItem>
));
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof MenuBase.Label>,
  React.ComponentPropsWithoutRef<typeof MenuBase.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <MenuBase.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className)}
    {...props}
  />
));
ContextMenuLabel.displayName = "ContextMenuLabel";

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof MenuBase.Separator>,
  React.ComponentPropsWithoutRef<typeof MenuBase.Separator>
>(({ className, ...props }, ref) => (
  <MenuBase.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
));
ContextMenuSeparator.displayName = "ContextMenuSeparator";

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />
);
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
