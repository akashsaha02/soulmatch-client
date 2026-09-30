import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Builds a compact page list like [1, "…", 4, 5, 6, "…", 12]
const pageList = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, total, current, current - 1, current + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const out = []
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push(`gap-${p}`)
    out.push(p)
  })
  return out
}

const Pagination = ({ page, totalPages, onPageChange, className }) => {
  if (!totalPages || totalPages <= 1) return null

  return (
    <nav role="navigation" aria-label="Pagination" className={cn("flex items-center justify-center gap-1.5", className)}>
      <Button
        variant="outline"
        size="icon"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}>
        <ChevronLeft />
      </Button>
      {pageList(page, totalPages).map((p) =>
        typeof p === "string" ? (
          <span key={p} className="px-1 text-muted-foreground">…</span>
        ) : (
          <Button
            key={p}
            size="icon"
            variant={p === page ? "default" : "ghost"}
            aria-current={p === page ? "page" : undefined}
            onClick={() => onPageChange(p)}>
            {p}
          </Button>
        )
      )}
      <Button
        variant="outline"
        size="icon"
        aria-label="Next page"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}>
        <ChevronRight />
      </Button>
    </nav>
  )
}

export { Pagination }
