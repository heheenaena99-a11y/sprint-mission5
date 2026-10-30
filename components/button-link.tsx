import Link from "next/link";
import { cn } from "cn";

import { buttonVariants } from "@/components/ui/button";

type ButtonLinkProps = React.ComponentProps<typeof Link> & {
  variant?: "primary" | "outline" | "text" | "white" | "white-outline";
  size?: "sm" | "lg";
};

const variantClassName = {
  primary: "",
  outline:
    "border-primary bg-transparent text-[15px] text-primary hover:bg-tint",
  text: "bg-transparent text-primary hover:bg-tint",
  white: "bg-white text-primary hover:bg-white/90",
  "white-outline": "border-white bg-transparent text-white hover:bg-white/10",
};

const sizeClassName = {
  sm: "px-4 py-3 text-sm",
  lg: "px-10 pt-[19px] pb-5 text-[15px]",
};

/** 페이지 이동용 버튼 모양 링크 (동작 버튼은 components/ui/button 사용) */
export function ButtonLink({
  variant = "primary",
  size = "sm",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        buttonVariants({
          variant: variant === "primary" ? "default" : "outline",
        }),
        "h-auto rounded-button font-bold",
        sizeClassName[size],
        variantClassName[variant],
        className,
      )}
      {...props}
    />
  );
}
