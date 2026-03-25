"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center font-bold uppercase tracking-[0.2rem] transition-all duration-300 outline-none select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-stone-100 text-stone-950 hover:bg-stone-200 shadow-xl",
        outline:
          "border border-stone-800 text-stone-400 hover:bg-stone-100 hover:text-stone-950",
        link: "text-[#00A3FF] hover:text-stone-100",
      },
      size: {
        sm: "px-8 py-3 text-[0.75rem]",
        md: "px-10 py-4 text-[0.7rem]",
        lg: "px-12 py-5 text-[0.9rem]",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
