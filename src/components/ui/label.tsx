import * as React from "react";
import * as LabelBase from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelStyles = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

const Label = React.forwardRef<
  React.ElementRef<typeof LabelBase.Root>,
  React.ComponentPropsWithoutRef<typeof LabelBase.Root> & VariantProps<typeof labelStyles>
>(({ className, ...props }, ref) => (
  <LabelBase.Root ref={ref} className={cn(labelStyles(), className)} {...props} />
));
Label.displayName = "Label";

export { Label };
