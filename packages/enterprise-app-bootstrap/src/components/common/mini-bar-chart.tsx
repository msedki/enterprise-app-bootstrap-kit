export function MiniBarChart({ values, labels, title }: { values: number[]; labels: string[]; title: string }) {
  const max = Math.max(...values, 1);
  return (
    <figure aria-label={title} className="space-y-4">
      <div className="flex h-48 items-end gap-2 rounded-lg bg-muted/30 p-4" role="img" aria-label={`${title}. Valeurs : ${values.join(", ")}`}>
        {values.map((value, index) => (
          <div key={`${labels[index]}-${index}`} className="group flex h-full flex-1 items-end">
            <div className="relative w-full rounded-t-md bg-primary/75 transition-colors hover:bg-primary" style={{ height: `${Math.max((value / max) * 100, 4)}%` }}>
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold opacity-0 transition-opacity group-hover:opacity-100">{value}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {labels.map(label => <span key={label} className="flex-1 truncate text-center text-xs text-muted-foreground">{label}</span>)}
      </div>
    </figure>
  );
}
