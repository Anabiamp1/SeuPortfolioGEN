import * as React from "react";
import * as ScrollBase from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollBase.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollBase.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollBase.Root ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
    <ScrollBase.Viewport className="h-full w-full rounded-[inherit]">{children}</ScrollBase.Viewport>
    <ScrollBar />
    <ScrollBase.Corner />
  </ScrollBase.Root>
));
ScrollArea.displayName = "ScrollArea";

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollBase.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollBase.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollBase.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className,
    )}
    {...props}
  >
    <ScrollBase.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollBase.ScrollAreaScrollbar>
));
ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };
