import { cn } from "@/lib/utils";

interface PatternBorderProps {
  className?: string;
}

export const PatternBorder = ({ className }: PatternBorderProps) => {
  return <div className={cn("pattern-border h-2", className)} />;
};
