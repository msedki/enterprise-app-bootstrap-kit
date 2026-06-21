import { CheckCircle2, CircleDot, UserPlus } from "lucide-react";
import { formatRelativeDate } from "@/lib/format";

const icons = { completed: CheckCircle2, changed: CircleDot, invited: UserPlus } as const;
export type Activity = { id: string; type: keyof typeof icons; actor: string; action: string; target: string; at: string };

export function ActivityFeed({ items }: { items: Activity[] }) {
  return (
    <ol className="space-y-4">
      {items.map(item => {
        const Icon = icons[item.type];
        return (
          <li key={item.id} className="flex gap-3">
            <div className="mt-0.5 rounded-full bg-muted p-2"><Icon className="size-4 text-muted-foreground" /></div>
            <div className="min-w-0 flex-1">
              <p className="text-sm"><span className="font-semibold">{item.actor}</span> {item.action} <span className="font-medium">{item.target}</span></p>
              <p className="mt-0.5 text-xs text-muted-foreground">{formatRelativeDate(item.at)}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
