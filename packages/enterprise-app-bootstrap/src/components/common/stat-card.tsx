import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label, value, change, changeLabel, icon: Icon, trend = "neutral",
}: {
  label: string;
  value: string;
  change?: string;
  changeLabel?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
          </div>
          <div className="rounded-lg bg-primary/10 p-2 text-primary"><Icon className="size-5" /></div>
        </div>
        {change ? (
          <div className="mt-4 flex items-center gap-1.5 text-xs">
            <span className={cn(
              "inline-flex items-center font-semibold",
              trend === "up" && "text-success",
              trend === "down" && "text-destructive",
              trend === "neutral" && "text-muted-foreground",
            )}>
              {trend === "up" ? <ArrowUpRight className="mr-0.5 size-3" /> : trend === "down" ? <ArrowDownRight className="mr-0.5 size-3" /> : null}
              {change}
            </span>
            <span className="text-muted-foreground">{changeLabel}</span>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
