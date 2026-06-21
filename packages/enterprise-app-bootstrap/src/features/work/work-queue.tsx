"use client";
import { useState } from "react";
import { Clock3, MoreHorizontal, UserRound } from "lucide-react";
import { workItems } from "./data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/common/status-badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const priorityVariant = { low: "secondary", medium: "warning", high: "danger" } as const;

export function WorkQueue() {
  const [filter, setFilter] = useState("all");
  const visible = filter === "all" ? workItems : workItems.filter(item => item.status === filter);
  return (
    <div className="space-y-4">
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="running">En cours</TabsTrigger>
          <TabsTrigger value="pending">À faire</TabsTrigger>
          <TabsTrigger value="blocked">Bloqués</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid gap-3">
        {visible.map(item => (
          <Card key={item.id} className="transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{item.id}</span>
                  <Badge variant={priorityVariant[item.priority]}>Priorité {item.priority}</Badge>
                  <StatusBadge status={item.status} />
                </div>
                <h3 className="mt-2 font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.type}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><UserRound className="size-4" />{item.owner}</span>
                <span className="inline-flex items-center gap-1.5"><Clock3 className="size-4" />{item.due}</span>
                <Button variant="ghost" size="icon" aria-label={`Actions ${item.id}`}><MoreHorizontal className="size-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
