import * as React from "react";
import * as ProgressBase from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressBase.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressBase.Root>
>(({ className, value, ...props }, ref) => {
  const progress = value ?? 0;

  return (
    <ProgressBase.Root
      ref={ref}
      className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
      {...props}
    >
      <ProgressBase.Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </ProgressBase.Root>
  );
});
Progress.displayName = "Progress";

export { Progress };
