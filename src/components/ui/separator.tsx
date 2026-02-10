import * as React from "react";
import * as SepBase from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SepBase.Root>,
  React.ComponentPropsWithoutRef<typeof SepBase.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SepBase.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className,
    )}
    {...props}
  />
));
Separator.displayName = "Separator";

export { Separator };
